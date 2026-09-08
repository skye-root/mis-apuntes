# Lectura y escritura de archivos

### Leyendo un archivo (forma manual)

`open()` abre el archivo. Recibe la ruta y un modo: `"r"` leer, `"w"` escribir, `"a"` agregar.

```python
f = open("passwords.txt", "r")
content = f.read()
print(content)
f.close()
```

Problema: si ocurre un error entre `open()` y `close()`, la ejecución se detiene de inmediato y, como no hay `except`, `f.close()` nunca corre. El archivo queda abierto y bloqueado por el sistema operativo hasta que el script termine.

### La declaración `with` (context manager)

Forma recomendada de trabajar con archivos en Python. Cierra el archivo automáticamente al salir del bloque, incluso si ocurre un error.

```python
with open("passwords.txt", "r") as f:
    content = f.read()

print(content)  # el archivo ya está cerrado aquí
```

**Usa siempre `with` para trabajar con archivos** — es una de las buenas prácticas más consistentes en toda la industria.

### Métodos de lectura

| Método         | Devuelve                                    | Mejor para                                  |
| --------------- | --------------------------------------------- | ---------------------------------------------- |
| `.read()`        | El archivo completo como una sola cadena      | Archivos pequeños que procesas de una vez     |
| `.readline()`    | La siguiente línea, una sola                  | Procesar línea por línea manualmente          |
| `.readlines()`   | Una lista donde cada elemento es una línea    | Cuando necesitas todas las líneas como lista  |

También puedes recorrer el archivo directamente con un `for`:

```python
with open("common_passwords.txt", "r") as f:
    for line in f:
        password = line.strip()
        print(password)
```

`.strip()` es esencial aquí: cada línea de un archivo de texto termina en `\n`. Sin `.strip()` obtendrías `"password123\n"` en vez de `"password123"`.

### Cargar un wordlist en una lista

```python
common_passwords = []

with open("common_passwords.txt", "r") as f:
    for line in f:
        common_passwords.append(line.strip())

print(f"Loaded {len(common_passwords)} common passwords.")
```

Con el operador `in` puedes comprobar si una contraseña está en esa lista:

```python
if user_password in common_passwords:
    print("This password appears in the common-passwords list.")
```

### Escribir en un archivo

```python
with open("results.txt", "w") as f:
    f.write("Scan Results\n")
    f.write("============\n")
    f.write(f"Target: 192.168.1.1\n")
    f.write(f"Open ports: 22,80,443\n")
```

Para agregar contenido al final sin borrar lo existente, usa el modo `"a"`:

```python
with open("results.txt", "a") as f:
    f.write(f"Additional finding: port 3306 open\n")
```

### Modos de apertura

| Modo   | Descripción                                                  |
| ------ | -------------------------------------------------------------- |
| `"r"`  | Leer (el archivo debe existir)                                  |
| `"w"`  | Escribir (crea el archivo o **sobrescribe** el contenido)      |
| `"a"`  | Agregar (crea el archivo o añade al final del existente)       |

Cuidado con `"w"`: si el archivo ya existe, abrirlo en modo escritura borra todo su contenido de inmediato. Para conservar el contenido original y solo añadir, usa `"a"`.
