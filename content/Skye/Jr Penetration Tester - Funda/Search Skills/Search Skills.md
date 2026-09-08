

## ¿Para qué sirve saber buscar bien?

Antes de tocar una sola herramienta ofensiva, un pentester necesita **información**. Saber dónde buscar y cómo buscar marca la diferencia entre un reconocimiento superficial y uno que realmente encuentra vectores de ataque.

Este módulo cubre las fuentes de información clave que un pentester usa durante la fase de **reconocimiento pasivo y análisis de vulnerabilidades**.

---

## Task 2 — Shodan (TryScanMe)

### ¿Qué es Shodan?

Shodan es un motor de búsqueda especializado que **indexa dispositivos conectados a Internet**: servidores, routers, cámaras IP, sistemas SCADA, IoT, etc. A diferencia de Google (que indexa páginas web), Shodan indexa **banners de servicios** — la respuesta que da un puerto/servicio cuando alguien se conecta a él.

> [!info] Analogía simple
> Google te dice qué hay en las páginas web. Shodan te dice qué servicios están corriendo en las IPs de Internet y en qué estado están.

### ¿Qué información entrega Shodan?

- Puertos abiertos y servicios detectados
- Versiones de software expuestas (Apache 2.4.49, OpenSSH 7.2, etc.)
- Certificados SSL/TLS y su metadata
- País, ciudad, ISP y organización del host
- CVEs conocidas asociadas al software detectado
- Tecnologías web (headers HTTP, frameworks, CMS)
- Dispositivos con credenciales por defecto o paneles de administración expuestos

### Uso en pentesting

```
# Búsqueda básica por organización
org:"Empresa Objetivo"

# Buscar servidores Apache con una versión específica
apache/2.4.49

# Buscar paneles de login expuestos
http.title:"Admin Login"

# Buscar dispositivos con un puerto específico abierto
port:22 country:"PE"

# Combinar filtros
org:"Empresa" port:3389 os:"Windows"
```

> [!tip] Dato útil para pentesting
> Shodan tiene una sección llamada **"Exploits"** y también muestra directamente si una IP tiene CVEs conocidas. Antes de lanzar un scanner, revisar Shodan puede darte una idea rápida de la superficie de ataque expuesta de un objetivo.

### TryScanMe

Es la instancia de práctica de TryHackMe integrada con Shodan. Permite buscar datos de hosts ficticios/controlados sin necesidad de apuntar a sistemas reales.

---

## Task 3 — VirusTotal (TryDetectMe)

### ¿Qué es VirusTotal?

VirusTotal es una plataforma que analiza **archivos, URLs, dominios e IPs** contra múltiples motores antivirus y servicios de threat intelligence simultáneamente. Fue adquirida por Google en 2012 y es de las herramientas más usadas en análisis de malware y threat hunting.

### ¿Qué puedes buscar?

| Tipo de input | Qué te entrega |
|---|---|
| Hash de archivo (MD5/SHA256) | Si el archivo es malware conocido, qué familia es, quién lo detecta |
| URL | Si está categorizada como phishing, malware, spam |
| Dominio | Historial de resoluciones, IPs asociadas, reputación |
| Dirección IP | Dominios que han apuntado a ella, reportes de abuso |

### Uso en pentesting / análisis defensivo

```
# Buscar por hash de un archivo sospechoso
SHA256: e3b0c44298fc1c149afb...

# Buscar reputación de un dominio
malicioso-dominio.com

# Revisar historial de una IP
103.45.67.89
```

> [!warning] Ojo con subir binarios propios
> Si estás desarrollando un payload para un engagement y lo subes a VirusTotal, **ese hash queda público**. Los vendors pueden añadirlo a sus firmas. Nunca subas herramientas o exploits de un engagement activo a VirusTotal.

> [!tip] Para reconocimiento
> Puedes buscar el dominio de un objetivo en VirusTotal para ver **qué IPs ha tenido históricamente**, subdominios conocidos, y si alguna IP asociada ha sido reportada como maliciosa — todo sin tocar el objetivo directamente.

---

## Task 4 — Vulnerability Databases (CVE)

### ¿Qué es una CVE?

**CVE (Common Vulnerabilities and Exposures)** es un sistema de identificación estándar para vulnerabilidades conocidas. Cada CVE tiene un ID único con el formato:

```
CVE-AÑO-NÚMERO
Ejemplo: CVE-2021-44228 (Log4Shell)
```

### Bases de datos principales

| Base de datos | URL | ¿Para qué usarla? |
|---|---|---|
| **NVD** (National Vulnerability Database) | nvd.nist.gov | Referencia oficial, incluye CVSS score detallado |
| **CVE.org** | cve.org | Lista oficial mantenida por MITRE |
| **Exploit-DB** | exploit-db.com | Exploits públicos, muchos con PoC funcional |
| **Vulners** | vulners.com | Agrega múltiples fuentes, muy completo |
| **OSV** (Open Source Vulnerabilities) | osv.dev | Enfocado en dependencias de código abierto |

### CVSS Score — recordatorio rápido

El **CVSS (Common Vulnerability Scoring System)** asigna un puntaje de 0 a 10 a cada CVE:

| Rango | Severidad |
|---|---|
| 0.0 | None |
| 0.1 – 3.9 | Low |
| 4.0 – 6.9 | Medium |
| 7.0 – 8.9 | High |
| 9.0 – 10.0 | Critical |

> [!info] CVSS v3 vs v4
> Actualmente coexisten CVSS v3.1 y el más reciente CVSS v4.0 (publicado en 2023). La mayoría de las plataformas aún muestran v3.1 como referencia principal.

### Flujo típico en un engagement

```
1. Identificas software con versión específica (ej: Apache 2.4.49)
2. Buscas en NVD o CVE.org: "Apache 2.4.49 CVE"
3. Encuentras CVE-2021-41773 (Path Traversal / RCE)
4. Vas a Exploit-DB o GitHub a buscar PoC
5. Evalúas si el sistema objetivo es vulnerable
6. Documentas en tu reporte con el CVE ID, CVSS score y descripción
```

---

## Task 5 — Technical Documentation (MAN)

### ¿Qué son las man pages?

Las **manual pages (man pages)** son la documentación oficial de comandos y herramientas en sistemas Unix/Linux. Están disponibles directamente en la terminal.

```bash
# Sintaxis básica
man <comando>

# Ejemplos
man nmap
man ssh
man curl
man grep
```

### Estructura de una man page

```
NOMBRE         - Nombre del comando y descripción de una línea
SINOPSIS       - Cómo se usa (sintaxis)
DESCRIPCIÓN    - Explicación detallada
OPCIONES       - Todos los flags disponibles
EJEMPLOS       - Casos de uso (no siempre presente)
VER TAMBIÉN    - Comandos relacionados
```

### Navegación dentro de man

| Tecla | Acción |
|---|---|
| `j` / `k` | Bajar / subir una línea |
| `d` / `u` | Bajar / subir media página |
| `G` | Ir al final |
| `g` | Ir al inicio |
| `/palabra` | Buscar texto |
| `n` | Siguiente resultado de búsqueda |
| `q` | Salir |

### Otras fuentes de documentación técnica

```bash
# Help integrado (más corto que man)
comando --help
comando -h

# Info pages (más detallado que man en algunos casos)
info <comando>

# Documentación de herramientas de hacking (ejemplos)
man nmap          # Muy completo, incluye ejemplos de escaneo
man metasploit    # No existe como man page, usar msfconsole help
```

> [!tip] Para CTFs y labs
> Si no recuerdas un flag exacto de `nmap`, `hydra`, `curl`, etc., `man` y `--help` son más rápidos que buscar en Google. Acostúmbrate a usarlos antes de salir de la terminal.

---

## Task 6 — GitHub

### GitHub más allá del código

La mayoría lo conoce como repositorio de código, pero para un pentester GitHub es una **fuente de inteligencia crítica**:

### 1. Exploits y Proof of Concept (PoC)

Muchos investigadores de seguridad publican sus PoC en GitHub inmediatamente después del disclosure de una CVE. Esto significa que puedes encontrar exploits **funcionales y actualizados** incluso antes de que aparezcan en Exploit-DB.

```
# Cómo buscar en GitHub
CVE-2021-44228 poc
CVE-2023-XXXX exploit python
log4shell exploit
```

> [!warning] Importante
> Algunos repositorios de "exploits" en GitHub son en realidad **malware** diseñado para infectar a pentesters descuidados. Antes de ejecutar cualquier PoC descargado, revisa el código fuente. Si no entiendes lo que hace, no lo ejecutes.

### 2. Herramientas de seguridad y pentesting

GitHub es donde viven la mayoría de las herramientas open source de hacking:

| Herramienta | Repositorio |
|---|---|
| LinPEAS / WinPEAS | github.com/carlospolop/PEASS-ng |
| SecLists (wordlists) | github.com/danielmiessler/SecLists |
| Impacket | github.com/fortra/impacket |
| BloodHound | github.com/BloodHoundAD/BloodHound |
| ffuf | github.com/ffuf/ffuf |

### 3. Información filtrada (OSINT)

GitHub también puede contener **información sensible filtrada** de organizaciones objetivo:

- API keys y tokens hardcodeados en código
- Credenciales en archivos de configuración subidos por error
- Estructura interna de aplicaciones y sistemas
- Emails de empleados en commits
- URLs internas, endpoints de APIs privadas

```
# Búsquedas útiles para OSINT en GitHub
"empresa-objetivo" password
"empresa-objetivo" api_key
"empresa-objetivo" secret
"empresa-objetivo.com" token
```

> [!info] Herramientas para OSINT en GitHub
> - **Gitrob** — escanea repositorios en busca de datos sensibles
> - **TruffleHog** — detecta secretos y credenciales en el historial de commits
> - **gitleaks** — auditoría de repos en busca de secrets

> [!tip] No solo el código actual
> El historial de commits de un repositorio puede contener credenciales que **ya fueron eliminadas del código** pero siguen visibles en commits anteriores. `git log` + `git show <commit>` puede revelar esa información.

---

## Resumen del módulo

```
┌─────────────────────────────────────────────────────────────┐
│              SEARCH SKILLS - RESUMEN RÁPIDO                  │
├──────────────────┬──────────────────────────────────────────┤
│ Shodan           │ Dispositivos expuestos en Internet        │
│ VirusTotal       │ Reputación de IPs, dominios, hashes       │
│ CVE / NVD        │ Vulnerabilidades conocidas + CVSS score   │
│ Exploit-DB       │ Exploits públicos con PoC                 │
│ Man pages        │ Documentación de herramientas en terminal │
│ GitHub           │ PoCs, tools, OSINT, info filtrada         │
└──────────────────┴──────────────────────────────────────────┘
```

> [!success] Conexión con pentesting real
> Este conjunto de habilidades se usa en la **fase de reconocimiento** de cualquier engagement. La diferencia entre un pentester junior y uno experimentado muchas veces está en saber exactamente **dónde buscar** antes de empezar a atacar.
