________
Los dispositivos de una red necesitan identificarse para poder comunicarse. Para ello usan principalmente dos identificadores:

- **Dirección IP:** identifica a un dispositivo dentro de una red por un tiempo determinado. Puede cambiar.
- **Dirección MAC:** identifica físicamente la tarjeta o interfaz de red del dispositivo. Es como un número de serie.
________
![[Pasted image 20260505130916.png]]
Una **dirección IP** está formada por números divididos en partes llamadas **octetos**, por ejemplo: `192.168.1.1`. Las IP pueden ser:

- **Privadas:** se usan dentro de una red local, como la red de una casa, universidad o empresa.
- **Públicas:** se usan para identificar una red o dispositivo en Internet. Normalmente las proporciona el proveedor de Internet.

Varios dispositivos pueden tener IP privadas diferentes dentro de una misma red, pero al salir a Internet pueden compartir una misma IP pública.

También existen dos versiones importantes de IP:
- **IPv4:** usa direcciones más cortas, pero tiene un límite de cantidad de direcciones disponibles.
- **IPv6:** permite muchísimas más direcciones y ayuda a solucionar la escasez de IPv4.
![[Pasted image 20260505131022.png]]
________
La **dirección MAC** es un identificador único asignado a la interfaz de red. Está formada por números y letras en formato hexadecimal, por ejemplo: `a4:c3:f0:85:ac:2d`.

> ***Los primeros seis caracteres representan a la empresa que fabricó la interfaz de red, y los últimos seis son un número único***
******
![[Pasted image 20260505131051.png]]

Sin embargo, una MAC puede ser falsificada mediante una técnica llamada **suplantación de identidad** o **MAC spoofing**, donde un dispositivo cambia su MAC para aparentar ser otro. Esto puede usarse para evadir controles de red, por eso es importante conocerlo en ciberseguridad.
