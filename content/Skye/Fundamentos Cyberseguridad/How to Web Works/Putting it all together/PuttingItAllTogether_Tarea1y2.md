# Putting It All Together

> [!info] Módulo: Putting It All Together
> Este módulo une todos los conceptos vistos anteriormente: DNS, HTTP, servidores web, y los componentes que hacen que la web funcione a escala real.

---

# Tarea 1 — Poniéndolo todo junto

## El flujo completo de una solicitud web

Cuando escribes una URL en tu navegador, esto es todo lo que ocurre detrás de escena:

```
[Tu navegador]
      │
      │ 1. Necesita saber la IP del servidor
      ▼
[DNS]
      │
      │ 2. Resuelve el dominio → devuelve la IP
      ▼
[Servidor Web]
      │
      │ 3. Conexión mediante protocolo HTTP
      │    El servidor devuelve HTML, CSS, JS, imágenes...
      ▼
[Tu navegador]
      │
      │ 4. Renderiza todo y muestra la página
      ▼
[Tú ves el sitio web]
```

![[Pasted image 20260520152330.png]]
> *Imagen: Request website → Find IP with DNS → Connect to webserver → View website*

## Los 4 pasos resumidos

| Paso | Qué ocurre |
|------|-----------|
| **1. Request website** | Escribes la URL en el navegador y este inicia la solicitud |
| **2. Find web server IP with DNS** | El DNS traduce el nombre de dominio (google.com) a una dirección IP numérica |
| **3. Connect to webserver** | Tu equipo se conecta al servidor usando el protocolo HTTP/HTTPS |
| **4. View website** | El servidor responde con HTML, CSS, JS e imágenes que el navegador renderiza |

> [!note] ¿Por qué necesitamos DNS?
> Los servidores se identifican por IPs (ej: `142.250.80.46`), no por nombres. El DNS actúa como la "agenda telefónica" de internet: convierte `google.com` en su IP real para que tu equipo sepa a dónde conectarse.

> [!tip] Relevancia en pentesting
> Entender este flujo es la base del reconocimiento web. En una auditoría, cada paso de este proceso puede revelar información: el DNS puede exponer subdominios, HTTP puede filtrar cabeceras con versiones de software, y los archivos que devuelve el servidor pueden contener datos sensibles.

---

# Tarea 2 — Otros componentes

Además del servidor web básico, las aplicaciones web modernas usan componentes adicionales para funcionar a escala y con seguridad.

---

## ⚖️ Balanceadores de Carga (Load Balancers)

![[Pasted image 20260520152343.png|529]]
> *Imagen: Un equipo → Load Balancer → distribuye entre múltiples servidores*

Un **balanceador de carga** se coloca delante de varios servidores web y distribuye el tráfico entre ellos.

### ¿Para qué sirve?

| Problema | Solución del Load Balancer |
|----------|---------------------------|
| Un servidor solo no aguanta el tráfico | Distribuye las peticiones entre varios servidores |
| Si un servidor cae, el sitio cae | Redirige el tráfico a los servidores que siguen activos |

### Algoritmos de distribución

| Algoritmo | Cómo funciona |
|-----------|--------------|
| **Round-Robin** | Envía cada solicitud al siguiente servidor en turno, de forma rotativa (1→2→3→1→2→3...) |
| **Ponderado (Weighted)** | Revisa cuál servidor está menos ocupado y le envía la solicitud |

### Health Checks (Chequeos de salud)

El balanceador revisa periódicamente si cada servidor responde correctamente. Si un servidor no responde, deja de enviarle tráfico hasta que se recupere.

> [!note] Analogía
> Imagina una caja de supermercado con mucha gente. En vez de hacer fila en una sola caja, hay un empleado (el load balancer) que te dice "ve a la caja 3, que tiene menos gente". Si una caja se rompe, ese empleado deja de enviar gente ahí.

---

## 🌍 CDN — Content Delivery Network (Red de Distribución de Contenidos)

Una **CDN** almacena copias de los archivos estáticos de un sitio web (imágenes, CSS, JS, videos) en **miles de servidores distribuidos por todo el mundo**.

### ¿Cómo funciona?

```
Usuario en Lima solicita una imagen
          │
          ▼
CDN detecta que hay un servidor en São Paulo (más cercano que el original en EE.UU.)
          │
          ▼
Sirve la imagen desde São Paulo → menor latencia → carga más rápida
```

### ¿Qué archivos aloja una CDN?

- Imágenes y videos
- Archivos CSS y JavaScript
- Fuentes tipográficas
- Documentos estáticos

> [!tip] CDN en pentesting
> Si un sitio usa CDN, los archivos estáticos provienen de un dominio diferente (ej: `cdn.sitio.com` o dominios de terceros como `cdnjs.cloudflare.com`). Esto es importante al mapear la infraestructura de un objetivo.

---

## 🗄️ Bases de Datos

Los sitios web necesitan almacenar y recuperar información. Para eso se comunican con una **base de datos** en el backend.

### Tipos comunes

| Base de datos | Tipo | Uso típico |
|--------------|------|-----------|
| **MySQL** | Relacional (SQL) | La más usada en web, muy común en WordPress, etc. |
| **MSSQL** | Relacional (SQL) | Entornos Microsoft / Windows Server |
| **MongoDB** | No relacional (NoSQL) | Aplicaciones modernas, datos flexibles |
| **PostgreSQL** | Relacional (SQL) | Aplicaciones que requieren alta precisión de datos |

> [!warning] Bases de datos en seguridad
> La **inyección SQL (SQLi)** es uno de los ataques más críticos y frecuentes en aplicaciones web. Ocurre cuando el input del usuario se inserta directamente en una consulta a la base de datos sin sanitizar — igual que la inyección HTML, pero con consecuencias mucho más graves (robo o eliminación de toda la base de datos). Lo verás en módulos posteriores.

---

## 🛡️ WAF — Web Application Firewall (Cortafuegos de Aplicación Web)

Un **WAF** se ubica entre el usuario y el servidor web. Su función es analizar cada solicitud HTTP antes de que llegue al servidor y bloquear las que parezcan maliciosas.

![[Pasted image 20260520152400.png]]
> *Imagen: Equipo → WAF (firewall) → Servidor web*

### ¿Qué detecta y bloquea un WAF?

| Amenaza | Cómo lo detecta |
|---------|----------------|
| Inyección SQL | Patrones típicos de SQLi en los parámetros |
| XSS | Etiquetas `<script>` u otros patrones HTML en el input |
| Bots y scrapers | Analiza si la solicitud proviene de un navegador real o automatizado |
| Ataques de fuerza bruta | **Rate limiting**: limita el número de solicitudes por IP por segundo |

### Rate Limiting

Si una IP envía demasiadas solicitudes en poco tiempo (señal de ataque automatizado), el WAF la bloquea temporalmente o descarta sus peticiones antes de que lleguen al servidor.

> [!warning] WAF en pentesting
> El WAF es uno de los principales obstáculos al realizar un pentest web. Técnicas como el **bypass de WAF** son importantes en fases avanzadas: ofuscación de payloads, codificación alternativa, fragmentación de solicitudes, etc. Cuando un payload básico no funciona, a menudo es el WAF el que lo está bloqueando.

---

## 🗺️ Resumen — Arquitectura web completa

```
[Usuario]
    │
    ▼
[WAF] ← bloquea solicitudes maliciosas
    │
    ▼
[Load Balancer] ← distribuye el tráfico
    │        │        │
    ▼        ▼        ▼
[Server1] [Server2] [Server3] ← servidores web
    │
    ▼
[Base de datos] ← almacena y sirve datos
    
[CDN] ← sirve archivos estáticos desde el servidor más cercano al usuario
```

> [!tip] ¿Por qué importa conocer esta arquitectura en pentesting?
> Antes de atacar un objetivo, necesitas entender qué componentes tiene. Si hay un WAF, necesitas evasión. Si hay múltiples servidores detrás de un load balancer, necesitas identificar si todos tienen la misma configuración o si alguno está desactualizado. El reconocimiento de infraestructura es la base de cualquier auditoría seria.

---


