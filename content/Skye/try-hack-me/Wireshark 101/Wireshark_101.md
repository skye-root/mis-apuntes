# Wireshark 101

---

## Tarea 3 — Descripción general de Wireshark

Al abrir Wireshark, la primera pantalla es la **página principal**. Desde aquí puedes:
- Especificar la(s) interfaz(ces) a usar
- Aplicar filtros para acotar el tráfico capturado

> Las interfaces muestran gráficos de actividad junto a su nombre. Si una interfaz tiene una **línea plana**, no tiene tráfico y no vale la pena capturar en ella.

![[Pasted image 20260520045626.png]]

Desde esta pantalla puedes:
- Hacer una **captura en vivo** sobre una interfaz activa
- Cargar un archivo **PCAP** ya existente para analizarlo

---

### Capturas de paquetes en vivo

Para ver los filtros disponibles: `Cinta verde → Administrar filtros de captura`

Algunos filtros de captura comunes:

| Nombre | Expresión |
|---|---|
| Ethernet address | `ether host 00:00:5e:00:53:00` |
| Ethernet type ARP | `ether proto 0x0806` |
| No Broadcast and no Multicast | `not broadcast and not multicast` |
| IP only | `ip` |
| IPv4 address | `host 192.0.2.1` |
| IPv6 only | `ip6` |
| TCP only | `tcp` |
| UDP only | `udp` |
| Non-DNS | `not port 53` |
| HTTP port 80 | `port 80` |
| HTTP TCP port (80) | `tcp port http` |

> Los filtros son **opcionales**. Solo ayudan a reducir el ruido y organizar mejor la captura.

Para iniciar la captura: **doble clic** en la interfaz, o clic derecho → *Iniciar captura*.

![[Pasted image 20260520045638.png]]

---

### Vista de paquetes capturados

Una vez detenida la captura (botón rojo ■), puedes analizar los paquetes.  
Para abrir un PCAP existente: `Archivo → Abrir`

Cada paquete muestra:

| Campo | Descripción |
|---|---|
| Número de paquete | Orden en la captura |
| Tiempo | Timestamp del paquete |
| Fuente | IP/MAC de origen |
| Destino | IP/MAC de destino |
| Protocolo | Protocolo usado |
| Longitud | Tamaño en bytes |
| Información | Resumen del contenido |

![[Pasted image 20260520045749.png]]

------


### Codificación por colores

Wireshark colorea los paquetes según protocolo y nivel de peligro para detectar anomalías rápidamente.

| Color | Qué indica |
|---|---|
| Rojo oscuro | Bad TCP / TCP RST |
| Rojo brillante | TCP SYN/FIN |
| Naranja | SCTP ABORT / Checksum Errors |
| Amarillo claro | TTL bajo o inesperado |
| Verde claro | HTTP |
| Verde azulado | TCP / ARP |
| Azul | UDP / DCERPC |
| Violeta claro | Routing |
| Gris | SMB / Broadcast / System Event |

![[Pasted image 20260520045716.png]]

---

## Tarea 4 — Métodos de recolección

Antes de analizar un PCAP, hay que **recolectarlo**. Estas son las consideraciones previas:

- Realizar una captura de muestra para verificar que todo funcione
- Tener suficiente **capacidad de procesamiento** según el tamaño de la red
- Tener suficiente **espacio en disco** para almacenar las capturas

---

### Descripción general de los métodos

#### Interceptores de red (Network Taps)

Dispositivo físico que se coloca **directamente sobre el cable** para capturar tráfico. Usados por equipos de Threat Hunting y Red Teams (DFIR).

Dos variantes:
- **Vampire tap** — se clava en el cable físicamente para interceptar la señal
- **Red en línea (inline tap)** — se coloca *entre* dos dispositivos de red y replica los paquetes; ejemplo: *Throwing Star LAN Tap*
 
![[Pasted image 20260520045808.png|206]]

![[Pasted image 20260520045840.png|193]]



----


#### Duplicación de puertos (Port Mirroring / SPAN)

Configuración en el switch que envía una copia de todo el tráfico de un puerto a otro. No requiere hardware adicional.

---

#### Inundaciones MAC (MAC Flooding)

Técnica usada por equipos rojos para interceptar paquetes. Consiste en **sobrecargar la tabla CAM del switch** con direcciones MAC falsas. Cuando la tabla se llena, el switch deja de aprender nuevas MACs y empieza a enviar el tráfico a **todos los puertos** (como un hub), lo que permite capturarlo.

> ⚠️ Debe usarse con consentimiento previo explícito. Muy intrusivo.

---

#### Envenenamiento ARP (ARP Poisoning)

Técnica que **redirige el tráfico** de uno o varios hosts hacia la máquina del atacante/analista, usando respuestas ARP falsas. Permite olfatear paquetes sin sobrecargar la red.

> ⚠️ Usar solo cuando no hay otras opciones disponibles y con autorización.

---

## Tarea 5 — Capturas de filtrado

Cuando el volumen de paquetes es muy alto (a veces más de 100 000), el filtrado es esencial. Existen dos tipos de filtros en Wireshark:

| Tipo | Cuándo actúa | Cómo se aplica |
|---|---|---|
| Filtro de captura | Antes de capturar | Tarea 3 — reduce lo que se guarda |
| **Filtro de visualización** | Después de capturar | Pestaña de análisis o barra superior |

Los filtros de visualización son más potentes y fáciles de usar. Se aplican sobre un PCAP ya capturado sin descartar datos.

---

### Operadores de filtrado

| Operador | Símbolo(s) |
|---|---|
| Y (AND) | `and` / `&&` |
| O (OR) | `or` / `\|\|` |
| Igual a | `eq` / `==` |
| Distinto de | `ne` / `!=` |
| Mayor que | `gt` / `>` |
| Menor que | `lt` / `<` |

También existen los operadores avanzados `contains`, `matches` y `bitwise_and`, útiles para búsquedas específicas en capturas grandes.

---

### Filtrado básico

La sintaxis general es: `protocolo.campo == valor`

#### Filtrar por IP

Muestra todos los paquetes que contengan una IP concreta (origen o destino):

```
ip.addr == <IP Address>
```

![[Pasted image 20260520045959.png]]

#### Filtrar por origen y destino

Combina dos operadores para ver solo el tráfico entre dos IPs específicas:

```
ip.src == <SRC IP Address> and ip.dst == <DST IP Address>
```

![[Pasted image 20260520050013.png]]

#### Filtrar por protocolo TCP

Filtra por número de puerto o nombre de protocolo:

```
tcp.port eq <Port #> or <Protocol Name>
```

![[Pasted image 20260520050019.png]]

#### Filtrar por protocolo UDP

Igual que TCP pero cambiando el prefijo:

```
udp.port eq <Port #> or <Protocol Name>
```

---

### Filtros para practicar

Carga cualquier PCAP y prueba estos en la barra de visualización:

| Filtro | Qué hace |
|---|---|
| `ip.addr == 192.168.1.1` | Todo el tráfico hacia o desde esa IP |
| `ip.src == 192.168.1.1 and ip.dst == 8.8.8.8` | Solo paquetes de esa IP hacia Google DNS |
| `tcp.port eq 80` | Solo tráfico HTTP |
| `tcp.port eq 443` | Solo tráfico HTTPS |
| `udp.port eq 53` | Solo consultas/respuestas DNS |
| `tcp.port eq 80 or tcp.port eq 443` | HTTP y HTTPS a la vez |
| `ip.addr == 192.168.1.1 and tcp.port eq 443` | HTTPS de una IP concreta |
| `!(ip.addr == 192.168.1.1)` | Excluir completamente una IP |
| `tcp.flags.syn == 1` | Solo paquetes SYN (inicio de conexión TCP) |
| `http.request.method == "GET"` | Solo peticiones HTTP GET |

---

## Tarea 6 — Disección de paquetes

Wireshark usa las capas del modelo OSI para descomponer cada paquete. Al hacer **doble clic** en cualquier paquete, se abre su detalle con entre 5 y 7 capas desplegables.

![[Pasted image 20260520050035.png|414]]

---

### Capas de un paquete HTTP (ejemplo real)

![[Pasted image 20260520050043.png]]

#### Capa 1 — Frame (Marco)

Información de la capa física: tamaño del paquete, timestamp de llegada, interfaz de captura y protocolo de color asignado.

![[Pasted image 20260520050049.png|430]]

#### Capa 2 — Ethernet II (Fuente MAC)

Direcciones MAC de origen y destino. Corresponde a la capa de enlace de datos del modelo OSI. Identifica los dispositivos físicos en la red local.

![[Pasted image 20260520050057.png]]
#### Capa 3 — Internet Protocol v4 (Fuente IP)

Direcciones IPv4 de origen y destino. Corresponde a la capa de red. También muestra TTL, flags y el protocolo encapsulado (TCP, UDP...).

![[Pasted image 20260520050102.png|376]]

#### Capa 4 — TCP/UDP (Protocolo de transporte)

Puertos de origen y destino, números de secuencia y acknowledgment, flags TCP (SYN, ACK, PSH...) y tamaño de ventana. Corresponde a la capa de transporte.

![[Pasted image 20260520050110.png|543]]

#### Errores de protocolo

Sub-sección de la capa 4. Muestra segmentos TCP que llegaron fragmentados y debieron ser reensamblados para reconstruir el mensaje completo.

![[Pasted image 20260520050118.png]]

#### Capa 5 — HTTP/FTP/SMB (Protocolo de aplicación)

Contenido específico del protocolo de aplicación usado. En HTTP muestra: método, código de respuesta, headers (Content-Type, Server, Cache-control...) y URI de la petición. Corresponde a la capa de aplicación del modelo OSI.

![[Pasted image 20260520050131.png|611]]

#### Datos de la aplicación

Extensión de la capa 5. Muestra el payload real: por ejemplo, el HTML devuelto por un servidor web.

![[Pasted image 20260520050126.png]]

---

### Resumen: ¿qué pregunta responde cada capa?

| Capa | Nombre en Wireshark | Pregunta que responde |
|---|---|---|
| 1 | Frame | ¿Cuándo llegó y en qué interfaz? |
| 2 | Ethernet II | ¿Qué dispositivos físicos (MAC)? |
| 3 | Internet Protocol | ¿Entre qué IPs viaja? |
| 4 | TCP / UDP | ¿Por qué puertos y cómo se conectan? |
| — | Errores de protocolo | ¿Hubo fragmentación TCP? |
| 5 | HTTP / FTP / SMB | ¿Qué está haciendo la aplicación? |
| 5+ | Datos de aplicación | ¿Cuál es el contenido real? |

---

## Tarea 7 — Tráfico ARP

**ARP (Address Resolution Protocol)** es un protocolo de capa 2 que conecta direcciones IP con direcciones MAC. Opera mediante dos tipos de mensaje:

| Opcode | Tipo | Descripción |
|---|---|---|
| 1 | Request (Solicitud) | "¿Quién tiene esta IP? Dímelo tú" — se envía a Broadcast |
| 2 | Reply (Respuesta) | "Esa IP es mía, mi MAC es esta" — respuesta directa al solicitante |

![[Pasted image 20260520050147.png]]

> Para que Wireshark resuelva nombres de fabricante a partir de la MAC: `Ver → Resolución de nombre → Resolver direcciones físicas`

> Tráfico sospechoso: muchas solicitudes ARP desde una fuente no reconocida puede indicar un escaneo de red o un intento de ARP Poisoning.

---

### Paquetes ARP de solicitud (Opcode 1)

Campos clave a observar:

- **Opcode: request (1)** — confirma que es una solicitud
- **Target MAC address: 00:00:00:00:00:00** — está vacía porque aún no sabe a quién preguntar
- **Target IP address** — la IP que está buscando

![[Pasted image 20260520050238.png]]

---

### Paquetes ARP de respuesta (Opcode 2)

Campos clave a observar:

- **Opcode: reply (2)** — confirma que es una respuesta
- **Sender MAC address** — la MAC del dispositivo que responde
- **Sender IP address** — la IP que le corresponde

![[Pasted image 20260520050246.png|455]]

> ARP es uno de los protocolos más simples de analizar: solo hay que identificar si es solicitud o respuesta, y quién la envía.

---

### Filtros ARP para Wireshark

| Filtro | Qué hace |
|---|---|
| `arp` | Muestra solo tráfico ARP |
| `arp.opcode == 1` | Solo solicitudes ARP (quién tiene X IP) |
| `arp.opcode == 2` | Solo respuestas ARP (X IP está en X MAC) |
| `eth.addr == xx:xx:xx:xx:xx:xx` | Todo el tráfico de una MAC concreta |
| `arp.src.hw_mac == xx:xx:xx:xx:xx:xx` | Solicitudes ARP enviadas por esa MAC |
| `arp.dst.hw_mac == 00:00:00:00:00:00` | Solicitudes ARP (target MAC vacía = broadcast) |
| `arp.src.proto_ipv4 == 192.168.1.1` | ARP originado desde esa IP |
| `arp.duplicate-address-detected` | Detectar posible ARP Poisoning (IP duplicada) |

---

## Tarea 8 — Tráfico ICMP

**ICMP (Internet Control Message Protocol)** es un protocolo de capa 3 usado para diagnóstico y control de red. Las herramientas más comunes que lo usan son `ping` y `traceroute`.

Un intercambio ICMP básico tiene dos paquetes:

![[Pasted image 20260520050258.png]]

---

### Type y Code

Cada paquete ICMP tiene dos campos clave para identificarlo:

| Type | Significado | Code | Detalle |
|---|---|---|---|
| 0 | Echo Reply (ping reply) | 0 | — |
| 8 | Echo Request (ping request) | 0 | — |
| 3 | Destination Unreachable | 0 | Red inalcanzable |
| 3 | Destination Unreachable | 1 | Host inalcanzable |
| 3 | Destination Unreachable | 3 | Puerto inalcanzable |
| 11 | Time Exceeded | 0 | TTL expirado en tránsito (traceroute) |
| 11 | Time Exceeded | 1 | Tiempo excedido en reensamblado |

> **Type** = categoría del mensaje. **Code** = subtipo dentro de esa categoría.
> En ping el Code siempre es 0 porque no hay subtipos. En Type 3 y 11 el Code sí aporta información útil.
> Si ves Types o Codes que no corresponden a la situación, es señal de actividad sospechosa.

---

### Solicitud ICMP (Type 8)

Campos importantes:

- **Type: 8** — confirma que es un Echo Request
- **Code: 0** — sin subtipo
- **Timestamp** — hora en que se envió el ping
- **Data** — cadena de bytes de relleno (normalmente aleatoria)

![[Pasted image 20260520050310.png|538]]

---

### Respuesta ICMP (Type 0)

Casi idéntica a la solicitud. La única diferencia clave:

- **Type: 0** — confirma que es un Echo Reply
- **Code: 0**

![[Pasted image 20260520050318.png|507]]

----


### El campo Data y ICMP Tunneling

Para copiar la cadena de datos: `clic derecho sobre el campo Data → Copy → Value` (te da los bytes en hex).

En un ping normal el campo Data contiene basura aleatoria, solo está ahí para dar tamaño al paquete. Sin embargo, en un ataque llamado **ICMP Tunneling** un atacante mete información real dentro de ese campo para exfiltrar datos o mantener comunicación encubierta, aprovechando que muchos firewalls permiten ICMP sin inspeccionarlo.

Señales de alerta en el campo Data:
- Longitud inusualmente grande
- Contenido legible o estructurado al decodificarlo en ASCII/UTF-8
- Todos los paquetes tienen exactamente la misma cadena de datos

---

### Filtros ICMP para Wireshark

| Filtro | Qué hace |
|---|---|
| `icmp` | Todo el tráfico ICMP |
| `icmp.type == 8` | Solo Echo Requests (pings enviados) |
| `icmp.type == 0` | Solo Echo Replies (respuestas) |
| `icmp.type == 3` | Destination Unreachable |
| `icmp.type == 11` | Time Exceeded (útil para ver traceroute) |
| `icmp.code == 0` | Filtrar por código específico |
| `ip.src == x.x.x.x and icmp` | ICMP desde una IP concreta |
| `icmp.data_len > 100` | Paquetes ICMP con Data inusualmente grande (posible tunneling) |

---

## Tarea 9 — Tráfico TCP

**TCP (Transmission Control Protocol)** es un protocolo de capa 4 orientado a conexión. Garantiza la entrega ordenada de paquetes mediante secuenciación y confirmaciones.

> Los paquetes TCP deben analizarse como un conjunto que cuenta una historia, no uno por uno de forma aislada.

![[Pasted image 20260520050334.png]]

---

### Three-Way Handshake

Toda conexión TCP normal comienza con este intercambio:

| Paso | Dirección | Flag | Significado |
|---|---|---|---|
| 1 | Cliente → Servidor | `SYN` | "Quiero conectarme" |
| 2 | Servidor → Cliente | `SYN, ACK` | "De acuerdo, confirmado" |
| 3 | Cliente → Servidor | `ACK` | "Perfecto, conectados" |

![[Pasted image 20260520050341.png]]

---

### Números de secuencia y acknowledgment

Son los mecanismos que usa TCP para garantizar entrega completa y en orden.

- **Sequence number (Seq)** — identifica este paquete. El cliente elige un número al azar al inicio. Wireshark lo muestra como `0` (relativo) por defecto para facilitar la lectura.
- **Acknowledgment number (Ack)** — le dice al otro extremo "he recibido todo hasta aquí, ahora espero este número siguiente". En el SYN inicial vale `0` porque el cliente aún no ha recibido nada.

Flujo normal en el handshake:

| Paquete | Seq | Ack | Explicación |
|---|---|---|---|
| SYN | 0 | 0 | "Empiezo en 0, no he recibido nada aún" |
| SYN-ACK | 0 | 1 | "Yo también empiezo en 0, confirmo tu SYN" |
| ACK | 1 | 1 | "Confirmo tu SYN-ACK, conectados" |

> Para ver los números de secuencia reales (raw) en lugar de los relativos:
> `Editar → Preferencias → Protocolos → TCP → desmarcar "Relative sequence numbers"`

![[Pasted image 20260520050501.png|382]]

![[Pasted image 20260520050508.png]]

---


### Lectura de flags TCP

| Flag | Hex | Significado |
|---|---|---|
| SYN | 0x002 | Inicio de conexión |
| ACK | 0x010 | Confirmación de recepción |
| SYN-ACK | 0x012 | Respuesta al SYN |
| RST | 0x004 | Reseteo / puerto cerrado |
| RST-ACK | 0x014 | Reseteo con confirmación |
| FIN | 0x001 | Cierre de conexión |
| PSH-ACK | 0x018 | Envío de datos con confirmación |

---

### Patrones sospechosos

| Patrón | Qué indica |
|---|---|
| Muchos SYN sin SYN-ACK de respuesta | Escaneo de puertos (SYN scan) |
| SYN seguidos de RST-ACK | Puerto cerrado — típico en escaneos Nmap |
| RST inesperado en mitad de sesión | Conexión forzada a terminar |
| Handshake incompleto repetido | Posible DoS o escaneo sigiloso |

---

### Filtros TCP para Wireshark

| Filtro | Qué hace |
|---|---|
| `tcp` | Todo el tráfico TCP |
| `tcp.flags.syn == 1` | Solo paquetes SYN |
| `tcp.flags.syn == 1 and tcp.flags.ack == 0` | Solo SYN puros (inicio de conexión) |
| `tcp.flags.reset == 1` | Solo paquetes RST |
| `tcp.flags.fin == 1` | Solo paquetes FIN (cierre de conexión) |
| `tcp.port == 80` | Tráfico TCP en puerto 80 |
| `tcp.stream eq 0` | Ver todos los paquetes de una misma conversación |
| `tcp.analysis.flags` | Paquetes con anomalías detectadas por Wireshark |
| `tcp.analysis.retransmission` | Retransmisiones (posible pérdida de paquetes) |

---

## Tarea 10 — Tráfico DNS

**DNS (Domain Name System)** resuelve nombres de dominio a direcciones IP. Al analizar tráfico DNS hay tres cosas que siempre verificar:

| Verificación | Qué buscar | Alerta si... |
|---|---|---|
| Consulta-Respuesta | Cada query tiene su reply | No hay respuesta o hay respuestas sin query |
| Solo servidores DNS | El destino debe ser un DNS conocido | Consultas a IPs desconocidas |
| UDP | DNS viaja por UDP puerto 53 | Aparece TCP 53 (investiga) |

![[Pasted image 20260520050523.png]]

---

### ¿Por qué DNS por TCP es sospechoso?

DNS usa **UDP puerto 53** por defecto porque es rápido y las respuestas son pequeñas. TCP solo se usa en casos muy específicos como transferencias de zona entre servidores.

Ver DNS por TCP en tráfico normal puede indicar:
- Intento de **transferencia de zona** no autorizada (obtener toda la lista de dominios internos)
- **DNS Tunneling**: datos ocultos dentro de consultas DNS para exfiltrar información atravesando firewalls

> Regla rápida: **UDP 53 = normal. TCP 53 = investiga.**

---

### Cómo leer la columna Info

```
Standard query 0x528e PTR 8.8.8.8.in-addr.arpa
Standard query response 0x528e PTR 8.8.8.8.in-addr.arpa PTR google-public-dns-a.google.com
```

| Parte | Significado |
|---|---|
| `Standard query` | Es una consulta |
| `Standard query response` | Es una respuesta |
| `0x528e` | Transaction ID — empareja consulta con respuesta |
| `PTR` | Tipo de consulta |
| `8.8.8.8.in-addr.arpa` | IP consultada en formato inverso |
| `google-public-dns-a.google.com` | Respuesta del servidor |

Tipos de consulta comunes:

| Tipo | Pregunta que hace |
|---|---|
| A | ¿Qué IPv4 tiene este dominio? |
| AAAA | ¿Qué IPv6 tiene este dominio? |
| PTR | ¿Qué nombre tiene esta IP? (reverse lookup) |
| MX | ¿Cuál es el servidor de correo? |
| CNAME | ¿Cuál es el alias de este dominio? |

---

### Consulta DNS (query)

Campos importantes:

- **UDP Dst Port: 53** — va al puerto 53 por UDP → normal
- **Transaction ID** — identificador único de esta consulta
- **Answer RRs: 0** — sin respuesta aún, es solo una pregunta
- **Queries** — el dominio o IP que se está consultando y el tipo

![[Pasted image 20260520050539.png]]

---

### Respuesta DNS (response)

- **Transaction ID** — debe coincidir con el de la consulta → así se verifica que están emparejadas
- **Answer RRs: 1** — ya hay una respuesta
- **Queries** — repite la pregunta original
- **Answers** — la respuesta del servidor DNS
- **[Request In: N]** — Wireshark enlaza directamente al paquete de la consulta original

![[Pasted image 20260520050545.png]]

---

### Filtros DNS para Wireshark

| Filtro | Qué hace |
|---|---|
| `dns` | Todo el tráfico DNS |
| `dns.flags.response == 0` | Solo consultas DNS |
| `dns.flags.response == 1` | Solo respuestas DNS |
| `dns.qry.name == "example.com"` | Consultas por dominio específico |
| `dns.qry.type == 1` | Solo consultas tipo A (IPv4) |
| `dns.qry.type == 28` | Solo consultas tipo AAAA (IPv6) |
| `tcp.port == 53` | DNS por TCP (sospechoso en tráfico normal) |
| `udp.port == 53` | DNS por UDP (normal) |
| `dns.resp.len > 512` | Respuestas DNS grandes (posible tunneling) |

---

## Tarea 11 — Tráfico HTTP

**HTTP (HyperText Transfer Protocol)** opera en el puerto 80 y es texto plano, lo que lo hace el protocolo más fácil de analizar. A diferencia de HTTPS, todo es legible directamente en Wireshark sin necesidad de descifrar nada.

HTTP va directo al grano: no tiene handshake propio, usa el de TCP y luego empieza a transferir datos.

> Aunque HTTP cada vez se usa menos frente a HTTPS, sigue siendo relevante y muy fácil de analizar cuando aparece.

---

### Estructura de un paquete HTTP (solicitud GET)

Información útil que puedes extraer:

| Campo | Ejemplo | Para qué sirve |
|---|---|---|
| Método + URI | `GET /download.html HTTP/1.1` | Qué archivo se está pidiendo |
| Host | `www.ejemplo.com` | A qué dominio se conecta |
| User-Agent | `Mozilla/5.0 (Windows NT 5.1...)` | Qué navegador y OS usa el cliente |
| Full request URI | URL completa reconstruida | Ver la URL exacta incluyendo parámetros |
| Response in frame | `[Response in frame: 38]` | Enlace directo a la respuesta del servidor |

> En seguridad: busca SQLi en la URI, User-Agents inusuales o sospechosos, y descargas de archivos inesperados.

![[Pasted image 20260520050557.png]]

---

### Flujo completo de una sesión HTTP

Los paquetes TCP+HTTP cuentan esta historia en orden:

| Paquetes | Qué ocurre |
|---|---|
| 1-3 | TCP Handshake (SYN → SYN-ACK → ACK) |
| 4 | HTTP GET — el cliente pide el recurso |
| 5-36 | TCP transfiere los datos en segmentos |
| 38 | HTTP 200 OK — el servidor responde con el contenido |
| 39-40 | TCP FIN — cierre de conexión |

![[Pasted image 20260520050642.png]]

---

### Herramientas de análisis integradas en Wireshark

#### Jerarquía de protocolos
`Estadísticas → Jerarquía de protocolos`

Vista de árbol con todos los protocolos presentes en el PCAP, su porcentaje de paquetes y bytes. Útil para detectar protocolos que no deberían estar en la red.

![[Pasted image 20260520050739.png]]

#### Exportar objetos HTTP
`Archivo → Exportar objetos → HTTP`

Lista y permite descargar todos los archivos transferidos por HTTP en la captura: HTML, imágenes, scripts, ejecutables. Muy útil en análisis de malware para extraer archivos descargados sin reconstruirlos manualmente.

![[Pasted image 20260520050745.png]]

#### Endpoints (Puntos finales)
`Estadísticas → Puntos finales`

Lista todas las IPs que participaron en la captura con estadísticas de paquetes enviados y recibidos. Útil para identificar qué IP genera más tráfico o se comunica con destinos inesperados.

![[Pasted image 20260520050749.png]]

---

### Filtros HTTP para Wireshark

| Filtro | Qué hace |
|---|---|
| `http` | Todo el tráfico HTTP |
| `http.request` | Solo solicitudes HTTP |
| `http.response` | Solo respuestas HTTP |
| `http.request.method == "GET"` | Solo peticiones GET |
| `http.request.method == "POST"` | Solo peticiones POST |
| `http.response.code == 200` | Respuestas exitosas |
| `http.response.code == 404` | Recursos no encontrados |
| `http.response.code == 500` | Errores del servidor |
| `http.request.uri contains "admin"` | URIs que contienen una palabra clave |
| `http.user_agent contains "curl"` | Detectar User-Agents inusuales |
| `http and ip.src == x.x.x.x` | HTTP desde una IP concreta |

---

## Tarea 12 — Tráfico HTTPS

**HTTPS** = HTTP + cifrado TLS. Todo el contenido viaja cifrado, lo que lo hace más difícil de analizar que HTTP. Antes de intercambiar datos, cliente y servidor realizan un **TLS Handshake** para acordar cómo cifrar la comunicación.

---

### TLS Handshake — paso a paso

`[captura — lista de paquetes HTTPS mostrando el handshake completo]`

#### Paso 1 — Client Hello
El cliente inicia el handshake indicando las versiones TLS/SSL que soporta y los algoritmos de cifrado disponibles (*Cipher Specs*). El servidor elegirá uno.

Campos clave:
- `Handshake Message Type: Client Hello (1)`
- `Version: SSL 3.0` — versión que propone el cliente
- `Cipher Specs` — lista de algoritmos que ofrece

![[Pasted image 20260520051253.png]]

#### Paso 2 — Server Hello + Certificate
El servidor responde eligiendo versión y algoritmo, envía su certificado SSL para autenticarse, y cierra con `Server Hello Done`.

Campos clave:
- `Handshake Type: Server Hello (2)` — acepta la conexión
- `Session ID` — identificador único de esta sesión
- `Cipher Suite: TLS_RSA_WITH_AES_256_CBC_SHA` — algoritmo elegido
- `Handshake Type: Certificate (11)` — certificado del servidor
- `Handshake Type: Server Hello Done (14)` — fin de la propuesta

![[Pasted image 20260520051246.png|618]]

#### Paso 3 — Client Key Exchange
El cliente usa la clave pública del certificado para cifrar y enviar el **Pre-Master Secret**. Solo el servidor puede descifrarlo. Con ese secreto ambos lados generan independientemente la misma clave de sesión.

Campos clave:
- `Handshake Type: Client Key Exchange (16)` — envío del secreto cifrado
- `Change Cipher Spec` — "a partir de ahora hablo cifrado"
- `Encrypted Handshake Message` — primer mensaje cifrado de prueba


![[Pasted image 20260520051154.png]]

#### Paso 4 — Server confirma el túnel
El servidor también envía `Change Cipher Spec` + `Encrypted Handshake Message`. El túnel queda establecido. Todo el tráfico posterior es ilegible sin la clave privada.
![[Pasted image 20260520051141.png]]
#### Application Data (tráfico cifrado)
Una vez establecido el túnel, todos los paquetes muestran `Encrypted Application Data`. Sin la clave privada del servidor, solo ves bytes sin sentido.

![[Pasted image 20260520051133.png|548]]

---

### Descifrar HTTPS con clave RSA privada

Si tienes la clave privada del servidor (laboratorio o servidor propio), Wireshark puede descifrar el tráfico en tiempo real.

**Ruta:** `Editar → Preferencias → Protocolos → TLS → [+]`

| Campo | Valor |
|---|---|
| IP address | IP del servidor |
| Port | `start_tls` |
| Protocol | `http` |
| Key File | ruta al archivo `.key` RSA |

![[Pasted image 20260520051305.png|566]]

Una vez cargada la clave, los paquetes que antes mostraban `SSLv3 Application Data` ahora se ven como `HTTP GET /archivo` en texto claro, y puedes usar `Archivo → Exportar objetos → HTTP` para extraer los archivos transferidos.

![[Pasted image 20260520051347.png]]

![[Pasted image 20260520051407.png]]

![[Pasted image 20260520051412.png]]

---

### ¿Qué puedes analizar en HTTPS sin la clave?

Aunque no puedas leer el contenido, sí puedes obtener:

| Dato visible | Para qué sirve |
|---|---|
| IP/dominio del servidor | Detectar conexiones a IPs sospechosas |
| Certificado SSL | Verificar legitimidad, fechas, emisor |
| Versión de TLS | Detectar versiones obsoletas (SSL 2.0, SSL 3.0) |
| Algoritmo de cifrado | Detectar cifrados débiles |
| Tamaño y frecuencia de paquetes | Detectar patrones de exfiltración |

---

### Filtros HTTPS/TLS para Wireshark

| Filtro | Qué hace |
|---|---|
| `tls` | Todo el tráfico TLS/HTTPS |
| `tls.handshake` | Solo paquetes del handshake TLS |
| `tls.handshake.type == 1` | Solo Client Hello |
| `tls.handshake.type == 2` | Solo Server Hello |
| `tls.handshake.type == 11` | Solo Certificate |
| `tls.record.version == 0x0300` | Tráfico SSL 3.0 (versión obsoleta, sospechoso) |
| `tls.record.version == 0x0303` | Tráfico TLS 1.2 |
| `tcp.port == 443` | Todo el tráfico HTTPS por puerto estándar |
| `ip.addr == x.x.x.x and tls` | HTTPS hacia/desde una IP concreta |

---

## Tarea 13 — Análisis de PCAP de exploits

Esta tarea aplica todo lo aprendido en un caso real: el análisis forense de un exploit llamado **Zerologon**.

---

### Zerologon (CVE-2020-1472)

Vulnerabilidad crítica en Windows Active Directory (2020). Permite a un atacante en la red local **resetear la contraseña del controlador de dominio a vacía** sin autenticarse, tomando control total del dominio. El nombre viene de que el exploit usa ceros como valor criptográfico para saltarse la autenticación de Netlogon.

**Escenario del PCAP:**

| IP | Rol |
|---|---|
| `192.168.100.6` | Controlador de dominio Windows (víctima) |
| `192.168.100.128` | Atacante |

![[Pasted image 20260520051451.png]]

---

### Proceso de análisis forense

#### Paso 1 — Vista general y descarte de ruido

Al abrir el PCAP se ve tráfico normal de fondo: OpenVPN, ARP, SSDP. Se descarta como ruido de red legítimo y se buscan protocolos fuera de lo común.

#### Paso 2 — Identificar protocolos anómalos

Aparecen **DCERPC** y **EPM**, protocolos de llamadas remotas de Windows que no deberían verse en ese volumen en una red normal.

| Protocolo | Qué es | Por qué es sospechoso aquí |
|---|---|---|
| **EPM** (Endpoint Mapper) | "Directorio" de RPC, indica en qué puerto escucha cada servicio | Se usa para localizar el servicio Netlogon |
| **DCERPC** | Permite ejecutar funciones en otro sistema de forma remota | El exploit lo usa para atacar Netlogon |
| **DRSUAPI** | Protocolo de replicación entre controladores de dominio | Lo usa secretsdump para extraer hashes |
| **SMB2/3** | Protocolo de compartición de archivos de Windows | Lo abusa secretsdump para moverse lateralmente |

#### Paso 3 — Aislar al atacante

Todo el tráfico anómalo proviene de `192.168.100.128`. Filtro aplicado:
```
ip.src == 192.168.100.128
```

![[Pasted image 20260520051506.png]]

#### Paso 4 — Reconstruir la secuencia del ataque

**Fase 1 — Zerologon (toma de control)**

```
EPM          → pregunta dónde está el servicio Netlogon
DCERPC       → se conecta al servicio
NetrServerReqChallenge (x múltiples) → envía ceros como desafío
STATUS_ACCESS_DENIED (varios intentos) → el exploit falla y reintenta
NetrServerAuthenticate3 exitoso → contraseña del DC reseteada a vacía
```

> El exploit tiene 1/256 de probabilidad de éxito por intento, por eso se ven múltiples reintentos antes del éxito.

**Fase 2 — secretsdump (extracción de hashes)**

Una vez con control del dominio, el atacante ejecuta **secretsdump** (herramienta de Impacket) para extraer todos los hashes de contraseñas del dominio.

```
SMB2/3 Encrypted  → conexión al controlador
DRSUAPI: DsGetNCChanges request → petición de replicación falsa
                                   para obtener todos los hashes
```

![[Pasted image 20260520051512.png]]

---

### IOC (Indicadores de Compromiso) de este ataque

Los IOC son artefactos en el tráfico que confirman que ocurrió un ataque específico.

| IOC | Qué indica |
|---|---|
| Múltiples `NetrServerReqChallenge` desde la misma IP | Intento de Zerologon |
| `STATUS_ACCESS_DENIED` repetido seguido de éxito | Exploit de fuerza bruta criptográfica |
| `DRSUAPI DsGetNCChanges` desde una IP que no es DC | secretsdump / extracción de hashes |
| Tráfico SMB2 cifrado masivo desde host no autorizado | Movimiento lateral o exfiltración |

> Sin conocimiento previo del exploit se llega igualmente: los protocolos anómalos (DCERPC, DRSUAPI) desde una sola IP ya son suficiente señal para investigar.

---

### Metodología de análisis de un PCAP desconocido

```
1. Vista general → Estadísticas → Jerarquía de protocolos
2. Identificar protocolos inusuales o inesperados
3. Ver Endpoints → identificar qué IP genera más tráfico anómalo
4. Filtrar por esa IP: ip.src == x.x.x.x
5. Seguir la secuencia cronológica de paquetes
6. Construir hipótesis del ataque
7. Documentar IOC para el informe
```

---

### Filtros útiles para análisis de exploits

| Filtro | Qué hace |
|---|---|
| `dcerpc` | Ver llamadas RPC remotas |
| `smb2` | Ver tráfico SMB2/3 |
| `drsuapi` | Ver tráfico de replicación AD (sospechoso si no viene de un DC) |
| `ip.src == x.x.x.x` | Aislar tráfico del atacante |
| `tcp.flags.syn == 1 and tcp.flags.ack == 0` | Ver todos los intentos de conexión nuevos |
| `frame contains "password"` | Buscar strings en los paquetes |
| `frame contains "STATUS_ACCESS_DENIED"` | Detectar intentos fallidos de autenticación |

---
