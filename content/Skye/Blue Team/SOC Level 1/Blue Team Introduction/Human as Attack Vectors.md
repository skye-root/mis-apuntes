## El elemento humano
---
En ciberseguridad, los humanos suelen ser el eslabón más débil: no porque sean tontos, sino porque son manipulables de una forma en que un firewall no lo es. Un atacante casi siempre prefiere engañar a una persona antes que romper una defensa técnica bien configurada.

### ¿Por qué los humanos son el objetivo?
Porque dan acceso directo a sitios web, buzones de correo o bases de datos — sin necesidad de explotar nada técnico.

| Ejemplo de ataque | Siguiente paso del atacante |
|---|---|
| Comprometer la cuenta de Google del gerente de RR.HH. | Robar y vender toda la base de datos de empleados. |
| Engañar a una persona con dinero para que ejecute malware. | Secuestrar su sesión de banca en línea desde su propia PC. |
| Comprometer la cuenta VPN de un administrador de TI. | Acceder al núcleo de una red corporativa grande. |
| Engañar a un funcionario público para que revele secretos. | Usar esa info para facilitar los próximos ataques. |

**Así lo vas a usar en un SOC real:** cuando veas una alerta de "login sospechoso" en una cuenta de bajo perfil (ej. un practicante), no la subestimes solo por el cargo — muchas veces el objetivo real no es esa cuenta, sino usarla como puente hacia algo más valioso.

---

## Ingeniería social: la base de estos ataques

Consiste en manipular a la víctima para que ayude al atacante, de forma consciente o inconsciente. Funciona explotando la psicología humana, no una falla de software. Para que funcione necesita dos ingredientes:

- **Confiable:** el atacante debe parecer legítimo (un banco, el CEO, el área de TI).
- **Emocional:** el mensaje dispara urgencia, miedo o curiosidad — estados en los que la gente piensa menos y actúa más rápido.

### Phishing (suplantación de identidad)

El clásico: un correo dice algo como *"tu cuenta ha sido comprometida, haz clic aquí"*. El enlace lleva a una página de login falsa, idéntica a la real, que solo existe para robar tus credenciales.

![[Pasted image 20260803164904.png|700]]

Dos patrones que se repiten en los ejemplos reales:

- **Alerta de seguridad falsa** ("nuevo inicio de sesión en tu cuenta de 1Password"): usa una marca conocida y un botón directo a un portal de login falso.
- **Notificación falsa de una entidad oficial** ("aviso de penalidad fiscal"): agrega presión de "pago inmediato" y, en vez de un link, trae un adjunto malicioso.

**Así lo vas a usar en un SOC real:** ante un correo de phishing reportado, revisa siempre el dominio real del remitente (no el nombre mostrado) y si trae link o adjunto — son dos vectores distintos: el link roba credenciales, el adjunto suele ser malware directo.

### Descargas de malware

Aquí el objetivo no es robar una contraseña, sino que la víctima misma ejecute el malware. Para lograrlo, los atacantes usan trucos que parecen procesos legítimos:

![[Pasted image 20260803165049.png]]

- **Falsa página de actualización de navegador** ("tu Firefox está desactualizado"): el botón "actualizar" en realidad descarga un infostealer (malware que roba contraseñas, cookies de sesión, etc. guardadas en el equipo).
- **CAPTCHA falso con pasos "de verificación":** en vez del CAPTCHA normal (marcar imágenes), le pide a la víctima presionar Windows+R, pegar un comando y darle Enter. Ese comando es el que ejecuta el malware — la víctima cree que solo se está "verificando como humano".

> **Contexto extra:** esta técnica del CAPTCHA falso que hace pegar y ejecutar un comando se conoce como **ClickFix**. Es efectiva porque la víctima siente que ella tiene el control (está "resolviendo" algo), cuando en realidad está ejecutando el payload con sus propias manos.

**Así lo vas a usar en un SOC real:** si ves un proceso `powershell.exe` o `cmd.exe` lanzado desde el navegador o con el usuario recién habiendo estado en una página externa, sospecha de ClickFix — es una de las técnicas que más está creciendo porque evade muchos controles tradicionales (la víctima "autoriza" la ejecución ella misma).

### Deepfakes e impersonation

El **impersonation** es la técnica de ingeniería social que consiste en fingir ser otra persona. Los deepfakes (video o audio generado con IA) la llevan a otro nivel, permitiendo suplantar a un familiar, colega o socio corporativo de forma muy convincente.

Pero ojo: no hace falta un deepfake para que funcione. Muchos ataques de ransomware han tenido éxito solo con una llamada telefónica de alguien fingiendo ser del área de TI, pidiendo a la víctima que le dé control remoto de su equipo para una "reparación urgente del sistema".

---

## Defendiendo a los humanos

La defensa se apoya en dos tareas: **mitigación** (prevenir o reducir la probabilidad de que el ataque tenga impacto) y **detección** (encontrar lo que ya se coló). Como SOC analyst, tu trabajo principal es la detección — pero investigar cada ataque uno por uno no escala, así que la mitigación automática es lo que evita que tu bandeja de alertas explote.

THM lo representa como capas: cada mitigación filtra una parte del volumen, y lo que sobrevive termina en manos del SOC.

```
Alertas de phishing entrantes
        │
        ▼
[Mitigación 1: Herramienta Anti-Phishing]  ──✕ bloquea la mayoría
        │ (lo que logra pasar)
        ▼
[Mitigación 2: Capacitación de empleados]  ──✕ el usuario mismo lo detecta y reporta
        │ (lo que aún así pasa)
        ▼
        Equipo SOC → detecta e investiga lo que quedó
```

> **Contexto extra:** este modelo de capas donde cada control filtra parte del riesgo se llama **defensa en profundidad (defense in depth)** — ningún control es perfecto solo, pero apilados reducen mucho el volumen que le llega al humano (analista) al final de la cadena.

| Medida de mitigación | Descripción |
|---|---|
| **Solución anti-phishing** | Bloquea correos de phishing antes de que el usuario los vea — reduce directamente el volumen de alertas del SOC. |
| **Antivirus / EDR** | Evita que el malware se ejecute aunque el usuario haya hecho clic o descargado el archivo. |
| **"Confiar, pero verificar"** | Entrenar a los empleados para verificar solicitudes inusuales que parecen venir del CEO o de TI, en vez de asumir que son legítimas. |
| **Capacitación en concienciación** | Enseñar a detectar phishing y reforzarlo con simulaciones periódicas. |

**Así lo vas a usar en un SOC real:** cuando armes un reporte de incidente de phishing, no basta con "usuario hizo clic" — documenta en qué capa falló la mitigación (¿el correo pasó el anti-phishing?, ¿el usuario no reportó a tiempo?), porque eso es lo que ayuda a mejorar la capa que falló, no solo a cerrar el ticket.

---

## En una frase
Los humanos son el blanco favorito porque dan acceso directo sin necesidad de exploits técnicos; la ingeniería social (phishing, malware disfrazado de proceso legítimo, deepfakes/impersonation) explota confianza y emoción, y la defensa combina mitigación por capas con la detección del SOC para lo que logra colarse.

---

**Suelto para anotar aparte:** ClickFix y el purple teaming (mencionado en tu apunte anterior de SOC Role) son buenos candidatos para un apunte técnico dedicado más adelante, cuando THM (u otra fuente) los cubra a fondo.
