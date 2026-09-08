## Embudo de alerta
----
En primer lugar, los analistas de nivel 1 reciben las alertas en un SIEM, EDR o plataforma de gestión de incidencias. La mayoría de las alertas se cierran como falsos positivos o se gestionan en el nivel 1, pero las complejas y amenazantes se envían al nivel 2.

![[Pasted image 20260808064912.png]]

### Informes de alerta
Antes de cerrar la alerta o pasarla al nivel 2. Según los estándates del equipo y la gravedad, en lugar de un breve comentario, es posible que se solicite documentar su investigación en detalle, asegurándose de incluir toda la evidencia relevante. 
*Esto es importante para verdaderos positivos que requieran escalamiento*

### Escalada de alerta
Si la alerta de verdadero positivo requiere acciones adicionales o una investigación más profunda, remítala al analista nivel 2 para su revisión. En este punto, su informe de alerta resultará útil, ya que el analista nivel 2 lo utilizará para obtener contexto inicial y reducir el tiempo para realizar un análisis desde 0.

### Comunicación
También es posible que necesite comunicarse con otros departamentos durante o después del análisis. Por ejemplo, pregunte al equipo de TI si confirman la concesión de privilegios administrativos a algunos usuarios o poner en contacto con RRHH. 


## Guía de presentación de informes
---
Que los analistas de nivel 1 redacten informes de alerta cumple varios propósitos clave:

|                                          |                                                                                                                                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Propósito del informe de alerta**      | **Explicación**                                                                                                                                                                                                    |
| Proporcionar contexto para la escalada.  | - Un informe bien redactado ahorra mucho tiempo a los analistas de nivel 2.<br>- Además, les ayuda a comprender rápidamente lo que sucedió.                                                                        |
| Guarde los hallazgos para los registros. | - CrudoSIEMLos registros se almacenan durante 3 a 12 meses, pero las alertas se conservan indefinidamente.<br>- Por lo tanto, es mejor mantener todo el contexto dentro de la alerta, por si acaso.                |
| Mejorar las habilidades de investigación | - Si no puedes explicarlo de forma sencilla, no lo entiendes lo suficientemente bien.<br>- La redacción de informes es una excelente manera de mejorar las habilidades de nivel 1 mediante la síntesis de alertas. |
### Formato de informe
Se recomienda seguir las **The Five Ws**

- Who (Quién) : Que usuario inicia sesión, ejecuta el comando o descarga el archivo
- What (Qué) : ¿Qué acción o secuencia de eventos exactos se realizaron?
- When (Cuando) : Cuando exactamente comenzó y termino la actividad sospechosa
- Where (Donde) : Que dispositivo, IP, o sitio web estuvo involucrado en la alerta
- Why (Porqué) : La *W* más importante, el razonamiento de su veredicto final. 

#### Lab de THM

Ticket:
![[Snag_906d30b.png]]

Editando la alerta:
![[Snag_90737d0.png]]

Comentario mejorado y en ingles:

> [!Quote] Comentario Mejorado
> On 27/03, at 19:25 UTC, Eddie Huffman (IT Manager) received an email from "Microsoft Support" with the subject "Important Update: Microsoft Teams Pricing Increase." Automated analysis detected SPF/Fail and DKIM/Fail, indicating domain spoofing of microsoft.com. Combined with urgency language and the attached file REPORT.rar, this confirms phishing (True Positive). Escalating to L2 for attachment analysis


## Guía de escalamiento
---
Se debe escalar las alertas si: 
1. La alerta es un indicador de un ciberataque importante que requiere una investigación mas profunda o DFIR
2. Se requieren acciones correctivas como la eliminación de malware,  el aislamiento del host o el restablecimiento de la contraseña.
3. Se requiere comunicación con clientes, socios, gerencia o agencias de aplicación de la ley. 
4. Simplemente no comprendes del todo la alerta y necesitas ayuda de analistas más experimentados

### Pasos para escalar el problema

![L1 eleva la alerta de phishing a L2, y L2 rota las credenciales del usuario.|586](https://cdn-images.tryhackme.com/user-uploads/678ecc92c80aa206339f0f23/room-content/678ecc92c80aa206339f0f23-1743520297119.svg)

### Solicitud de soporte de nivel 2

El procedimiento para solicitar asistencia pueden variar, pero el flujo generamente es el siguiente: 

![L1 le pide a L2 que colabore en la investigación, L2 acepta y ofrece una sesión para compartir conocimientos.|586](https://cdn-images.tryhackme.com/user-uploads/678ecc92c80aa206339f0f23/room-content/678ecc92c80aa206339f0f23-1743520519371.svg)

## Comunicación SOC
---
- Necesitas escalar una alerta crítica y urgente, pero el nivel 2 no está disponible y no responde en 30 minutos
- La alerta sobre la vulneración de la cuenta de Slack/Teams requiere que valide el inicio de sesión con el usuario afectado
- Recibes una gran cantidad de alertas en poco tiempo, algunas de ellas críticas
- Tras unos días, te das cuenta de que clasificaste mal la alerta y probablemente pasaste por alto una acción maliciosa
- No puede completar la clasificación de alertas ya que en el SIEM, los registros no se analizan correctamente o no se pueden buscar
