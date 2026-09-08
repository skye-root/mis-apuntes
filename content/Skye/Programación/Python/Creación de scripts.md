
### Definición de una función
Se define utilizando `def` , seguida del nombre de la función, paréntesis que contienen cualquier *parámetro* y dos puntos.
Seguido del bloque de código sangrado.

```python
def greet(name):
	print(f"Hello, {name}. Welcome to the system.")
```

Para llamar a la función:
```python
greet("Alice") # Hello, Alice. Welcome to the...
greet("Bob")   # Hello, Bob. Welcome to the...
```

Definimos la función una vez, pero podemos llamarla tantas veces queramos.

#### Parámetros vs Argumentos
Un parámetro es la variable que pones en la definición de la función. Dentro de los paréntesis en `def greet(name):`

Un argumento es el valor real y específico que le pasas a la función cuando la llamas. Dentro de los paréntesis en `greet("Alice")` y `greet("Bob")`

### Valores de entorno
Las funciones pueden enviar un resultado al llamador usando la palabra clave `return`.
Las funciones pueden calcular algo y devolvérselo para que lo almacene, imprima o use en cálculos posteriores.

```python
def check_length(password, min_length):
	if len(password) >= min_length:
		return True
	else:
		return False

result = check_length("Tr0ub4dor", 8)
print(result) # True
```

Si una función no tiene la declaración `return` , retorna `none` de forma predeterminada.

### Múltiples parámetros
Las funciones pueden aceptar cualquier número de parámetros, separados por comas:

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

Esta función toma una contraseña y una lista de contraseñas comunes y luego devuelve una puntuación

#### Valores de parámetros predeterminados
Puede darle a un parámetro un valor predeterminado para que la persona que llama no tenga que proporcionalselo:

```python
def check_length(password, min_length=8):
    return len(password) >= min_length

print(check_length("short"))          # False   (uses default min_length of 8)
print(check_length("short", 4))       # True    (overrides default with 4)
```

### Alcance 
Las variables creadas dentro de una función existen solo dentro de esa función. No son accesibles desde el exterior.

```python
def calculate():
    result = 42     # local variable
    return result

calculate()
# print(result)    # This would cause an error: result is not defined here
```

El *alcance* evita que las funciones interfieran accedentalmente con los datos de los demás.

### Manejo de errores

#### EL problema

```python
text  = input("Enter a number: ") # user types "hello"
number = int(text) # CRASH: ValueError
print(f"You entered {number}")
```

El programa se detiene. La linea 3 nunca corre.

#### El bloque `try` / `except`
Permite intentar una operación riegosa y detectar el error si ocurre, en lugar de que falle el prorama, el programa le pedirá al user que lo intente otra vez:

```python
try:
	text = input("Enter a number: ")
	number = int(text)
	print(f"Your entered {number}")
except ValueError:
	print("That is not a valid number. Please        try again.")
```

si ejecutamos

```python
Enter a number: hello
That is not a valid number. Please try again.
```

El codigo `try` se ejecuta primero. Si no ocurre ningun error, Python omite el `except`. Si ocurre un error , python salta al bloque siguiente (`except`) y ejecuta ese codigo en lugar de fallar 

#### Tipos de excepción comunes

| Excepción           | Cuando ocurre                      | Ejemplo               |
| ------------------- | ---------------------------------- | --------------------- |
| `ValueError`        | Conversión de tipo no válida       | `int("abc")`          |
| `FileNotFoundError` | El archivo no existe               | `open("missing.txt")` |
| `ZeroDivisionError` | División por cero                  | `10 / 0`              |
| `KeyError`          | Clave de diccionario no encontrada | `d["missing_key"]`    |
| `IndexError`        | Índice de lista fuera de rango     | `mylist[99]`          |
ejemplo :LiArrowBigDownDash:

```python
try:
	filename = input("File to open: ")
	with open(filename) as f:
		data = f.read()
	port = int(data.strip())
except FileNotFoundError:
	print(f"Error: '{filename}' does not exist.")
except ValueError:
	print(f"Error: the file does not contain a       valid number.")
```

#### `except` genérico

```python
try:
	risky_operation()
except Exception as e:
	print(f"Something went wrong: {e}")
```

(explicar)

#### Combinando el manejo de errores con bucles

```python
while True:
	try:
		age = int(input("Enter your age: "))
		break
	except ValueError:
		print("Invalid input. Please enter a             whole number.")
```
Este patrón es esencial en las herramientas interactivas

### Lectura y escritura de archivos

#### Leyendo un archivo
la funcion `open()` abre el archivo. Le pasas la ruta del archivo y un modo `"r"` para leer, `"w"` para escribir y `"a"` para agregar.

```python
f = open("passwords.txt", "r")
content = f.read()
print(content)
f.close()
```

Si ocurre un error entre `open()` y `close()` , se detiene la ejecución de inmedianto y  como no hay un `except` el programa muere en esa linea. La linea `f.close()` nunca se ejecuta y el archivo queda "abierto" y bloqueado en la memoria del sistema operativo hasta que el script termine por completo.

#### Declaración `whith` (administradores de contexto)
La forma recomendada de trabajar con archivos en python es con la declaración `with` . Cierra automáticamente el archivo cuando finaliza el bloque sangrado, incluso si ocurre un error.

```python
with open("passwords.txt, "r") as f:
	content = f.read()
	
print(content) # the file is already closed at this point
```

*Utilizar siempre `with` para operaciones con archivos. Es una de las mejores prácticas en toda la industria.

#### Métodos de lectura

|Método|Devuelve|Mejor para|
|---|---|---|
|`.read()`|Archivo completo como una sola cadena|Pequeños archivos que procesas como un solo bloque|
|`.readline()`|La siguiente línea única|Procesando una línea a la vez|
|`.readlines()`|Una lista donde cada elemento es una línea|Cuando necesitas todas las líneas como una lista|
recorrer directamente el objeto de archivo:

```python
with open("common_passwords.txt","r") as f:
	for line in f:
		password = line.strip()
		print(password)
```

El`.strip()` llamado es esencial aquí. Cada línea de un archivo de texto termina con un carácter de nueva línea (`\n`). Sin`.strip()` , obtendrías`"password123\n"` en lugar de`"password123"`

#### Cargar una lista de palabras en una lista

```python
with open("common_passwords.txt","r") as f:
	for line in f:
		common_passwords.append(line.strip())

print(f"Loeaded{len(common_passwords)} common passwords.")
```

Con el operador `in` para comprobar si una contraseña es débil

```python
if user_password in common_passwords:
	print("This password appears in the common-passwords list.")
```

#### Escribir en un archivo

```python
with open("results.txt","w") as f:
	f.write("Scan Results\n")
	f.write("============\n)
	f.write(f"Target: 192.168.1.1\n")
	f.write(f"Open ports: 22,80,443\n")
```

Para agregar contenido al final de un archivo existente sin borrarlo, usar el modo `"a"` (agregar).

```python
with.open("results.txt","a") as f:
	f.write(f"Additional finding: port 3306 open\n")
```

|Modo|Descripción|
|---|---|
|`"r"`|Leer (el archivo debe existir)|
|`"w"`|Escribir (crea un archivo o _sobrescribe_ contenido existente)|
|`"a"`|Agregar (crea un archivo o lo agrega a contenido existente)|

tener cuidado con el `"w"` . Si el archivo ya existe , abrirlo en modo escritura borrará todo su contenido de inmediato. Para agregar el archivo original usar `"a"` 

### Bibliotecas y Pip

Una biblioteca (módulo o paquete) es una colección de codigo preescrito que puedes importar a tus propios programas.

#### Importación de bibliotecas

```python
# Import the entire library
import os
print(os.getcwd()) # prints the current working directory

# Import a scpecific function
from datetime import datetime
now = datetime.now()
print("f"Current time: {now}")

# Import with an alias (nickname)
import datetime as dt
now = dt.datetime.now()
```

#### Biblioteca estándar de python

| Módulo     | Propósito                            | Ejemplo de uso                                        |
| ---------- | ------------------------------------ | ----------------------------------------------------- |
| `os`       | Interactuar con el sistema operativo | Enumere archivos y obtenga variables de entorno       |
| `sys`      | Parámetros específicos del sistema   | Leer argumentos de la línea de comandos               |
| `random`   | Generar números aleatorios           | Elija elementos aleatorios, mezcle listas             |
| `datetime` | Trabajar con fechas y horarios       | Marcas de tiempo, cálculos de tiempo                  |
| `json`     | Leer y escribir JSONdatos            | Analizar respuestas de API, archivos de configuración |
| `hashlib`  | Hash criptográfico                   | Hashes MD5, SHA-256                                   |
| `string`   | Constantes y utilidades de cadenas   | Acceso`string.punctuation` , `string.digits`          |

Para el comprobador de solidez de contraseñas, el modulo `string` es util, porque proporciona constantes como ,, y que podemos usar para verificar la variedad de caracteres de la contraseña sin codificar nosotros mismos cada caráter especial: 
`string.ascii_uppercase`  `string.digits`  `string.punctuation` 

```python
import string

password = "Secure!Pass"

has_upper = any(c in string.ascii_uppercase for c in password)
has_digit = any(c in string.digits for c in password)
has_special = any(c in string.punctuation for c in password)

print(f"Uppercase: {has_upper}")  # TRUE
print(f"Digit: {has_digit}")      # TRUE
print(f"Special: {has_special}") # TRUE
```

#### Instalación de bibliotecas con `pip`

Aparte de las bibliotecas estándar hay miles de bibliotecas creadas por la comunidad disponibles a través del indice de paquetes de Python.
Se instala usando `pip` en el administrador de paquetes de python, desde la terminal.

`pip install requests`

Luego de instalara, lo importamos como cualquier modulo de biblioteca estándar:

```python
import requests

response = requests.get("https://tryhackme.com")
print(response.status_code) # 200
```


#### Bibliotecas relevantes para la seguridad

- *requests* :LiArrowBigRightDash: envia solicitudes HTTP (web scraping, interacción API)
- *scapy* :LiArrowBigRightDash: crea, envía y rastrea paquetes de red
- *pwntools* :LiArrowBigRightDash: CTF y kit de herramientas de explotación binaria
- *paramiko* :LiArrowBigRightDash: implementación de cliente y servidor SSH
- *beautifulsoup4* :LiArrowBigRightDash: analiza y extrae datos de páginas HTML


### Haciendo un Comprobador de solidez de contraseñas

#### Paso 1 - Importaciones y cons

```python
import string
def load_common_passwords(filepath)
	common = []
	try:
		with open(filepath,"r") as f:
			for line in f:
			common.append(line.strip().lower())
	except FileNotFoundError:
			print(f"Warning: '{filepath}' not found.Skipping common-password check.")
	return common
```

#### Paso 2 La función de puntuación

```python
def check_password(password, common_list):
	score = 0
	feedback = []
	# length checks
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
		score += 1}
	else:
		feedback.append("Add at least one special character (e.g., !, @, #).")
	
	# Common password check (overrides all other scoring)
	if password.lower() in common_list:
		score = 0
		feedback = ["This password is in the common_passwords list. Choose another."]
```

Esta funcion utiliza cadenas y metodos de cadenas, operador in, logica condicional, listas, módulo string.
Devuelve dos valores : una puntuación numérica y una lista de sugerencias.

#### Paso 3: Programa principal

```python
def main()
	strength_label = {
	0:"Weak", 1:"Weak",
	2: "Moderate", 3: "Moderate",
	4: "Strong", 5: "Strong"
	}
	
	common_list = load_common_passwords("common_passwords.txt")

	while True:
		password = input("\nEnter a password to check (or 'quit' to exit)")
		
		if password.lower() == "quit":
			print("Good Bye")
			break
		
		if len(password) == 0
			print("Password cannot be empty. Try again.")
			continue
			
		score, feedback = check_password(password,common_list)
		label = strength_labels.get(score, "Unknow")
		
		print ("\nStrength {label}({score}/5)")
		
		if feedback:
			print("Suggestions:")
			for tip in feedback:
				print(f" - {tip}")
				
		# Log the result (mask the actual password with asterisks)
		with open("password_log.txt", "a") as log:
			log.write(f"Password: {'*' * len(password)} | Strength: {label} ({score}/5)\n")
			
main()
```

Aqui utiliza un diccionario para el mapeo de etiquetas, un bucle `while True` con cadenas y, f , escritura de archivos en modo de anexión  y llamada a funciones. 