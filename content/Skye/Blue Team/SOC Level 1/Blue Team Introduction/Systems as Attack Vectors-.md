## Sistemas como vector de ataque
---
A diferencia del apunte anterior (donde el atacante manipula a una persona), acá el ciberdelincuente ataca el sistema directamente — sin que ningún usuario tenga que "caer" en nada.

### ¿Qué cuenta como "sistema"?

Puede ser un servidor físico, una máquina de laboratorio o una plataforma en la nube (ej. Microsoft 365). Protegerlo importa porque comprometer un solo sistema rara vez es el objetivo final — normalmente es la puerta hacia algo más grande (ej. comprometer un buzón no es solo "un correo", es potencialmente el correo de toda la empresa).

El valor de un sistema para un atacante depende de qué hay detrás de él:

| Sistema comprometido | Valor para el atacante |
|---|---|
| Laptop personal de un estudiante. | Robar su perfil de Steam y sumar el equipo a una botnet. |
| Laptop del administrador de TI senior de un banco. | Acceso a los sistemas bancarios internos. |
| Servidor de correo de un estudio de abogados penalistas. | Vaciar todos los buzones y usarlos para extorsión. |
| Servidor en el centro de una red industrial. | Cifrar toda la red con ransomware. |
| Panel de administración de un sitio web gubernamental. | Desfigurar el contenido del sitio (activismo / defacement). |

**Así lo vas a usar en un SOC real:** este mismo criterio (¿qué hay detrás de este sistema?) es el que debería definir tu prioridad de triage. Un servidor de laboratorio comprometido no es lo mismo que un dominio controller comprometido, aunque la alerta técnica se vea parecida.

---

## Ataques a los sistemas

En casi todo ataque serio, el primer objetivo es simplemente obtener *acceso*. Lo que el atacante hace después depende de su motivación — pero el punto de entrada suele repetirse en unos pocos patrones.

### Ataques liderados por humanos (pero contra el sistema)

Aunque el objetivo es el sistema, muchas veces quien "abre la puerta" sigue siendo un usuario: conectando una USB maliciosa que encontró en la calle, o descargando malware de una fuente pirata. De hecho, un **81% de las filtraciones de datos** involucra contraseñas robadas o comprometidas — el eslabón sigue siendo humano, solo que el resultado es acceso directo al sistema.

![[Pasted image 20260803181041.png]]

Dos ejemplos concretos de la captura:

- **Reutilización de contraseñas:** al verificar la contraseña "tryhackme" en haveibeenpwned.com, aparece marcada como filtrada **425 veces** en distintas brechas de datos. Si un usuario reutiliza esa misma contraseña en su cuenta corporativa, el atacante ni siquiera necesita hackear nada — solo probarla ahí (esto se llama **credential stuffing**).
- **RubberDucky:** un USB que parece una memoria normal, pero al conectarlo ejecuta malware automáticamente (se hace pasar por teclado y "escribe" comandos maliciosos apenas se conecta). Es la base técnica detrás del típico consejo de "no conectes USBs que te encuentres por ahí".

> **Contexto extra:** este tipo de dispositivo pertenece a la categoría de ataques **BadUSB** — el sistema operativo confía en cualquier teclado que se conecte, y el USB se disfraza de teclado para inyectar comandos sin que el usuario haga nada más que enchufarlo.

**Así lo vas a usar en un SOC real:** si ves una alerta de login exitoso desde una IP o dispositivo inusual justo después de que el usuario reportó "encontré una USB en el parqueo", conecta los puntos — no es coincidencia, es la cadena de ataque completa.

### Vulnerabilidades

Cualquier programa puede tener fallos de seguridad. El problema no es que existan (siempre van a existir), sino cuántas quedan sin parchear y cuánto tiempo permanecen así.

Cuando una vulnerabilidad se hace pública, se le asigna un identificador **CVE** (Common Vulnerabilities and Exposures). Desde ese momento arranca una carrera contrarreloj: los atacantes desarrollan exploits para aprovecharla mientras los defensores corren a actualizar sus sistemas antes de que los alcancen.

![[Pasted image 20260804034515.png]]

Algunas CVE que vale la pena reconocer de memoria porque marcaron un antes y un después (aparecen en la captura):

| CVE | Qué fue |
|---|---|
| **CVE-2017-0144 (EternalBlue)** | Vulnerabilidad crítica en el protocolo SMB — la usó el ransomware WannaCry para propagarse solo, sin que nadie hiciera clic en nada. |
| **CVE-2021-34527 (PrintNightmare)** | Falla crítica en el servicio de cola de impresión de Windows (Print Spooler). |
| **CVE-2022-30190 (Follina)** | Falla crítica en Microsoft Office explotada abriendo un documento manipulado. |
| **CVE-2023-24880** | Bypass de seguridad de tipo *zero-day* (vulnerabilidad explotada antes de que existiera un parche disponible). |

**Así lo vas a usar en un SOC real:** reconocer nombres como EternalBlue o Follina de inmediato te ahorra tiempo de investigación — si una alerta menciona el CVE o el patrón de explotación coincide, ya sabes de entrada qué tan crítico es y qué IOCs buscar, sin partir de cero.

### ¿Cómo responder a las vulnerabilidades?

La respuesta ideal a una CVE siempre es un **parche** (la actualización que publica el proveedor del software). Pero eso no siempre es inmediato — sobre todo con vulnerabilidades **zero-day**, donde el parche todavía no existe cuando ya se está explotando activamente. Mientras tanto, hay medidas temporales:

- Restringir el acceso al sistema solo a direcciones IP de confianza.
- Aplicar las mitigaciones temporales que el propio proveedor publica mientras prepara el parche definitivo.
- Bloquear los patrones de ataque conocidos a nivel de **IPS o WAF** (Intrusion Prevention System / Web Application Firewall — filtran tráfico malicioso antes de que llegue al sistema vulnerable).

### Cadena de suministro / Supply chain

Acá el atacante no ataca a la empresa víctima directamente, sino a una aplicación o librería que esa empresa usa. Si logra comprometer esa librería y distribuye una actualización maliciosa, **todos** los que la usan quedan comprometidos al mismo tiempo — sin haber hecho nada mal ellos mismos.

Es un tipo de ataque difícil de prevenir porque ninguna empresa controla al 100% todo el software (dependencias, librerías, apps de terceros) que corre en sus laptops, servidores y aplicaciones web. Ni siquiera TryHackMe se libró: [fue víctima](https://tryhackme.com/room/supplychainattacks) de un ataque de cadena de suministro a través de Lottie Player.

**Así lo vas a usar en un SOC real:** cuando una librería de terceros (ej. una dependencia de npm o de un CDN) publique una actualización, una alerta de comportamiento anómalo justo después de esa actualización merece más atención de lo normal — el patrón típico de supply chain attack es "todo estaba bien hasta que actualizamos X".

---

## Configuraciones erróneas

Este vector es distinto a los anteriores: no es una falla del software (como una CVE), sino un error humano al configurar el sistema — normalmente por parte del equipo de TI, no de un usuario final ni de un atacante.

**Ejemplo paso a paso** de cómo una base de datos crítica termina comprometida sin que exista ninguna vulnerabilidad de por medio:

![[Pasted image 20260804035707.png]]

1. Se instala la última versión de SQL — sin vulnerabilidades ni errores de configuración todavía.
2. Se cargan datos de clientes en la base de datos — ahora sí guarda información sensible.
3. **Primer error:** se deja la contraseña en algo como "1111".
4. **Segundo error:** se desactiva el firewall de la base de datos para "facilitar" el acceso.
5. Los atacantes esperan apenas unos días (suficiente para que nadie lo note) y roban los datos.

Nota algo clave: en ningún paso de esta cadena hubo un exploit ni una CVE. Todo el daño vino de dos decisiones de configuración.

### ¿Cómo responder a configuraciones incorrectas?

Como SOC analyst, muchas veces solo las vas a detectar *después* de que un atacante ya las explotó — la alerta llega cuando el daño ya empezó. En empresas más chicas, sin embargo, también te puede tocar un rol más proactivo, evitando que el error llegue a producción:

- **Pruebas de penetración (pentesting):** contratar hackers éticos que simulen un ataque real y reporten qué fallas encontraron.
- **Análisis de vulnerabilidades:** correr herramientas periódicamente que detecten contraseñas por defecto, software desactualizado, puertos abiertos que no deberían estarlo, etc.
- **Auditorías de configuración:** revisión manual de sistemas contra estándares reconocidos, como los **benchmarks de CIS** (Center for Internet Security — guías de configuración segura para cada tipo de sistema/software).

**Así lo vas a usar en un SOC real:** cuando investigues un incidente, no te quedes solo en "¿cómo entró el atacante?" — pregúntate también "¿qué configuración permitió que, una vez dentro, pudiera moverse tan fácil?". Muchas veces el punto de entrada es menor, pero una mala configuración es lo que convierte un incidente pequeño en uno grande.

---

## En una frase
Los sistemas se atacan por tres caminos que no dependen de engañar a nadie en el momento del ataque: vulnerabilidades de software sin parchar (CVE), errores de configuración humana (como una base de datos con contraseña débil y firewall desactivado), y compromisos en la cadena de suministro que arrastran a todos los usuarios de una librería o app de golpe.

---

**Suelto para anotar aparte:** credential stuffing, BadUSB, y el uso de benchmarks de CIS para auditorías (mencionados arriba) son temas que dan para un apunte propio más adelante, cuando THM los profundice.
