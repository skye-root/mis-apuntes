# 🤝 TCP/IP — El Protocolo de Enlace de Tres Vías

## ¿Qué es TCP/IP?

**TCP** = *Transmission Control Protocol / Internet Protocol*

Es otro conjunto de reglas usadas en redes, muy similar al modelo OSI pero más simplificado. Mientras el OSI tiene 7 capas, **TCP/IP tiene solo 4**:

| #   | Capa TCP/IP             | Equivalente en OSI |
| --- | ----------------------- | ------------------ |
| 4   | Solicitud (Application) | Capas 5, 6 y 7     |
| 3   | Transporte (Transport)  | Capa 4             |
| 2   | Internet                | Capa 3             |
| 1   | Interfaz de red         | Capas 1 y 2        |

> 📌 TCP/IP es básicamente el modelo OSI comprimido. Funciona igual — con encapsulación al enviar y desencapsulación al recibir.

---

## La característica más importante de TCP

TCP **se basa en la conexión**. Esto significa que antes de enviar cualquier dato, **primero hay que establecer una conexión** entre el cliente y el servidor. Solo después de que esa conexión está confirmada, se empiezan a mandar los datos.

Gracias a esto, TCP **garantiza** que cualquier dato enviado será recibido en el otro extremo. Este proceso de establecer la conexión se llama **protocolo de enlace de tres vías** (Three-Way Handshake).

---

## Ventajas y desventajas de TCP

| ✅ Ventajas | ❌ Desventajas |
|------------|---------------|
| Garantiza la integridad de los datos | Requiere una conexión fiable. Si falta un fragmento, todo el conjunto no se puede usar y hay que reenviar |
| Sincroniza dos dispositivos para que los datos lleguen en el orden correcto y ninguno se sature | Una conexión lenta puede bloquear al otro dispositivo, ya que la conexión queda reservada todo el tiempo |
| Realiza muchos procesos extra para garantizar la fiabilidad | Es significativamente más lento que UDP porque los dispositivos tienen que hacer mucho más trabajo |

---

## Los encabezados de un paquete TCP

Cuando TCP envía datos, cada paquete lleva encabezados con información extra. Los más importantes son:

| Encabezado | ¿Qué es? |
|------------|----------|
| **Puerto de origen** | El puerto que abre el remitente para enviar el paquete. Se elige aleatoriamente entre los puertos del 0 al 65535 que estén libres en ese momento |
| **Puerto de destino** | El puerto en el que se ejecuta la aplicación o servicio en el host remoto. Por ejemplo, un servidor web usa el puerto **80**. Este valor NO se elige al azar |
| **Dirección IP de origen** | La IP del dispositivo que está enviando el paquete |
| **Dirección IP de destino** | La IP del dispositivo al que va dirigido el paquete |
| **Número de secuencia** | Al primer dato transmitido se le asigna un número aleatorio para ordenar los paquetes |
| **Número de acuse de recibo** | Una vez asignado un número de secuencia a un dato, el siguiente dato tendrá ese número + 1 |
| **Suma de verificación** | Garantiza la integridad de TCP. Se hace un cálculo matemático y se guarda el resultado. Si al llegar ese resultado no coincide, los datos se consideran corruptos |
| **Datos** | Aquí se almacenan los bytes del archivo o información que se está transmitiendo |
| **Bandera (Flag)** | Determina cómo debe procesarse el paquete durante el establecimiento de la conexión. Los flags controlan comportamientos específicos (SYN, ACK, FIN, RST...) |

---

## Los mensajes del protocolo TCP

TCP usa mensajes especiales para gestionar toda la comunicación:

| Paso | Mensaje     | ¿Qué hace?                                                                                                                                                   |
| ---- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1    | **SYN**     | El cliente inicia la conexión. Sirve para sincronizar ambos dispositivos                                                                                     |
| 2    | **SYN/ACK** | El servidor confirma que recibió el SYN y acepta sincronizarse                                                                                               |
| 3    | **ACK**     | Confirmación. Tanto el cliente como el servidor lo usan para confirmar que recibieron correctamente una serie de paquetes                                    |
| 4    | **DATA**    | Una vez establecida la conexión, los datos (bytes del archivo) se envían con este mensaje                                                                    |
| 5    | **FIN**     | Cierra la conexión de forma limpia y correcta una vez completada la transmisión                                                                              |
| #    | **RST**     | Interrumpe toda la comunicación de forma abrupta. Es el último recurso — indica que algo salió mal (la aplicación falló, el sistema no tiene recursos, etc.) |

---

## 🤝 El Three-Way Handshake (Apretón de Manos de Tres Vías)

Antes de enviar cualquier dato, TCP hace este proceso para establecer la conexión y acordar los números de secuencia:

```
[Alice - Cliente]              [Bob - Servidor]
        │                             │
        │ ──────── SYN ─────────────► │
        │   "Hola, quiero conectarme. │
        │    Mi número inicial es 0"  │
        │                             │
        │ ◄─────── SYN/ACK ────────── │
        │   "Ok, recibido. Mi número  │
        │    inicial es 5000.         │
        │    Confirmo el tuyo (0)"    │
        │                             │
        │ ──────── ACK ─────────────► │
        │   "Perfecto, reconozco tu   │
        │    número (5000).           │
        │    ¡Empecemos!"             │
        │                             │
        │ ════════ DATA ════════════► │
        │         [datos]             │
```

### ¿Para qué sirven los números de secuencia?

A cada dato se le asigna un número de secuencia aleatorio. Ambos dispositivos deben coincidir en la misma secuencia numérica para que los datos lleguen en el **orden correcto**.

| Dispositivo | Secuencia inicial (ISN) | Secuencia final |
|-------------|------------------------|-----------------|
| Cliente | 0 | 0 + 1 = **1** |
| Cliente | 1 | 1 + 1 = **2** |
| Cliente | 2 | 2 + 1 = **3** |

> 📌 Cada paquete recibe el número del anterior + 1. Así, aunque lleguen desordenados, el receptor sabe cómo reensamblarlos correctamente.

---

## Cerrar una conexión TCP (Four-Way Handshake)

Una vez que todos los datos fueron enviados y recibidos correctamente, TCP cierra la conexión. Como TCP preserva recursos del sistema, la buena práctica es **cerrar la conexión lo antes posible**.

El proceso de cierre funciona así:

```
[Alice]                        [Bob]
   │                             │
   │ ──────── FIN ─────────────► │  "Quiero cerrar la conexión"
   │                             │
   │ ◄─────── ACK ────────────── │  "Ok, recibido"
   │                             │
   │ ◄─────── FIN ────────────── │  "Yo también quiero cerrar"
   │                             │
   │ ──────── ACK ─────────────► │  "Confirmado, ¡hasta luego!"
   │                             │
        [Conexión cerrada ✅]
```

> 📌 Nota que al cerrar se usan **4 mensajes** (FIN → ACK → FIN → ACK), a diferencia de los 3 del inicio. Por eso a veces se llama **Four-Way Handshake** al cierre.

---

## Resumen del ciclo de vida completo de una conexión TCP

```
1. [SYN]     → Cliente dice "hola"
2. [SYN/ACK] → Servidor responde "hola, confirmado"
3. [ACK]     → Cliente confirma "listo para empezar"
── CONEXIÓN ESTABLECIDA ──
4. [DATA]    → Se transfieren los datos
5. [FIN]     → Alguno dice "ya terminé"
6. [ACK]     → El otro confirma
7. [FIN]     → El otro también cierra
8. [ACK]     → Confirmación final
── CONEXIÓN CERRADA ──
```

---

## Conceptos para repasar

- [ ] ¿Qué es un puerto y para qué sirve? (puerto 80 = HTTP, 443 = HTTPS, 22 = SSH...)
- [ ] ¿Qué pasa si el RST aparece en medio de una conexión? (posible ataque o fallo)
- [ ] ¿Qué diferencia hay entre el Three-Way Handshake y el Four-Way Handshake de cierre?
- [ ] ¿Qué son los números de secuencia y por qué son importantes en seguridad?

---

