

## 🧠 La Analogía del Cuerpo Humano (The Human Body Analogy)

Casi todos los sistemas informáticos comparten los mismos componentes básicos. Una forma muy útil de entenderlos es comparar cada componente con una parte del cuerpo humano.

| Componente (Component) | Analogía Corporal | Función resumida |
|---|---|---|
| Motherboard (Placa base) | Esqueleto y Sistema Nervioso | Conecta y sostiene todo |
| CPU (Procesador) | Cerebro | Procesa instrucciones |
| RAM (Memoria de acceso aleatorio) | Memoria a corto plazo | Datos temporales en uso |
| HDD / SSD (Almacenamiento) | Memoria a largo plazo | Guarda datos de forma permanente |
| PSU (Fuente de alimentación) | Corazón y Pulmones | Distribuye energía a todos los componentes |
| GPU (Tarjeta gráfica) | Córtex Visual | Procesa y genera imágenes |
| Network Adapter (Adaptador de red) | Cuerdas vocales | Permite la comunicación con otros sistemas |
| I/O Devices (Dispositivos de E/S) | Sentidos y acciones | Entrada y salida de información |

---

## 📋 Componentes Detallados

---

### 🦴 Motherboard (Placa Base)

> *"The skeleton and nervous system"*

![[Pasted image 20260522222429.png]]

- Es el **componente central** al que se conectan todos los demás.
- Contiene:
  - **CPU socket** → donde se instala el procesador
  - **RAM slots** → ranuras para la memoria
  - **Expansion slots** (ranuras de expansión) → para tarjetas adicionales (GPU, red, etc.)
  - **Various ports** (varios puertos) → USB, HDMI, audio, etc.
- Todo otro componente se **conecta a través de la motherboard**.

> 💡 **Tip de seguridad:** Si tienes acceso físico a la motherboard, tienes acceso potencial a todo el sistema.

---

### 🧠 CPU (Central Processing Unit / Unidad Central de Procesamiento)

> *"The brains"*

![[Pasted image 20260522222446.png]]


- También llamado **processor (procesador)**.
- **Ejecuta instrucciones** continuamente: sumas, mover datos, reproducir audio, etc.
- Los CPUs modernos tienen múltiples **cores (núcleos)** que manejan instrucciones **en paralelo**.
- Se conecta a la motherboard a través del **CPU socket**.

> 💡 **Nota importante:** La velocidad del CPU se mide en **GHz (gigahercios)**. Más GHz + más núcleos = mayor rendimiento.

**Fabricantes principales:**
- **Intel** → arquitectura x86/x64
- **AMD** → arquitectura x86/x64 (con Ryzen, EPYC)
- **ARM** → arquitectura RISC (móviles, servidores modernos)

---

### 💾 RAM (Random Access Memory / Memoria de Acceso Aleatorio)

> *"Short-term memory"*

![[Pasted image 20260522222509.png]]

- Es la **memoria volátil (volatile memory)**: cuando se apaga el sistema, **todos los datos se pierden**.
- Almacena datos que el CPU necesita con **acceso rápido** mientras trabaja.
- Tecnologías actuales: **DDR5**, **DDR6** (más velocidad y rendimiento).
- Se mide en **GB (gigabytes)** y en velocidad **MHz/GHz**.

> 🔐 **Relevancia en ciberseguridad:** El análisis forense de la RAM (**memory forensics**) permite extraer contraseñas, claves de cifrado y procesos activos antes de que se apague el equipo.

---

### 💿 Storage — HDD + SSD (Almacenamiento)

> *"Long-term memory"*

![[Pasted image 20260522222524.png]]

| | HDD (Hard Disk Drive) | SSD (Solid State Drive) |
|---|---|---|
| Tipo | Partes mecánicas en movimiento | Chips de memoria, sin partes móviles |
| Velocidad | Más lenta | Mucho más rápida |
| Capacidad | Alta a bajo costo | Alta, pero más cara |
| Durabilidad | Más frágil (golpes) | Más resistente |

- Se conectan mediante **SATA cables** o ranuras **PCI Express**.
- Los datos aquí **persisten** aunque se apague el equipo.

> 🔐 **Relevancia en ciberseguridad:** Los HDDs/SSDs son el objetivo principal del **data recovery (recuperación de datos)** y del análisis forense de disco.

---

### ⚡ PSU (Power Supply Unit / Fuente de Alimentación)

> *"Heart and lungs"*

![[Pasted image 20260522222548.png]]


- Convierte la corriente alterna del enchufe (**AC**) en corriente continua (**DC**) para los componentes.
- Distribuye energía mediante conectores como:
  - **Main motherboard connector** (conector principal de la placa base)
  - **Molex connectors**
  - **SATA power connectors**
- Si los componentes requieren más potencia de la que el PSU puede dar → **el sistema falla**.
- Se mide en **Watts (W)**.

> 💡 **Tip:** Al construir o analizar un sistema, verificar que el PSU tenga suficiente potencia es crítico para la estabilidad.

---

### 🎨 GPU (Graphics Processing Unit / Unidad de Procesamiento Gráfico)

> *"Visual cortex"*

![[Pasted image 20260522222600.png]]
<!-- 📌 Insertar imagen de la GPU aquí -->

- También llamada **graphics card (tarjeta gráfica)**.
- Recibe información del sistema operativo y programas → **procesa y envía datos visuales** al monitor.
- Se conecta a través de ranuras **PCI Express** en la motherboard.

> 💡 **Extra:** Las GPUs también se usan intensivamente para:
> - **Machine Learning / AI**
> - **Criptominería**
> - **Password cracking (descifrado de contraseñas)** — herramientas como **Hashcat** aprovechan la GPU

---

### 🌐 Network Adapter (Adaptador de Red)

> *"Vocal cords"*

![[Pasted image 20260522222610.png]]

- Permite que el computador **se comunique con otros sistemas** (redes, internet).
- Variantes:
  - **Wired (con cable)** → Ethernet, RJ45
  - **Wireless (inalámbrico)** → Wi-Fi
- Frecuentemente **integrada en la motherboard**, pero también se puede añadir como tarjeta de expansión.
- Se conecta a través de **PCI Express ports**.

> 🔐 **Relevancia en ciberseguridad:** El adaptador de red es el punto de entrada/salida de todo el tráfico. Es clave para el **network monitoring (monitoreo de red)**, **packet sniffing**, y ataques de red.

---

### 🖱️ I/O Devices (Dispositivos de Entrada/Salida)

> *"Senses and actions"*

![[Pasted image 20260522222619.png]]
<!-- 📌 Insertar imagen de dispositivos I/O aquí -->

| Tipo | Dispositivos (Devices) |
|---|---|
| **Input (Entrada)** | Keyboard (teclado), Mouse, Microphone (micrófono), Scanner |
| **Output (Salida)** | Monitor, Printer (impresora), Speakers (altavoces) |

- Se conectan principalmente mediante: **USB**, **HDMI**, **DisplayPort**.

> 💡 Los dispositivos I/O son la interfaz entre el humano y la máquina.

---

## 🗺️ Diagrama de Relaciones

```
                    ┌─────────────────────────────┐
                    │        MOTHERBOARD          │
                    │  (Esqueleto y S. Nervioso)  │
                    └──────────────┬──────────────┘
                                   │ conecta a todos
          ┌──────────┬─────────────┼──────────┬──────────────┐
          │          │             │          │              │
        [CPU]      [RAM]        [GPU]      [PSU]    [Network Adapter]
       Cerebro   Mem. Corto   Córtex    Corazón    Cuerdas vocales
                  Plazo       Visual    /Pulmones
                    │
          [HDD / SSD]
         Mem. Largo Plazo
                    │
          [I/O Devices]
         Sentidos y Acciones
```

---

## 📝 Resumen Rápido (Quick Reference)

| Componente | Función | Volátil | Conexión |
|---|---|---|---|
| Motherboard | Conecta todo | — | — |
| CPU | Procesa instrucciones | — | CPU Socket |
| RAM | Memoria temporal | ✅ Sí | RAM Slot |
| HDD/SSD | Almacenamiento permanente | ❌ No | SATA / PCIe |
| PSU | Suministra energía | — | Conectores de potencia |
| GPU | Procesamiento gráfico | — | PCI Express |
| Network Adapter | Comunicación en red | — | PCI Express / Integrado |
| I/O Devices | Entrada y salida de datos | — | USB / HDMI / DisplayPort |

# Motherboard and Conecctions

![[Pasted image 20260522222653.png]]

---

