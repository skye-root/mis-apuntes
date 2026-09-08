# 🔍 nmap — Tarea 12: Buscando Scripts de la NSE

**Módulo:** Jr Penetration Tester — nmap  
**Plataforma:** TryHackMe  
**Estado:** 🔄 En progreso

---

## ¿Dónde viven los scripts de nmap?

Ya sabemos cómo *usar* los scripts con `--script=`, pero ¿cómo sabes qué scripts existen y cuál usar para cada situación?

Tienes dos fuentes:

1. **Online:** La página oficial de nmap tiene un listado completo de todos los scripts → [https://nmap.org/nsedoc/](https://nmap.org/nsedoc/)
2. **Local:** En tu propia máquina, en la carpeta `/usr/share/nmap/scripts/`

Todos los scripts NSE instalados están guardados ahí por defecto. Es también donde nmap los busca cuando los llamas.

---

## El archivo `script.db`

Dentro de esa carpeta existe un archivo especial llamado `script.db`:

```
/usr/share/nmap/scripts/script.db
```

> [!info] No es una base de datos real
> A pesar de la extensión `.db`, es simplemente un **archivo de texto** con el nombre de cada script y su(s) categoría(s). nmap lo usa internamente para organizar y localizar los scripts.

Puedes ver su contenido con:

```bash
head /usr/share/nmap/scripts/script.db
```

El output se ve así:

```
Entry { filename = "ftp-anon.nse", categories = { "auth", "default", "safe", } }
Entry { filename = "ftp-brute.nse", categories = { "brute", "intrusive", } }
Entry { filename = "ftp-vsftpd-backdoor.nse", categories = { "exploit", "malware", "vuln", } }
```

Cada línea tiene: el nombre del archivo `.nse` y las categorías a las que pertenece.

---

## Método 1: Buscar con `grep` en `script.db`

La forma más directa de encontrar scripts relacionados a un servicio o categoría es usar `grep`:

```bash
grep "ftp" /usr/share/nmap/scripts/script.db
```

Esto te muestra todos los scripts que tienen "ftp" en su nombre o categorías — ideal para cuando quieres atacar un servicio específico.

También puedes buscar por categoría:

```bash
grep "vuln" /usr/share/nmap/scripts/script.db
grep "safe" /usr/share/nmap/scripts/script.db
grep "brute" /usr/share/nmap/scripts/script.db
```

> [!tip] Flujo de trabajo recomendado
> Cuando encuentras un puerto abierto con un servicio, por ejemplo FTP en el puerto 21:
> 1. `grep "ftp" /usr/share/nmap/scripts/script.db` → ves qué scripts existen
> 2. Lees los nombres y decides cuál usar (¿quieres hacer brute force? ¿buscar backdoors? ¿enumerar?)
> 3. Lanzas nmap con el script elegido

---

## Método 2: Buscar con `ls` y wildcards

La segunda forma es listar directamente los archivos de la carpeta usando `ls` con comodines (`*`):

```bash
ls -l /usr/share/nmap/scripts/*ftp*
```

El `*` actúa como "cualquier cosa" — así que `*ftp*` significa "cualquier archivo que tenga 'ftp' en alguna parte del nombre".

Output de ejemplo:

```
-rw-r--r-- 1 root root 4530 /usr/share/nmap/scripts/ftp-anon.nse
-rw-r--r-- 1 root root 3253 /usr/share/nmap/scripts/ftp-bounce.nse
-rw-r--r-- 1 root root 3108 /usr/share/nmap/scripts/ftp-brute.nse
-rw-r--r-- 1 root root 5923 /usr/share/nmap/scripts/ftp-vuln-cve2010-4221.nse
```

> [!info] ¿Cuándo usar `ls` vs `grep`?
> - Usa `grep` en `script.db` cuando quieres buscar por **categoría** o cuando no sabes el nombre exacto del script
> - Usa `ls *término*` cuando sabes el nombre del servicio y quieres ver los archivos directamente
> - Ambos métodos se complementan — úsalos juntos

---

## Instalación de scripts nuevos

Si visitas el sitio de nmap y encuentras un script que no tienes instalado localmente, puedes obtenerlo de dos formas:

### Opción 1: Actualizar nmap completo (recomendado)

```bash
sudo apt update && sudo apt install nmap
```

Esto actualiza nmap y trae todos los scripts nuevos del repositorio oficial.

### Opción 2: Descargar un script específico manualmente

```bash
sudo wget -O /usr/share/nmap/scripts/<nombre-script>.nse https://svn.nmap.org/nmap/scripts/<nombre-script>.nse
```

Después de descargarlo manualmente, **siempre debes actualizar el `script.db`** para que nmap lo reconozca:

```bash
nmap --script-updatedb
```

> [!warning] No olvides `--script-updatedb`
> Si descargas un script manualmente y no corres `--script-updatedb`, nmap no lo va a encontrar aunque el archivo esté en la carpeta correcta. Este paso es obligatorio.

> [!tip] Scripts personalizados con Lua
> Los scripts NSE están escritos en **Lua**, un lenguaje de scripting ligero. Si en el futuro quieres crear tus propios scripts NSE, Lua es bastante fácil de aprender — y sería una habilidad diferenciadora importante en pentesting. Cuando crees uno propio, también necesitarás correr `--script-updatedb` para que nmap lo indexe.

---

## Resumen de comandos de búsqueda

```bash
# Buscar scripts por servicio
grep "ftp" /usr/share/nmap/scripts/script.db
grep "ssh" /usr/share/nmap/scripts/script.db
grep "http" /usr/share/nmap/scripts/script.db
grep "smb" /usr/share/nmap/scripts/script.db

# Buscar scripts por categoría
grep "vuln" /usr/share/nmap/scripts/script.db
grep "brute" /usr/share/nmap/scripts/script.db
grep "exploit" /usr/share/nmap/scripts/script.db
grep "safe" /usr/share/nmap/scripts/script.db

# Buscar archivos por nombre con ls
ls -l /usr/share/nmap/scripts/*ftp*
ls -l /usr/share/nmap/scripts/*ssh*
ls -l /usr/share/nmap/scripts/*http*

# Actualizar base de datos de scripts
nmap --script-updatedb

# Instalar script manualmente
sudo wget -O /usr/share/nmap/scripts/nombre.nse https://svn.nmap.org/nmap/scripts/nombre.nse
nmap --script-updatedb
```

---

## Flujo completo: desde encontrar hasta usar un script

```
¿Qué servicio encontraste abierto?
        │
        ▼
grep "servicio" /usr/share/nmap/scripts/script.db
        │
        ▼
Leo los nombres y categorías
        │
        ├─── ¿Brute force?     → categoría "brute"
        ├─── ¿Vulnerabilidades? → categoría "vuln"  
        ├─── ¿Info del servicio?→ categoría "discovery" o "default"
        └─── ¿Explotar algo?   → categoría "exploit" (¡cuidado!)
        │
        ▼
nmap --script=<nombre-script> -p <puerto> <IP>
```

> [!danger] Scripts de categoría "exploit" e "intrusive"
> Estos scripts pueden **modificar o dañar** el servicio objetivo. Úsalos solo en entornos de laboratorio o con autorización explícita. En un pentest real, siempre confirma con el cliente qué nivel de intrusión está permitido.
