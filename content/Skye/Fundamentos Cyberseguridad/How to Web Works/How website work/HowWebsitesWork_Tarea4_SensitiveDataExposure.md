# How Websites Work — Tarea 4: Sensitive Data Exposure

> [!info] Módulo: How Websites Work
> Una de las vulnerabilidades más simples pero más frecuentes en aplicaciones web. No requiere herramientas sofisticadas — a veces basta con ver el código fuente.

---

## ¿Qué es Sensitive Data Exposure?

La **exposición de datos sensibles** ocurre cuando un sitio web no protege ni elimina correctamente información confidencial que queda visible en el código fuente del **Front End** (HTML, CSS o JavaScript).

No es un ataque técnico complejo. Es simplemente encontrar información que el desarrollador olvidó remover o que dejó expuesta por descuido.

> [!warning] ¿Dónde suele aparecer esta información?
> - Comentarios HTML (`<!-- -->`)
> - Archivos JavaScript externos (`.js`)
> - Campos `<input>` ocultos (`type="hidden"`)
> - Nombres de rutas internas en atributos `src` o `href`
> - Credenciales de prueba que nunca se eliminaron

---

## Ejemplo real — credenciales en un comentario HTML

![[Pasted image 20260520135640.png]]
### ¿Qué pasó aquí?

Un desarrollador dejó un comentario HTML con credenciales de prueba (`admin:password123`) que nunca eliminó antes de subir el sitio a producción. Ese comentario **no se muestra en la página** pero **sí está en el código fuente** — cualquiera que presione `Ctrl+U` o haga clic derecho → "Ver código fuente" puede leerlo.

### ¿Qué puede hacer un atacante con esto?

1. Encontrar las credenciales en el comentario
2. Probarlas en el formulario de login del sitio
3. Si funcionan, acceder al panel de administración
4. Peor aún: probar esas mismas credenciales en otros componentes del backend (bases de datos, paneles internos, SSH, etc.)

> [!tip] Reutilización de contraseñas
> Es muy común que las credenciales de prueba sean las mismas que se usan en otros sistemas internos. Un `admin:password123` encontrado en el HTML podría abrir puertas a mucho más que solo ese formulario.

---

## ¿Cómo se aprovecha en un pentest?

Siempre que evalúes una aplicación web, **revisar el código fuente es uno de los primeros pasos**. Es reconocimiento pasivo: no interactúas con el servidor, solo lees lo que ya está público.

### Pasos básicos de revisión

```
1. Abrir el sitio web objetivo
2. Clic derecho → "Ver código fuente de la página" (Ctrl+U)
3. Buscar comentarios: <!-- 
4. Buscar palabras clave sensibles
5. Revisar archivos .js enlazados en etiquetas <script src="...">
```

### Palabras clave que debes buscar en el código fuente

```
password        passwd          secret
token           api_key         key
admin           credentials     auth
TODO            FIXME           temp
test            debug           hidden
```

> [!tip] Búsqueda rápida en el código fuente
> Una vez en el código fuente (`Ctrl+U`), usa `Ctrl+F` para buscar directamente esas palabras. En sitios grandes también puedes usar herramientas como **Burp Suite** para automatizar esta revisión.

---

## Tipos de información sensible más frecuentes

| Tipo | Ejemplo | Riesgo |
|------|---------|--------|
| Credenciales hardcodeadas | `admin:password123` en comentario | Acceso directo al sistema |
| Rutas internas | `src="/internal/admin/panel.js"` | Revela estructura del servidor |
| Tokens de API | `apiKey = "sk-abc123..."` en archivo `.js` | Acceso a servicios externos |
| Campos ocultos | `<input type="hidden" value="isAdmin=false">` | Manipulación de parámetros |
| Comentarios de desarrollo | `<!-- conectar a DB: 192.168.1.50 -->` | Información de infraestructura |

---

## Sensitive Data Exposure vs otros ataques

> [!note] ¿Por qué es tan importante si parece "simple"?
> Muchas vulnerabilidades sofisticadas como SQLi o RCE requieren conocimiento técnico avanzado. La exposición de datos sensibles no: solo requiere saber dónde mirar. Por eso es una de las primeras cosas que se revisa en cualquier auditoría web y aparece frecuentemente en el **OWASP Top 10** (la lista de las vulnerabilidades web más críticas del mundo).

---

## Regla de oro

> [!warning] Regla para desarrolladores (y para entender el ataque)
> **Nunca** pongas información sensible en el código del Front End. El usuario puede ver todo lo que está en HTML, CSS y JavaScript. Si algo no debería ser público, no puede estar en el cliente — debe estar en el servidor (Back End).

---


