# Python — Introducción y Variables

> [!abstract] ¿De qué va esto?
> Python es un lenguaje de programación muy usado en ciberseguridad, automatización y scripting. Si ya sabes C++, vas a notar que Python hace lo mismo pero con mucho menos código y sin casi ninguna sintaxis extra. Esta nota cubre los primeros conceptos del módulo con comparaciones directas a C++.

---

## Python vs C++ — La diferencia principal

En C++ tú le dices a la computadora *exactamente* cómo hacer cada cosa: declaras el tipo de cada variable, pones punto y coma al final de cada línea, abres y cierras llaves `{}` para los bloques de código.

Python confía más en ti. No declaras tipos, no pones punto y coma, y en lugar de llaves usa **indentación** (sangría) para organizar el código.

```cpp
// C++ — adivinar un número
#include <iostream>
using namespace std;

int main() {
    int secret = 7;
    int tries = 0;
    int guess = 0;
    cout << "I'm thinking of a number between 1 and 20" << endl;
    return 0;
}
```

```python
# Python — lo mismo
import random

secret = random.randint(1, 20)
tries = 0
guess = 0
print("I'm thinking of a number between 1 and 20")
```

> [!note] Lo que desaparece al pasar de C++ a Python
> - No hay `int`, `string`, `float` al declarar variables
> - No hay `;` al final de cada línea
> - No hay `{}` para agrupar código
> - No hay `main()`
> - El código simplemente corre de arriba hacia abajo

---

## Variables en Python

En C++ tenías que especificar el tipo antes del nombre:
```cpp
int edad = 20;
string nombre = "Skye";
float precio = 9.99;
```

En Python solo escribes el nombre y el valor — Python detecta el tipo solo:
```python
edad = 20
nombre = "Skye"
precio = 9.99
```

### Los tipos básicos que existen

| Tipo | Ejemplo | Qué es |
|------|---------|--------|
| `int` | `tries = 0` | Número entero |
| `float` | `precio = 9.99` | Número con decimales |
| `str` | `nombre = "Skye"` | Texto (string) |
| `bool` | `activo = True` | Verdadero o falso |

> [!tip] Python detecta el tipo automáticamente
> Esto se llama **tipado dinámico**. No significa que los tipos no existen — significa que Python los maneja por ti. Si haces `x = 5`, Python sabe que `x` es un entero sin que tú se lo digas.

---

## `import` — Traer herramientas extra

En C++ usabas `#include` para traer librerías:
```cpp
#include <iostream>
#include <cstdlib>
```

En Python es lo mismo pero más limpio:
```python
import random
```

Esto le dice a Python: *"quiero usar las herramientas del módulo `random`"*. A partir de ese momento puedes usar cualquier función de ese módulo escribiendo `random.nombre_de_funcion()`.

### `random.randint(a, b)`

Devuelve un número entero aleatorio entre `a` y `b`, incluyendo ambos extremos.

```python
secret = random.randint(1, 20)  # secret puede ser cualquier número del 1 al 20
```

---

## `print()` — Mostrar texto en pantalla

En C++ usabas `cout`:
```cpp
cout << "I'm thinking of a number between 1 and 20" << endl;
```

En Python:
```python
print("I'm thinking of a number between 1 and 20")
```

Mucho más simple. `print()` automáticamente agrega un salto de línea al final, por eso no necesitas `endl`.

---

## `input()` — Recibir texto del usuario

En C++ usabas `cin`:
```cpp
int guess;
cin >> guess;
```

En Python:
```python
text = input("Take a guess: ")
```

> [!warning] Ojo importante: `input()` siempre devuelve texto (`str`)
> Aunque el usuario escriba `15`, Python lo recibe como el texto `"15"`, no como el número `15`. Si quieres usarlo como número, tienes que convertirlo:
> ```python
> text = input("Take a guess: ")   # text = "15"  (string)
> guess = int(text)                 # guess = 15   (entero)
> ```
> O más corto, en una sola línea:
> ```python
> guess = int(input("Take a guess: "))
> ```

---

## Operaciones con variables

Igual que en C++, sin sorpresas:

```python
tries = 0
tries = tries + 1   # tries ahora vale 1
```

También puedes escribirlo así (shorthand), igual que en C++:
```python
tries += 1
```

---

## El programa completo hasta aquí (`guess_v1.py`)

Este es el "borrador incompleto" del módulo. Elige un número, pide una suposición y cuenta el intento — pero todavía **no compara** si el usuario acertó:

```python
import random  # da acceso a funciones de números aleatorios

secret = random.randint(1, 20)  # número secreto entre 1 y 20
tries = 0                        # contador de intentos
guess = 0                        # empieza en 0 (imposible ser el secreto)

print("I'm thinking of a number between 1 and 20")

text = input("Take a guess: ")   # pide input al usuario (devuelve string)
guess = int(text)                 # convierte el string a entero

tries = tries + 1                 # cuenta este intento
```

> [!info] ¿Por qué `guess = 0` al inicio?
> El número secreto está entre 1 y 20, así que `0` es imposible que sea el secreto. Se usa como valor "vacío" o "sin respuesta aún" — un placeholder seguro. Es lo mismo que inicializar una variable a `-1` en C++ para indicar que todavía no tiene un valor real.

> [!info] ¿Por qué `guess` se guarda primero en `text`?
> Porque `input()` siempre devuelve un string, y no puedes comparar un string con un número directamente. El paso intermedio `text → int(text) → guess` es explícito para que quede claro qué está pasando. En versiones más cortas se hace en una línea: `guess = int(input("Take a guess: "))`.

---

## Lo que viene después

Este programa todavía le falta la parte más importante: **comparar `guess` con `secret`** para decirle al usuario si acertó, si se pasó o si quedó corto. Eso requiere condicionales (`if/elif/else`), que es el siguiente tema del módulo.

Como ya manejas `if/else` en C++, esa parte va a ser muy rápida de entender.

---

## Resumen rápido

```
C++                          Python
--------------------------   --------------------------
int x = 5;               →   x = 5
cout << "hola";          →   print("hola")
cin >> x;                →   x = int(input("..."))
#include <librería>      →   import librería
```

- Python no necesita declarar tipos, punto y coma ni llaves
- `import random` da acceso a `random.randint(a, b)`
- `input()` siempre devuelve texto — usar `int()` para convertir a número
- La indentación (sangría) reemplaza a las llaves `{}` de C++

---

