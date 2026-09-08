# Comandos Linux
---
## Navegación y archivos

- **`ls`** → Lista el contenido de la carpeta actual
- **`ls -la`** → Lista todo, incluyendo archivos ocultos y permisos
- **`pwd`** → Muestra la ruta completa donde te encuentras ahora
- **`cd nombre-carpeta`** → Entra a una carpeta
    - `cd ../` → Sube un nivel | `cd ~` → Va directo al home | `cd -` → Vuelve a la carpeta anterior
- **`mkdir nombre`** → Crea una nueva carpeta
    - `mkdir -p ruta/carpeta/nueva` → Crea carpetas anidadas de una vez
- **`touch nombre`** → Crea un archivo vacío
- **`cat archivo`** → Muestra el contenido de un archivo
    - `cat > archivo` → Escribe texto dentro del archivo (el símbolo `>` redirige lo que escribes al archivo)
    - `cat archivo1 archivo2 > archivo3` → Une dos archivos en uno
- **`less archivo`** → Muestra el contenido de forma paginada (mejor que `cat` para archivos largos)
    - Navega con las flechas, sal con `q`
- **`head -n 10 archivo`** → Muestra las primeras 10 líneas de un archivo
- **`tail -n 10 archivo`** → Muestra las últimas 10 líneas
    - `tail -f archivo.log` → Muestra en tiempo real las nuevas líneas (ideal para logs)
- **`nano archivo`** → Abre el editor de texto en la terminal
- **`vim archivo`** → Editor más potente que nano (aprender lo básico vale la pena)
    - `i` → modo inserción | `Esc` → salir del modo | `:wq` → guardar y salir | `:q!` → salir sin guardar
- **`mv origen destino`** → Mueve un archivo a otra carpeta — también sirve para renombrarlo
    - `mv texto.txt /home/` → Lo mueve | `mv viejo.txt nuevo.txt` → Lo renombra
- **`cp archivo destino`** → Copia un archivo a otra carpeta
    - `cp -r carpeta destino` → Copia una carpeta y todo su contenido
- **`rm archivo`** → Elimina un archivo
    - `rm -rf carpeta` → Elimina una carpeta y todo su contenido ⚠️ sin confirmación
- **`find /ruta -name "nombre"`** → Busca archivos o carpetas por nombre
    - `find / -name "*.txt"` → Busca todos los archivos .txt en el sistema
    - `find /home -user alumno` → Busca archivos que pertenecen a un usuario
- **`grep 'texto' archivo`** → Busca una palabra dentro de un archivo
    - `grep -r 'texto' /ruta/` → Busca en todos los archivos de una carpeta
    - `grep -i 'texto' archivo` → Búsqueda sin distinguir mayúsculas
    - `grep -n 'texto' archivo` → Muestra el número de línea donde aparece
- **`locate nombre`** → Busca archivos muy rápido usando una base de datos indexada
    - `updatedb` → Actualiza la base de datos de locate (como root)
- **`wc -l archivo`** → Cuenta las líneas de un archivo
- **`sort archivo`** → Ordena líneas de un archivo alfabéticamente
- **`uniq archivo`** → Elimina líneas duplicadas consecutivas
- **`diff archivo1 archivo2`** → Muestra las diferencias entre dos archivos
- **`file nombre`** → Dice qué tipo de archivo es (imagen, texto, binario, etc.)
- `df -h` → Sirve para listar los sistemas de archivos se están siendo usados en el momento ( -h  significa human readable ) 
- `7z l archivo` → Sirve para listar el contenido de un archivo comprimido o imagen sin extraerlo
---

## Permisos

- **`chmod 755 archivo`** → Cambia los permisos de un archivo o carpeta
    - `chmod +x script.sh` → Da permiso de ejecución a un script
    - Los tres números representan: **dueño / grupo / otros** (4=leer, 2=escribir, 1=ejecutar)
    - Ejemplo: 755 → dueño puede todo, grupo y otros pueden leer y ejecutar
- **`chown usuario:grupo archivo`** → Cambia el dueño de un archivo
    - `chown -R usuario /ruta/` → Cambia el dueño de una carpeta y todo su contenido
- **`ls -l`** → Muestra permisos, dueño y grupo de cada archivo

> Los permisos se ven así: `-rwxr-xr--` La primera letra indica tipo (- archivo, d directorio, l enlace). Luego vienen 3 grupos de 3 letras: dueño, grupo, otros.

---

## Procesos

- **`ps`** → Muestra los procesos en ejecución del usuario actual
    - `ps aux` → Muestra TODOS los procesos del sistema con más detalle
        - `a` → todos los usuarios | `u` → con memoria y usuario | `x` → procesos sin terminal (servicios)
- **`ps -fp PID`** → Detalle de un proceso: qué comando lo lanzó, ruta, usuario
- **`top`** → Monitor de procesos en tiempo real (como el Administrador de tareas)
    - `htop` → Versión mejorada y visual de `top` (puede que necesites instalarlo)
- **`kill PID`** → Pide al proceso que se cierre de forma ordenada (igual que `kill -15`)
- **`kill -9 PID`** → Mata el proceso al instante, sin preguntar ⚠️
- **`kill -9 -1`** → Mata TODOS los procesos del usuario — solo en emergencias extremas ⚠️
    - Útil para: sistemas sin respuesta, detener malware masivo, análisis forense
- **`pkill nombre`** → Mata un proceso por su nombre (sin necesitar el PID)
    - `pkill firefox` → Cierra Firefox
- **`jobs`** → Muestra procesos corriendo en segundo plano en la sesión actual
- **`bg`** → Reanuda un proceso pausado en segundo plano
- **`fg`** → Trae un proceso del segundo plano al frente
- **`comando &`** → Ejecuta un comando en segundo plano
    - Ejemplo: `sleep 60 &`
- **`nohup comando &`** → Ejecuta un proceso que sigue corriendo aunque cierres la terminal

---

## Compresión

- **`tar -czvf nuevo.tar.gz archivo`** → Comprime un archivo o carpeta
- **`tar -xvf archivo.tar.gz`** → Descomprime el archivo
- **`tar -tzvf archivo.tar.gz`** → Lista el contenido sin descomprimir
- **`zip archivo.zip archivo`** → Comprimir en formato zip
- **`unzip archivo.zip`** → Descomprimir un zip
    - `unzip archivo.zip -d /destino/` → Descomprime en una carpeta específica
- **`du -sh /ruta`** → Muestra el tamaño que ocupa un archivo o directorio
- **`du -sh /*`** → Muestra el tamaño de todas las carpetas raíz (útil para encontrar qué ocupa espacio)

> Extensiones comunes: `.tar` | `.tar.gz` | `.tgz` | `.tar.bz2` | `.zip` | `.7z`

---

## Usuarios y sesiones

- **`who`** → Muestra los usuarios conectados actualmente al sistema
- **`w`** → Igual que `who` pero con más información (carga, tiempo activo)
- **`last`** → Historial de inicios de sesión en el sistema
- **`id`** → Muestra tu usuario actual, UID, GID y grupos a los que perteneces
- **`whoami`** → Muestra solo tu nombre de usuario actual
- **`su usuario`** → Cambia temporalmente a otro usuario
    - `su -` → Cambia a root con su entorno completo
- **`sudo comando`** → Ejecuta un comando con privilegios de root sin cambiar de usuario
- **`passwd`** → Cambia tu contraseña
    - `passwd usuario` → Cambia la contraseña de otro usuario (como root)
- **`adduser nombre`** → Crea un nuevo usuario (como root)
- **`usermod -aG grupo usuario`** → Agrega un usuario a un grupo
    - `usermod -aG sudo alumno` → Da permisos sudo al usuario alumno
- **`uname -a`** → Información completa del sistema (kernel, arquitectura, hostname, etc.)
    - `-s` nombre del kernel | `-r` versión | `-m` arquitectura | `-n` hostname

---

## Hardware

- **`free -m`** → Uso de memoria RAM en megabytes
- **`cat /proc/cpuinfo`** → Detalles del procesador (modelo, núcleos, velocidad)
- **`df -h`** → Uso del almacenamiento por partición (en formato legible)
- **`lsblk`** → Lista discos, particiones y dispositivos de almacenamiento montados
- **`lsusb`** → Lista los dispositivos USB conectados
- **`lspci`** → Lista los dispositivos PCI (tarjetas de red, gráficas, etc.)
- **`dmesg`** → Mensajes del kernel, útil para ver errores de hardware al arrancar
    - `dmesg | tail -20` → Ver los últimos 20 mensajes del kernel
- **`sensors`** → Muestra temperatura del CPU y otros sensores (puede necesitar instalación)
- **`inxi -Fxz`** → Resumen completo del hardware del sistema (puede necesitar instalación)

---

## Red

- **`ifconfig`** → Muestra información de las interfaces de red (IP, MAC, etc.)
    - `ip addr` → Alternativa moderna a `ifconfig`
- **`ping dirección`** → Comprueba conectividad — mide latencia y pérdida de paquetes
- **`ping -c 4 google.com`** → Manda solo 4 paquetes y se detiene
- **`cat /etc/resolv.conf`** → Muestra los servidores DNS configurados en el sistema
- **`route -n`** → Tabla de enrutamiento y puerta de enlace por defecto
    - `ip route show` → Alternativa moderna
- **`sudo dhclient -v`** → Fuerza al sistema a solicitar una nueva IP al router
    - Cuándo usarlo: sin internet en Kali, cambiaste de red, tu VM perdió conexión, aparece "network unreachable"
- **`netstat -tulnp`** → Muestra los puertos abiertos , conexiones activas y ver sus PIDs
    - `ss -tuln` → Alternativa moderna y más rápida a `netstat`
- **`nmap IP`** → Escanea los puertos abiertos de un host (muy usado en ciberseguridad)
    - `nmap -sV IP` → Muestra también la versión de los servicios
    - `nmap -A IP` → Escaneo agresivo con detección de SO y versiones
- **`curl URL`** → Hace una petición HTTP y muestra la respuesta
    - `curl -O URL` → Descarga un archivo de una URL
- **`wget URL`** → Descarga un archivo desde internet
- **`traceroute dominio`** → Muestra el camino que siguen los paquetes hasta llegar a destino
- **`whois dominio`** → Información del registro de un dominio
- **`dig dominio`** → Consulta información DNS de un dominio
    - `dig dominio MX` → Muestra los servidores de correo del dominio

---

## Servicios

- **`service tor status`** → Comprueba si el servicio Tor está activo
    - `service tor start` → Inicia | `service tor stop` → Detiene
- **`systemctl status nombre`** → Estado de cualquier servicio del sistema
    - `systemctl start nombre` → Inicia el servicio
    - `systemctl stop nombre` → Detiene el servicio
    - `systemctl restart nombre` → Reinicia el servicio
    - `systemctl enable nombre` → Hace que el servicio inicie automáticamente al arrancar
    - `systemctl disable nombre` → Desactiva el inicio automático

---

## Historial y atajos de terminal

- **`history`** → Muestra el historial de comandos usados
    - `history | grep "palabra"` → Busca un comando específico en el historial
    - `!número` → Repite el comando del historial con ese número
    - `!!` → Repite el último comando ejecutado
- **`Ctrl + C`** → Cancela/interrumpe el comando que está corriendo
- **`Ctrl + Z`** → Pausa el proceso actual (puedes reanudarlo con `fg` o `bg`)
- **`Ctrl + L`** → Limpia la pantalla (igual que `clear`)
- **`Ctrl + R`** → Busca en el historial de comandos mientras escribes
- **`Tab`** → Autocompletado de comandos, rutas y nombres de archivos
- **`↑ / ↓`** → Navegar por el historial de comandos
- **`comando1 | comando2`** → El pipe `|` pasa la salida de un comando como entrada del siguiente
    - Ejemplo: `ps aux | grep firefox` → Busca el proceso de Firefox

---

## Variables de entorno y sistema

- **`echo $VARIABLE`** → Muestra el valor de una variable de entorno
    - `echo $PATH` → Muestra las rutas donde el sistema busca los programas
    - `echo $HOME` → Muestra tu directorio home
- **`export VARIABLE=valor`** → Crea o modifica una variable de entorno para la sesión actual
- **`env`** → Lista todas las variables de entorno activas
- **`alias nombre='comando'`** → Crea un atajo para un comando largo
    - Ejemplo: `alias ll='ls -la'` → Ahora `ll` hace lo mismo que `ls -la`

---

## Apagar y reiniciar

- **`shutdown -h now`** → Apaga el sistema ahora
    - `shutdown 10` → Apaga en 10 min | `shutdown 20:30` → Apaga a las 20:30 | `shutdown -c` → Cancela apagado programado
- **`shutdown -r now`** → Reinicia el sistema ahora
- **`reboot`** → Reinicia el sistema
- **`systemctl poweroff`** → Apaga correctamente — más recomendado que `poweroff` ✅
- **`systemctl reboot`** → Reinicia de forma controlada, cerrando procesos limpiamente ✅
- **`halt`** → Detiene el SO inmediatamente, pero no siempre apaga el hardware

> Atajos en TTY (modo texto): `Ctrl+Alt+F2–F6` → Cambiar entre consolas virtuales `Ctrl+Alt+Supr` → Reiniciar `Ctrl+Alt+F7` → Volver al modo gráfico

---

## Instalación de software

- **`apt-get update`** → Actualiza la lista de paquetes disponibles ⚠️ hacer SIEMPRE primero
- **`apt-get upgrade`** → Actualiza todos los paquetes instalados a su versión más reciente
- **`apt-get install nombre`** → Instala un paquete del repositorio (como root)
- **`apt search nombre`** → Busca un paquete disponible en los repositorios
- **`apt show nombre`** → Muestra información detallada de un paquete
- **`apt-get remove nombre`** → Desinstala un programa (conserva la configuración)
- **`apt-get purge nombre`** → Elimina el programa y también su configuración ⚠️ completo
- **`apt-get autoremove`** → Elimina paquetes que ya no son necesarios (dependencias huérfanas)
- **`dpkg -i paquete.deb`** → Instala un archivo .deb descargado manualmente
- **`dpkg -l`** → Lista todos los paquetes instalados en el sistema
- **`which nombre`** → Muestra la ruta del ejecutable de un programa instalado

---

## Redirección y flujos

- **`comando > archivo`** → Guarda la salida del comando en un archivo (sobreescribe)
- **`comando >> archivo`** → Agrega la salida al final de un archivo (sin sobreescribir)
- **`comando 2> errores.txt`** → Guarda solo los errores en un archivo
- **`comando > salida.txt 2>&1`** → Guarda tanto la salida normal como los errores en un archivo
- **`comando < archivo`** → Usa el archivo como entrada del comando
- **`tee archivo`** → Muestra la salida en pantalla Y la guarda en un archivo al mismo tiempo
    - Ejemplo: `ps aux | tee procesos.txt`

---

## Scripts básicos

- **`bash script.sh`** → Ejecuta un script de bash
- **`chmod +x script.sh`** → Da permiso de ejecución a un script
- **`./script.sh`** → Ejecuta un script en la carpeta actual (debe tener permisos de ejecución)
- La primera línea de un script siempre debe ser: `#!/bin/bash`

> Ejemplo de script simple:
> 
> ```bash
> #!/bin/bash
> echo "Hola, $USER"
> echo "Hoy es: $(date)"
> ```

---

## Logs del sistema

- **`cat /var/log/syslog`** → Log general del sistema
- **`cat /var/log/auth.log`** → Intentos de autenticación e inicios de sesión
- **`journalctl -xe`** → Ver los logs del sistema en tiempo real con detalles de errores
- **`journalctl -u nombre-servicio`** → Ver logs de un servicio específico
- **`tail -f /var/log/syslog`** → Monitorear el log del sistema en tiempo real