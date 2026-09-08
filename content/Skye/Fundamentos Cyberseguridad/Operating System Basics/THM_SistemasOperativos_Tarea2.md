# Sistemas Operativos — El gerente invisible

> [!info] Módulo: Operating Systems — TryHackMe
> El sistema operativo es la capa más importante de cualquier computadora. Entenderlo bien es fundamental para seguridad, porque la mayoría de ataques y defensas ocurren a este nivel.

---

## 🖥️ ¿Qué es un Sistema Operativo?

Un **sistema operativo (SO)** es el software central que coordina todo lo que sucede en una computadora. Se ubica entre el usuario, las aplicaciones y el hardware físico — actúa como el **administrador invisible** que mantiene todo funcionando como un sistema unificado.

```
┌─────────────────────┐
│        User         │  ← tú, interactuando
├─────────────────────┤
│    Applications     │  ← navegador, editor, juegos
├─────────────────────┤
│  Operating System   │  ← el coordinador central
├─────────────────────┤
│      Hardware       │  ← CPU, RAM, disco, pantalla
└─────────────────────┘
```

Sin el SO, cada aplicación tendría que controlar directamente la CPU, la memoria y los dispositivos — causando conflictos constantes.

### La analogía del aeropuerto

| Componente | Analogía |
|------------|---------|
| **Hardware** (CPU, RAM, disco) | Las pistas, aviones, radar e infraestructura física |
| **Aplicaciones** (navegador, editor) | Las aerolíneas y sus pasajeros queriendo despegar y aterrizar |
| **Sistema Operativo** | La torre de control: dirige todo, asigna recursos, resuelve conflictos |

> [!note] La idea clave
> Sin la torre de control, dos aviones intentarían aterrizar en la misma pista al mismo tiempo. Sin el SO, dos aplicaciones intentarían usar el mismo bloque de memoria simultáneamente. El SO evita ese caos.

---

## 🔒 Capas de privilegios del sistema

Dentro de una computadora moderna, no todo el código tiene los mismos permisos. Esta separación es intencional y es la base de la seguridad del sistema.

### Espacio del núcleo (Kernel Space)

Es el nivel más privilegiado del sistema. Aquí vive el **kernel** — la parte central del SO.

- Acceso **irrestricto** a CPU, memoria, almacenamiento y hardware
- Solo el SO puede ejecutar código aquí
- Gestiona directamente todos los recursos del sistema

### Espacio de usuario (User Space)

Donde se ejecutan todas las aplicaciones normales — tu navegador, tu editor de texto, tus juegos.

- **No puede** acceder directamente al hardware
- Para hacer cualquier cosa (abrir archivo, conectarse a Wi-Fi, reproducir sonido) debe hacer una **llamada al sistema** (system call) pidiendo permiso al kernel

```
Aplicación (user space)
      │
      │  "necesito leer este archivo"
      │  ← system call →
      ▼
   Kernel (kernel space)
      │
      │  verifica permisos, ejecuta la acción
      ▼
   Hardware (disco duro)
```

### La analogía continuada — torre de control

| | Aeropuerto | Computadora |
|-|-----------|-------------|
| **Kernel space** | Torre de control — solo los controladores autorizados trabajan aquí | Solo el kernel opera aquí |
| **User space** | Las aerolíneas y pasajeros en tierra | Las aplicaciones |
| **System call** | Comunicación por radio de la aerolínea a la torre | La aplicación pidiendo permiso al kernel |
| **Resultado** | La torre autoriza o deniega el despegue | El kernel ejecuta o rechaza la operación |

> [!warning] Relevancia en seguridad
> Los ataques que logran ejecutar código en **kernel space** son los más graves. Una vulnerabilidad que eleva privilegios de user space a kernel space da control total del sistema. Eso es lo que se llama **escalamiento de privilegios al nivel de kernel** — el tipo de ataque más buscado en pentesting avanzado.

---

## ⚙️ Funciones del sistema operativo

El SO es responsable de varias tareas fundamentales que ocurren en segundo plano constantemente:

### Gestión de procesos
Crea, programa, prioriza y finaliza la ejecución de programas. El SO decide cuánto tiempo de CPU recibe cada proceso.

**Ejemplo:** abres el navegador, un reproductor de música y redes sociales al mismo tiempo — el SO reparte el tiempo de CPU entre los tres para que todo funcione sin que nada se congele.

### Gestión de memoria
Asigna RAM a cada proceso, protege la memoria de un proceso para que otro no pueda leerla, y cuando la RAM se agota usa **memoria virtual** (espacio en disco como RAM temporal).

**Ejemplo:** tienes 20 pestañas abiertas — el SO le asigna RAM a cada una y las mantiene aisladas para que una pestaña que se cuelga no afecte a las demás.

### Gestión del sistema de archivos
Organiza archivos en directorios, maneja nombres, rutas, permisos y metadatos (nombre, tamaño, tipo, fechas de creación y modificación).

**Ejemplo:** crear una carpeta, guardar una foto, configurar un archivo como "solo lectura".

### Gestión de usuarios
Maneja múltiples cuentas de usuario, autenticación y permisos para determinar quién puede acceder a qué.

**Ejemplo:** inicias sesión con tu contraseña y tus archivos son inaccesibles para otras cuentas del mismo equipo.

### Gestión de dispositivos
Carga controladores (drivers) y proporciona una interfaz universal para que las aplicaciones no necesiten saber los detalles técnicos de cada dispositivo.

**Ejemplo:** conectas un mouse nuevo y funciona inmediatamente — el SO cargó su driver automáticamente.

---

## 🔐 Seguridad del sistema operativo

El SO actúa como la **primera línea de defensa** — antes que el antivirus, antes que el firewall. Aplica protecciones de forma constante en segundo plano:

### Autenticación
Verifica quién eres a través de contraseñas de inicio de sesión, datos biométricos (huella, cara) o tokens.

### Permisos
Controla exactamente lo que cada usuario y aplicación puede **leer, escribir o ejecutar**. En Linux esto son los permisos `rwx` que ya conoces de Bandit.

### Aislamiento
Mantiene cada proceso en su propia "caja protegida". Un proceso no puede leer la memoria de otro proceso. Si una aplicación falla, no derriba todo el sistema.

### Protección del sistema
Protege los archivos y configuraciones críticos del sistema contra cambios no autorizados. En Linux, solo `root` puede modificar ciertos archivos del sistema.

---

## 🗺️ El SO como campo de batalla en ciberseguridad

> [!tip] Por qué entender el SO es esencial en seguridad
> La mayoría de vulnerabilidades, exploits y técnicas de ataque operan directamente a nivel del SO:
>
> | Técnica | Nivel del SO |
> |---------|-------------|
> | Escalamiento de privilegios | Pasar de user space a mayor privilegio |
> | Buffer overflow | Corromper la memoria gestionada por el SO |
> | Rootkits | Malware que se instala en kernel space para ocultarse |
> | SetUID (ya lo viste en Bandit) | Aprovechar permisos mal configurados |
> | Cron jobs (también visto en Bandit) | Abusar de la gestión de procesos del SO |

> [!note] Los SO más comunes
> | Sistema Operativo | Uso típico |
> |-------------------|-----------|
> | **Windows** | Escritorio corporativo y personal |
> | **Linux** | Servidores, hacking, desarrollo |
> | **macOS** | Diseño, desarrollo, uso personal Apple |
> | **Android / iOS** | Dispositivos móviles (basados en Linux y Unix) |
> | **FreeBSD** | Servidores y sistemas embebidos |

---

## 💻 Tarea 3 — Interacción y panorama del sistema operativo

### GUI vs CLI — las dos formas de hablar con el SO

Hay dos maneras de interactuar con un sistema operativo:

| | GUI | CLI |
|-|-----|-----|
| **Nombre completo** | Graphical User Interface | Command-line Interface |
| **Cómo funciona** | Clics en íconos, ventanas y menús | Escribir comandos de texto |
| **Analogía** | App de navegación: tocas el destino en el mapa | GPS con coordenadas exactas: escribes la ruta manualmente |
| **Ventajas** | Fácil de aprender, visual, intuitivo | Más rápido, más preciso, automatizable con scripts |
| **Desventajas** | Más lento para tareas repetitivas | Requiere conocer los comandos |
| **Uso típico** | Usuario normal, trabajo de escritorio | Administradores, hackers, desarrolladores |

> [!note] Misma información, distinta forma de acceder
> La imagen del módulo lo muestra claramente: el explorador de archivos (GUI) y `ls ubuntu` en la terminal (CLI) muestran exactamente el mismo contenido — Desktop, Documents, Downloads, Music, Pictures, etc. El resultado es idéntico, el camino es diferente.

> [!tip] ¿Por qué la CLI importa en seguridad?
> En hacking y administración de servidores, la GUI muchas veces no está disponible. Los servidores corren **headless** (sin interfaz gráfica) para ahorrar recursos. La CLI es la única forma de trabajar. Todo lo que hiciste en Bandit fue CLI pura — y esa habilidad es directamente transferible al mundo real.

---

### 🗂️ Tipos de sistemas operativos

No todos los SO son iguales — cada dispositivo y entorno tiene requisitos distintos:

| Tipo | Caso de uso | Características clave |
|------|-------------|----------------------|
| **Escritorio** | PCs personales, trabajo diario, juegos | Interfaz gráfica rica, multitarea, enfocado al usuario |
| **Servidor** | Alojamiento web, bases de datos, servicios en la nube | Sin GUI (headless), alta disponibilidad, multiusuario, acceso remoto |
| **Móvil** | Teléfonos y tabletas | Interfaz táctil, eficiencia energética, siempre conectado, sandbox de apps |
| **Incrustado (Embedded)** | Electrodomésticos, autos, IoT, routers, TVs inteligentes | Ocupa muy poco espacio, corre en hardware limitado |
| **Virtual / Nube** | Máquinas de laboratorio, contenedores, instancias cloud | Ligero, escalable, implementación rápida |

---

### 🌍 Sistemas operativos del mundo real

#### Escritorio
- **Windows** — el más usado en PCs personales. Versiones: Windows 10, Windows 11
- **macOS** — sistema de Apple, interfaz pulida e integración con ecosistema Apple. Versiones: Sonoma (14), Sequoia (15), Tahoe (26)
- **Linux** — no es un solo SO sino una familia de **distribuciones** de código abierto. Distros: Ubuntu, Debian, Fedora

#### Servidor
- **Windows Server** — grandes redes corporativas y centros de datos. Versiones: 2016, 2019, 2022, 2025
- **Linux** — domina los servidores web por su estabilidad y código abierto. Distros: Ubuntu Server, Debian, CentOS, Red Hat
- **Unix** — grandes empresas, finanzas, telecomunicaciones, gobierno. Ejemplos: IBM AIX, Oracle Solaris

#### Móvil
- **Android** — el más usado en el mundo, se ejecuta en teléfonos, tabletas y dispositivos inteligentes. Versiones: Android 14-16
- **iOS** — sistema de Apple para iPhone, iPad y otros dispositivos. Versiones: iOS 17, 18, 26

#### Dispositivos integrados y de IoT
- **Linux integrado** — especializado para dispositivos con función dedicada. Ejemplos: OpenWrt (routers), Ubuntu Core, Proyecto Yocto
- **RTOS (Real-Time OS)** — diseñado para sistemas donde el tiempo de respuesta debe ser exacto y garantizado (control de aeronaves, industria). Ejemplos: FreeRTOS, VxWorks, QNX

#### Virtual y Nube
- **Nube/VM** — centros de datos que alojan sitios web, apps y servicios de streaming. Ejemplos: Ubuntu LTS, Amazon Linux, Rocky Linux
- **Contenedores** — alternativas ligeras a VMs que empaquetan solo la app y sus dependencias. Ejemplos: Alpine Linux, Bottlerocket AWS, Flatcar Linux

> [!note] ¿Por qué tantos sistemas operativos?
> Cada entorno necesita algo diferente: una laptop necesita facilidad de uso y multitarea. Un servidor necesita estabilidad y seguridad 24/7. Un teléfono necesita eficiencia energética. Un sistema de control industrial necesita respuesta en tiempo real exacto. Ningún SO se adapta perfectamente a todo — por eso existe este ecosistema.

> [!tip] Linux domina en seguridad y servidores
> Más del **90% de los servidores web del mundo** corren Linux. Kali Linux (que ya usas) es una distribución especializada en seguridad. La mayor parte de las herramientas de hacking están diseñadas para Linux. Invertir tiempo en Linux es invertir directamente en tu carrera de seguridad.

---

### 📋 Terminología clave — glosario

| Término | Definición |
|---------|-----------|
| **Sistema Operativo (SO)** | Software principal que administra el hardware, las aplicaciones y todos los recursos del sistema |
| **Kernel** | El núcleo del SO — gestiona directamente el hardware y los recursos del sistema |
| **Espacio del núcleo (Kernel Space)** | Área altamente privilegiada donde vive el kernel, con acceso directo al hardware |
| **Espacio de usuario (User Space)** | Área donde se ejecutan aplicaciones normales, con permisos limitados por seguridad |
| **GUI** | Graphical User Interface — la parte visual del SO: ventanas, íconos y menús |
| **CLI** | Command-line Interface — interfaz de texto donde escribes comandos para controlar el sistema |
| **System Call** | La comunicación entre una aplicación (user space) y el kernel para solicitar recursos |
| **Driver / Controlador** | Software que permite al SO comunicarse con un dispositivo de hardware específico |
| **Headless** | Servidor sin interfaz gráfica — solo accesible por CLI o acceso remoto (SSH) |
| **Distribución (distro)** | Versión específica de Linux con sus propias herramientas y configuraciones (Ubuntu, Kali, Debian...) |
| **Contenedor** | Entorno ligero que empaqueta una aplicación con todo lo que necesita para correr, sin una VM completa |

---

### 🔐 Dato de práctica — sistema de archivos

En el ejercicio del módulo se pregunta qué tipo de sistema de archivos tiene `/dev/root`. La respuesta es **ext4**.

**ext4** (Fourth Extended Filesystem) es el sistema de archivos más común en Linux:
- Soporte para archivos de hasta 16 TB
- Journaling (registro de cambios para recuperación ante fallos)
- Es el estándar en Ubuntu, Debian, Kali y la mayoría de distribuciones

| Sistema de archivos | SO | Notas |
|--------------------|-----|-------|
| **ext4** | Linux | El más común en Linux moderno |
| **NTFS** | Windows | Sistema de archivos moderno de Windows |
| **APFS** | macOS | Sistema de Apple desde 2017 |
| **FAT32 / exFAT** | Universal | Usado en USB y tarjetas SD por compatibilidad |

---


