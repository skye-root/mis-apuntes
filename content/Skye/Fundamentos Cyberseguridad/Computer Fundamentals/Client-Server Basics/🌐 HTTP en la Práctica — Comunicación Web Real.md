

## 🧠 ¿Qué es HTTP/HTTPS?

**HTTP** (HyperText Transfer Protocol / Protocolo de Transferencia de Hipertexto) es el protocolo cliente-servidor usado para la World Wide Web.

**Característica clave — es *stateless* (sin estado):**
> Cada solicitud se procesa de forma **independiente**. El servidor **no recuerda** solicitudes anteriores.

### ¿Entonces cómo me mantiene conectado un sitio web?
Aunque HTTP es stateless por diseño, los sitios modernos usan mecanismos para *simular* estado:

```
Tú inicias sesión
        │
        ▼
El servidor crea un Session ID (identificador de sesión)
lo guarda en una Cookie o Token en tu navegador
        │
        ▼
En cada solicitud siguiente, tu navegador envía ese token
        │
        ▼
El servidor te reconoce ✅
```

> 🔐 **Relevancia en ciberseguridad:** Robar esa **cookie de sesión** es uno de los ataques más comunes — se llama **Session Hijacking (secuestro de sesión)**. Si alguien obtiene tu cookie, puede hacerse pasar por ti sin necesitar tu contraseña.

---

## 📋 HTTP Methods (Métodos HTTP)

En HTTP, los "comandos" se llaman **métodos**. Hay 9 en total:

| Método | Traducción | ¿Para qué sirve? | Ejemplo real |
|---|---|---|---|
| **GET** | Obtener | Pedir/recuperar un recurso del servidor | Abrir una página web |
| **POST** | Publicar | Enviar datos al servidor para crear algo | Enviar un formulario, subir un archivo |
| **PUT** | Poner | Reemplazar/actualizar un recurso completo | Actualizar tu foto de perfil |
| **DELETE** | Eliminar | Borrar un recurso del servidor | Eliminar una cuenta |
| **PATCH** | Parche | Modificar parcialmente un recurso | Cambiar solo tu nombre de usuario |
| **HEAD** | Cabeza | Como GET pero solo devuelve headers, sin contenido | Verificar si un recurso existe |
| **OPTIONS** | Opciones | Preguntar qué métodos acepta el servidor | Configuraciones CORS |
| **CONNECT** | Conectar | Establecer un túnel hacia el servidor | Proxies HTTPS |
| **TRACE** | Rastro | Diagnóstico — devuelve la solicitud recibida | Debugging |

> 🎯 **Los que más vas a ver en ciberseguridad: GET y POST**

---

## 🔍 GET en Detalle

### ¿Qué hace?
Recupera un recurso del servidor. Cuando escribes una URL y presionas Enter → **siempre es un GET**.

```
GET https://tryhackme.com/index.php
```

### Flujo:

```
  CLIENTE                                    SERVIDOR
(Tu navegador)                           (TryHackMe Server)

     │  1. HTTP REQUEST                         │
     │  GET /index.html                         │
     │ ──────────────────────────────────────►  │
     │                                          │
     │  2. HTTP RESPONSE                        │
     │  200 OK + index.html + contenido         │
     │ ◄──────────────────────────────────────  │
     ▼
[Tu navegador muestra la página]
```

> El navegador construye el mensaje GET **automáticamente**. No lo ves, pero ocurre detrás de escena.

---

## 📦 Anatomía de una Respuesta HTTP

Cuando el servidor responde, la respuesta tiene **dos partes**:

```
┌─────────────────────────────────────────┐
│         RESPONSE HEADERS                │
│  (Metadatos sobre la respuesta)         │
│                                         │
│  Status: 200 OK                         │
│  Content-Type: text/html                │
│  Content-Length: 551                    │
│  Server: SimpleHTTP/Python              │
│  Date: Mon, 03 Jan 2026 07:00:41 GMT    │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         RESPONSE BODY                   │
│  (El contenido real que pediste)        │
│                                         │
│  <!DOCTYPE html>                        │
│  <html lang="en">                       │
│    <head>...</head>                     │
│    <body>...</body>                     │
│  </html>                                │
└─────────────────────────────────────────┘
```

---

## 🔢 Status Codes (Códigos de Estado)

El servidor siempre responde con un **código de estado** que indica qué pasó.

| Rango | Categoría | Significado |
|---|---|---|
| **1xx** | Informational | Solicitud recibida, procesando... |
| **2xx** | Success ✅ | Todo salió bien |
| **3xx** | Redirection 🔀 | Redirigido a otro lugar |
| **4xx** | Client Error ❌ | Error del lado del cliente |
| **5xx** | Server Error 💥 | Error del lado del servidor |

**Los más importantes:**

| Código | Nombre | Cuándo aparece |
|---|---|---|
| **200** | OK | Todo bien, recurso entregado ✅ |
| **201** | Created | Recurso creado exitosamente (POST) |
| **301** | Moved Permanently | La URL cambió para siempre |
| **302** | Found | Redirección temporal |
| **400** | Bad Request | La solicitud está mal formada |
| **401** | Unauthorized | Necesitas autenticarte primero |
| **403** | Forbidden | Autenticado pero sin permiso |
| **404** | Not Found | El recurso no existe |
| **500** | Internal Server Error | El servidor falló |
| **503** | Service Unavailable | Servidor caído o sobrecargado |

> 🔐 **En ciberseguridad:** Los códigos **401, 403 y 404** son clave al hacer **reconnaissance (reconocimiento)** de un objetivo. Un 403 significa que el recurso *existe* pero no tienes permiso — dato valioso.

---

## 🛠️ Ver HTTP en el Navegador — DevTools

### ¿Cómo abrir DevTools?
- **F12** en cualquier navegador
- O clic derecho → **Inspeccionar**
- Ir a la pestaña **"Network" (Red)**

![[Pasted image 20260523034410.png|456]]

### ¿Qué ves en la pestaña Network?

Al recargar una página, verás **todas las solicitudes GET** automáticas:

```
Status │ Method │ File         │ Type         │ Size
───────┼─────────┼──────────────┼──────────────┼────────
 200   │  GET    │ /            │ document     │ 737 B
 200   │  GET    │ style.css    │ stylesheet   │ 349 B
 200   │  GET    │ script.js    │ script       │ 355 B
 404   │  GET    │ favicon.ico  │ img          │ 520 B  ← no existe
```

> 💡 Una sola página web puede generar **decenas de solicitudes GET** — una por cada archivo: HTML, CSS, JS, imágenes, fuentes, etc.

---

### Campos al inspeccionar una solicitud (pestaña Headers)

![[Pasted image 20260523034423.png|606]]
### Cuerpo de la respuesta

![[Pasted image 20260523034526.png|500]]

| Campo (español)        | Campo (inglés) | ¿Qué te dice?                           |
| ---------------------- | -------------- | --------------------------------------- |
| **Esquema**            | Scheme         | Protocolo usado: `http` o `https`       |
| **Anfitrión**          | Host           | Nombre del servidor solicitado          |
| **Nombre del archivo** | Filename       | Qué archivo se pidió (`/` = index.html) |
| **Dirección**          | Address        | IP real del servidor                    |
| **Estado**             | Status         | Si fue exitoso (`200 OK`) o no          |

---

## 🔄 Flujo Completo — Lo que pasa al abrir una página

```
1. Escribes: http://httpdemo.local:8080
        │
        ▼
2. DNS resuelve el nombre → IP
        │
        ▼
3. Tu navegador envía:
   GET / HTTP/1.1
   Host: httpdemo.local:8080
        │
        ▼
4. El servidor responde:
   Status: 200 OK
   Content-Type: text/html
   [Body: el HTML de la página]
        │
        ▼
5. El navegador lee el HTML y detecta más archivos necesarios:
   → GET /style.css     → 200 OK ✅
   → GET /script.js     → 200 OK ✅
   → GET /favicon.ico   → 404 ❌ (no existe)
        │
        ▼
6. Con todos los archivos, renderiza la página ✅
```

---

## 📝 Lo que aprendí en el Lab

- Una página web = **múltiples GET automáticos** en cadena
- El navegador construye los mensajes HTTP **sin que lo veas**
- **DevTools → Network (F12)** = ver todo el tráfico HTTP en tiempo real
- Cada solicitud tiene **Headers** (metadatos) y **Body** (contenido)
- El **Status Code** me dice al instante si algo funcionó o falló
- `127.0.0.1` = **localhost** = la propia máquina donde corre el servidor

> 🧪 **Hábito a desarrollar:** En cualquier sitio, abre F12 → Network → recarga. Verás todo el tráfico HTTP. Esto es exactamente lo que usan analistas de seguridad y pentesters para entender cómo funciona una aplicación web antes de atacarla o defenderla.

---

