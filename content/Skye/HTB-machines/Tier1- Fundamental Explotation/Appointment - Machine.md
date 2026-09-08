---
modulo: Tier1 - Fundamental Exploitation
maquina: Appointment
dificultad: Very Easy
plataforma: HackTheBox
categoria: SQL Injection / Login Bypass
---

# Appointment — Writeup

Máquina muy easy centrada en SQL Injection básica para bypass de login. Sirve más que nada para practicar el concepto de comentar la query SQL en vez de andar armando payloads complejos.

## Reconocimiento

### Task 1: ¿Qué significa el acrónimo SQL?
*R:* `Structured Query Language`

### Task 2: ¿Cuál es uno de los tipos más comunes de vulnerabilidades SQL?
*R:* `SQL injection`

### Task 3: ¿Cuál es la clasificación de OWASP Top 10 (2021) para esta vulnerabilidad?
*R:* `A03:2021-Injection`

### Task 4: ¿Qué reporta Nmap como servicio y versión corriendo en el puerto 80 del target?

Lo primero que hice fue lanzar un escaneo a la IP objetivo: `10.129.159.245`.

![[Pasted image 20260716172529.png]]

El resultado muestra el servicio corriendo en el puerto 80:

*R:* `Apache httpd 2.4.38 ((Debian))`

### Task 5: ¿Cuál es el puerto estándar para el protocolo HTTPS?
*R:* `443`

### Task 6: ¿Cómo se le llama a una carpeta en terminología de aplicaciones web?
*R:* `directory`

### Task 7: ¿Cuál es el código de respuesta HTTP para errores "Not Found"?
*R:* `404`

### Task 8: Gobuster es una herramienta para fuerza bruta de directorios en un servidor web. ¿Qué switch usamos para indicar que buscamos directorios y no subdominios?
*R:* `dir`

### Task 9: ¿Qué carácter se usa para comentar el resto de una línea en MySQL?
*R:* `#`

## Explotación

### Task 10: Bypass de login usando un comentario SQL

La idea de esta task es que, si el input del usuario no se sanitiza bien, podemos inyectar un carácter de comentario (`#`) para que MySQL ignore el resto de la query — incluyendo la verificación de la contraseña.

Entré a la página del target (`10.129.159.245`) y encontré un formulario de login:

![[Pasted image 20260716180014.png|512]]

**Payload usado:**
- Username: `admin'#`
- Password: (vacío o cualquier valor, no importa porque nunca se evalúa)

La query en el backend probablemente se ve algo así:

```sql
SELECT * FROM users WHERE username = 'admin'#' AND password = '...'
```

El `#` convierte todo lo que sigue en comentario, así que la condición del password nunca se ejecuta y el login pasa como si fuera admin.

Con ese payload logré el bypass:

![[Pasted image 20260716180201.png|577]]

**Flag obtenida:**
`03d0796d002a446c0e622226f4209672`

> ⚠️ Nota para revisión: esta flag tiene 33 caracteres, un carácter más de lo normal para un hash MD5 (32). Puede ser un typo mío al copiarla o un carácter de más al pegar — vale la pena volver a verificar contra el screenshot antes de subir el writeup a GitHub.

## Notas / aprendizajes

- Esta fue mi primera vez aplicando un comment-based bypass tan directo — hasta ahora solo lo había visto en teoría (PortSwigger), así que fue bueno verlo funcionar en un caso real tan simple.
- Punto a mejorar: no llegué a probar variantes del payload (`' OR '1'='1`, `admin'-- -`, etc.) para comparar comportamientos. Para el próximo writeup similar quiero documentar más de un payload y explicar por qué unos funcionan y otros no según el motor de base de datos.
- Falta correr Gobuster contra el sitio (Task 8 lo menciona pero no lo apliqué en la práctica) — pendiente para completar el flujo de reconocimiento activo.
