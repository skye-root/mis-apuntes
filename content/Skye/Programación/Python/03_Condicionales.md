# Python — Condicionales (if / elif / else)

> [!abstract] ¿De qué va esto?
> Comparar valores y tomar decisiones según el resultado. La lógica es exactamente la misma que en C++ — solo cambia la sintaxis. Si ya entiendes `if/else` en C++, esto lo dominas en 5 minutos.

---

## La lógica es idéntica a C++

En C++ un condicional se ve así:

```cpp
if (guess < 1 || guess > 20) {
    cout << "That number is out of range. Try again." << endl;
} else if (guess < secret) {
    cout << "Too low, try again." << endl;
} else if (guess > secret) {
    cout << "Too high, try again." << endl;
} else {
    cout << "You got it!" << endl;
}
```

En Python, exactamente lo mismo:

```python
if guess < 1 or guess > 20:
    print("That number is out of range. Try again.")
elif guess < secret:
    print("Too low, try again.")
elif guess > secret:
    print("Too high, try again.")
else:
    print("You got it in", tries, "tries!")
```

> [!note] Las 4 diferencias de sintaxis
> | C++ | Python |
> |-----|--------|
> | `else if` | `elif` |
> | `\|\|` (OR lógico) | `or` |
> | `&&` (AND lógico) | `and` |
> | Llaves `{}` + paréntesis `()` | Dos puntos `:` + indentación |
>
> Eso es todo. La lógica no cambia en absoluto.

---

## La indentación ES la estructura

En C++ el bloque que pertenece a un `if` va entre `{}`. En Python, va **indentado** (con 4 espacios o 1 tab). El bloque termina cuando vuelve al nivel anterior.

```python
if guess < secret:
    print("Too low")   # ← esto pertenece al if (está indentado)
    print("Try again") # ← esto también
print("Fin")           # ← esto NO pertenece al if (volvió al nivel base)
```

> [!warning] Error más común al venir de C++
> Olvidarse los dos puntos `:` al final de `if`, `elif` y `else`. En C++ no existían — aquí son obligatorios. Si los omites, Python lanza un `SyntaxError`.
> ```python
> if guess < secret    # ❌ SyntaxError — falta el :
> if guess < secret:   # ✅ correcto
> ```

---

## Los operadores de comparación — sin cambios

Estos son exactamente iguales que en C++:

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `==` | Igual a | `guess == secret` |
| `!=` | Distinto de | `guess != secret` |
| `<` | Menor que | `guess < secret` |
| `>` | Mayor que | `guess > secret` |
| `<=` | Menor o igual | `guess <= 20` |
| `>=` | Mayor o igual | `guess >= 1` |

---

## Los operadores lógicos — cambia la escritura, no el concepto

| C++ | Python | Significado |
|-----|--------|-------------|
| `\|\|` | `or` | Al menos una condición es verdadera |
| `&&` | `and` | Ambas condiciones son verdaderas |
| `!` | `not` | Niega la condición |

```python
# Fuera de rango: menor que 1 O mayor que 20
if guess < 1 or guess > 20:
    print("That number is out of range. Try again.")
```

---

## `print()` con múltiples valores

Una cosa nueva que aparece en el código: `print()` puede recibir varios valores separados por coma y los muestra juntos con un espacio entre ellos.

```python
print("You got it in", tries, "tries!")
# Si tries = 3, muestra: You got it in 3 tries!
```

En C++ habrías necesitado concatenar o usar varios `<<`. En Python basta con la coma.

---

## El flujo completo del programa (`guess_v2.py`)

Ahora el programa ya puede comparar y dar pistas — aunque todavía solo da **un intento**. El bucle que permite reintentar viene en la siguiente tarea.

```python
import random

secret = random.randint(1, 20)
tries = 0
guess = 0

print("I'm thinking of a number between 1 and 20")

text = input("Take a guess: ")
guess = int(text)

tries = tries + 1

# Comparar y dar pista
if guess < 1 or guess > 20:
    print("That number is out of range. Try again.")
elif guess < secret:
    print("Too low, try again.")
elif guess > secret:
    print("Too high, try again.")
else:
    print("You got it in", tries, "tries!")
```

### Los 4 casos posibles

| Condición | Mensaje |
|-----------|---------|
| `guess < 1 or guess > 20` | "That number is out of range. Try again." |
| `guess < secret` | "Too low, try again." |
| `guess > secret` | "Too high, try again." |
| ninguna de las anteriores (son iguales) | "You got it in X tries!" |

> [!info] ¿Por qué el último caso usa `else` y no `elif guess == secret`?
> Porque si `guess` no es menor que 1, no es mayor que 20, no es menor que `secret` y no es mayor que `secret`... matemáticamente **solo puede ser igual**. No hace falta comprobarlo explícitamente. El `else` atrapa ese único caso restante. Es más limpio y funciona igual.

---

## Lo que le falta al programa

Solo da **un intento**. Si fallas, el programa termina y no puedes volver a intentarlo. El siguiente paso del módulo es meter un bucle `while` para que el usuario pueda seguir adivinando hasta acertar — como ya sabes bucles de C++, también va a ser rápido.

---

## Resumen rápido

```
C++                        Python
-------------------------  -------------------------
else if (cond) {}      →   elif cond:
|| (OR)                →   or
&& (AND)               →   and
! (NOT)                →   not
Llaves {} para bloques →   Indentación + dos puntos :
```

- `elif` es el `else if` de Python — más corto, misma lógica
- Los dos puntos `:` al final de cada condición son obligatorios
- La indentación define qué código pertenece a cada bloque
- `print()` acepta múltiples valores separados por coma

---

## Relación con la nota anterior
> [!link] Ver también
> [[Python - Introducción y Variables]] — Donde se definen `secret`, `tries`, `guess` e `input()`.

---


