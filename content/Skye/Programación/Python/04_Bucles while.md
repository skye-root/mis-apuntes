# Python — Bucles while

> [!abstract] ¿De qué va esto?
> El `while` en Python funciona igual que en C++: repite un bloque de código mientras una condición sea verdadera. Esta nota cubre cómo se usa en el juego y explica una función nueva que aparece en la versión final del código.

---

## `while` en Python vs C++

En C++:
```cpp
while (guess != secret) {
    // código que se repite
}
```

En Python, exactamente lo mismo:
```python
while guess != secret:
    # código que se repite
```

Las únicas diferencias de sintaxis son las mismas de siempre:
- Sin paréntesis en la condición
- Sin llaves — la indentación define qué está dentro del bucle
- Dos puntos `:` al final

---

## Cómo funciona en el juego

Antes (`guess_v2.py`) el usuario tenía **un solo intento**. El programa preguntaba una vez y terminaba.

Ahora con `while`, el programa **sigue preguntando** hasta que el usuario adivine:

```python
while guess != secret:
    text = input("Take a guess: ")
    guess = int(text)

    tries = tries + 1

    if guess < 1 or guess > 20:
        print("That number is out of range. Try again.")
    elif guess < secret:
        print("Too low, try again.")
    elif guess > secret:
        print("Too high, try again.")
    else:
        print("You got it in", tries, "tries!")
```

El flujo es:
1. ¿`guess != secret`? Si sí → entra al bucle
2. Pide un número, lo convierte, suma un intento
3. Da una pista
4. Vuelve al paso 1 y evalúa la condición de nuevo
5. Cuando `guess == secret`, la condición es falsa → sale del bucle

> [!info] ¿Por qué `guess = 0` antes del bucle?
> Para que la condición `while guess != secret` sea verdadera desde el inicio y el bucle arranque. Si `guess` no tuviera valor, Python daría error al evaluar la condición. Como `secret` siempre está entre 1 y 20, `guess = 0` garantiza que nunca son iguales al empezar.

---

## El programa completo — `guess_v3.py`

```python
import random  # gives us tools for picking random numbers

# ----------------------------
# Guess the Number (Beginner Demo)
# ----------------------------
# The computer picks a secret number.
# The player keeps guessing until they find it.

secret = random.randint(1, 20)  # número secreto entre 1 y 20
tries = 0
guess = 0  # empieza en 0 (imposible ser el secreto)

print("I'm thinking of a number between 1 and 20")

# Repetir hasta que el usuario adivine
while guess != secret:
    text = input("Take a guess: ")
    guess = int(text)

    tries = tries + 1

    if guess < 1 or guess > 20:
        print("That number is out of range. Try again.")
    elif guess < secret:
        print("Too low, try again.")
    elif guess > secret:
        print("Too high, try again.")
    else:
        print("You got it in", tries, "tries!")
```

---

## La versión mejorada — con constantes y validación de input

Esta versión hace dos cosas nuevas importantes: usa **constantes** para los límites del rango, y **valida** que el usuario escriba un número antes de intentar convertirlo.

```python
MIN_NUMBER = 1
MAX_NUMBER = 20

secret = random.randint(MIN_NUMBER, MAX_NUMBER)
tries = 0
guess = 0

print("I'm thinking of a number between", MIN_NUMBER, "and", MAX_NUMBER)

while guess != secret:
    text = input("Take a guess: ")

    # Si el usuario no escribió dígitos, pedir de nuevo
    if not text.isdigit():
        print("Please type a whole number (like 7).")
    else:
        guess = int(text)
        tries = tries + 1

        if guess < MIN_NUMBER or guess > MAX_NUMBER:
            print("That number is out of range. Try again.")
        elif guess < secret:
            print("Too low, try again.")
        elif guess > secret:
            print("Too high, try again.")
        else:
            print("You got it in", tries, "tries!")
```

---

## Constantes — `MIN_NUMBER` y `MAX_NUMBER`

En lugar de escribir `1` y `20` directamente en el código, se guardan en variables con nombre en mayúsculas:

```python
MIN_NUMBER = 1
MAX_NUMBER = 20
```

> [!tip] ¿Por qué mayúsculas?
> En Python no existe una palabra clave especial para constantes como en otros lenguajes. La convención es escribirlas en `MAYÚSCULAS_CON_GUIONES` para indicar "este valor no debería cambiar". Es un acuerdo entre programadores, no una regla del lenguaje.
>
> La ventaja práctica: si quieres cambiar el rango del juego a 1–100, solo cambias dos líneas arriba en lugar de buscar todos los `1` y `20` repartidos por el código.

---

## La línea que no entendías — `text.isdigit()`

```python
if not text.isdigit():
    print("Please type a whole number (like 7).")
```

Vamos parte por parte:

### ¿Qué es `.isdigit()`?

Es una función que viene incluida en todos los strings de Python. La llamas con un punto después del string, igual que llamarías a un método de un objeto en C++.

`text.isdigit()` pregunta: *"¿todos los caracteres de `text` son dígitos numéricos?"*

- Si el usuario escribió `"15"` → devuelve `True`
- Si el usuario escribió `"abc"` → devuelve `False`
- Si el usuario escribió `"12abc"` → devuelve `False`
- Si el usuario escribió `""` (nada) → devuelve `False`

### ¿Qué hace `not`?

`not` invierte el resultado booleano — igual que `!` en C++:

```python
not True   # → False
not False  # → True
```

### Entonces, ¿qué hace la línea completa?

```python
if not text.isdigit():
```

Se lee como: *"si `text` NO es solo dígitos..."*

| El usuario escribe | `text.isdigit()` | `not text.isdigit()` | ¿Entra al if? |
|--------------------|------------------|----------------------|---------------|
| `"7"` | `True` | `False` | ❌ No — pasa al `else` y juega |
| `"hola"` | `False` | `True` | ✅ Sí — pide que escriba un número |
| `""` (Enter vacío) | `False` | `True` | ✅ Sí — pide que escriba un número |

### ¿Por qué es necesario esto?

Sin esta validación, si el usuario escribe `"hola"`, la línea `guess = int(text)` intenta convertir `"hola"` a número y el programa **se rompe** con un error:

```
ValueError: invalid literal for int() with base 10: 'hola'
```

Con la validación, ese caso se atrapa antes de llegar a `int()`.

> [!example] Equivalente en C++
> En C++ con `cin >> guess` el sistema ya filtra que solo entre un entero. En Python, `input()` acepta cualquier texto sin filtrar, así que la validación hay que hacerla manualmente.

---

## La estructura `if not ... else` del bucle

Para que quede claro el flujo completo dentro del `while`:

```
Entra al while (guess != secret)
│
├── Pide input → guarda en text
│
├── ¿text.isdigit() es False?  (el usuario no escribió un número)
│   ├── SÍ (not text.isdigit() = True) → avisa y vuelve al inicio del while
│   └── NO (not text.isdigit() = False) → entra al else:
│           ├── convierte text a número → guess
│           ├── suma 1 a tries
│           └── evalúa if/elif/else para dar pista
│
└── Vuelve a evaluar while guess != secret
```

---

## Resumen rápido

```
C++                        Python
-------------------------  -------------------------
while (cond) {}        →   while cond:
!valor                 →   not valor
// comentario          →   # comentario
```

- `while` en Python: misma lógica que C++, sin paréntesis ni llaves
- `MAYÚSCULAS` = convención para constantes en Python
- `string.isdigit()` → `True` si todos los caracteres son dígitos
- `not` → igual que `!` en C++, invierte True/False
- La validación con `isdigit()` evita que el programa se rompa si el usuario escribe texto en lugar de un número

---

## Relación con notas anteriores
> [!link] Ver también
> [[Python - Condicionales]] — El `if/elif/else` que vive dentro del `while`
> [[Python - Introducción y Variables]] — Donde se explicaron `input()`, `int()` y las variables base

---


