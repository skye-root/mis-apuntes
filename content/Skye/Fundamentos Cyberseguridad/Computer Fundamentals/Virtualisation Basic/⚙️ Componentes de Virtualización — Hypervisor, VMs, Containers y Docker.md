

## 🏗️ La Arquitectura Completa

```
┌─────────────────────────────────────────────┐
│              PHYSICAL SERVER                │
│         (Servidor Físico)                   │
│                                             │
│  ┌───────────────────────────────────────┐  │
│  │            HYPERVISOR                 │  │
│  └───────────────────────────────────────┘  │
│                                             │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │Virtual Mach. A│  │  Virtual Machine B   │ │
│  │              │  │  ┌────────┐ ┌──────┐ │ │
│  │  (OS + Apps) │  │  │Cont. A │ │Cont B│ │ │
│  └──────────────┘  │  └────────┘ └──────┘ │ │
│                    └──────────────────────┘ │
└─────────────────────────────────────────────┘
```

> Las VMs son los "apartamentos completos". Los containers son las "habitaciones dentro del apartamento".

---

## 1️⃣ Hypervisor (El Administrador del Edificio)

El hypervisor es la **tecnología central** detrás de la virtualización. Es el software que **crea y gestiona** las máquinas virtuales.

**¿Qué hace exactamente?**
- Divide una computadora física en múltiples virtuales
- Asigna a cada VM su cuota de CPU, RAM y almacenamiento
- Mantiene todo **aislado y seguro**
- Gestiona el ciclo de vida de las VMs: iniciar, detener, pausar, clonar, eliminar

---

### Type 1 vs Type 2 — ¿Cuál usar?

| Característica | Type 1 (Bare-metal) | Type 2 (Hosted) |
|---|---|---|
| **Corre sobre** | Directo en el hardware | Sobre un OS existente |
| **Velocidad** | Más rápido y eficiente | Un poco más lento |
| **Instalación** | Más compleja | Muy fácil |
| **Uso ideal** | Servidores, producción, data centers | Aprendizaje, testing, labs |
| **Ejemplos** | VMware ESXi, Hyper-V, Xen | VirtualBox, VMware Workstation |

### ¿Qué tipo usar según el caso?

| Caso de uso | Type 1 | Type 2 |
|---|---|---|
| **Test Malicious Files** (testear malware) | | ✅ |
| **Production Server** (servidor en producción) | ✅ | |
| **Database Server** (servidor de base de datos) | ✅ | |
| **Software Testing** (pruebas de software) | | ✅ |
| **Kali Linux** (labs de hacking) | | ✅ |
| **Data Center** | ✅ | |

> ⚠️ **Seguridad al testear malware:** Al probar archivos maliciosos en una VM, hay que asegurarse de que el host no se infecte. Estrategias: usar diferentes sistemas operativos en guest y host, o **aislar la VM de la red** para que no se comunique con el exterior.

---

## 2️⃣ Virtual Machine — VM (Máquina Virtual)

Una VM es una **computadora virtual completa** creada por el hypervisor. Aunque es virtual, se comporta exactamente como una máquina real:

- Tiene su propia CPU virtual, RAM, almacenamiento y red
- Puede correr **cualquier sistema operativo** (Windows, Linux, macOS)
- Está **completamente aislada** de otras VMs — si una se rompe, las demás siguen funcionando

**Herramientas para correr VMs en tu PC (Type 2):**
- **Oracle VirtualBox** — gratuito, open source, ideal para labs
- **VMware Workstation** — más funciones, versión Pro de pago

**Casos de uso reales para ti ahora:**

> 🐉 Quieres usar **Kali Linux** para practicar hacking, pero no quieres formatearte el PC → instalas VirtualBox y corres Kali dentro de una VM.

> 🦠 Quieres analizar si un archivo es malware → lo ejecutas dentro de una VM aislada. Si infecta algo, solo infecta la VM — tu sistema real está a salvo.

---

## 3️⃣ Containers (Contenedores) — Las Habitaciones del Apartamento

Un container es un **entorno ligero y aislado** que corre **una sola aplicación** junto a todo lo que necesita para funcionar.
- El container normalmente corre **una aplicación o servicio**, no un sistema operativo completo como una VM.

> [!UN CONTAINER SERIA COMO: ]
> Windows / Linux Host
> └── Docker
>     ├── Container de Nginx
>     ├── Container de MySQL
>     └── Container de una app web

### ¿En qué se diferencia de una VM?

La clave está en el **kernel**:

```
VM:
┌──────────────────────┐
│  App + dependencias  │
├──────────────────────┤
│  Sistema Operativo   │  ← OS completo propio (pesado)
│  completo (Guest OS) │
└──────────────────────┘

Container:
┌──────────────────────┐
│  App + dependencias  │
└──────────────────────┘
       ↓ comparte
┌──────────────────────┐
│  Kernel del Host OS  │  ← Solo el núcleo del OS (ligero)
└──────────────────────┘
```

> 🔑 El container **no tiene su propio OS completo** — toma prestado el **kernel** (núcleo) del sistema anfitrión. Por eso es mucho más liviano y rápido.

### Características de los containers:

- ✅ Empaquetan la app + sus dependencias (librerías, versiones, herramientas)
- ✅ Arrancan casi **instantáneamente** (comparten el kernel del host)
- ✅ Aislados entre sí — un container problemático no afecta a los demás
- ✅ Corren de forma **consistente en cualquier máquina** → "funciona en mi PC y en el servidor"
- ⚠️ **Limitación:** Deben coincidir con el tipo de OS del host → no puedes correr un container de Windows en Linux

---

## 🐳 Docker — La Herramienta de Containers por Excelencia

### ¿Qué es Docker?
**Docker** es una plataforma open-source que simplifica el proceso de **crear, desplegar y correr aplicaciones** usando containers.

> Es el estándar de la industria para trabajar con containers. Cuando alguien dice "usar containers", casi siempre está usando Docker.

### ¿Por qué existe Docker?

El problema clásico antes de Docker:

```
Desarrollador:  "En mi PC funciona perfectamente 🤷"
Servidor:       "Pues aquí no corre nada 💥"
```

¿Por qué pasaba esto? Diferentes versiones de Python, librerías distintas, configuraciones de OS diferentes, etc.

**Docker lo resuelve así:**

```
Con Docker:
┌─────────────────────────────────────────┐
│           Docker Container              │
│                                         │
│  Tu app                                 │
│  + Python 3.11 (versión exacta)         │
│  + todas las librerías que necesita     │
│  + su configuración                     │
│                                         │
│  → Corre IGUAL en cualquier máquina ✅  │
└─────────────────────────────────────────┘
```

### Conceptos básicos de Docker:

| Término | Qué es |
|---|---|
| **Image (Imagen)** | La "plantilla" del container — como un molde de galleta |
| **Container** | Una instancia corriendo de una imagen — la galleta ya hecha |
| **Dockerfile** | El archivo con instrucciones para construir una imagen |
| **Docker Hub** | Repositorio público de imágenes listas para usar |

### Comandos Docker básicos (para cuando lo uses en labs):

```bash
docker pull nginx          # Descargar una imagen
docker run nginx           # Crear y correr un container
docker ps                  # Ver containers corriendo
docker stop <id>           # Detener un container
docker images              # Ver imágenes descargadas
```

---

## ⚖️ VM vs Container — La Comparativa Definitiva

| | VM (Máquina Virtual) | Container (Contenedor) |
|---|---|---|
| **Tamaño** | Gigabytes (OS completo) | Megabytes (solo la app) |
| **Arranque** | Minutos | Segundos o menos |
| **Aislamiento** | Total (OS propio) | Parcial (comparte kernel) |
| **Portabilidad** | Buena | Excelente |
| **Seguridad** | Mayor (más aislado) | Menor (kernel compartido) |
| **Uso ideal** | Entornos completos, labs, OS diferente | Desplegar apps rápido, microservicios |
| **Herramienta** | VirtualBox, VMware | Docker |

> 🧠 **Regla simple para recordarlo:**
> - Necesitas un **OS completo diferente** (ej: Kali en Windows) → **VM**
> - Necesitas desplegar una **aplicación rápido** y que funcione igual en todos lados → **Container / Docker**

---

## 🔐 Relevancia en Ciberseguridad

| Tecnología | Uso en seguridad |
|---|---|
| **VMs** | Labs de hacking, análisis de malware, entornos aislados de prueba |
| **Containers** | Despliegue de herramientas de seguridad, CTF challenges, ambientes de pentest reproducibles |
| **Docker** | Levantar laboratorios completos con un solo comando (`docker-compose up`) |

> 🔐 **Docker en CTFs y labs:** Muchos desafíos de THM y HackTheBox corren en containers Docker. Saber cómo funcionan te ayuda a entender la infraestructura que estás atacando — y a veces el objetivo ES escapar del container.

---

### ✅ Conclusión del Módulo — Terminología Clave

#### Glosario rápido (Quick Glossary)

|Término|Definición|
|---|---|
|**Virtualization (Virtualización)**|Permite que una sola computadora física actúe como varias computadoras separadas|
|**Hypervisor (Hipervisor)**|El software "administrador" que crea y ejecuta las computadoras virtuales|
|**Virtual Machine / VM (Máquina Virtual)**|Un ordenador virtual completo dentro del real, con su propio sistema operativo|
|**Container (Contenedor)**|Una caja pequeña y aislada para una aplicación que comparte el mismo kernel que el host|
|**Container Image (Imagen de contenedor)**|Una receta/plantilla preenvasada que se usa para crear containers — el "molde"|
|**Network Ports (Puertos de red)**|Puntos de entrada numerados que usan las aplicaciones para comunicarse a través de la red|

#### Beneficios clave de la virtualización

- 💰 Ahorro de costes
- ⚡ Mejor uso de los recursos
- 🔐 Pruebas seguras para la ciberseguridad
- 🚀 Implementación más rápida
- 🔄 Flexibilidad y portabilidad
- 📈 Escalabilidad
- 🖥️ Gestión centralizada

> **Siguiente paso:** Con estos fundamentos, el siguiente módulo es **Cloud Computing Fundamentals** — que usa virtualización, contenedorización y automatización para brindar servicios escalables bajo demanda.

-----

