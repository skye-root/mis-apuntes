____
El **Símbolo del sistema** (conocido como CMD) es una interfaz de texto para interactuar con el sistema operativo Windows mediante comandos.

# Comandos Básicos de Windows

- `cd` --> Para verificar mi ubicación actual, me muestra la ruta completa.
- `dir` --> Para listar el contenido del directorio donde me encuentro.
- `dir /a` --> Para listar todo el contenido completo incluyendo los elementos ocultos ( *oculto != secreta* )
- `cd` --> También se usa para navegar entre carpetas 
	- `cd folder_name` -> para movernos a una carpeta en especifica
	- `cd..` --> Para retroceder un nivel o de directorio. 
- `dir /s task_brief.txt` --> Para buscar un archivo en el disco .
	- El `/s` indica que busque en todas las subcarpetas del directorio actual  y te muestre la ruta , si es que el archivo existe.
- `type task_brief.txt` --> Para leer el contenido del archivo

## Información del Sistema

- `whoami` --> Me imprime el nombre de usuario de la cuenta con que he iniciado sesion. 
- `hostname` --> Para ver el nombre del equipo
- `systeminfo` --> Imprime mucha información
	- Concéntrese en estas partes: Nombre del sistema operativo, Versión del sistema operativo,  Tipo de sistema
- `ipconfig` --> Muestra la configuración de red de la máquina
	- buscar IPv4 Address
	- Buscar Default Gateway