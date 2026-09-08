
## Activos e identidades
---

### inventario de identidad
El inventario de indentidad es un catalógo de empleados corporativos(cuentas de usuario), servicios(cuentas de maquina) y sus detalles, como privilegios, contactos y roles dentro de la empresa.

Ejemplo: 

| Nombre completo | Nombre de usuario | Correo electrónico     | Role                             | Ubicación             | Acceso                      |
| --------------- | ----------------- | ---------------------- | -------------------------------- | --------------------- | --------------------------- |
| Gregory Baker   | G. Baker          | g.baker@tryhatme.ellos | Director Financiero              | Europa, Reino Unido   | VPN, SEDE CENTRAL, FINANZAS |
| Raymond Lund    | R. Lund           | r.lund@tryhatme.thm    | Asesor financiero estadounidense | Estados Unidos, Texas | VPN, FINANZAS               |
| Kate Danner     | K. Danner         | k.danner@tryhatme.thm  | Director de Tecnología           | Europa, Reino Unido   | VPN, DA, HQ,AWS             |

Fuentes de identidades

| Solución                     | Ejemplos                                   | Descripción                                                                                |
| ---------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Directorio activo            | En las instalacionesANUNCIO, ID de entrada | AD en sí mismo es una base de datos de identidad, y es comúnmente utilizado porSOC         |
| SSOProveedores               | Okta, Google Workspace                     | Alternativa en la nube para AD, una forma sencilla de gestionar y buscar usuarios.         |
| Sistemas de Recursos Humanos | BambooHR, SAP, HiBob                       | Limitado solo a empleados, pero generalmente proporciona datos completos de los empleados. |
### Inventario de activos
También llamado registro de activos, es una lista de todos los recursos informáticos dentro del entorno de TI de una organización. El termino "activo" se refiere a software, hardware o empleados. 

ejemplo:

|nombre de host|Ubicación|Dirección IP|Sistema operativo|Dueño|Objetivo|
|---|---|---|---|---|---|
|HQ-FINFS-02|Centro de datos del Reino Unido|172.16.15.89|Windows Server 2022|Informática central|Servidor de archivos para registros financieros|
|HQ-ADDC-01|Centro de datos del Reino Unido|172.16.15.10|Windows Server 2019|Informática central|Controlador de dominio AD principal|
|PC-891D|Oficina de Londres|192.168.5.13|Windows 11 Pro|Soporte técnico|Papelería informática para contables|

Fuentes de activos:

|Solución|Ejemplos|Descripción|
|---|---|---|
|Directorio activo|Active Directory local, Entra ID|AD no es solo una identidad, sino también una base de datos de inventario de activos sólida.|
|SIEMoEDR|Elastic, CrowdStrike|Algunos agentes SIEM o EDR recopilan información sobre los hosts monitorizados.|
|Solución MDM|MS Intune, Jamf MDM|Una clase específica de soluciones creadas para listar y administrar activos.|

## Diagramas de red
---
Es un esquema visual que presenta las ubicaciones , subredes y conexiones existentes, les brindará las respuestas a sus preguntas.

![[Pasted image 20260815191356.png]]

ejemplo de un caso:
1. **08:00** : Una IP **103.61.240.174** se está conectando repetidamente a un firewall corporativo a través del puerto**TCP/10443**
2. **08:23** : Los registros del firewall muestran que la IP 103.61.240.174 se tradujo a una IP interna **10.10.0.53.**
3. **08:25** : La IP 10.10.0.53 está escaneando el rango de red **172.16.15.0/24** pero no encuentra puertos abiertos.
4. **08:32** : La misma IP está escaneando ahora el rango de red **172.16.23.0/24** , y el ataque parece estar en curso.

Dependiento del tamaño y la estructura de una empresa, es posible ver diagramas más complejos. Tiene como objetivo *ayudar a comprender la actividad sospechosa en la red* . La ruta anterior se puede recontruir :

- El atacante detrás de la IP 103.61.240.174 realizó un ataque de fuerza bruta a la VPN, dirigido a vpn.tryhatme.thm.
- Tras un ataque de fuerza bruta exitoso y el inicio de sesión en la VPN, se le asignó una IP de la subred VPN.
- Posteriormente, el atacante intentó escanear la subred de la base de datos, pero probablemente fue bloqueado por las reglas del firewall.
- Al no tener éxito, el atacante cambió a la subred de la oficina en busca de su próximo objetivo.


## Teoria de los cuadernos de ejercicios SOC
---
El manual de operacones del SOC, tambien llamado libro de procedimiento o flujo de trabajo, es un documento estructurado que define los pasos necesarios para investigar y mitigar amenazas especìficas de manera eficiente y consistente. 
Los analistas senior suelen preparar manuales para apoyar a sus compañeros con menos experiencia. Se recomienda que los analistas nivel 1 clasifiquen las alertas segun los manuales para evitar errores y optimizar el anàlisis.

Example: 
![[Pasted image 20260815213230.png]]


1. Enrichment : Utilice la inteligencia de amenazas y el inventario de identidades para obtener informaciòn sobre el usuario

2. Investigatiòn: Utilizando los datos recopilados y registros del SIEM, emita su veredicto sobre si se espera el inicio de sesiòn.

3. Escalation: Escalar la alerta a L2 o comunicar el inicio de sesiòn al usuario si es necesario.


