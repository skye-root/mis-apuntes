# Proyecto: Comprobador de solidez de contraseñas

Este script junta todo lo visto en el path: tipos de datos y f-strings, métodos de cadena, listas y diccionarios, operadores, bucles, funciones, manejo de errores, archivos y bibliotecas. Tiene 3 funciones: `load_common_passwords()`, `check_password()` y `main()`.

## 1. `load_common_passwords(filepath)` — cargar la wordlist

```python
def load_common_passwords(filepath):
    """Load a list of common passwords from a text file."""
    common = []
    try:
        with open(filepath, "r") as f:
            for line in f:
                common.append(line.strip().lower())
    except FileNotFoundError:
        print(f"Warning: '{filepath}' not found. Skipping common-password check.")
    return common
```

- Abre el archivo de contraseñas comunes con `with`, así se cierra solo aunque algo falle.
- Recorre cada línea (`for line in f`), le quita el salto de línea con `.strip()` y la pasa a minúsculas con `.lower()` antes de guardarla en `common`.
- Si el archivo no existe, el `except FileNotFoundError` evita que el programa se caiga: solo avisa y sigue, devolviendo `common` vacío. Por eso el `return common` está fuera del `try`/`except` — así se devuelve la lista tanto si el archivo cargó bien como si no.

## 2. `check_password(password, common_list)` — la lógica de puntaje

```python
def check_password(password, common_list):
    """Evaluate a password and return (score, feedback_list)."""
    score = 0
    feedback = []

    # Length checks
    if len(password) >= 8:
        score += 1
    else:
        feedback.append("Password should be at least 8 characters.")

    if len(password) >= 12:
        score += 1

    # Character variety checks
    if any(c in string.ascii_uppercase for c in password):
        score += 1
    else:
        feedback.append("Add at least one uppercase letter.")

    if any(c in string.digits for c in password):
        score += 1
    else:
        feedback.append("Add at least one digit.")

    if any(c in string.punctuation for c in password):
        score += 1
    else:
        feedback.append("Add at least one special character (e.g., !, @, #).")

    # Common password check (overrides all other scoring)
    if password.lower() in common_list:
        score = 0
        feedback = ["This password is in the common-passwords list. Choose another."]

    return score, feedback
```

- Empieza con `score = 0` y una lista `feedback` vacía para ir acumulando sugerencias.
- Cada `if`/`else` suma un punto si se cumple una condición de fortaleza, y si no se cumple agrega un mensaje a `feedback` explicando qué falta. Se evalúan: longitud ≥8, longitud ≥12, mayúscula, dígito, carácter especial — 5 chequeos en total, por eso el puntaje máximo es 5.
- `any(c in string.ascii_uppercase for c in password)` recorre cada carácter de la contraseña y devuelve `True` si al menos uno está en `string.ascii_uppercase`. Es la forma compacta de "¿tiene al menos una mayúscula?".
- El último `if` es un caso especial: si la contraseña (en minúsculas) está en la lista de contraseñas comunes, **se ignora todo el puntaje anterior** y se fuerza a `0`, con un solo mensaje de advertencia. Esto tiene sentido porque una contraseña común es débil sin importar cuántos "requisitos" técnicos cumpla.
- La función devuelve **dos valores** a la vez: `score` y `feedback`. Python permite devolver varios valores separados por coma; quien llame a la función los recibe como una tupla o los puede desempaquetar directo (como se ve en `main()`).

## 3. `main()` — el programa interactivo

```python
def main():
    strength_labels = {
        0: "Weak", 1: "Weak",
        2: "Moderate", 3: "Moderate",
        4: "Strong", 5: "Strong"
    }

    common_list = load_common_passwords("common_passwords.txt")

    while True:
        password = input("\nEnter a password to check (or 'quit' to exit): ")

        if password.lower() == "quit":
            print("Goodbye.")
            break

        if len(password) == 0:
            print("Password cannot be empty. Try again.")
            continue

        score, feedback = check_password(password, common_list)
        label = strength_labels.get(score, "Unknown")

        print(f"\nStrength: {label} ({score}/5)")

        if feedback:
            print("Suggestions:")
            for tip in feedback:
                print(f"  - {tip}")

        # Log the result (mask the actual password with asterisks)
        with open("password_log.txt", "a") as log:
            log.write(f"Password: {'*' * len(password)} | Strength: {label} ({score}/5)\n")


main()
```

- `strength_labels` es un diccionario que traduce un puntaje numérico (0-5) a una etiqueta legible ("Weak", "Moderate", "Strong").
- Carga la wordlist una sola vez, antes del bucle, para no releer el archivo en cada intento.
- `while True` mantiene el programa corriendo hasta que el usuario escriba `"quit"` — ahí `break` corta el bucle.
- Si la contraseña ingresada está vacía, `continue` salta directo a la siguiente vuelta del bucle sin evaluar nada.
- `score, feedback = check_password(...)` desempaqueta los dos valores que devuelve la función en dos variables separadas, en un solo paso.
- `strength_labels.get(score, "Unknown")` busca el puntaje en el diccionario; si por algún motivo no existe esa clave, devuelve `"Unknown"` en vez de lanzar un error — el mismo patrón seguro que viste con `.get()` en diccionarios.
- Al final, cada intento se registra en `password_log.txt` en modo `"a"` (agregar, no sobrescribir). Nota que la contraseña real **nunca se guarda**: `'*' * len(password)` genera una cadena de asteriscos del mismo largo, así el log no expone la contraseña real — solo su fortaleza.
