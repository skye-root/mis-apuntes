

## 🧠 La Idea Central

Antes de ver conceptos técnicos, entiende esto:

> **Cada vez que usas internet, tu computadora le está pidiendo algo a otra computadora.**  
> Una pide → la otra responde. Siempre.

Para entenderlo, usamos la analogía de pedir una pizza.

---

## 🍕 La Historia (para no olvidarlo nunca)

> Es viernes por la noche. Alice quiere pizza de Luigi's.  
> Le dice a Bob qué quiere. Bob agarra el auto, va a Luigi's, hace el pedido.  
> Luigi's prepara la pizza y se la entrega a Bob.  
> Bob vuelve a casa con la pizza. Alice come feliz.

Cada personaje y acción tiene su equivalente exacto en informática. Veámoslos uno por uno.

---

## 📋 Los 5 Conceptos Clave

---

### 1️⃣ Client & Server (Cliente y Servidor)

![[Pasted image 20260523025111.png]]

| En la pizzería                         | En informática                              |
| -------------------------------------- | ------------------------------------------- |
| **Alice** quiere pizza                 | **Tú** quieres ver una página web           |
| **Bob** va a buscarla                  | **Tu navegador (browser)** hace la petición |
| **Luigi's Pizza** la prepara y entrega | **El servidor** tiene la web y la envía     |

- **Client (Cliente)** → el que **pide**. Siempre inicia la comunicación. Ej: tu navegador, una app.
- **Server (Servidor)** → el que **sirve**. Espera peticiones y responde. Ej: google.com, youtube.com.

> 🔑 **Regla de oro:** El **cliente siempre inicia** la petición. El servidor nunca llama primero.

---

### 2️⃣ Request & Response (Petición y Respuesta)

![[Pasted image 20260523025124.png]]


| En la pizzería | En informática |
|---|---|
| Bob dice: *"Una pizza grande de pepperoni y una Coca-Cola"* | Tu navegador envía: *"Dame la página web de google.com"* |
| Luigi's responde: *"¡En seguida!"* y prepara la pizza | El servidor responde: *"Aquí tienes el HTML de la página"* |
| Si no hay pepperoni → *"Lo sentimos, no hay"* | Si algo falla → respuesta de error (ej: **Error 404** - página no encontrada) |

**Flujo siempre:**
```
Cliente  ──── Request (Petición) ────►  Servidor
Cliente  ◄─── Response (Respuesta) ───  Servidor
```

> ⚠️ **Importante:** Si la petición no está bien formateada, o el recurso no existe → el servidor devuelve un **error**. No es magia, hay reglas estrictas.

---

### 3️⃣ Protocol (Protocolo)

![[Pasted image 20260523025136.png]]

| En la pizzería | En informática |
|---|---|
| Alice habla en el **idioma** que Luigi's entiende | El navegador y el servidor hablan el mismo **protocolo** |
| Alice usa el **menú** para saber qué puede pedir | El protocolo define qué **comandos** están permitidos |
| Bob entiende el pedido y sabe cómo llevarlo | El protocolo define cómo **estructurar** la petición |

**¿Qué define un protocolo exactamente?**

- ✅ Qué **comandos** entienden el cliente y el servidor (ej: el comando `GET` para pedir algo)
- ✅ Cómo se **estructura** una petición (primero el comando, luego el contenido)
- ✅ Qué **sintaxis** (idioma/formato) se usa
- ✅ Qué **respuesta** dar a cada tipo de petición
- ✅ Qué **respuesta** dar cuando algo falla

> 🧠 **Resumen simple:** Un protocolo es el **idioma + las reglas de conversación** que ambas partes deben seguir para entenderse.

**Protocolos comunes que verás en ciberseguridad:**

| Protocolo | Para qué sirve |
|---|---|
| **HTTP** | Navegar páginas web (sin cifrado) |
| **HTTPS** | Navegar páginas web (con cifrado) |
| **FTP** | Transferir archivos |
| **SSH** | Acceso remoto seguro a servidores |
| **DNS** | Traducir nombres a direcciones IP |
| **SMTP** | Enviar correos electrónicos |

---

### 4️⃣ Port (Puerto)

![[Pasted image 20260523025150.png]]

| En la pizzería | En informática |
|---|---|
| Luigi's tiene **puerta A** para takeaway | El servidor tiene el **puerto 80** para HTTP |
| Luigi's tiene **puerta B** para comer en el local | El servidor tiene el **puerto 443** para HTTPS |
| Luigi's tiene **puerta C** para delivery | El servidor tiene el **puerto 22** para SSH |

- Un servidor puede tener **muchos servicios corriendo al mismo tiempo**.
- Cada servicio escucha en un **puerto diferente**.
- El cliente debe llamar a la **puerta correcta** (puerto correcto) para el servicio que quiere.

> 🧠 **Resumen simple:** Un puerto es como la **puerta específica** a la que debes llamar dentro de un servidor para acceder al servicio correcto.

**Puertos más importantes para recordar:**

| Puerto | Protocolo / Servicio |
|---|---|
| **21** | FTP |
| **22** | SSH |
| **23** | Telnet |
| **25** | SMTP (correo) |
| **53** | DNS |
| **80** | HTTP (web sin cifrar) |
| **443** | HTTPS (web cifrada) |
| **3389** | RDP (escritorio remoto) |

> 🔐 **Relevancia en ciberseguridad:** En un **port scan (escaneo de puertos)**, los atacantes buscan qué puertos están abiertos en un servidor para saber qué servicios tiene y cómo atacarlos. Herramienta clave: **Nmap**.

---

### 5️⃣ DNS (Domain Name System / Sistema de Nombres de Dominio)

![[Pasted image 20260523025203.png]]

| En la pizzería | En informática |
|---|---|
| Alice sabe el **nombre** del lugar: *"Luigi's Pizza"* | Tú sabes el **nombre** del sitio: *"google.com"* |
| Bob mete el nombre en el **GPS** | Tu computadora consulta el **servidor DNS** |
| El GPS devuelve las **coordenadas** para llegar | El DNS devuelve la **dirección IP** del servidor |
| Bob llega a Luigi's usando esas coordenadas | Tu computadora se conecta al servidor usando esa IP |

**¿Por qué existe el DNS?**
- Las computadoras se comunican usando **IP addresses (direcciones IP)** — números como `192.168.1.10`.
- Los humanos recordamos **nombres**, no números.
- El DNS actúa como la **guía telefónica de internet**: convierte nombres legibles → en IPs.

```
Tú escribes:     google.com
DNS traduce a:   142.250.80.46
Tu PC se conecta a: 142.250.80.46
```

> 🧠 **Resumen simple:** DNS es el **GPS de internet** — convierte el nombre de un sitio en la dirección real donde vive ese servidor.

> 🔐 **Relevancia en ciberseguridad:** Ataques como **DNS Spoofing** o **DNS Poisoning** engañan al DNS para que devuelva una IP falsa — redirigiendo al usuario a un sitio malicioso aunque haya escrito el nombre correcto.

---

## 🔄 Todo Junto — El Flujo Completo

Cuando escribes `https://google.com` en tu navegador:

```
1. TÚ (cliente) escribes "google.com"
        │
        ▼
2. Tu PC consulta el DNS
   DNS responde: "google.com = 142.250.80.46"
        │
        ▼
3. Tu navegador se conecta a 142.250.80.46
   usando el Puerto 443 (HTTPS)
        │
        ▼
4. Envía una Request (petición):
   "GET /  HTTP/1.1" → "Dame la página principal"
        │
        ▼
5. El servidor (Google) procesa la petición
   siguiendo el Protocolo HTTPS
        │
        ▼
6. El servidor envía una Response (respuesta):
   El HTML de la página de Google
        │
        ▼
7. Tu navegador muestra la página ✅
```

---

## 📊 Tabla Resumen Final

| Concepto | Analogía pizzería | En informática | Para recordarlo |
|---|---|---|---|
| **Client** | Alice (la que pide) | Navegador, app | El que **inicia** la petición |
| **Server** | Luigi's Pizza | google.com, youtube.com | El que **sirve** el recurso |
| **Request** | El pedido de Bob | Petición HTTP | Lo que el cliente **pide** |
| **Response** | La pizza entregada | Respuesta del servidor | Lo que el servidor **devuelve** |
| **Protocol** | Idioma + reglas del menú | HTTP, HTTPS, SSH... | Las **reglas de comunicación** |
| **Port** | Puerta A, B o C de Luigi's | Puerto 80, 443, 22... | La **puerta correcta** al servicio |
| **DNS** | GPS con el nombre del lugar | Traduce nombre → IP | La **guía telefónica** de internet |

---

