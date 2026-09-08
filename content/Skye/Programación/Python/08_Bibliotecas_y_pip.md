# Bibliotecas y pip

Una biblioteca (módulo o paquete) es código ya escrito por otros que puedes importar y usar en tu propio programa.

### Formas de importar

```python
# Importar toda la biblioteca
import os
print(os.getcwd())  # imprime el directorio de trabajo actual

# Importar una función específica
from datetime import datetime
now = datetime.now()
print(f"Current time: {now}")

# Importar con un alias (apodo)
import datetime as dt
now = dt.datetime.now()
```

### Biblioteca estándar de Python

| Módulo     | Propósito                             | Ejemplo de uso                                          |
| ---------- | --------------------------------------- | ----------------------------------------------------------- |
| `os`        | Interactuar con el sistema operativo    | Listar archivos, leer variables de entorno                 |
| `sys`       | Parámetros específicos del sistema      | Leer argumentos de línea de comandos                        |
| `random`    | Generar números aleatorios              | Elegir elementos al azar, mezclar listas                    |
| `datetime`  | Trabajar con fechas y horas             | Timestamps, cálculos de tiempo                               |
| `json`      | Leer y escribir datos JSON              | Parsear respuestas de API, archivos de configuración         |
| `hashlib`   | Hashing criptográfico                   | Hashes MD5, SHA-256                                          |
| `string`    | Constantes y utilidades de cadenas      | `string.punctuation`, `string.digits`                        |

Para un comprobador de contraseñas, `string` es muy útil porque da constantes listas para usar en vez de tener que escribir cada carácter especial a mano: `string.ascii_uppercase`, `string.digits`, `string.punctuation`.

```python
import string

password = "Secure!Pass"

has_upper = any(c in string.ascii_uppercase for c in password)
has_digit = any(c in string.digits for c in password)
has_special = any(c in string.punctuation for c in password)

print(f"Uppercase: {has_upper}")  # True
print(f"Digit: {has_digit}")      # True
print(f"Special: {has_special}")  # True
```

### Instalar bibliotecas con `pip`

Además de la biblioteca estándar, hay miles de bibliotecas de la comunidad disponibles en PyPI (el índice de paquetes de Python). Se instalan con `pip` desde la terminal:

```
pip install requests
```

Después de instalada, se importa igual que cualquier módulo estándar:

```python
import requests

response = requests.get("https://tryhackme.com")
print(response.status_code)  # 200
```

### Bibliotecas relevantes para seguridad

| Biblioteca        | Para qué sirve                                       |
| ------------------ | ------------------------------------------------------- |
| `requests`          | Enviar solicitudes HTTP (web scraping, APIs)           |
| `scapy`             | Crear, enviar y capturar paquetes de red                |
| `pwntools`          | CTFs y explotación binaria                               |
| `paramiko`          | Cliente/servidor SSH                                     |
| `beautifulsoup4`    | Parsear y extraer datos de HTML                          |
