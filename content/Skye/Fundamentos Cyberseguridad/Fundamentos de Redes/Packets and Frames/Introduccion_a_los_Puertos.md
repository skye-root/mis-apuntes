# 🚢 Introducción a los Puertos


## ¿Qué es un puerto?

Un puerto es un **punto de entrada y salida de datos** en un dispositivo de red. Sin puertos, los dispositivos no sabrían a qué aplicación entregarle los datos que reciben.

> 📌 **Analogía:** Imagina un puerto marítimo. Los barcos que quieren atracar deben dirigirse al muelle correcto según sus dimensiones e instalaciones. Un crucero no puede atracar en un muelle para barcos pesqueros. Lo mismo pasa con los datos en red — cada tipo de dato debe entrar por el puerto correcto.

En informática, los puertos son **valores numéricos entre 0 y 65535**.

---

## ¿Por qué existen los puertos?

Sin puertos, un dispositivo recibiría datos pero no sabría si entregarlos al navegador, al cliente de correo, al juego online o a cualquier otra aplicación. Sería un caos total.

Los puertos permiten **asociar aplicaciones y protocolos a números fijos**. Por ejemplo:
- Todo navegador web sabe que los datos de páginas web llegan por el **puerto 80**
- Gracias a eso, Google Chrome y Firefox pueden estar diseñados para interpretar esos datos de la misma manera, aunque sean aplicaciones completamente diferentes

> 💡 Los puertos del **0 al 1024** se consideran **puertos comunes** (well-known ports) y tienen protocolos estándar asignados.

---

## Los puertos más importantes en ciberseguridad

| Protocolo | Puerto | ¿Para qué sirve? |
|-----------|--------|-----------------|
| **FTP** — File Transfer Protocol | **21** | Compartir y descargar archivos desde una ubicación central, basado en modelo cliente-servidor |
| **SSH** — Secure Shell | **22** | Iniciar sesión de forma segura en sistemas remotos a través de una interfaz de texto (terminal) |
| **HTTP** — HyperText Transfer Protocol | **80** | Navegar por la web. Tu navegador lo usa para descargar texto, imágenes y videos de páginas web |
| **HTTPS** — HTTP Secure | **443** | Igual que HTTP pero con **cifrado**. Es la versión segura de navegar por la web 🔒 |
| **SMB** — Server Message Block | **445** | Similar a FTP pero además permite compartir dispositivos como **impresoras** en red |
| **RDP** — Remote Desktop Protocol | **3389** | Acceso remoto a un sistema usando una **interfaz gráfica visual** (escritorio completo), a diferencia de SSH que es solo texto |

> [!info]
> Página para ver los distintos puertos -> https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml 

---

## Puertos comunes vs puertos no estándar

Los protocolos tienen puertos estándar, pero **se pueden cambiar**. Por ejemplo, un servidor web normalmente corre en el puerto 80, pero se puede configurar para usar el puerto **8080** en su lugar.

⚠️ Si usas un puerto no estándar, debes especificarlo con dos puntos `:` al conectarte:

```
Estándar  →  http://miweb.com         (puerto 80 implícito)
No estándar →  http://miweb.com:8080   (hay que indicarlo)
```

> Las aplicaciones **asumirán siempre** que se está usando el puerto estándar, así que si cambias el puerto debes indicarlo explícitamente.

---

## Truco para memorizar los puertos clave

| Puerto | Protocolo | Pista para recordarlo |
|--------|-----------|----------------------|
| 21 | FTP | **F**TP → **F**icheros → **21** (como ser mayor de edad pero para archivos 😄) |
| 22 | SSH | **S**eguro → **S**iempre el **22** |
| 80 | HTTP | La web básica, el más famoso → **80** |
| 443 | HTTPS | HTTP con **candado** 🔒 → **443** |
| 445 | SMB | Compartir en red (archivos + impresoras) → **445** |
| 3389 | RDP | **R**emoto con **D**escritorio visual → **3389** |

---

## Diagrama: ¿Cómo funcionan los puertos?

```
[Tu PC] envía una solicitud web
         │
         │  IP destino: 142.250.184.206
         │  Puerto destino: 80 (HTTP)
         │
         ▼
[Servidor de Google]
         │
         ├── Puerto 80  → Servidor web responde ✅
         ├── Puerto 22  → SSH (no aplica aquí)
         ├── Puerto 443 → HTTPS (versión segura)
         └── Puerto 21  → FTP (no aplica aquí)
```

Cada puerto es como una **puerta diferente** del mismo edificio. Tú llamas a la puerta correcta según lo que necesitas.

---

## Conceptos para repasar

- [ ] ¿Cuántos puertos existen en total? (0 - 65535)
- [ ] ¿Qué son los puertos efímeros? (los que se asignan aleatoriamente al cliente, como el puerto de origen en TCP/UDP)
- [ ] ¿Qué herramienta se usa para ver qué puertos están abiertos en un sistema? (`nmap`)
- [ ] ¿Qué significa que un puerto esté "abierto", "cerrado" o "filtrado"?
- [ ] ¿Por qué es peligroso tener el puerto 3389 (RDP) expuesto a Internet?

---

