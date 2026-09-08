---
tags:
  - cybersecurity
  - pentesting
  - jr-penetration-tester
  - content-discovery
  - frameworks
  - red-team
aliases:
  - CKC
  - Lockheed Martin Kill Chain
---

# Cyber Kill Chain

> [!info] Contexto
> Framework desarrollado por **Lockheed Martin**, adaptado del concepto militar de "kill chain" (identificar → atacar → destruir un objetivo). En ciberseguridad se usa para modelar las fases que sigue un atacante desde el reconocimiento inicial hasta el cumplimiento de sus objetivos finales. Es una herramienta tanto ofensiva (entender cómo piensa el atacante) como defensiva (saber dónde cortar la cadena).

> [!tip] Idea central
> Si el equipo de defensa logra **romper la cadena en cualquier eslabón**, el ataque completo falla. No hace falta bloquear las 7 fases; basta con detener una.

## Las 7 fases

```
[1] Reconnaissance
       │
       ▼
[2] Weaponisation (Armamentización)
       │
       ▼
[3] Delivery
       │
       ▼
[4] Exploitation
       │
       ▼
[5] Installation
       │
       ▼
[6] Command & Control (C2)
       │
       ▼
[7] Actions on Objectives
```

| # | Fase | Objetivo del atacante |
|---|------|------------------------|
| 1 | Reconnaissance | Recopilar información del objetivo |
| 2 | Weaponisation | Crear el payload/exploit a medida |
| 3 | Delivery | Transmitir el payload al objetivo |
| 4 | Exploitation | Ejecutar el código malicioso |
| 5 | Installation | Asegurar acceso persistente |
| 6 | Command & Control (C2) | Establecer canal de comunicación encubierto |
| 7 | Actions on Objectives | Cumplir la meta final (exfiltración, daño, etc.) |

---

## 1. Reconnaissance

> [!info] Origen militar
> El término viene del ámbito militar: recopilar información sobre un objetivo antes de atacarlo. En cyber, es la fase de recolectar datos sobre vulnerabilidades y debilidades para descubrir puntos de entrada.

Se divide en dos tipos:

- **Pasivo**: el atacante no genera "ruido"; no hay interacción directa detectable. Usa [[OSINT]] (Open Source Intelligence).
- **Activo**: requiere algún tipo de interacción con la organización objetivo (ingeniería social, escaneo de sistemas).

### Reconocimiento pasivo — ejemplos

- **WHOIS**: puede revelar contacto, fechas de registro y propietarios de dominios (salvo privacy protection).
- **[[DNS]] databases**: pueden revelar servidores y direcciones IP públicas.
- **Web scraping**: extracción de datos de sitios web.
- **Redes sociales**: reconocimiento de perfiles públicos.
- **Google Dorking**: uso de motores de búsqueda para revelar información sensible y archivos confidenciales.

### Reconocimiento activo — ejemplos

- **Escaneo de puertos**: identifica hosts activos y servicios en ejecución.
- **Escaneo de vulnerabilidades**: identifica debilidades en servicios públicos.
- **Reconocimiento físico**: visitar instalaciones para identificar puntos de acceso, medidas de seguridad y comportamiento del personal.

> [!warning] Contramedidas — Reconnaissance
> - Minimizar la exposición de información pública (sitios web, redes sociales, registros DNS).
> - Configurar privacidad en registros WHOIS.
> - Monitorizar y analizar tráfico/logs de red para detectar escaneos.
> - Revisar logs de servicio para detectar intentos de reconocimiento.

> [!note] Conexión con lo ya aprendido
> Esta fase se solapa directamente con [[Reconocimiento_Recon]] de Enhacke (theHarvester, Shodan, FOCA, nmap, dig, dnsenum, amass) y con el módulo [[Content Discovery]] de THM (Gobuster, Google Dorking).

---

## 2. Weaponisation

Con la info del reconocimiento, el atacante **prepara el ataque**: crea una carga útil (payload) diseñada para explotar las vulnerabilidades descubiertas. Puede:

- Usar un exploit preexistente.
- Modificar uno existente.
- Crear uno desde cero.

Suele apoyarse en **frameworks y herramientas** de explotación (ej. [[Metasploit]]).

> [!info] Ofuscación
> Es común ofuscar o cifrar el ataque para evitar detección, y ocultarlo dentro de archivos aparentemente inofensivos (documentos de Word, PDF). Al final de esta fase se obtiene un **archivo malicioso listo para distribuir**.

### Uso de armas — ejemplos

- **Kits de exploits**: plataformas automatizadas con exploits para distintas vulnerabilidades, que facilitan empaquetar el código en un payload (ejecutable o documento).
- **Macros maliciosas en Office**: si las macros están habilitadas, ejecutan instrucciones al abrir el documento.
- **Phishing**: envío del payload como archivo adjunto, hospedado en una web, o cargado en una USB.

> [!warning] Contramedidas — Weaponisation
> - **Capacitación de usuarios**: desconfiar de adjuntos, verificar el origen del correo, sospechar de archivos ZIP cifrados con contraseña incluida en el mismo correo.
> - Deshabilitar funciones innecesarias, desinstalar software no usado, eliminar complementos de navegador innecesarios.
> - Restringir macros de Office (deshabilitarlas o limitarlas a fuentes firmadas/confiables), idealmente vía **directiva de grupo de Windows (GPO)**.

---

## 3. Delivery

El atacante transmite el payload preparado al entorno objetivo, eligiendo el método más adecuado según lo aprendido en el reconocimiento.

### Delivery — ejemplos

- **Correos con suplantación de identidad**: adjuntos maliciosos o enlaces a descargas. El **nombre del archivo** importa mucho:
  - `invoice.pdf.exe` engaña más fácilmente que `program.exe` (doble extensión, la real queda oculta).
- **Spear phishing**: correos falsificados que simulan venir de una fuente confiable (ej. suplantando al jefe del destinatario).
- **Enlaces web maliciosos**: alojar exploit kits en sitios públicos; usar spoofing de dominio y acortadores de URL para parecer menos sospechosos.
- **Plataformas para compartir archivos**: subir el malware a servicios conocidos, aprovechando la confianza del usuario en ellos.
- **Malvertising**: anuncios en sitios legítimos que redirigen a páginas maliciosas.
- **Smishing**: SMS con enlaces o instrucciones maliciosas.
- **Ingeniería social**: convencer al usuario de descargar y ejecutar un programa.
- **Entrega física**: USB o DVD "inofensivo" dejado en un lugar accesible, con un pretexto convincente (ej. catálogo de interés para el personal).

> [!tip] Carrera armamentística
> La entrega es como una carrera armamentística: el equipo de defensa debe cubrir cada método de entrega conocido, mientras el atacante solo necesita que **uno** funcione.

> [!warning] Contramedidas — Delivery
> - Capacitación en concientización (navegación segura, phishing, ingeniería social).
> - **Filtrado de correo y web** como estándar.
> - **WAF** (Web Application Firewall) para bloquear archivos maliciosos servidos por web.
> - Monitorización de red y gestión de parches.

---

## 4. Exploitation

> [!note] No cubierto en las capturas
> Esta tarea (probablemente Tarea 5) no vino en las imágenes compartidas. Vale la pena completarla luego: cubre el momento en que el payload entregado se **ejecuta** aprovechando la vulnerabilidad (ej. buffer overflow, RCE, macro ejecutándose), pasando de "tener el arma en el objetivo" a "detonarla".

---

## 5. Installation

Tras la explotación exitosa, esta fase garantiza el **acceso persistente** al sistema comprometido. Así el atacante puede volver más adelante sin repetir la fase de exploitation.

> [!info] Palabra clave: persistencia
> Todo gira en torno a asegurar que el acceso sobreviva a reinicios, actualizaciones o el paso del tiempo.

### Instalación — ejemplos

- **Tareas programadas** (Windows) o **cron jobs** ([[Linux]]).
- Modificar scripts de inicio o archivos de configuración.
- Instalar un nuevo servicio (Windows) o daemon (Linux).
- Instalación de malware, backdoors o rootkits.
- **LOLBins** (Living Off the Land Binaries): abuso de binarios y herramientas legítimas del sistema para pasar desapercibido.
- **Web shells**: script en un lenguaje compatible con el servidor comprometido que permite ejecutar comandos del SO vía navegador. Si corre sobre HTTPS, el tráfico se camufla dentro de tráfico normal.

> [!warning] Contramedidas — Installation
> - Monitorizar procesos y servicios nuevos; analizar el proceso padre y actividades asociadas (contexto completo).
> - **EDR** (Endpoint Detection and Response): detecta procesos inusuales, modificación de archivos en directorios sensibles, conexiones de red inesperadas.
> - **Auditorías periódicas** comparando contra una línea base segura (baseline) para detectar cuentas o servicios no autorizados.
> - **Listas blancas de aplicaciones (application allowlisting)**: solo permite ejecutar software aprobado.

> [!tip] Conexión con lo ya aprendido
> Esta fase conecta con el módulo de [[Bash Scripting - Cron y Persistencia]] de Enhacke y con la técnica de cron exploitation vista en [[Bandit]].

---

## 6. Command & Control (C2)

Con el acceso persistente instalado, el atacante necesita mantener un **canal de comunicación confiable y encubierto** hacia los sistemas comprometidos, para poder actuar según sus objetivos. En esta fase establece su infraestructura de C2 (dominios, IPs, servicios en la nube).

> [!info] Ocultamiento de infraestructura
> Los atacantes usan nombres de dominio aleatorios, cambio frecuente de IP, cifrado del tráfico y otras técnicas de ofuscación para no levantar sospechas.

### C2 — ejemplos de tácticas

- **Protocolos comunes de capa de aplicación**: HTTP, HTTPS, DNS, SMTP — para mezclarse con tráfico legítimo.
- **Canales cifrados sobre HTTPS**.
- **DNS tunnelling**: codificación de datos dentro de solicitudes DNS para evadir soluciones de seguridad y firewalls.
- **Redes sociales / plataformas legítimas en la nube** como canal C2 (Dropbox, Google Docs) para enviar comandos y exfiltrar datos disimuladamente.
- **Dominio propio + infraestructura propia**: fácil de derribar, así que suele complementarse con:
  - **DGA (Domain Generation Algorithm)**: genera grandes cantidades de nombres de dominio con un algoritmo predefinido; el malware los va probando hasta encontrar el activo.
  - **Fast Flux**: asocia cientos/miles de IPs a un único nombre de dominio, rotándolas cada pocos minutos (a menudo con dispositivos comprometidos como proxies) para dificultar el bloqueo.

> [!warning] Contramedidas — C2
> - **Monitoreo de red** con IDS/IPS, atento a patrones y volúmenes de tráfico inusuales, y conexiones a IPs maliciosas conocidas.
> - **Monitoreo/análisis de DNS**: consultas inusualmente largas o hacia dominios sospechosos.
> - **Filtrado de contenido y bloqueo de acceso vía URL** sospechosas (importante porque los web shells suelen usar HTTP/HTTPS).
> - **Inspección de tráfico cifrado** para detectar C2 sobre HTTPS.
> - **Honeypots**: desplegarlos para detectar y analizar intentos de C2, monitoreando su comportamiento.

---

## 7. Actions on Objectives

Con el canal de C2 establecido, el atacante ejecuta finalmente sus **objetivos originales** — desde exfiltración de datos hasta interrupción del servicio.

### Actions on Objectives — ejemplos

- **Ataques destructivos**: eliminar o corromper datos para interrumpir el funcionamiento normal (daño puro, sin fin económico).
- **Ransomware**: ganancias económicas rápidas.
- **Fraude financiero**: transferencias bancarias no autorizadas u otras transacciones fraudulentas (más discreto que el ransomware).
- **Espionaje industrial/político**: robo de archivos confidenciales → **exfiltración de datos**.
- **Movimiento lateral**: comprometer sigilosamente otros sistemas de la red para expandir el acceso.
- **Sistemas de Control Industrial (SCI/ICS)**: manipulación en objetivos con infraestructura crítica.
- Puede ir precedido de una presencia persistente a largo plazo antes de ejecutar el ataque.

> [!warning] Contramedidas — Actions on Objectives
> - **DLP** (Data Loss Prevention): previene la exfiltración no autorizada de datos.
> - **Plan de backup y recuperación** confiable, clave para mitigar ransomware y ataques destructivos.
> - **Segmentación de red**: aísla sistemas críticos y evita movimiento lateral si un sistema se ve comprometido.
> - **Controles de acceso y principio de mínimo privilegio**: limita quién accede a sistemas y datos sensibles.
> - **Monitorización de actividad de usuario**: detectar comportamientos sospechosos (ej. consultas DNS a medianoche).
> - **EDR**: detectar accesos u modificaciones no autorizadas, cifrado de archivos o conexiones de red no autorizadas.

---

## Resumen — cadena completa con contramedidas

| Fase | Contramedida clave |
|------|---------------------|
| Reconnaissance | Minimizar exposición pública, privacidad WHOIS |
| Weaponisation | Capacitación de usuarios, restringir macros |
| Delivery | Filtrado de correo/web, WAF |
| Exploitation | *(pendiente de completar — Tarea 5)* |
| Installation | EDR, application allowlisting, baseline |
| Command & Control | IDS/IPS, monitoreo DNS, inspección HTTPS |
| Actions on Objectives | DLP, backups, segmentación de red |

> [!tip] Para recordar
> **R-W-D-E-I-C-A** → *"Recolecto, armo, entrego, exploto, instalo, controlo, actúo"*. Cada eslabón roto = ataque frustrado.


