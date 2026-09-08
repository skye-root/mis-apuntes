# Python Basic Concepts

### Tipos de datos

| Tipo    | Nombre   | Ejemplo         | Descripción                                 |
| ------- | -------- | --------------- | -------------------------------------------- |
| `str`   | Cadena   | `"hello"`       | Texto, caracteres, símbolos                 |
| `int`   | Entero   | `42`            | Números enteros                             |
| `float` | Flotador | `3.14`          | Números con puntos decimales                |
| `bool`  | Booleano | `True`/`False`  | Valores lógicos de encendido/apagado, sí/no |
| `list`  | Lista    | `[1, 2, 3]`     | Colección ordenada de artículos             |

### Operadores de comparación

| Operador | Significado      | Ejemplo  |
| -------- | ----------------- | -------- |
| `==`     | Igual a           | `x == 5` |
| `!=`     | No igual a        | `x != 5` |
| `<`      | Menos que         | `x < 5`  |
| `>`      | Mayor que         | `x > 5`  |
| `<=`     | Menor o igual a   | `x <= 5` |
| `>=`     | Mayor o igual a   | `x >= 5` |

### Operadores lógicos

| Operador | Significado                                     | Ejemplo               |
| -------- | ------------------------------------------------ | ---------------------- |
| `and`    | Verdadero sólo si *ambos* lados son verdaderos   | `x > 0 and x < 100`     |
| `or`     | Verdadero si *al menos un* lado es verdadero     | `x == 1 or x == 10`     |
| `not`    | Invierte el valor booleano                       | `not is_locked`         |

### Conversión de tipos

| Función   | Convierte a | Ejemplo                    |
| --------- | ----------- | --------------------------- |
| `int()`   | Entero      | `int("42")` da `42`         |
| `float()` | Flotador    | `float("3.14")` da `3.14`   |
| `str()`   | Cadena      | `str(42)` da `"42"`         |
| `bool()`  | Booleano    | `bool(0)` da `False`        |

### Operadores de asignación aumentada

```python
count = 0
count += 1    # equivale a count = count + 1
count -= 1    # equivale a count = count - 1
count *= 2    # equivale a count = count * 2
count /= 4    # equivale a count = count / 4
```

### Indexación y corte de cadenas

Cada carácter ocupa una posición numerada llamada índice, que empieza en 0.

```python
word = "Python"
print(word[0])   # P (primer caracter)
print(word[-1])  # n (índice negativo cuenta desde el final)
```

Para extraer parte de la cadena se usa `string[start:end]`. El índice `start` está incluido; el índice `end` está excluido.

```python
word = "Python"
print(word[0:3])  # Pyt (caracteres en índice 0,1,2)
print(word[:4])   # Pyth (desde el inicio hasta el índice 3)
print(word[2:])   # thon (desde el índice 2 hasta el final)
```

### Métodos de cadena útiles

| Método           | Qué hace                                            | Ejemplo                        | Resultado          |
| ----------------- | ---------------------------------------------------- | ------------------------------- | -------------------- |
| `.upper()`        | Convierte a mayúsculas                               | `"hello".upper()`               | `"HELLO"`            |
| `.lower()`        | Convierte a minúsculas                               | `"HELLO".lower()`               | `"hello"`            |
| `.strip()`        | Elimina espacios en blanco iniciales y finales       | `" hi ".strip()`                | `"hi"`               |
| `.replace(a, b)`  | Reemplaza todas las ocurrencias de `a` con `b`       | `"cat".replace("c", "b")`       | `"bat"`              |
| `.split(sep)`     | Divide la cadena en una lista según `sep`            | `"a,b,c".split(",")`            | `["a", "b", "c"]`    |
| `.startswith(x)`  | Comprueba si la cadena comienza con `x`              | `"http://".startswith("http")`  | `True`               |
| `.endswith(x)`    | Comprueba si la cadena termina con `x`               | `"file.txt".endswith(".txt")`   | `True`               |
| `.count(x)`       | Cuenta las ocurrencias de `x`                        | `"banana".count("a")`           | `3`                  |

### Comprobaciones de caracteres

```python
char = "A"
print(char.isupper())  # True
print(char.islower())  # False
print(char.isdigit())  # False
print(char.isalpha())  # True (¿solo contiene letras?)
print(char.isalnum())  # True (¿solo contiene letras y números?/alfanumerico)
```

### El operador `in`

Verifica si existe una subcadena dentro de una cadena más grande. Devuelve `True` o `False`.

```python
url = "https://tryhackme.com/room/pythoncoreconcepts"
print("tryhackme" in url)   # True
print("hackthebox" in url)  # False
print("https" in url)       # True
```

También funciona con listas:

```python
common_passwords = ["123456", "password", "admin", "letmein"]

if "password" in common_passwords:
    print("This password is in the common list.")
```

Se puede negar con `not in`:

```python
user_password = "qwerty"

if user_password not in common_passwords:
    print("Good. This password is not in the common list.")
```

### Uso de `enumerate()`

Devuelve pares `(índice, elemento)` al iterar.

```python
for i, char in enumerate("TryHackMe"):
    print(f"indice: {i} y letra: {char}")

# indice: 0 y letra: T
# indice: 1 y letra: r
# indice: 2 y letra: y
# indice: 3 y letra: H
# ...
```

### Listas

```python
ports = [22, 80, 443, 8080]
usernames = ["admin", "root", "guest"]
mixed = ["server1", 443, True]
```

Acceso a listas:

```python
ports = [22, 80, 443, 8080]

print(ports[0])    # 22
print(ports[-1])   # 8080  (último elemento)
print(ports[1:3])  # [80, 443]  (el slicing también funciona en listas)
```

#### Métodos de lista

| Método       | Qué hace                                         | Ejemplo               |
| ------------ | -------------------------------------------------- | ----------------------- |
| `.append(x)` | Añade `x` al final                                 | `ports.append(3306)`    |
| `.remove(x)` | Elimina la primera aparición de `x`                | `ports.remove(80)`      |
| `.pop(i)`    | Elimina y devuelve el elemento en el índice `i`    | `ports.pop(0)`          |
| `.sort()`    | Ordena la lista en orden ascendente                | `ports.sort()`          |
| `.reverse()` | Invierte el orden de la lista                      | `ports.reverse()`       |
| `len(list)`  | Devuelve el número de elementos                    | `len(ports)`            |

### Diccionarios

Almacenan datos como pares clave-valor entre llaves.

```python
services = {22: "SSH", 80: "HTTP", 443: "HTTPS", 3306: "SQL"}
```

Acceder a los valores:

```python
print(services[22])  # SSH
print(services[80])  # HTTP
```

Agregar, actualizar y eliminar entradas:

```python
services[8080] = "HTTP-Alt"  # agrega una nueva entrada
services[22] = "OpenSSH"     # actualiza una entrada existente
del services[3306]           # elimina una entrada
```

Comprobación de claves:

```python
if 22 in services:
    print(f"Port 22 runs {services[22]}")
```

#### Métodos de diccionario

| Método                | Devuelve                                            |
| ---------------------- | ----------------------------------------------------- |
| `.keys()`              | Todas las claves del diccionario                     |
| `.values()`            | Todos los valores del diccionario                    |
| `.items()`             | Todos los pares clave-valor como tuplas              |
| `.get(key, default)`   | Valor de `key`, o `default` si la clave no existe    |

`.get()` es útil porque acceder a una clave inexistente, con corchetes `[]` provoca un error, mientras que `.get()` permite dar una alternativa segura:

```python
result = services.get(9999, "unknown")
print(result)
# unknown
```

### Nuevos operadores aritméticos

| Operador | Nombre              | Ejemplo   | Resultado |
| -------- | -------------------- | --------- | --------- |
| `**`     | Exponente             | `2 ** 8`  | `256`     |
| `//`     | División entera       | `7 // 2`  | `3`       |
| `%`      | Módulo (resto)        | `7 % 2`   | `1`       |

### Bucles: `for` y `while`

Un bucle `while` se ejecuta mientras su condición sea `True`:

```python
attempts = 0
max_attempts = 3

while attempts < max_attempts:
    password = input("Enter password: ")
    attempts += 1
    print(f"Attempt {attempts} of {max_attempts}")
```

Este bucle pide una contraseña hasta 3 veces. Cuando `attempts` llega a `max_attempts`, la condición `attempts < max_attempts` se vuelve `False` y el bucle se detiene.

Un bucle `for` se usa cuando sabemos cuántos elementos hay y queremos visitar cada uno en orden:

```python
targets = ["192.168.1.1", "192.168.1.2"]
for ip in targets:
    print(f"Scanning {ip}...")

# Salida:
# Scanning 192.168.1.1...
# Scanning 192.168.1.2...
```

Iteración sobre cadenas:

```python
password = "S3cure"
for char in password:
    if char.isdigit():
        print(f"Found digit: {char}")
    elif char.isupper():
        print(f"Found uppercase: {char}")

# Salida:
# Found uppercase: S
# Found digit: 3
```

### Función `range()`

Genera una secuencia de números para repetir un bucle una cantidad específica de veces:

```python
# range(stop): 0 hasta stop-1
for i in range(5):
    print(i)  # imprime 0,1,2,3,4

# range(start, stop): start hasta stop-1
for i in range(1, 6):
    print(i)  # imprime 1,2,3,4,5

# range(start, stop, step): con incremento personalizado
for i in range(0, 20, 5):
    print(i)  # imprime 0,5,10,15
```

### Iteración sobre diccionarios

```python
services = {22: "SSH", 80: "HTTP", 443: "HTTPS"}

for port, name in services.items():
    print(f"Port {port} = {name}")

# Salida:
# Port 22 = SSH
# Port 80 = HTTP
# Port 443 = HTTPS
```

### `break` y `continue`

- `break` → sale inmediatamente del bucle por completo.
- `continue` → salta el resto de la iteración actual y pasa a la siguiente.

```python
# Detiene el escaneo apenas encuentra el puerto 443
for port in [22, 80, 443, 8080]:
    if port == 443:
        print(f"Port {port} found. Stopping scan.")
        break
    print(f"Checked port {port}")

# Salida:
# Checked port 22
# Checked port 80
# Port 443 found. Stopping scan.
```

El puerto `8080` nunca se verifica porque `break` termina el bucle apenas encuentra `443`.

```python
lines = ["admin", "", "root", "", "guest"]

for line in lines:
    if line == "":
        continue
    print(f"Processing: {line}")

# Salida:
# Processing: admin
# Processing: root
# Processing: guest
```

### Elegir entre `for` y `while`

- `for` → cuando conoces de antemano el número de iteraciones (una lista, un rango, una cadena a recorrer).
- `while` → cuando el número de iteraciones depende de una condición que cambia durante la ejecución (esperar la entrada correcta, reintentar hasta que una conexión tenga éxito).
