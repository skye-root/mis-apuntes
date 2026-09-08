# Python Simple Demo — Adivina el número

## Variables

```python
import random
secret = random.randint(1, 20)
tries = 0
guess = 0
print("I'm thinking of a number between 1 and 20")
```

- `import random` carga la librería que usamos para generar números aleatorios.
- `random.randint(1, 20)` elige un entero al azar entre 1 y 20 (ambos incluidos) y lo guarda en `secret`.
- `tries` y `guess` inician en 0: `tries` cuenta los intentos, `guess` guardará el número que ingrese el usuario.

Con esto ya tenemos el número secreto, pero el programa aún no compara nada.

```python
text = input("Take a guess: ")
guess = int(text)
tries = tries + 1
```

- `input()` siempre devuelve texto (`str`), por eso convertimos con `int()` antes de guardarlo en `guess`.
- `tries = tries + 1` suma un intento cada vez que el usuario adivina.

## Declaraciones condicionales

```python
if guess < 1 or guess > 20:
    print("That number is out of range. Try again.")
elif guess < secret:
    print("Too low, try again.")
elif guess > secret:
    print("Too high, try again.")
else:
    print(f"You got it in {tries} tries!")
```

Compara `guess` contra `secret` y cubre 4 casos:
1. `guess` fuera del rango 1–20.
2. `guess` menor que `secret` → "Too low".
3. `guess` mayor que `secret` → "Too high".
4. `guess` igual a `secret` → acierto.

## Iteraciones (`while`)

Para repetir la pregunta hasta acertar, usamos `while CONDICIÓN:`. Mientras la condición sea verdadera, Python ejecuta el bloque indentado; cuando es falsa, el bucle termina.

```python
while guess != secret:
    text = input("Take a guess: ")
    guess = int(text)
    tries += 1

    if guess < 1 or guess > 20:
        print("That number is out of range. Try again.")
    elif guess < secret:
        print("Too low, try again.")
    elif guess > secret:
        print("Too high, try again.")
    else:
        print(f"You got it in {tries} tries!")
```

`while guess != secret` repite el bloque hasta que el usuario acierte.

## Código final

```python
import random

secret = random.randint(1, 20)
tries = 0
guess = 0
print("I'm thinking of a number between 1 and 20.")

while guess != secret:
    text = input("Take a guess: ")
    guess = int(text)
    tries += 1

    if guess < 1 or guess > 20:
        print("That number is out of range. Try again.")
    elif guess < secret:
        print("Too low, try again.")
    elif guess > secret:
        print("Too high, try again.")
    else:
        print(f"You got it in {tries} tries!")
```
