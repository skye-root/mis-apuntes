# 🌐 HTTP en Detalle


## ¿Qué es HTTP y HTTPS?

**HTTP** = *HyperText Transfer Protocol* (Protocolo de Transferencia de Hipertexto)
- Desarrollado por Tim Berners-Lee entre 1989 y 1991
- Es el conjunto de reglas que usa tu navegador para comunicarse con servidores web
- Transmite HTML, imágenes, videos, etc.

**HTTPS** = HTTP + cifrado 🔒
- Es la versión **segura** de HTTP
- Cifra los datos → nadie puede interceptar lo que envías o recibes
- También **garantiza** que te estás comunicando con el servidor correcto y no con un impostor

---

## ¿Qué es una URL?

Una **URL** (*Uniform Resource Locator*) es una instrucción completa sobre cómo acceder a un recurso en Internet. Cada parte tiene su función:

```
http://user:password@tryhackme.com:80/view-room?id=1#task3
  ↑         ↑              ↑         ↑     ↑       ↑    ↑
Scheme    Usuario        Host      Puerto  Ruta  Query  Fragmento
```

| Parte | Nombre | ¿Para qué sirve? |
|-------|--------|-----------------|
| `http://` | **Scheme (Esquema)** | Indica el protocolo a usar: HTTP, HTTPS, FTP... |
| `user:password` | **Usuario** | Credenciales para autenticarse (no siempre se usa) |
| `tryhackme.com` | **Host/Dominio** | El nombre de dominio o IP del servidor |
| `80` | **Puerto** | Puerto de conexión. Por defecto: 80 (HTTP) y 443 (HTTPS) |
| `/view-room` | **Ruta** | La ubicación del recurso dentro del servidor |
| `?id=1` | **Query String** | Datos extra enviados a la ruta. `id=1` = artículo con ID 1 |
| `#task3` | **Fragmento** | Referencia a una sección específica dentro de la página |

---

## Hacer una solicitud HTTP

La solicitud más básica posible es una sola línea:

```
GET / HTTP/1.1
```

Donde:
- `GET` → el método (qué quieres hacer)
- `/` → la página que estás pidiendo
- `HTTP/1.1` → la versión del protocolo

Pero normalmente también se envían **encabezados** con más información:

```
GET / HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0 Firefox/87.0
Referer: https://tryhackme.com/
[línea en blanco]
```

| Línea | ¿Qué dice? |
|-------|-----------|
| `GET / HTTP/1.1` | Pide la página principal usando HTTP 1.1 |
| `Host: tryhackme.com` | Le dice al servidor qué sitio web quieres |
| `User-Agent: Mozilla/5.0 Firefox/87.0` | Le dice que estás usando Firefox versión 87 |
| `Referer: https://tryhackme.com/` | Le dice desde qué página llegaste |
| *(línea en blanco)* | Indica que la solicitud ha terminado |

---

## La respuesta del servidor

El servidor responde así:

```
HTTP/1.1 200 OK
Server: nginx/1.15.8
Date: Fri, 09 Apr 2021 13:34:03 GMT
Content-Type: text/html
Content-Length: 98

<html>
<head><title>TryHackMe</title></head>
<body>Welcome To TryHackMe.com</body>
</html>
```

| Línea | ¿Qué significa? |
|-------|----------------|
| `HTTP/1.1 200 OK` | Versión del protocolo + código de estado (200 = éxito) |
| `Server: nginx/1.15.8` | Software del servidor web y su versión |
| `Date:` | Fecha y hora del servidor |
| `Content-Type: text/html` | Tipo de contenido que se envía (HTML, imagen, video...) |
| `Content-Length: 98` | Tamaño de la respuesta en bytes |
| *(línea en blanco)* | Indica el final de los encabezados |
| `<html>...</html>` | El contenido real solicitado |

---

## Métodos HTTP

Los métodos le dicen al servidor **qué acción quieres realizar**:

| Método | ¿Para qué? | Ejemplo de uso |
|--------|-----------|----------------|
| **GET** | Obtener/leer información del servidor | Cargar una página web |
| **POST** | Enviar datos y crear nuevos registros | Registrarse, enviar un formulario |
| **PUT** | Enviar datos para actualizar información existente | Editar tu perfil |
| **DELETE** | Eliminar información del servidor | Borrar una cuenta |

> 📌 En el día a día usarás principalmente **GET** y **POST**. GET es "dame información", POST es "toma esta información".

---

## Códigos de estado HTTP

Cuando el servidor responde, siempre incluye un **código de estado** que te dice qué pasó. Se dividen en 5 rangos:

| Rango | Categoría | ¿Qué significa? |
|-------|-----------|----------------|
| **100-199** | Informativa | La primera parte de tu solicitud fue aceptada, sigue enviando |
| **200-299** | ✅ Éxito | La solicitud se completó correctamente |
| **300-399** | 🔀 Redirección | Te mandan a otro recurso o sitio |
| **400-499** | ❌ Error del cliente | Algo está mal en TU solicitud |
| **500-599** | 💥 Error del servidor | Algo está mal en EL SERVIDOR |

### Los códigos más comunes que verás:

| Código | Nombre | ¿Qué significa en la práctica? |
|--------|--------|-------------------------------|
| **200** | OK | Todo salió bien ✅ |
| **201** | Created | Se creó algo nuevo (usuario, post, etc.) |
| **301** | Moved Permanently | La página se mudó para siempre a otra URL |
| **302** | Found | Redirección temporal (puede cambiar pronto) |
| **400** | Bad Request | Tu solicitud tiene algo mal o le falta un parámetro |
| **401** | Unauthorized | Necesitas iniciar sesión primero |
| **403** | Forbidden | No tienes permiso, aunque estés logueado |
| **404** | Not Found | La página no existe 👻 |
| **405** | Method Not Allowed | Usaste GET donde se esperaba POST (o viceversa) |
| **500** | Internal Server Error | El servidor no sabe qué hacer con tu solicitud |
| **503** | Service Unavailable | El servidor está sobrecargado o en mantenimiento |

> 💡 **Truco para recordarlos:** 4xx = es tu culpa, 5xx = es culpa del servidor.

---

## Encabezados HTTP

Los **encabezados** son datos adicionales que viajan junto a la solicitud o respuesta. No son obligatorios técnicamente, pero sin ellos sería muy difícil que los sitios web funcionen correctamente.

> 📌 **Analogía:** Son como el sobre de una carta. La carta (datos) puede ir sola, pero el sobre te dice el remitente, destinatario, si es urgente, etc. Los encabezados dan ese contexto extra al servidor o al navegador.

---

### 📤 Encabezados de Solicitud (del cliente → servidor)

Estos los envía **tu navegador** al servidor con cada solicitud:

| Encabezado | ¿Qué hace? |
|------------|-----------|
| **Host** | Le dice al servidor qué sitio quieres. Útil cuando un servidor aloja múltiples sitios — sin este encabezado recibirías el sitio por defecto |
| **User-Agent** | Identifica tu navegador y su versión (ej: `Firefox/87.0`). El servidor usa esto para formatear el sitio correctamente para tu navegador |
| **Content-Length** | Al enviar datos (ej: un formulario), le dice al servidor cuántos bytes esperar. Así el servidor sabe si recibió todo y no faltan datos |
| **Accept-Encoding** | Le dice al servidor qué métodos de compresión acepta tu navegador para reducir el peso de los datos en tránsito |
| **Cookie** | Envía datos guardados previamente (tu sesión, preferencias, etc.) al servidor en cada solicitud automáticamente |

---

### 📥 Encabezados de Respuesta (servidor → cliente)

Estos los envía **el servidor** de vuelta a tu navegador:

| Encabezado | ¿Qué hace? |
|------------|-----------|
| **Set-Cookie** | Le dice a tu navegador que guarde ciertos datos (una cookie). En cada solicitud futura, tu navegador enviará esa cookie de vuelta automáticamente |
| **Cache-Control** | Indica cuánto tiempo debe guardar tu navegador el contenido en caché antes de volver a pedirlo al servidor |
| **Content-Type** | Le dice al navegador qué tipo de datos está recibiendo: HTML, CSS, JavaScript, imagen, PDF, video... El navegador necesita saber esto para procesarlo correctamente |
| **Content-Encoding** | Indica qué método de compresión se usó para comprimir los datos enviados |

---

## Cookies 🍪

### ¿Qué son y por qué existen?

Una **cookie** es un pequeño archivo de datos que se guarda en tu ordenador. Su propósito es que el servidor te "recuerde" entre solicitudes.

**¿Por qué son necesarias?** Porque HTTP **no tiene estado** — cada solicitud es completamente independiente y el servidor no recuerda las anteriores. Sin cookies, tendrías que iniciar sesión en cada página que visitas dentro de un mismo sitio.

> 📌 **Analogía:** Es como la pulsera que te dan en un parque de atracciones. La primera vez pagas y te la ponen. En cada atracción siguiente simplemente muestras la pulsera — no tienes que pagar de nuevo. La cookie es tu "pulsera digital" que el servidor te reconoce.

---

### ¿Cómo funciona el flujo completo de cookies?

```
PASO 1 — Primera visita (sin cookie):
Tu navegador:  GET / HTTP/1.1 | Host: cookies.thm
Servidor:      HTTP/1.1 200 OK → devuelve formulario "¿Cuál es tu nombre?"

PASO 2 — Envías el formulario:
Tu navegador:  POST / HTTP/1.1 | name=adam
Servidor:      HTTP/1.1 200 OK
               Set-Cookie: name=adam  ← ¡CREA la cookie y te la manda!

PASO 3 — Visitas siguientes (con cookie):
Tu navegador:  GET / HTTP/1.1
               Cookie: name=adam  ← envía la cookie automáticamente
Servidor:      HTTP/1.1 200 OK
               <body>Welcome back adam</body>  ← ¡ya te reconoce! ✅
```

---

### Usos comunes de las cookies

- **Autenticación** → guardar tu sesión para no tener que iniciar sesión en cada página
- **Preferencias** → idioma, tema oscuro/claro, configuración del sitio
- **Seguimiento** → recordar que ya visitaste el sitio antes

> ⚠️ El valor de una cookie de autenticación **no es tu contraseña en texto plano** — es un **token** (código secreto único difícil de adivinar). Si alguien roba ese token puede hacerse pasar por ti sin necesitar tu contraseña. Esto se llama **Session Hijacking** y es un ataque real muy común.

---

### ¿Cómo ver tus cookies en el navegador?

1. Abre **DevTools** (F12 o clic derecho → Inspeccionar)
2. Ve a la pestaña **"Red" (Network)**
3. Haz clic en cualquier solicitud de la lista
4. Ve a la sub-pestaña **"Cookies"**
5. Verás todas las cookies que tu navegador envió y recibió en esa solicitud

---

## Resumen del ciclo completo de una solicitud HTTP

```
Tú escribes: tryhackme.com en el navegador
        │
        ▼
DNS resuelve tryhackme.com → 104.26.10.229
        │
        ▼
Navegador envía solicitud:
GET / HTTP/1.1
Host: tryhackme.com
User-Agent: Firefox/87.0
Cookie: session=abc123
        │
        ▼
Servidor responde:
HTTP/1.1 200 OK
Content-Type: text/html
Set-Cookie: session=abc123
[HTML de la página]
        │
        ▼
Navegador renderiza la página ✅
```

---

¿

