---
modulo: Tier1 - Fundamental Exploitation
maquina: Crocodile
dificultad: Very Easy
plataforma: HackTheBox
categoria: FTP Anonymous Login / Directory Brute Force
---

# Crocodile — Writeup

Máquina muy easy que combina dos vectores clásicos: acceso anónimo a un servidor FTP para filtrar credenciales/usuarios, y fuerza bruta de directorios web para encontrar un panel de login. Es un buen ejemplo de cómo un servicio "inofensivo" como FTP puede filtrar información crítica para atacar otro servicio (HTTP) en la misma máquina.

## Reconocimiento

### Task 1: ¿Qué switch de escaneo de Nmap emplea el uso de scripts por defecto durante un escaneo?
*R:* `-sC`

Este parámetro de Nmap sirve para correr el set de scripts por defecto (NSE) durante el escaneo, lo cual suele dar información extra como banners, títulos de páginas, o si un login anónimo está permitido.

### Task 2: ¿Qué versión de servicio se encuentra corriendo en el puerto 21?
*R:* `vsftpd 3.0.3`

Haciendo un escaneo con Nmap:

![[Pasted image 20260721144202.png]]

### Task 3: ¿Qué código FTP se retorna para el mensaje "Anonymous FTP login allowed"?
*R:* `230`

Cuando hice el escaneo con el uso de scripts (`-sC`), el output no mostraba el código explícitamente en el resumen, así que tuve que revisar el detalle de la respuesta del servidor:

![[Pasted image 20260721145149.png]]

> Nota: el código `230` en FTP significa "User logged in, proceed" — es el código genérico de login exitoso, no exclusivo de anonymous, pero en este contexto confirma que el login anónimo fue aceptado.

### Task 4: Al conectarnos al servidor FTP usando el cliente `ftp`, ¿qué username damos cuando se nos pide loguearnos de forma anónima?
*R:* `anonymous`

![[Pasted image 20260721160647.png]]

### Task 5: Tras conectarnos al servidor FTP de forma anónima, ¿qué comando podemos usar para descargar los archivos que encontramos?
*R:* `get`

## Explotación

### Task 6: ¿Cuál es uno de los usernames que suena con mayor privilegio en 'allowed.userlist', descargado del servidor FTP?
*R:* `admin`

Primero me conecté al servidor FTP con el usuario `anonymous`, que permite ingresar sin contraseña:

![[Pasted image 20260721160143.png]]

Luego descargué el archivo `allowed.userlist` (que además ya se veía listado en el escaneo de Nmap):

```
get allowed.userlist
```

![[Pasted image 20260721160247.png]]

Y por último leí el archivo descargado en mi máquina local:

```bash
cat allowed.userlist
```

![[Pasted image 20260721160416.png]]

El username con mayor privilegio aparente de la lista es `admin`.

### Task 7: ¿Qué versión de Apache HTTP Server está corriendo en el target?
*R:* `Apache httpd 2.4.41`

![[Pasted image 20260721162451.png]]

### Task 8: ¿Qué switch podemos usar con Gobuster para especificar que buscamos tipos de archivo específicos?
*R:* `-x`

Por ejemplo, para buscar archivos con extensiones específicas:

```bash
gobuster dir -u http://example.com -w wordlist.txt -x php,txt,html,js
```

### Task 9: ¿Qué archivo PHP podemos identificar mediante fuerza bruta de directorios que nos dé la oportunidad de autenticarnos al servicio web?
*R:* `login.php`

Corrí un ataque de fuerza bruta de directorios apuntando a extensiones `.php`:

```bash
gobuster dir -u http://10.129.223.37 -w /usr/share/wordlists/dirb/common.txt -x php
```

![[Pasted image 20260721164400.png]]

Revisando los resultados, el único directorio/archivo PHP que permite autenticarse es `login.php`:

![[Pasted image 20260721164510.png]]

## Encontrar la Flag

Primero, en la respuesta de Nmap sobre el servicio FTP, se podían ver dos archivos listados:

![[Pasted image 20260721191816.png]]

Entré al servicio FTP y usé `get` para descargar cada uno de esos archivos, y luego leí su contenido (uno resultó ser la lista de usuarios y el otro contenía credenciales/contraseña):

![[Pasted image 20260721191929.png]]

Con el username (`admin`, obtenido de `allowed.userlist`) y la password (obtenida del segundo archivo) ingresé en `login.php` y obtuve la flag:

![[Pasted image 20260721192058.png]]

**Flag obtenida:**
`c7110277ac44d78b6a9fff2232434d16`

## Notas / aprendizajes

- El patrón **FTP anónimo → filtración de credenciales → login web** es extremadamente común en máquinas Very Easy/Easy de HTB. Vale la pena, ante cualquier FTP con anonymous login habilitado, descargar y leer **todo** archivo disponible antes de seguir enumerando otros servicios.
- `-sC` de Nmap no siempre muestra el código de respuesta FTP crudo en el resumen; si falta un dato específico como el código numérico, conviene repetir la conexión manualmente con el cliente `ftp` o revisar el output completo/verbose de Nmap (`-v` o el archivo de salida con `-oN`).
- Gobuster con `-x` es clave cuando se sospecha de una aplicación PHP: sin especificar extensiones, herramientas de brute force de directorios solo encuentran carpetas o archivos sin extensión, y se pueden pasar por alto archivos como `login.php`.

## Recomendaciones / atajos para el futuro

- **Automatizar la descarga de FTP anónimo** en vez de hacer `get` archivo por archivo: usar `mget *` dentro del cliente FTP (con confirmación desactivada vía `prompt` antes) o, más rápido aún, `wget -r ftp://anonymous:anonymous@<IP>/` desde la shell para bajar todo el árbol de una sola vez.
- **Wordlist correcta para Gobuster**: el path típico en Kali es `/usr/share/wordlists/dirb/common.txt` o `/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt` — ojo con no confundir `dirb` con `dirbuster` al escribir la ruta (fácil de tipear mal bajo presión).
- **Guardar el output de Nmap desde el inicio** con `-oA nombre_maquina` (guarda en `.nmap`, `.gnmap` y `.xml` a la vez). Así, si más adelante Task 3 pide un dato puntual como un código de respuesta, ya está en el archivo sin tener que repetir el escaneo.
- **Priorizar archivos con nombres sugerentes** como `allowed.userlist`, `users.txt`, `credentials`, `.htpasswd`, etc. — en máquinas de este nivel casi siempre son la pista directa hacia el siguiente paso.
- Cuando se combine un username de una fuente (FTP) con una password de otra, **anotar explícitamente de qué archivo salió cada dato** en el writeup — ayuda muchísimo a re-trazar el camino de ataque cuando se repasa el writeup meses después.
- Para practicar variantes de este mismo patrón, sirve compararlo con máquinas donde el filtrado ocurre vía SMB anónimo (`smbclient -N`) en vez de FTP — el flujo mental es el mismo: **servicio sin auth fuerte → archivos filtrados → credenciales → pivote a otro servicio**.
