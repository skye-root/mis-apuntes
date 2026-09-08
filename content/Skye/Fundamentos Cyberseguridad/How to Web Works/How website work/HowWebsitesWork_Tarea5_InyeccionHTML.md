# How Websites Work — Tarea 5: Inyección HTML

> [!info] Módulo: How Websites Work
> Primera vulnerabilidad de inyección. La base para entender ataques más avanzados como XSS y SQLi.

---

## ¿Qué es la Inyección HTML?

La **inyección HTML** ocurre cuando un sitio web toma lo que el usuario escribe en un campo de entrada y lo muestra directamente en la página **sin filtrar ni sanitizar**.

Si el sitio no limpia el input, el usuario puede escribir código HTML real en vez de texto normal — y el navegador lo interpretará y renderizará como parte de la página.

> [!note] Concepto clave — Sanitización (Sanitizing)
> **Sanitizar** significa limpiar o filtrar el input del usuario antes de usarlo. Por ejemplo, convertir `<h1>` en texto plano `&lt;h1&gt;` para que el navegador lo muestre como texto y no lo ejecute como HTML.
> **La regla de oro del desarrollo web: nunca confíes en el input del usuario.**

---

## ¿Cómo funciona? — El flujo normal vs el flujo vulnerable

### Flujo normal (lo que el desarrollador espera)

```
Usuario escribe: "Fred Bloggs"
          │
          ▼
    Función JS: sayHi()
    toma el nombre y lo inserta en la página
          │
          ▼
    La página muestra: "Welcome Fred Bloggs"
```

### Flujo vulnerable (sin sanitización)

```
Usuario escribe: <h1>Hola</h1>
          │
          ▼
    Función JS: sayHi()
    inserta el input directamente con .innerHTML
          │
          ▼
    El navegador interpreta el HTML
          │
          ▼
    La página muestra un heading grande: "Hola"
    (no el texto, sino HTML renderizado)
```

---

## El código vulnerable

Este es el código JavaScript que permite la inyección:

```html
<script>
    function sayHi() {
        const name = document.getElementById('name').value
        document.getElementById("welcome-msg").innerHTML = "Welcome " + name
    }
</script>
```

### ¿Por qué es vulnerable?

| Línea | Problema |
|-------|---------|
| `const name = ...value` | Toma el input del usuario tal cual, sin filtrar |
| `.innerHTML = "Welcome " + name` | Inserta el input directamente como HTML — el navegador lo renderiza |

El problema está en `.innerHTML`. Si en vez de usarlo usara `.innerText` o `.textContent`, el input se trataría como texto plano y no se ejecutaría como HTML.

> [!tip] `innerHTML` vs `innerText` — diferencia crítica
> | Propiedad | Comportamiento |
> |-----------|---------------|
> | `.innerHTML` | Interpreta y renderiza HTML — **vulnerable a inyección** |
> | `.innerText` | Trata todo como texto plano — **seguro** |
> Un desarrollador descuidado que usa `.innerHTML` sin sanitizar abre la puerta a inyecciones.

---

## La práctica — Inyectando un enlace malicioso

### Escenario
El sitio tiene un formulario que pregunta "What's your name?" y muestra un saludo con el nombre ingresado.

### Sitio normal
```
Input: Fred Bloggs
Output en la página: Welcome Fred Bloggs
```

### Inyección HTML
En vez de un nombre, se escribe código HTML directamente en el campo:

```html
<a href="http://hacker.com">Click here</a>
```

### Resultado
La página renderiza el código como HTML real y muestra:

```
Welcome  [Click here]  ← enlace real y clicable que lleva a hacker.com
```

El navegador no ve texto — ve una etiqueta `<a>` con un `href` y lo renderiza como un hipervínculo funcional.

---

## ¿Por qué es peligroso?

Con inyección HTML un atacante puede:

| Ataque | Ejemplo inyectado | Efecto |
|--------|------------------|--------|
| Enlace malicioso | `<a href="http://phishing.com">Haz clic aquí</a>` | Redirigir usuarios a sitios de phishing |
| Formulario falso | `<form action="http://atacante.com">...</form>` | Robar credenciales enviándolas al atacante |
| Contenido engañoso | `<h1>El sitio fue hackeado</h1>` | Defacement visual de la página |
| Base para XSS | `<script>código malicioso</script>` | Escalar a Cross-Site Scripting |

> [!warning] Inyección HTML vs XSS
> La inyección HTML permite insertar **etiquetas y contenido HTML** (enlaces, formularios, imágenes, texto).
> El **XSS (Cross-Site Scripting)** va un paso más allá: inyecta **código JavaScript** que se ejecuta en el navegador de la víctima, pudiendo robar cookies, capturar teclas o redirigir silenciosamente.
> La inyección HTML es frecuentemente el primer paso hacia XSS.

---

## Cómo se previene

Desde el lado del desarrollador:

```javascript
// ❌ Vulnerable — renderiza HTML
document.getElementById("msg").innerHTML = "Welcome " + name;

// ✅ Seguro — trata como texto plano
document.getElementById("msg").innerText = "Welcome " + name;

// ✅ También seguro — escapar caracteres especiales antes de usar
// Convertir < en &lt;  y  > en &gt;  para que se muestren como texto
```

---

## Resumen del ataque

```
1. Identificar un campo de input que refleje el contenido en la página
          │
          ▼
2. Probar escribiendo una etiqueta HTML simple: <b>test</b>
          │
          ▼
3. Si el texto aparece en negrita (renderizado) → el sitio es vulnerable
          │
          ▼
4. Inyectar HTML más elaborado según el objetivo
   (enlace falso, formulario, contenido engañoso)
```

> [!tip] Primer test siempre
> Antes de intentar algo complejo, prueba con `<b>test</b>` o `<i>test</i>`. Si el texto aparece en **negrita** o *cursiva* en la página, el sitio renderiza HTML y es vulnerable a inyección.

---

