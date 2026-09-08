# How Websites Work — Tarea 2: HTML

> [!info] Módulo: How Websites Work
> HTML es la base de toda página web. Sin HTML no hay estructura, sin estructura no hay nada que mostrar.

---

## 🧱 Los tres pilares de un sitio web

| Tecnología | Función |
|------------|---------|
| **HTML** | Define la **estructura** y el contenido de la página |
| **CSS** | Define el **aspecto visual**: colores, fuentes, diseño |
| **JavaScript** | Añade **interactividad** y comportamiento dinámico |

> [!tip] Analogía
> Piensa en una casa: **HTML** es la estructura (paredes, puertas, ventanas). **CSS** es la pintura y decoración. **JavaScript** es la electricidad e instalaciones que hacen que las cosas funcionen.

---

## 📄 ¿Qué es HTML?

**H**yper**T**ext **M**arkup **L**anguage — es el lenguaje con el que están escritos todos los sitios web.

- No es un lenguaje de programación (no tiene lógica ni condicionales por sí solo)
- Es un lenguaje de **marcado**: usa etiquetas (tags) para decirle al navegador cómo mostrar el contenido
- Los **elementos** (también llamados tags/etiquetas) son los bloques de construcción de cualquier página HTML

---

## 🏗️ Estructura base de un documento HTML

Todo sitio web comparte esta misma estructura:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>Example Heading</h1>
        <p>Example paragraph..</p>
    </body>
</html>
```

### Desglose de cada elemento

| Etiqueta | Función |
|----------|---------|
| `<!DOCTYPE html>` | Declara que el documento es HTML5. Estandariza la interpretación entre navegadores |
| `<html>` | Elemento raíz — todos los demás elementos van dentro de este |
| `<head>` | Contiene metainformación de la página (título, estilos, scripts). No se muestra en pantalla |
| `<title>` | Define el título que aparece en la pestaña del navegador |
| `<body>` | Todo lo que esté aquí es lo que el usuario ve en el navegador |
| `<h1>` | Encabezado grande (heading). Hay del `<h1>` al `<h6>` en tamaño descendente |
| `<p>` | Párrafo de texto |

> [!note] Etiquetas de apertura y cierre
> La mayoría de etiquetas tienen apertura y cierre:
> ```html
> <p>Esto es un párrafo</p>
> ```
> La etiqueta de cierre lleva una barra `/` antes del nombre. Todo el contenido va entre ambas.

---

## 🏷️ Atributos — personalizar los elementos

Los atributos añaden información extra a una etiqueta. Van siempre dentro de la etiqueta de apertura:

```html
<etiqueta atributo="valor">contenido</etiqueta>
```

### Atributos más comunes

| Atributo | Etiqueta | Ejemplo | Función |
|----------|----------|---------|---------|
| `class` | Cualquiera | `<p class="bold-text">` | Agrupa elementos para aplicarles estilos CSS. Múltiples elementos pueden tener la misma clase |
| `id` | Cualquiera | `<p id="example">` | Identificador **único** del elemento. No puede repetirse en la misma página |
| `src` | `<img>` | `<img src="img/cat.jpg">` | Especifica la ruta o URL de la imagen a mostrar |
| `href` | `<a>` | `<a href="https://google.com">` | URL de destino de un enlace |

### `class` vs `id` — diferencia clave

| | `class` | `id` |
|-|---------|------|
| ¿Puede repetirse? | ✅ Sí, múltiples elementos pueden tener la misma clase | ❌ No, debe ser único en toda la página |
| ¿Para qué se usa? | Aplicar estilos CSS a un grupo de elementos | Identificar un elemento único (CSS + JavaScript) |
| Ejemplo | `<p class="texto-rojo">` | `<p id="titulo-principal">` |

> [!note] Un elemento puede tener múltiples atributos
> ```html
> <p class="bold-text" id="intro" style="color:red">Hola</p>
> ```
> Cada atributo tiene su propio propósito y pueden combinarse libremente.

---

## 🔖 Etiquetas HTML más usadas — referencia rápida

```html
<!-- Texto y estructura -->
<h1> hasta <h6>      <!-- Encabezados del más grande al más pequeño -->
<p>                  <!-- Párrafo -->
<br>                 <!-- Salto de línea (no tiene cierre) -->
<hr>                 <!-- Línea horizontal separadora -->
<strong>             <!-- Texto en negrita -->
<em>                 <!-- Texto en cursiva -->

<!-- Listas -->
<ul>                 <!-- Lista sin orden (viñetas) -->
<ol>                 <!-- Lista ordenada (números) -->
<li>                 <!-- Elemento de lista -->

<!-- Multimedia y enlaces -->
<a href="url">       <!-- Enlace/hipervínculo -->
<img src="ruta">     <!-- Imagen (no tiene cierre) -->

<!-- Formularios -->
<form>               <!-- Contenedor de formulario -->
<input>              <!-- Campo de entrada -->
<button>             <!-- Botón -->

<!-- Contenedores -->
<div>                <!-- Bloque genérico (para agrupar y maquetar) -->
<span>               <!-- Línea genérica (para estilos inline) -->
```

---

## 🔍 Ver el HTML de cualquier sitio web

Puedes inspeccionar el HTML de cualquier página en tu navegador:

| Acción | Chrome | Safari |
|--------|--------|--------|
| Ver código fuente completo | Clic derecho → **View Page Source** | Clic derecho → **Show Page Source** |
| Inspeccionar elemento | Clic derecho → **Inspect** | Clic derecho → **Inspect Element** |

> [!tip] Herramienta fundamental en pentesting web
> El **Inspector de elementos** (F12) es una de las primeras cosas que revisas al analizar una web. Puedes ver comentarios HTML ocultos, campos de formulario escondidos, rutas de archivos, nombres de clases e IDs, y mucho más. Muchos desarrolladores dejan información sensible en comentarios HTML sin darse cuenta:
> ```html
> <!-- TODO: eliminar credenciales de prueba admin:password123 -->
> ```

---

## 🔐 Relevancia en seguridad web

> [!warning] Lo que HTML puede revelar
> - **Comentarios HTML** (`<!-- -->`) a veces contienen credenciales, rutas internas o notas de desarrollo
> - **Atributos `id` y `class`**  revelan la estructura y tecnologías usadas
> - **Campos `<input type="hidden">`** pueden contener tokens, IDs o parámetros que el sitio no muestra al usuario pero sí envía al servidor
> - **Atributo `src` de scripts e imágenes** puede revelar rutas de directorios internos

---

