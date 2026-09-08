
# Peticiones y Respuestas HTTP
---
Las peticiones contienen todos los detalles que solicitamos al servidor, incluyendo el recurso (URL,ruta,parámetros), cualquier dato de la petición, cabeceras u opciones que especifiquemos.

## Petición HTTP
ejm :LiArrowBigDownDash:
Petición HTTP GET`http://inlanefreight.com/users/login.html`
![[Pasted image 20260906190106.png]]

|**Campo**|**Ejemplo**|**Descripción**|
|---|---|---|
|`Method`|`GET`|El método o verbo HTTP, que especifica el tipo de acción a realizar.|
|`Path`|`/users/login.html`|La ruta al recurso al que se está accediendo. Este campo también puede tener como sufijo una cadena de consulta (query string) (p. ej., `?username=user`).|
|`Version`|`HTTP/1.1`|El tercer y último campo se utiliza para denotar la versión de HTTP.|
Debajo de estos hay un conjunto de lineas que contiene pares de valores de cabeceras HTTP, como `Host` , `User-Agent`, `Cookie` y muchas otras. Se usan para especificar varios atributos de una petición.
Las cabeceras terminan con una nueva línea, que es necesaria para que el servidor valide la petición

![[Pasted image 20260906190637.png]]

## Respuesta HTTP
Luego de procesar la petición envia su respuesta :LiArrowBigDownDash:
![[Pasted image 20260906190812.png]]
La primera línea contiene la version HTTP `HTTP/1.1` y el segundo denota el código de respuesta `200 OK`

La respuesta puede terminar con un cuerpo de respuesta. Se define normalmente como código *HTML*, tambien puede ser codigo *JSON*, recursos del sitio web como imágenes, hojas de estilo o scripts, o incluso un doc PDF alojado en el servidor web.

## Curl
Tambien nos permite previsualizar la petición HTTP y la respuesta completa. Podemos añadir el parametro `-v` (modo verboso).

![[Pasted image 20260906191343.png]]

Como podemos ver en la petición solo tenemos las cabeceras `Host`,`User-Agent`y`Accept` . En la respuesta veemos `HTTP/1.1 401 Unauthorized`, que indica que no tenemos acceso al recurso solicitado.  

> [!Quote] Ejercicio
> El flag `-vvv` muestra una salida aún más detallada. Intenta usar este flag para ver qué detalles adicionales de la petición y la respuesta se muestran con él

## Herramientas de desarrollador del navegador (DevTools)
Para abrir las DevTools del navegador, podemos hacer `CTRL+SHIFT+I` o clic en `F12`. Las DevTools contienen varias pestañas, cada una de las cuales tiene su propio uso. Para las peticiones web se encuentra en la pestaña `Red`.

![[Pasted image 20260906193117.png]]

En la pestaña de red nos muestran el código de respuesta, método utilizado (GET), recurso solicitado (URL/dominio), junto con la ruta solicitada. Ademas podemos *filtrar por URLs* para buscar una petición específica.

