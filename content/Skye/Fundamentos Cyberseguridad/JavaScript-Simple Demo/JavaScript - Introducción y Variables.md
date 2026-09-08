# JavaScript — Introducción y Variables

> [!abstract] ¿De qué va esto?
> JavaScript es el lenguaje que hace que las páginas web sean interactivas. En ciberseguridad lo vas a ver constantemente — en ataques XSS, análisis de código de páginas web, y scripting ofensivo. Esta nota cubre los primeros conceptos comparando con Python y C++ que ya conoces.

---

## ¿Dónde se ejecuta JavaScript?

A diferencia de Python que corre en tu computadora directamente, JavaScript tiene dos ambientes principales:

| Ambiente | Cómo se usa | Para qué |
|----------|-------------|----------|
| **Navegador web** | Abres DevTools → Consola (F12 en Firefox) | Código que corre en páginas web |
| **Node.js** | `node demo.js` en la terminal | Código que corre fuera del navegador |

> [!info] En este módulo usamos Node.js
> Para probar el código de los ejercicios, se ejecuta desde la línea de comandos así:
> ```bash
> node demo.js
> ```
> Donde `demo.js` es el nombre de tu archivo JavaScript.

---

## Variables — `let`

En Python no declarabas el tipo ni usabas ninguna palabra especial:
```python
tries = 0
guess = 0
```

En JavaScript usas la palabra `let` para declarar una variable, y sí necesitas el `;` al final (como en C++):
```javascript
let tries = 0;
let guess = 0;
```

> [!note] Comparación de los tres lenguajes
> ```cpp
> // C++
> int tries = 0;
> int guess = 0;
> ```
> ```python
> # Python
> tries = 0
> guess = 0
> ```
> ```javascript
> // JavaScript
> let tries = 0;
> let guess = 0;
> ```
> JavaScript está a mitad de camino: no declara el tipo de dato (como Python), pero sí usa una palabra clave (`let`) y punto y coma (como C++).

`let` indica que estamos declarando una variable cuyo valor **puede cambiar** durante el programa. Por eso se usa para `tries` y `guess` — ambos se actualizan mientras el juego corre.

---

## Constantes — `const`

Cuando un valor **no debe cambiar** durante el programa, se usa `const` en lugar de `let`:

```javascript
const secret = 12;
```

> [!tip] `let` vs `const`
> | | `let` | `const` |
> |--|-------|---------|
> | ¿Puede cambiar su valor? | ✅ Sí | ❌ No |
> | ¿Cuándo usarlo? | Variables que se actualizan | Valores fijos (constantes) |
> | Ejemplo | `tries`, `guess` | `secret`, `MIN_NUMBER`, `MAX_NUMBER` |
>
> En Python la convención era escribir constantes en MAYÚSCULAS. En JavaScript existe `const` como palabra clave real — si intentas reasignar una constante, el programa lanza un error.

---

## Número aleatorio en JavaScript

En Python usabas `random.randint(1, 20)` que hacía todo de una vez. JavaScript no tiene esa función directa — hay que construirlo paso a paso con `Math`:

```javascript
const secret = Math.floor(Math.random() * 20) + 1;
```

Desglosado por partes:

| Paso | Código | Qué hace | Ejemplo |
|------|--------|----------|---------|
| 1 | `Math.random()` | Número decimal aleatorio entre 0 (incluido) y 1 (excluido) | `0.372` |
| 2 | `* 20` | Lo escala al rango 0–20 | `7.44` |
| 3 | `Math.floor(...)` | Redondea hacia abajo, elimina el decimal | `7` |
| 4 | `+ 1` | Desplaza el rango de 0–19 a **1–20** | `8` |

> [!info] ¿Por qué `+ 1` al final?
> `Math.random()` nunca devuelve exactamente 1, así que `* 20` nunca llega exactamente a 20. El rango sin `+ 1` sería 0–19. Sumando 1 al final lo convertimos en 1–20, que es lo que queremos.

Equivalencia con lo que ya conoces:
```python
# Python — una línea directa
secret = random.randint(1, 20)

# JavaScript — construido manualmente
const secret = Math.floor(Math.random() * 20) + 1;
```

---

## Mostrar texto — `console.log()`

En Python usabas `print()`. En JavaScript el equivalente es `console.log()`:

```python
# Python
print("I'm thinking of a number between 1 and 20")
```

```javascript
// JavaScript
console.log("I'm thinking of a number between 1 and 20");
```

El texto entre comillas dobles se muestra en la consola. Igual que `print()`, agrega un salto de línea automáticamente al final.

---

## Comentarios — igual que C++

```javascript
// Esto es un comentario de una línea

/* Esto es un comentario
   de varias líneas */
```

En Python los comentarios eran con `#`. En JavaScript (y C++) son con `//` para una línea y `/* */` para varias.

---

## Resumen rápido — los tres lenguajes lado a lado

```
C++                          Python                    JavaScript
--------------------------   -----------------------   --------------------------
int x = 5;               →   x = 5                 →   let x = 5;
const int X = 5;         →   X = 5  (convención)   →   const X = 5;
cout << "hola";          →   print("hola")         →   console.log("hola");
// comentario            →   # comentario           →   // comentario
rand() + transformación →   random.randint(1,20)   →   Math.floor(Math.random()*20)+1
```

- `let` → variable que puede cambiar
- `const` → valor fijo que no debe cambiar
- `console.log()` → el `print()` de JavaScript
- `Math.random()` da un decimal 0–1, hay que transformarlo manualmente para obtener enteros en un rango
- JavaScript usa `;` al final de cada línea, igual que C++

---

