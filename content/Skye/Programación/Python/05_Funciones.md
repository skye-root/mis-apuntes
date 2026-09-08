# Funciones

### Definición de una función

Se define con `def`, el nombre de la función, paréntesis con los parámetros (si hay) y dos puntos. Debajo va el bloque de código sangrado.

```python
def greet(name):
    print(f"Hello, {name}. Welcome to the system.")
```

Para llamarla:

```python
greet("Alice")  # Hello, Alice. Welcome to the...
greet("Bob")    # Hello, Bob. Welcome to the...
```

Se define una sola vez, pero se puede llamar tantas veces como se quiera — eso es lo que evita repetir código.

### Parámetros vs argumentos

- **Parámetro**: la variable que declaras en la definición → `name` en `def greet(name):`
- **Argumento**: el valor real que pasas al llamarla → `"Alice"` en `greet("Alice")`

### `return`

Una función puede devolver un resultado a quien la llamó con `return`, en vez de solo imprimirlo.

```python
def check_length(password, min_length):
    if len(password) >= min_length:
        return True
    else:
        return False

result = check_length("Tr0ub4dor", 8)
print(result)  # True
```

Si una función no tiene `return`, devuelve `None` por defecto.

### Múltiples parámetros

Se separan por comas:

```python
def score_password(password, common_list):
    score = 0

    if len(password) >= 8:
        score += 1
    if len(password) >= 12:
        score += 1
    if any(c.isdigit() for c in password):
        score += 1
    if any(c.isupper() for c in password):
        score += 1
    if password not in common_list:
        score += 1

    return score
```

Recibe una contraseña y una lista de contraseñas comunes, y devuelve un puntaje.

### Valores de parámetro predeterminados

Le puedes dar a un parámetro un valor por defecto, así quien llama la función no está obligado a pasarlo:

```python
def check_length(password, min_length=8):
    return len(password) >= min_length

print(check_length("short"))     # False (usa el default de 8)
print(check_length("short", 4))  # True  (sobreescribe el default con 4)
```

### Alcance (scope)

Las variables creadas dentro de una función solo existen dentro de ella — no son accesibles desde afuera.

```python
def calculate():
    result = 42  # variable local
    return result

calculate()
# print(result)  # Error: result no está definida aquí
```

El scope evita que una función pise accidentalmente las variables de otra parte del programa.
