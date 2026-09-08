# JavaScript — Input del Usuario y Estructura del Programa

> [!abstract] ¿De qué va esto?
> En Python recibir input del usuario era una línea: `input()`. En JavaScript con Node.js es bastante más elaborado porque Node no fue diseñado para programas de consola — fue diseñado para servidores web. Esta nota explica por qué y cómo funciona todo el sistema de input.

---

## ¿Por qué es tan complicado recibir input en JavaScript?

En Python:
```python
text = input("Take a guess: ")  # una línea, listo
```

En JavaScript con Node.js:
```javascript
// Necesitas configurar todo esto primero...
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

// ...y luego sí puedes pedir input
const text = await rl.question("Take a guess: ");
```

La razón es que **Node.js fue diseñado para servidores web**, no para programas de consola interactivos. Su comportamiento por defecto es no quedarse esperando al usuario — sigue ejecutando código sin parar. Para forzarlo a esperar, hay que importar módulos extra y configurar un canal de comunicación manualmente.

> [!analogy] La analogía del módulo
> Imagina que Node.js es una oficina que normalmente atiende por email (sin esperar respuesta inmediata). Para hacer que atienda en persona y espere tu respuesta, tienes que instalarle un "mostrador de atención" (`readline`) con un micrófono (`stdin`) y un parlante (`stdout`). `rl` es ese mostrador ya armado y listo para usarse.

---

## Las tres líneas de configuración — explicadas

### Línea 1 — Importar el módulo `readline`

```javascript
import * as readline from "node:readline/promises";
```

- `import` → trae herramientas externas, igual que `import` en Python o `#include` en C++
- `* as readline` → importa todo lo que tiene el módulo y lo agrupa bajo el nombre `readline`
- `"node:readline/promises"` → el módulo específico de Node.js para leer líneas de texto
- `/promises` → la variante que puede "pausarse" ordenadamente para esperar al usuario sin congelar todo el programa

### Línea 2 — Importar entrada y salida estándar

```javascript
import { stdin as input, stdout as output } from "node:process";
```

- `stdin` → **st**andar**d** **in**put = entrada estándar = el teclado
- `stdout` → **st**andar**d** **out**put = salida estándar = la pantalla
- `as input` / `as output` → les cambia el nombre a algo más legible
- `from "node:process"` → vienen del módulo que controla el proceso del sistema

> [!note] stdin y stdout — conceptos de Unix
> Ya los viste en Linux/Bash. Son los mismos — el teclado como fuente de datos (stdin) y la pantalla como destino (stdout). En Bandit y en scripting de Kali los usas constantemente con pipes `|` y redirecciones `>`.

### Línea 3 — Crear la interfaz (el "mostrador")

```javascript
const rl = readline.createInterface({ input, output });
```

- Une el micrófono (`input`/teclado) con el parlante (`output`/pantalla) en un solo objeto `rl`
- `rl` es la abreviatura de *readline*
- A partir de aquí, `rl.question("...")` es lo que pide input al usuario

---

## Pedir input al usuario — `rl.question()`

```javascript
const text = await rl.question("Take a guess: ");
```

- `rl.question("...")` → muestra el mensaje y espera que el usuario escriba algo
- Siempre devuelve texto (`string`), igual que `input()` en Python
- `await` → le dice a Node.js "**espera** aquí hasta que el usuario responda antes de continuar"

> [!warning] `await` — la palabra clave más importante de esta sección
> Por defecto Node.js es asíncrono — no espera, sigue ejecutando la siguiente línea inmediatamente aunque algo no haya terminado. `await` pausa la ejecución en ese punto hasta recibir respuesta.
>
> Piénsalo como la diferencia entre mandar un mensaje de texto y esperar la respuesta vs. mandar el mensaje y seguir haciendo otras cosas. `await` te obliga a esperar la respuesta antes de continuar.

---

## Convertir el input a número — `parseInt()`

Igual que en Python con `int()`, el input siempre llega como texto y hay que convertirlo:

```python
# Python
guess = int(text)
```

```javascript
// JavaScript
guess = parseInt(text, 10);
```

- `parseInt()` → convierte un string a número entero (igual que `int()` en Python)
- El `10` es la **base numérica** — le dice que interprete el número en base 10 (decimal normal)
- Siempre se pone `10` para evitar comportamientos raros con números que empiezan con `0`

---

## `try` / `finally` — ejecución impecable

```javascript
try {
    // ...todo el código del programa...
    const text = await rl.question("Take a guess: ");
    // ...
} finally {
    rl.close();
}
```

### ¿Qué es `try`?

Un bloque `try` crea un entorno seguro para ejecutar código. Si algo sale mal adentro, el programa no se bloquea ni muere abruptamente.

### ¿Qué es `finally`?

`finally` es un bloque que **siempre se ejecuta** al final, sin importar si el código dentro de `try` funcionó bien o falló. Es perfecto para tareas de limpieza.

### ¿Por qué cerrar `rl` con `rl.close()`?

Cuando creaste `rl` (el "mostrador" con micrófono y parlante), abriste recursos del sistema. Si no los cierras explícitamente, el programa puede quedarse colgado esperando más input aunque ya terminó.

`rl.close()` en `finally` garantiza que eso siempre se cierre — haya salido bien o mal.

> [!analogy] La analogía del micrófono
> Es como apagar el micrófono después de una sesión de grabación. No importa si la sesión fue perfecta o si algo salió mal — siempre apagas el micrófono al terminar. `finally` es ese hábito de apagar el micrófono.

---

## El programa completo — `guess_v1.js`

```javascript
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

try {
    const secret = Math.floor(Math.random() * 20) + 1; // 1 <= secret <= 20
    let tries = 0;
    let guess = 0; // empieza en 0 (imposible ser el secreto)

    console.log("I'm thinking of a number between 1 and 20");

    const text = await rl.question("Take a guess: "); // espera al usuario
    guess = parseInt(text, 10);                        // convierte a número

    tries = tries + 1; // cuenta el intento

} finally {
    rl.close(); // siempre cerrar el canal de input
}
```

### El flujo paso a paso

| Paso | Qué pasa |
|------|----------|
| 1 | Se importan los módulos necesarios |
| 2 | Se crea el canal de input/output (`rl`) |
| 3 | Se genera el número secreto con `Math.random()` |
| 4 | Se inicializan `tries = 0` y `guess = 0` |
| 5 | Se muestra el mensaje al usuario |
| 6 | Se espera la respuesta del usuario (`await`) |
| 7 | Se convierte el texto a número (`parseInt`) |
| 8 | Se suma 1 a `tries` |
| 9 | Pase lo que pase, se cierra `rl` (`finally`) |

> [!info] Este es el "borrador incompleto"
> Igual que en Python, este primer borrador todavía no compara `guess` con `secret` ni da pistas. Eso viene en la siguiente tarea con condicionales y bucles.

---

## Comparación total con Python hasta aquí

```
Python                              JavaScript
----------------------------------  ----------------------------------
import random                   →   import * as readline from "..."
                                    import { stdin as input ... }
                                    const rl = readline.createInterface(...)

text = input("Take a guess: ")  →   const text = await rl.question("Take a guess: ");
guess = int(text)               →   guess = parseInt(text, 10);
tries = tries + 1               →   tries = tries + 1;
print("mensaje")                →   console.log("mensaje");
                                →   rl.close(); // no existe equivalente en Python
```

---

## Resumen rápido

- Node.js no espera al usuario por defecto → hay que configurar `readline` manualmente
- `stdin` = teclado, `stdout` = pantalla (mismos conceptos de Unix/Linux)
- `rl.question()` pide input → siempre devuelve string
- `await` pausa el programa hasta recibir respuesta del usuario
- `parseInt(texto, 10)` convierte string a entero (el `10` es la base decimal)
- `try/finally` garantiza que `rl.close()` siempre se ejecute al terminar

---

## Relación con notas anteriores
> [!link] Ver también
> [[JavaScript - Introducción y Variables]] — Donde se explican `let`, `const`, `Math.random()` y `console.log()`

---
