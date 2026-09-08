# JavaScript — Bucle while y Cierre del Programa

> [!abstract] ¿De qué va esto?
> El `while` en JavaScript es idéntico a C++. Lo interesante de esta nota es entender por qué `finally` y `rl.close()` van **al final de todo** y no dentro del bucle — que es la parte que genera confusión.

---

## El `while` — idéntico a C++

```cpp
// C++
while (guess != secret) {
    // cuerpo del bucle
}
```

```javascript
// JavaScript — exactamente igual
while (guess !== secret) {
    // cuerpo del bucle
}
```

La única diferencia: JavaScript usa `!==` en lugar de `!=`.

### `!=` vs `!==` — ¿cuál es la diferencia?

| Operador | Nombre | Qué compara |
|----------|--------|-------------|
| `!=` | Desigualdad simple | Solo el valor (puede hacer conversión de tipos automática) |
| `!==` | Desigualdad estricta | El valor **y** el tipo de dato |

```javascript
5 != "5"   // false — los trata como iguales (convierte "5" a número)
5 !== "5"  // true  — son distintos: uno es número, otro es string
```

> [!tip] En JavaScript siempre usa `===` y `!==`
> La comparación estricta evita bugs raros por conversiones automáticas de tipos que JavaScript hace silenciosamente. Es una buena práctica general en JS.

---

## El `while` con todo adentro

```javascript
while (guess !== secret) {
    const text = await rl.question("Take a guess: ");
    guess = parseInt(text, 10);

    tries = tries + 1;

    if (guess < 1 || guess > 20) {
        console.log("That number is out of range. Try again.");
    } else if (guess < secret) {
        console.log("Too low, try again.");
    } else if (guess > secret) {
        console.log("Too high, try again.");
    } else {
        console.log("You got it in", tries, "tries!");
    }
}
```

El flujo es exactamente el mismo que en Python y C++:
1. ¿`guess !== secret`? Si sí → entra al bucle
2. Pide input, convierte a número
3. Suma un intento
4. Da pista con `if/else if/else`
5. Vuelve al paso 1
6. Cuando `guess === secret` → sale del bucle

---

## La duda: ¿por qué `finally` va DESPUÉS del bucle y no dentro?

Esta es la parte que confunde. Veamos la estructura completa:

```javascript
try {
    // ...variables, console.log inicial...

    while (guess !== secret) {
        // ...input, tries, if/else if/else...
    }                          // ← el while termina aquí

} finally {                    // ← finally está AFUERA del while
    rl.close();
}
```

### La lógica es esta:

`finally` no tiene nada que ver con cada intento del juego. Su único trabajo es **cerrar el canal de input** cuando el programa entero termina.

Piénsalo así:

```
INICIO DEL PROGRAMA
│
├── Configurar readline (abrir el "micrófono")
│
├── try {
│     Generar número secreto
│     Mostrar mensaje inicial
│     │
│     └── while (no adivinó) {
│           Pedir intento → dar pista → repetir
│         }
│                          ↑ el juego completo ocurre aquí
│   }
│
└── finally {
      Cerrar readline (apagar el "micrófono")   ← esto pasa UNA sola vez, al terminar todo
    }

FIN DEL PROGRAMA
```

Si `rl.close()` estuviera **dentro del `while`**, cerraría el micrófono después del primer intento y el segundo intento no tendría cómo recibir input del usuario. El programa se rompería.

> [!warning] Si `rl.close()` estuviera dentro del bucle...
> ```javascript
> while (guess !== secret) {
>     const text = await rl.question("Take a guess: ");
>     // ...
>     rl.close(); // ← MAL: cierra el micrófono en el primer intento
>                 // el segundo intento no puede pedir input → error
> }
> ```
> El `finally` fuera del `while` garantiza que `rl.close()` corra exactamente **una vez**, cuando el juego ya terminó completamente.

---

## El programa final completo — `guess_v3.js`

```javascript
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

try {
    const secret = Math.floor(Math.random() * 20) + 1; // 1 <= secret <= 20
    let tries = 0;
    let guess = 0; // empieza en 0 (imposible ser el secreto)

    console.log("I'm thinking of a number between 1 and 20");

    // Repetir hasta que el usuario adivine
    while (guess !== secret) {
        const text = await rl.question("Take a guess: ");
        guess = parseInt(text, 10);

        tries = tries + 1;

        if (guess < 1 || guess > 20) {
            console.log("That number is out of range. Try again.");
        } else if (guess < secret) {
            console.log("Too low, try again.");
        } else if (guess > secret) {
            console.log("Too high, try again.");
        } else {
            console.log("You got it in", tries, "tries!");
        }
    }

} finally {
    rl.close(); // siempre cerrar al terminar el programa
}
```

---

## Estructura visual del programa completo

```
imports
│
const rl = readline.createInterface(...)
│
try {
│   secret, tries, guess
│   console.log(mensaje inicial)
│   │
│   while (guess !== secret) {
│   │   pedir input → convertir → sumar tries
│   │   if/else if/else → dar pista
│   }
│
} finally {
    rl.close()
}
```

---

## Comparación final — los tres lenguajes completos

| Característica | C++ | Python | JavaScript |
|----------------|-----|--------|------------|
| Bucle | `while (cond) {}` | `while cond:` | `while (cond) {}` |
| Desigualdad | `!=` | `!=` | `!==` (estricto) |
| Input | `cin >> x` | `input()` | `await rl.question()` |
| Convertir a int | implícito con `cin` | `int(texto)` | `parseInt(texto, 10)` |
| Imprimir | `cout <<` | `print()` | `console.log()` |
| Limpieza final | no necesaria | no necesaria | `rl.close()` en `finally` |

---

## Resumen rápido

- `while` en JavaScript = C++ en sintaxis, casi idéntico
- `!==` es la versión estricta de `!=` — compara valor **y** tipo, úsalo siempre en JS
- `finally` va **afuera del `while`** porque su trabajo es cerrar el programa, no cada intento
- `rl.close()` se llama una sola vez al terminar todo, no en cada vuelta del bucle

---

## Relación con notas anteriores
> [!link] Ver también
> [[JavaScript - Condicionales]] — El `if/else if/else` que vive dentro del `while`
> [[JavaScript - Input y Estructura]] — Por qué existe `readline`, `try/finally` y `await`
> [[Python - Bucles while]] — La versión Python del mismo juego para comparar

---

