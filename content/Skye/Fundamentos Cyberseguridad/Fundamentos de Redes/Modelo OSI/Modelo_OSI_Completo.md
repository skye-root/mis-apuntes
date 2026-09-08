# 🧱 Modelo OSI — Guía Completa


## ¿Qué es el Modelo OSI?

**OSI** = *Open Systems Interconnection* (Interconexión de Sistemas Abiertos)

Es un **marco de referencia** que determina cómo todos los dispositivos conectados en red enviarán, recibirán e interpretarán los datos.

La gran ventaja del modelo OSI es que los dispositivos pueden tener diferentes funciones y diseños, y aun así comunicarse perfectamente entre sí, porque todos siguen las mismas reglas del modelo.

---

## 🧠 Truco para recordar las 7 capas (de abajo hacia arriba)

> **"Por Dónde Necesito Transportar Esos Paquetes Actualmente"**

| Inicial | Capa | # |
|---------|------|---|
| **P**or | **P**hysical | 1 |
| **D**ónde | **D**ata Link | 2 |
| **N**ecesito | **N**etwork | 3 |
| **T**ransportar | **T**ransport | 4 |
| **E**sos | **S**ession | 5 |
| **P**aquetes | **P**resentation | 6 |
| **A**ctualmente | **A**pplication | 7 |

---

## Las 7 Capas en detalle

---

### 🟣 Capa 1 — Physical (Física)

> *"El mundo real: cables, señales y electricidad"*

Es la capa más básica y una de las más fáciles de entender. Hace referencia a los **componentes físicos del hardware** utilizados en redes.

- Los dispositivos usan **señales eléctricas** para transferir datos entre sí
- Esas señales viajan en formato **binario (1s y 0s)**
- Es la capa más baja de todas — no entiende de IPs ni MACs, solo de voltaje

**Ejemplo:** Los cables **Ethernet** que conectan físicamente un dispositivo a un switch o router operan en esta capa.
![[Pasted image 20260508172341.png|169]]

```
[PC] ————— cable Ethernet ————— [Switch]
              ↕ señales eléctricas
              ↕ 1 0 1 0 1 1 0 1...
```

> 📌 Sin esta capa no hay nada — es la base física de toda comunicación en red.

---

### 🟣 Capa 2 — Data Link (Enlace de Datos)

> *"Asegura que el paquete llegue al dispositivo correcto dentro de la red local"*

Esta capa se centra en el **direccionamiento físico** de la transmisión. Su trabajo es tomar el paquete que viene de la capa de red (que ya incluye la dirección IP del destino) y **añadirle la dirección MAC** del dispositivo receptor para que pueda entregarse dentro de la red local.

**¿Qué es la NIC?**
Dentro de cada ordenador con conexión a la red hay una **NIC** *(Network Interface Card / Tarjeta de Interfaz de Red)*. Esta tarjeta tiene una **dirección MAC única** que la identifica.

**Sobre las direcciones MAC:**
- Las establece el **fabricante** y están grabadas en la tarjeta
- Técnicamente **no se pueden cambiar**, aunque sí se pueden **falsificar** (MAC Spoofing)
- Cuando se envía información por la red, es la dirección **MAC física** la que se usa para saber exactamente a dónde enviarlo dentro de la red local

**Responsabilidades adicionales:**
- Presentar los datos en un formato adecuado para su transmisión
- Controlar el flujo de datos entre dispositivos en la misma red

```
[Capa 3 entrega paquete con IP destino]
          ↓
[Capa 2 añade la MAC del receptor]
          ↓
[Frame listo → se envía por el cable]
```

> ⚠️ La IP te lleva hasta la red correcta. La MAC te lleva hasta el dispositivo exacto dentro de esa red.

---

### ⬛ Capa 3 — Network (Red)

> *"El GPS de los datos — encuentra la mejor ruta entre redes"*

Esta es la capa donde ocurre la **magia del enrutamiento y el reensamblaje de datos**. Su función principal es determinar la ruta más óptima por la que deben viajar los fragmentos de datos desde el origen hasta el destino, aunque esto implique pasar por múltiples redes distintas.

Todo en esta capa se gestiona mediante **direcciones IP** (ej: `192.168.1.100`).

Los dispositivos capaces de entregar paquetes usando direcciones IP se conocen como **dispositivos de capa 3**, siendo el **router** el ejemplo más común.

---

#### Protocolos de enrutamiento

Existen protocolos específicos que determinan cuál es la ruta "óptima" que deben seguir los datos. Los principales son:

**OSPF — Open Shortest Path First**
- Traducción: "Primero el camino más corto abierto"
- Es un protocolo de enrutamiento dinámico que calcula la ruta más eficiente
- Los routers que usan OSPF comparten información entre sí sobre el estado de la red para construir un mapa completo y elegir el mejor camino
	- **Shortest Path** → ruta más eficiente hacia el destino.
	- **Open** → protocolo abierto, compatible con routers de distintos fabricantes y estandarizado.

**RIP — Routing Information Protocol**
- Traducción: "Protocolo de Información de Enrutamiento"
- Uno de los protocolos de enrutamiento más antiguos
- Decide la ruta basándose en la cantidad de saltos (hops) entre routers — elige siempre la ruta con menos saltos

---

#### ¿Cómo decide la capa 3 qué ruta tomar?

Los factores que determinan qué ruta es la más óptima son:

- **¿Cuál es la ruta más corta?**
  La que tiene la menor cantidad de dispositivos por los que el paquete necesita pasar para llegar al destino.

- **¿Cuál es la ruta más fiable?**
  ¿Se han perdido paquetes en esa ruta anteriormente? Si una ruta tiene historial de fallos, se prefiere otra más estable.

- **¿Qué ruta ofrece la conexión física más rápida?**
  No es lo mismo una ruta que usa cable de cobre (más lenta) que una que usa fibra óptica (considerablemente más rápida).

```
[Computer A] ──► [Router 1] ──► [Router 2] ──► [Computer B]
                      ↕
               [Router 3] (ruta alternativa)

La capa 3 analiza: ¿cuál camino es más corto, fiable y rápido?
```

> 📌 La capa 3 no solo envía datos, también los **reensambla** al llegar, juntando todos los fragmentos en el orden correcto.

---

### 🔵 Capa 4 — Transport (Transporte)

> *"Decide si los datos viajan con garantía o a toda velocidad"*

La capa 4 desempeña un papel vital en la transmisión de datos y puede resultar un poco difícil de entender al principio. Cuando se envían datos entre dispositivos, estos siguen uno de dos protocolos diferentes según la situación:

- **TCP**
- **UDP**

---

#### TCP — Transmission Control Protocol
*"El mensajero que confirma que todo llegó bien y en orden"*

TCP está diseñado pensando en la **fiabilidad y la garantía**. Mantiene una conexión constante entre los dos dispositivos durante todo el tiempo que dura la transmisión. Además, incorpora **comprobación de errores**, lo que garantiza que los fragmentos enviados desde la capa de sesión (capa 5) se hayan recibido y reensamblado en el mismo orden correcto.

| ✅ Ventajas de TCP | ❌ Desventajas de TCP |
|-------------------|----------------------|
| Garantiza la exactitud de los datos | Requiere una conexión fiable entre los dos dispositivos. Si no se recibe un fragmento, no se puede usar el resto |
| Sincroniza dos dispositivos para evitar que se saturen de datos entre sí | Una conexión lenta puede limitar el rendimiento del otro dispositivo, ya que la conexión permanece reservada durante todo el proceso |
| Realiza muchos más procesos para garantizar la fiabilidad | TCP es significativamente más lento que UDP porque los dispositivos tienen que hacer mucho más trabajo |

**¿Cuándo se usa TCP?**
Para situaciones donde los datos deben estar completos e intactos: compartir archivos, navegar por internet, enviar correos electrónicos. De nada sirve tener un archivo a medias.

![[Pasted image 20260508180750.png|467]]

Podemos ver cómo la imagen de un gato se descompone en pequeños fragmentos de datos (conocidos como paquetes) desde el "servidor web", donde el "ordenador" reconstruye la imagen del gato en el orden correcto.

---

#### UDP — User Datagram Protocol
*"El mensajero que lanza el paquete y no mira atrás"*

UDP no es tan avanzado como TCP. No tiene comprobación de errores ni garantía de entrega. Cualquier dato enviado a través de UDP se manda al ordenador destino, **llegue o no llegue** — no hay sincronización entre los dispositivos ni garantía alguna. Solo queda esperar lo mejor y cruzar los dedos.

| ✅ Ventajas de UDP | ❌ Desventajas de UDP |
|-------------------|----------------------|
| Es mucho más rápido que TCP | No le importa si se reciben los datos |
| Deja en manos de la aplicación (software de usuario) la decisión sobre el control de velocidad de envío | Ofrece bastante flexibilidad a los desarrolladores, pero sin control garantizado |
| No reserva una conexión continua en el dispositivo como hace TCP | Las conexiones inestables dan como resultado una experiencia terrible para el usuario |

**¿Cuándo se usa UDP?**
- Cuando se envían **pequeñas cantidades de datos** (ej: ARP, DHCP)
- Transmisión de **video en streaming** (si algunos píxeles se pierden, no importa — son solo fragmentos de datos perdidos)
- **Videollamadas**, juegos online — donde la velocidad importa más que la perfección

![[Pasted image 20260508181822.png|438]]
Ahora podemos ver que solo los paquetes n.° 1 y n.° 3 han sido recibidos por el "Ordenador", lo que significa que falta la mitad de la imagen.

---

### 🔵 Capa 5 — Session (Sesión)

> *"Abre la línea, la mantiene viva y la cierra cuando ya no se necesita"*

Una vez que los datos han sido traducidos y formateados correctamente desde la capa de presentación (capa 6), la capa de sesión **comienza a crear y mantener la conexión** con el otro ordenador al que van destinados los datos.

**¿Cómo funciona?**
- Cuando se establece una conexión → se crea una **sesión**
- Mientras la conexión esté activa → la sesión también lo estará
- Si la conexión no se usa durante un tiempo o se pierde → la capa de sesión la **cierra automáticamente**

**Puntos de control (checkpoints):**
Una sesión puede contener "puntos de control". Esto significa que si los datos se pierden a mitad de la transmisión, **solo se reenvían los datos desde el último punto de control**, no desde el principio. Esto ahorra ancho de banda y tiempo.

**Las sesiones son únicas:**
Los datos no pueden viajar entre diferentes sesiones. Solo pueden transmitirse dentro de su propia sesión. Es decir, tu sesión con el servidor web y tu sesión con el servidor de correo son completamente independientes y sus datos no se mezclan.

```
Sesión A: [Tu PC] ←────────────────► [Servidor web]
Sesión B: [Tu PC] ←────────────────► [Servidor de correo]

Los datos de A no pueden entrar en B, y viceversa.
```

---

### 🟢 Capa 6 — Presentation (Presentación)

> *"El traductor universal — sin importar el software, los datos se ven igual"*

La capa 6 es donde comienza la **estandarización** de los datos. Dado que los desarrolladores de software pueden crear programas de muchas formas distintas, los datos deben gestionarse de la misma manera independientemente del software que los generó.

> Se encarga de traducir, comprimir o cifrar los datos para que la aplicación pueda entenderlos. Ejemplos: HTTPS/TLS para cifrado, JPEG/PNG para imágenes y MP3/MP4 para audio o video.

**Su función principal:**
Actúa como **traductora de datos** entre la capa de aplicación (capa 7) y las capas inferiores. El ordenador receptor también comprenderá los datos enviados desde otro ordenador, aunque estén en un formato diferente al suyo.

**Ejemplo práctico:**
Cuando envías un correo electrónico desde Gmail, el receptor puede tener Outlook, Thunderbird o cualquier otro cliente. No importa — la capa 6 garantiza que el **contenido del correo se muestre de la misma manera** en ambos lados.

**Seguridad en esta capa:**
Las funciones de seguridad como el **cifrado de datos** se implementan aquí. Por ejemplo, cuando visitas un sitio con **HTTPS 🔒**, es la capa de presentación la que se encarga de cifrar y descifrar esa comunicación.

```
[App A - formato propio] → [Capa 6 traduce a formato estándar] → [App B - formato propio]
                                      ↕ también cifra/descifra (HTTPS)
```

---

### 🟢 Capa 7 — Application (Aplicación)

> *"Lo que tú ves y tocas directamente — la interfaz con el usuario"*

La capa de aplicación es la más cercana al usuario y la que le resultará más familiar. Aquí es donde se establecen los **protocolos y las reglas** que determinan cómo debe interactuar el usuario con los datos enviados o recibidos.

**¿Qué trabaja en esta capa?**
Las aplicaciones cotidianas como:
- Clientes de correo electrónico (Gmail, Outlook)
- Navegadores web (Chrome, Firefox)
- Software de exploración de servidores de archivos como **FileZilla**

Todas estas aplicaciones proporcionan una **GUI** (Graphical User Interface) para que el usuario pueda interactuar con los datos de forma visual y amigable.

**Protocolos que viven en la capa 7:**

| Protocolo      | Nombre completo                     | Para qué sirve                                                 |
| -------------- | ----------------------------------- | -------------------------------------------------------------- |
| **HTTP/HTTPS** | HyperText Transfer Protocol         | Navegar por la web                                             |
| **FTP**        | File Transfer Protocol              | Transferir archivos entre dispositivos                         |
| **DNS**        | Domain Name System                  | Traduce nombres de dominio a IPs                               |
| **SMTP**       | Simple Mail Transfer Protocol       | Enviar correos electrónicos                                    |
| POP3/IMAP      | Internet Message Access Protocol    | Sirven para recibir o consultar correos.                       |
| DHCP           | Dynamic Host Configuration Protocol | Asigna automáticamente IP, gateway y DNS a un dispositivo      |
| SSH            | Secure Shell                        | Permite conectarse remotamente a otra máquina de forma segura. |

**DNS explicado:**
El DNS (Sistema de Nombres de Dominio) traduce las direcciones de los sitios web en direcciones IP. Cuando escribes `google.com` en tu navegador, el DNS lo convierte en una IP como `142.250.184.206` para que los routers sepan a dónde enviar tu solicitud.

```
Usuario escribe: google.com
       ↓
Capa 7 (DNS): traduce a 142.250.184.206
       ↓
El navegador carga la página ✅
```

---

## Resumen visual del flujo completo

```
AL ENVIAR (datos bajan)            AL RECIBIR (datos suben)
┌──────────────────────┐          ┌──────────────────────┐
│ 7. Application  🟢   │          │ 7. Application  🟢   │
│    (HTTP, DNS, FTP)  │          │    (HTTP, DNS, FTP)  │
├──────────────────────┤          ├──────────────────────┤
│ 6. Presentation 🟢   │          │ 6. Presentation 🟢   │
│    (cifrado, formato)│          │    (descifrado)      │
├──────────────────────┤          ├──────────────────────┤
│ 5. Session      🔵   │          │ 5. Session      🔵   │
│    (abre sesión)     │          │    (cierra sesión)   │
├──────────────────────┤          ├──────────────────────┤
│ 4. Transport    🔵   │          │ 4. Transport    🔵   │
│    (TCP o UDP)       │          │    (TCP o UDP)       │
├──────────────────────┤          ├──────────────────────┤
│ 3. Network      ⬛   │          │ 3. Network      ⬛   │
│    (IP, OSPF, RIP)   │          │    (reensambla)      │
├──────────────────────┤          ├──────────────────────┤
│ 2. Data Link    🟣   │          │ 2. Data Link    🟣   │
│    (MAC address)     │          │    (verifica MAC)    │
├──────────────────────┤          ├──────────────────────┤
│ 1. Physical     🟣   │          │ 1. Physical     🟣   │
│    (cable/señales)   │          │    (cable/señales)   │
└──────────┬───────────┘          └──────────▲───────────┘
           │     cable / wifi / fibra         │
           └──────────────────────────────────┘
```

---

## Tabla resumen rápido

| # | Capa | Función clave | Protocolos / Ejemplos |
|---|------|--------------|----------------------|
| 7 | Application | Interfaz con el usuario | HTTP, HTTPS, FTP, DNS, SMTP |
| 6 | Presentation | Traducción y cifrado | HTTPS (cifrado), formatos de datos |
| 5 | Session | Gestiona conexiones y sesiones únicas | Checkpoints, cierre automático |
| 4 | Transport | Elige TCP o UDP según la necesidad | TCP (fiable), UDP (rápido) |
| 3 | Network | Enrutamiento por IP, mejor ruta | IP, OSPF, RIP, Routers |
| 2 | Data Link | Direccionamiento MAC dentro de la red local | MAC address, NIC, Switches |
| 1 | Physical | Hardware y señales eléctricas | Cables Ethernet, señales binarias |

---

