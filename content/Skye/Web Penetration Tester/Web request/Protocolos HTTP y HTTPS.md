
# Protocolo de Transferencia de Hipertexto (HTTP)
---
La mayoria de las comunicaciones por internet se realizan con peticiones web a través del protocolo *HTTP* (protocolo a nivel de aplicación). 

> [!Important] Hipertexto
> El término `hipertexto` se refiere a texto que contiene enlaces a otros recursos y texto que los lectores pueden interpretar facilmente.

El puerto por defecto para la comunicación HTTP es el puerto *80*.
Se introduce un *Nombre de Dominio* calificado (FQDN) como un *Localizador Uniforme de Recursos* (URL). 
:LiArrowBigRightDash: `www.hackthebox.com`

## URL
Se accede a los recursos a través de HTTP mediante una *URL*:
![[Pasted image 20260905192208.png]]

| **Componente**                              | **Ejemplo**          | **Descripción**                                                                                                                                                                                                 |
| ------------------------------------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Protocolo` <br>o<br>`scheme`               | `http://` `https://` | Se utiliza para identificar el protocolo al que accede el cliente y termina con dos puntos y una doble barra (`://`)                                                                                            |
| `Información de Usuario`                    | `admin:password@`    | Este es un componente opcional que contiene las credenciales (separadas por dos puntos `:`) utilizadas para autenticarse en el host, y está separado del host con un signo de arroba (`@`)                      |
| `Host`                                      | `inlanefreight.com`  | El host indica la ubicación del recurso. Puede ser un nombre de host o una dirección IP                                                                                                                         |
| `Puerto`                                    | `:80`                | El `Puerto` está separado del `Host` por dos puntos (`:`). Si no se especifica ningún puerto, los esquemas `http` usan por defecto el puerto `80` y los `https` el puerto `443`                                 |
| `Ruta`<br>`path`                            | `/dashboard.php`     | Apunta al recurso al que se está accediendo, que puede ser un archivo o una carpeta. Si no se especifica ninguna ruta, el servidor devuelve el índice por defecto (p. ej., `index.html`).                       |
| `Cadena de Consulta`<br>o<br>`query string` | `?login=true`        | La cadena de consulta comienza con un signo de interrogación (`?`), y consiste en un parámetro (p. ej., `login`) y un valor (p. ej., `true`). Múltiples parámetros pueden ser separados por un ampersand (`&`). |
| `Fragmentos`                                | `#status`            | Los fragmentos son procesados por los navegadores en el lado del cliente para localizar secciones dentro del recurso principal (p. ej., un encabezado o una sección en la página).                              |

Los campos obligatorios principales son el esquema y el host

## Flujo HTTP

![[Pasted image 20260905220915.png]]
 La primera vez que un usuario introduce la URL en el navegador, este envía una petición a un servidor DNS para resolver el dominio y obtener su IP. El servidor DNS busca la dirección IP y la devuelve. Todos los nombres de dominio deben resolverse de esta manera, ya que un servidor no puede comunicarse sin una dirección IP. Luego con la IP devuelta se hace un HTTP request (GET) al servidor de la página y si existe nos devuelve el pagina raiz( / ) con un codigo 200. 

> [!Important] Info de DNS
> Nuestros navegadores primero buscan en los registros en el archivo local `/etc/hosts`  y si no está , contactan con otros servidores DNS

## CURL
Es una herramienta de linea de comandos para enviar  peticiones (principalmente HTTP).
ejm :LiArrowBigDownDash:

![[Pasted image 20260906130423.png]]

Cuando usamos `curl` la pagina no renderiza, solo nos muestra el codigo en formato crudo.
Tambien podemos usar `curl` para descargar una página o un archivo y guardar el contenido en un archivo usando el parámetro `-O`. Si queremos específicar el nombre del archivo de salida, usamos `-o` y especificar el nombre

![[Pasted image 20260906130715.png]]

La salida se guardo en `index.html`
Y veemos que nos mostró el estado del proceso de la petición. Podemos silenciar el estado con la bandera `-s`: 

![[Pasted image 20260906130903.png]]

Finalmente, podemos usar el parámetro `-h` para ver otras opciones que podemos usar con `curl`


# Protocolo Seguro de Transferencia de Hipertexto (HTTPS)
---
Una de las desventajas de HTTP es que los datos se tranfieren en texto plano. Lo que significa que se puede realizar un ataque de intermediario (Man-in-the-middle o MiTM)

Para contrarrestrar ese problema, se creó el protocolo *HTTPS (HTTP Secure)*, en el que todas las comunicaciones se transfieren en un formato cifrado.

ejm :LiArrowBigDown:
Se puede ver el contenido de una petición HTTP de login. Donde se puede ver el contenido en texto plano.
![[Pasted image 20260906133327.png]]

Lo que se intercepta y analiza el trafico de una petición HTTPS, donde los datos se tranfieren de forma cifrada :LiArrowBigDownDash:
![[Pasted image 20260906133514.png]]

> [!Important] Nota
> Aunque los datos usen el protocolo HTTPS (cifrado), la petición aún podria revelar la URL visitada si contactó a un servidor DNS de texto plano. Se recomienda utilizar servidores DNS cifrados (8.8.8.8 o 1.1.1.1) o usar VPN para cifrar todo el trafico.

## Flujo de HTTPS

![[Pasted image 20260906134013.png]]

Si escribimos `http://` en lugar de `https://` para un sitio web que fuerza el uso de HTTPS. Primero se envía una petición al puerto *80*, el servidor detecta esto y redirige al cliente al puerto HTTPS *443*. Esto se hace mediante el codigo de respuesta `301 Moved Permanently`.

Luego el cliente(navegador web) envia un paquete **client hello** dando info sobre si mismo. Despues el servidor responde con un **server hello**, seguido de un *intercambio de llaves* para intercambiar certificados SSL. El cliente (navegador) verifica la clave/certificado y envía uno propio. Despues de esto, se inicia un cifrado *handshake* para confirmar si el cifrado y la transferencia están funcionando correctamente.


> [!Warning] Nota
> Un atacante podría realizar un ataque de degradación de HTTP (HTTP downgrade attack), que degrada la comunicación HTTPS a HTTP, haciendo que los datos se transfieran en texto plano. Esto se hace configurando un proxy de intermediario (Man-In-The-Middle o MITM) para transferir todo el tráfico a través del host del atacante sin el conocimiento del usuario

## Curl para HTTPS
Tambien maneja  los HTTPS y realiza un handshake seguro y luego cifra y decifra los datos. Sin embargo, si alguna vez contactamos un sitio web con certificado SSL inválido o desactualizado, curl por defecto no procederá con la comunicación para proteger contra los ataques MiTM

![[Pasted image 20260906184741.png]]

Para omitir la verificación del certificado con `curl` podemos usar el parametro `-k`

![[Pasted image 20260906185327.png]]

