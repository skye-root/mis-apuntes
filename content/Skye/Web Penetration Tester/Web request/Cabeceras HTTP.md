# Cabeceras HTTP
---
Estas cabeceras pasan información entre cliente y servidor. 
Las cabeceras pueden tener uno o varios valores, añadidos después del nombre de la cabecera y separados por dos puntos. 

Se dividen en :
1. [[#Cabeceras Generales]]
2. [[#Cabeceras de Entidad]]
3. [[#Cabeceras de solicitud]]
4. [[#Cabeceras de Respuesta]]
5. [[#Cabeceras de Seguridad]]
6. [[#Curl]]

### Cabeceras Generales
Se utilizan tanto en las solicitudes como en las respuestas HTTP. Son contextuales y se usan para *describir el mensaje en lugar de su contenido*

|**Cabecera**|**Ejemplo**|**Descripción**|
|---|---|---|
|`Date`|`Date: Wed, 16 Feb 2022 10:38:44 GMT`|Contiene la fecha y hora en que se originó el mensaje. Es preferible convertir la hora a la zona horaria estándar [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).|
|`Connection`|`Connection: close`|Indica si la conexión de red actual debe permanecer activa después de que finalice la solicitud. Dos valores comúnmente utilizados para esta cabecera son `close` y `keep-alive`. El valor `close` por parte del cliente o del servidor significa que les gustaría terminar la conexión, mientras que la cabecera `keep-alive` indica que la conexión debe permanecer abierta para recibir más datos y entradas.|

## Cabeceras de Entidad
Tambien pueden ser comunes tanto a la solicitud como a la respuesta. Se utilizan para *describir el contenido* transferido por un mensaje. Se suelen encontrar en las respuestas y en las solicitudes `POST` o `PUT`.

| **Cabecera**       | **Ejemplo**                   | **Descripción**                                                                                                                                                                                                                                                                                           |
| ------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Type`     | `Content-Type: text/html`     | Se utiliza para describir el tipo de recurso que se está transfiriendo. El valor es añadido automáticamente por los navegadores en el lado del cliente y devuelto en la respuesta del servidor. El campo `charset` denota el estándar de codificación, como [UTF-8](https://en.wikipedia.org/wiki/UTF-8). |
| `Media-Type`       | `Media-Type: application/pdf` | El `media-type` es similar a `Content-Type` y describe los datos que se transfieren. Esta cabecera puede desempeñar un papel crucial para que el servidor interprete nuestra entrada. El campo `charset` también se puede utilizar con esta cabecera.                                                     |
| `Boundary`         | `boundary="b4e4fbd93540"`     | Actúa como un marcador para separar el contenido cuando hay más de uno en el mismo mensaje. Por ejemplo, dentro de los datos de un formulario, este delimitador se utiliza como `--b4e4fbd93540` para separar las diferentes partes del formulario.                                                       |
| `Content-Length`   | `Content-Length: 385`         | Contiene el tamaño de la entidad que se está pasando. Esta cabecera es necesaria, ya que el servidor la utiliza para leer los datos del cuerpo del mensaje, y es generada automáticamente por el navegador y herramientas como cURL.                                                                      |
| `Content-Encoding` | `Content-Encoding: gzip`      | Los datos pueden sufrir múltiples transformaciones antes de ser pasados. Por ejemplo, grandes cantidades de datos pueden ser comprimidas para reducir el tamaño del mensaje. El tipo de codificación que se está utilizando debe especificarse mediante la cabecera `Content-Encoding`.                   |


## Cabeceras de Solicitud
Se utilizan en una solicitud HTTP y **no se relacionan con el contenido del mensaje**. 

| **Cabecera**    | **Ejemplo**                              | **Descripción**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Host`          | `Host: www.inlanefreight.com`            | Se utiliza para especificar el host que se está consultando para el recurso. Puede ser un nombre de dominio o una dirección IP. Los servidores HTTP pueden configurarse para alojar diferentes sitios web, que se revelan en función del nombre de host. Esto convierte a la cabecera host en un importante objetivo de enumeración, ya que puede indicar la existencia de otros hosts en el servidor objetivo.                                                                                                                  |
| `User-Agent`    | `User-Agent: curl/7.77.0`                | La cabecera `User-Agent` se utiliza para describir el cliente que solicita los recursos. Esta cabecera puede revelar mucho sobre el cliente, como el navegador, su versión y el sistema operativo.                                                                                                                                                                                                                                                                                                                               |
| `Referer`       | `Referer: http://www.inlanefreight.com/` | Indica de dónde procede la solicitud actual. Por ejemplo, al hacer clic en un enlace de los resultados de búsqueda de Google, `https://google.com` se convertiría en el referer. Confiar en esta cabecera puede ser peligroso, ya que puede ser fácilmente manipulada, lo que puede tener consecuencias no deseadas.                                                                                                                                                                                                             |
| `Accept`        | `Accept: */*`                            | La cabecera `Accept` describe qué tipos de medios puede entender el cliente. Puede contener múltiples tipos de medios separados por comas. El valor `*/*` significa que se aceptan todos los tipos de medios.                                                                                                                                                                                                                                                                                                                    |
| `Cookie`        | `Cookie: PHPSESSID=b4e4fbd93540`         | Contiene pares de valor de cookie en el formato `nombre=valor`. Una [cookie](https://en.wikipedia.org/wiki/HTTP_cookie) es una pieza de datos almacenada en el lado del cliente y en el servidor, que actúa como identificador. Éstas se pasan al servidor en cada solicitud, manteniendo así el acceso del cliente. Las cookies también pueden servir para otros fines, como guardar las preferencias del usuario o el seguimiento de la sesión. Puede haber varias cookies en una sola cabecera separadas por un punto y coma. |
| `Authorization` | `Authorization: BASIC cGFzc3dvcmQK`      | Otro método para que el servidor identifique a los clientes. Tras una autenticación exitosa, el servidor devuelve un token único para el cliente. A diferencia de las cookies, los tokens se almacenan solo en el lado del cliente y son recuperados por el servidor en cada solicitud. Existen múltiples tipos de autenticación basados en el servidor web y el tipo de aplicación utilizada.                                                                                                                                   |

## Cabeceras de Respuesta
Pueden utilizarse en una *respuesta HTTP y no se relacionan con el contenido*. Cabeceras de respuesta como `Age`,`Location`y`Server` se utilizan para proporcionar más contexto sobre la respuesta.
Cabeceras comunes en respuestas HTTP :LiArrowBigDownDash:

|**Cabecera**|**Ejemplo**|**Descripción**|
|---|---|---|
|`Server`|`Server: Apache/2.2.14 (Win32)`|Contiene información sobre el servidor HTTP que procesó la solicitud. Puede utilizarse para obtener información sobre el servidor, como su versión, y enumerarlo más a fondo.|
|`Set-Cookie`|`Set-Cookie: PHPSESSID=b4e4fbd93540`|Contiene las cookies necesarias para la identificación del cliente. Los navegadores analizan las cookies y las almacenan para futuras solicitudes. Esta cabecera sigue el mismo formato que la cabecera de solicitud `Cookie`.|
|`WWW-Authenticate`|`WWW-Authenticate: BASIC realm="localhost"`|Notifica al cliente sobre el tipo de autenticación necesaria para acceder al recurso solicitado.|

## Cabeceras de Seguridad
Estos son una clase de **cabeceras de respuesta utilizadas para especificar ciertas reglas y políticas** que debe seguir el navegador al acceder al sitio web.

| **Cabecera**                | **Ejemplo**                                   | **Descripción**                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Content-Security-Policy`   | `Content-Security-Policy: script-src 'self'`  | Dicta la política del sitio web hacia los recursos inyectados externamente. Esto podría ser código JavaScript, así como recursos de script. Esta cabecera instruye al navegador para que acepte recursos solo de ciertos dominios de confianza, evitando así ataques como el [Cross-site scripting (XSS)](https://en.wikipedia.org/wiki/Cross-site_scripting). |
| `Strict-Transport-Security` | `Strict-Transport-Security: max-age=31536000` | Impide que el navegador acceda al sitio web a través del protocolo HTTP de texto plano y fuerza a que toda la comunicación se realice a través del protocolo seguro HTTPS. Esto evita que los atacantes espíen el tráfico web y accedan a información protegida como contraseñas u otros datos sensibles.                                                      |
| `Referrer-Policy`           | `Referrer-Policy: origin`                     | Dicta si el navegador debe incluir o no el valor especificado a través de la cabecera `Referer`. Puede ayudar a evitar la divulgación de URLs e información sensible mientras se navega por el sitio web.                                                                                                                                                      |

## Curl
Para poder ver las cabeceras de respuesta podemos usar el parámetro `-I` para enviar una solicitud `HEAD` y mostrar solo cabeceras de respuesta. Ademas podemos usar el parametro `-i` para mostrar tanto las cabeceras como el cuerpo de la respuesta.

Tambien podemos usar el parametro `-A` para establecer nuestro  `User-Agent` :LiArrowBigDownDash:

![[Pasted image 20260907005535.png]]

## DevTools del navegador
Se puede previsualizar las cabeceras HTTP usando DevTools. Ingresamos a la pestaña `network` para ver las diferentes solicitudes, hacemos click en cualquiera para ver sus detalles: :LiArrowBigDownDash:
![[Pasted image 20260907005705.png]]

