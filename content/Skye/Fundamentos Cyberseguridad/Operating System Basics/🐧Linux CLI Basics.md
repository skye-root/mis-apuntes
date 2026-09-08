_______
# Comandos Básicos de navegación para usuario Linux 

- `pwd` --> Saber en que  lugar del sistema me encuentro
- `ls` --> Listar el contenido del directorio actual
- `ls -l` --> Lista el directorio con mas información como tamaño de archivo, permisos, fechas y más.
- `ls -al` -> muestra los archivos ocultos en el directorio
	(Los archivos ocultos son los que comienzan con un `.` , Linux los oculta por defecto)
- `cd` --> Se usa para moverse entre directorios.  Por ejemplo: `cd Documents` : esto me llevara al directorio  `Documents`
- `cd..` --> Se utiliza para retroceder de directorio o nivel de donde estamos. 
- `find` --> Se usa para localizar archivos dentro del sistema. 
	- `find <starting_point> -name <filename>` - Una versión sencilla 
		el `<starting_point> puede ser un directorio donde creamos que se encuentre lo que buscamos por ejemplo el usaremos el símbolo del directorio personal " ~ "` -> `find ~ -name mission_brief.txt`
- `cat` --> Se utiliza para leer el contenido del archivo 
	- `cat mission_brief.txt`
- `history` --> Imprime los comandos utilizados por el usuario

## Investigación del Sistema

- `whoami` --> Con que nombre de usuario inicié 
- `uname` --> Para saber el nombre del sistema operativo
- `uname -a` --> Para ver detalles sobre el sistema operativo, la versión del kernel y la arquitectura.
![[Pasted image 20260602233441.png|451]]
{Ejemplo de salida de `uname -a`

- `df -h` --> Para comprobar el disco y del almacenamiento. El `-h` significa legible para humanos
- Linux almacena los archivos de configuración e información en el directorio `/etc`.
	-  `cd /etc` --> Para dirigirnos al almacenamiento de configuración del sistema.
