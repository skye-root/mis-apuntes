______
`ping` es una herramienta básica de redes que sirve para comprobar si existe conexión entre dos dispositivos y si esa conexión responde correctamente.

Funciona enviando paquetes **ICMP** al dispositivo de destino y esperando una respuesta. Con eso se puede saber:

- Si el dispositivo está activo o responde.
- Cuánto tiempo tarda en responder.
- Si hubo pérdida de paquetes.

La sintaxis básica es:

```
ping IP_o_sitio_web
```

Ejemplo:

![[Pasted image 20260506124850.png]]

En la captura, se hizo ping a la IP privada `192.168.1.254`. El resultado muestra que se enviaron **6 paquetes ICMP** y todos fueron recibidos, es decir, hubo **0% de pérdida de paquetes**. Además, se muestra el tiempo de respuesta de cada paquete en milisegundos.

En resumen, `ping` ayuda a verificar rápidamente si hay comunicación con otro dispositivo dentro de una red o con un sitio web en Internet.