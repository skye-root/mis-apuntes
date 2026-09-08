# Manejo de errores

### El problema

```python
text = input("Enter a number: ")  # el usuario escribe "hello"
number = int(text)                # CRASH: ValueError
print(f"You entered {number}")
```

Sin manejo de errores, el programa se detiene por completo apenas ocurre el error. La línea 3 nunca se ejecuta.

### `try` / `except`

Permite intentar una operación riesgosa y capturar el error si ocurre, en vez de que el programa se caiga. Aquí, si falla, simplemente le pide al usuario que lo intente de nuevo:

```python
try:
    text = input("Enter a number: ")
    number = int(text)
    print(f"You entered {number}")
except ValueError:
    print("That is not a valid number. Please try again.")
```

Salida si se ingresa texto inválido:

```
Enter a number: hello
That is not a valid number. Please try again.
```

Python ejecuta primero el bloque `try`. Si no hay error, se salta el `except`. Si ocurre un error, salta directo al `except` y ejecuta ese código en vez de fallar.

### Tipos de excepción comunes

| Excepción            | Cuándo ocurre                       | Ejemplo                |
| -------------------- | ------------------------------------ | ------------------------ |
| `ValueError`          | Conversión de tipo no válida         | `int("abc")`              |
| `FileNotFoundError`   | El archivo no existe                 | `open("missing.txt")`     |
| `ZeroDivisionError`   | División por cero                    | `10 / 0`                  |
| `KeyError`            | Clave de diccionario no encontrada   | `d["missing_key"]`        |
| `IndexError`          | Índice de lista fuera de rango       | `mylist[99]`              |

Se pueden capturar varias excepciones distintas en el mismo `try`:

```python
try:
    filename = input("File to open: ")
    with open(filename) as f:
        data = f.read()
    port = int(data.strip())
except FileNotFoundError:
    print(f"Error: '{filename}' does not exist.")
except ValueError:
    print("Error: the file does not contain a valid number.")
```

Cada `except` solo se activa si ocurre justo ese tipo de error.

### `except` genérico

```python
try:
    risky_operation()
except Exception as e:
    print(f"Something went wrong: {e}")
```

`except Exception as e` atrapa cualquier tipo de error (no solo uno específico) y guarda el mensaje del error en `e`. Es útil como red de seguridad, pero conviene usar excepciones específicas primero — un `except Exception` genérico puede esconder bugs que preferirías ver.

### Combinando manejo de errores con bucles

Patrón muy común: repetir la pregunta hasta que la entrada sea válida.

```python
while True:
    try:
        age = int(input("Enter your age: "))
        break
    except ValueError:
        print("Invalid input. Please enter a whole number.")
```

Mientras el `int()` falle, el `except` captura el error y el `while True` vuelve a preguntar. Cuando por fin se ingresa un número válido, `break` corta el bucle. Este patrón es esencial en herramientas interactivas (scanners, prompts de configuración, etc.).
