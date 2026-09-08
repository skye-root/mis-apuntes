El protocolo HTTP, varios mètodos de solicitud permiten que el navegador envìe informaciòn, formularios o archivos al servidor. Ademas, las cabeceras de respuesta tambièn contienen el còdigo de estado HTTP, que indica el resultado del procesamiento de nuestra soliciutd HTTP.

## Métodos de solicitud

| **Método** | **Descripción**                                                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`      | Solicita y recupera información o datos de un servidor sin modificar nada. Se pueden pasar datos adicionales al servidor a través de cadenas de consulta en la URL (p. ej., `?param=value`).                                    |
| `POST`     | Envía datos al servidor para **crear** un recurso nuevo. El método `POST` se utiliza comúnmente al enviar información (p. ej., formularios/inicios de sesión) o al subir datos a un sitio web, como imágenes o documentos.      |
| `HEAD`     | Solicita las cabeceras que se devolverían si se hiciera una solicitud `GET` al servidor. No devuelve el cuerpo de la solicitud y normalmente se realiza para comprobar la longitud de la respuesta antes de descargar recursos. |
| `PUT`      | Reemplaza o **actualiza por completo** un recurso existente con nuevos datos. Permitir este método sin los controles adecuados puede llevar a la subida de recursos maliciosos.                                                 |
| `DELETE`   | Elimina un recurso existente en el servidor web. Si no se protege adecuadamente, puede provocar una Denegación de Servicio (DoS) al eliminar archivos críticos en el servidor web.                                              |
| `OPTIONS`  | Devuelve información sobre el servidor, como los métodos que acepta.                                                                                                                                                            |
| `PATCH`    | Aplica modificaciones parciales al recurso en la ubicación especificada.                                                                                                                                                        |


![[Pasted image 20260908004812.png]]


## Códigos de Estado
Los códigos de estado HTTP se utilizan para comunicar al cliente el estado de su solicitud

|**Clase**|**Descripción**|
|---|---|
|`1xx`|Proporciona información y no afecta al procesamiento de la solicitud.|
|`2xx`|Se devuelve cuando una solicitud tiene éxito.|
|`3xx`|Se devuelve cuando el servidor redirige al cliente.|
|`4xx`|Indica solicitudes incorrectas `por parte del cliente`. Por ejemplo, solicitar un recurso que no existe o solicitar un formato incorrecto.|
|`5xx`|Se devuelve cuando hay algún problema `con el propio servidor HTTP`.|

ejemplos más comunes de cada una de las clases de códigos de estado HTTP :LiArrowBigDownDash:

| **Código**                  | **Descripción**                                                                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `200 OK`                    | Se devuelve en una solicitud exitosa y el cuerpo de la respuesta suele contener el recurso solicitado.                                                          |
| `302 Found`                 | Redirige al cliente a otra URL. Por ejemplo, redirigir al usuario a su panel de control (dashboard) después de un inicio de sesión exitoso.                     |
| `400 Bad Request`           | Se devuelve al encontrar solicitudes mal formadas, como solicitudes sin terminadores de línea.                                                                  |
| `403 Forbidden`             | Indica que el cliente no tiene el acceso adecuado al recurso. También se puede devolver cuando el servidor detecta una entrada maliciosa por parte del usuario. |
| `404 Not Found`             | Se devuelve cuando el cliente solicita un recurso que no existe en el servidor.                                                                                 |
| `500 Internal Server Error` | Se devuelve cuando el servidor no puede procesar la solicitud.                                                                                                  |

## GET
Cada vez que visitamos una URL, nuestros navegadores realizan por defecto una petición GET para obtener los recursos remotos alojados en esa URL.

## Autenticación Basica HTTP

Es un método simple del protocolo HTTP donde el servidor solicita un nombre de usuario y una contraseña para permitir el acceso a un recurso protegido.

Para acceder a la pag introducimos las credenciales `admin`:`admin
![[Pasted image 20260908123609.png]]
Y obtenemos acceso
![[Pasted image 20260908123649.png]]

Si intentamos acceder con `curl` , añadimos el parámetro `-i` para ver las cabeceras :LiArrowBigDownDash:

![[Pasted image 20260908124356.png]]
Obtenemos un `Access denied` en el cuerpo de la respuesta y también `Basic realm="Access denied"` en la cabecera `www-Authenticate`, esto confirma que la pagina usa `Autenticación básica HTTP` 

Para usar las credenciales a través de curl, usamos el parámetro `-u` :LiArrowBigDownDash:
![[Pasted image 20260908124739.png]]
Ahora si podemos ver la pagina en la respuesta. Otro método con el que podemos usar las credenciales de `autenticación básica HTTP`, es directamente por la URL :LiArrowBigRight: `username:password@URL` 
![[Pasted image 20260908125802.png]]

## Cabecera HTTP Authotization
Si añadimos el parámetro  `-v` al comando curl :LiArrowBigDownDash:
![[Pasted image 20260908132812.png]]
En la petición HTTP establece la cabecera `Authorization` en `Basic YWRtaW46YWRtaW4=`, es el valor codificado en base64 de `admin:admin`. Si estuvieramos usando un método de autenticación moderno (JWT) , el `Authorization` seria tipo `Bearer` y contendria un token cifrado más largo.

Podemos establecer la cabecera `Authorization` de forma manual con el parámetro `-H`. Podemos usar `-H` varias veces para especificar múltiples cabeceras :LiArrowBigDownDash:
![[Pasted image 20260908133325.png]]
Como veemos, esto tambien nos dió acceso a la página. La mayoria de aplicaciones web modernas utilizan formularios de inicio de sesión construidos con el lenguaje de scripting del backend (PHP) , que utilizan peticiones HTTP POST para autenticar a los usuarios y luego devuelven una cookie para mantener la autenticación. 

## Parámetros GET
En la pagina una vez autenticados , obtenemos a una función de `Busquedad de ciudades` :LiArrowBigDownDash:
![[Pasted image 20260908141940.png]]
Antes de introducir nuestro término de busqyeda y ver las peticiones, podemos limpiar haciendo clic en `papelera`, para borrar peticiones anteriores.
![[Pasted image 20260908142358.png]]
Después introducimos cualquier término, y notamos que se envia una petición al backend :LiArrowBigDownDash:
![[Pasted image 20260908142515.png]]
Veemos que esta petición se envía a `search.php` con el parametro GET `search=le` utilizado en la URL. Esto nos ayuda a entender que la función de busqueda solicita los resultados a otra página.

Ahora nosotros podemos hacerlo con `curl` para obtener exactamente :LiArrowBigDownDash:
![[Pasted image 20260908144749.png]]
Sin embargo , tuve un problema con el simbolo `?` que no me respondia como la imagen, sino que me daba todos los valores :
![[Pasted image 20260908144938.png]]

Entonces lo intenté de otra forma para que no rompa los caracteres especiales:
![[Pasted image 20260908145114.png]]
comando: `curl -H 'Authorization: Basic YWRtaW46YWRtaW4=' -G 'http://154.57.164.78:31550' --data-urlencode 'search=le'`

##### Explicacion del comando 
- El `-H` para agregar cabeceras
- El `-G` para que use el método GET
- `--data-urlencode` para definir que estoy buscando. 

