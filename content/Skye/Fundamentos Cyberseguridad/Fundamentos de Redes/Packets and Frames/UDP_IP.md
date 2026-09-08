# 💨 UDP/IP — El Protocolo Sin Estado


## ¿Qué es UDP?

**UDP** = *User Datagram Protocol* (Protocolo de Datagramas de Usuario)

Es otro protocolo para comunicar datos entre dispositivos, pero a diferencia de su hermano TCP, UDP es un **protocolo sin estado**.

> 📌 **Sin estado** significa que UDP no necesita establecer una conexión constante entre los dos dispositivos antes de enviar datos. No hay handshake, no hay sincronización, no hay confirmaciones. Se mandan los datos y punto.

---

## TCP vs UDP — La diferencia clave

| | TCP | UDP |
|--|-----|-----|
| Conexión previa | ✅ Sí, obligatoria | ❌ No, se manda directo |
| Confirmación de entrega | ✅ Sí | ❌ No |
| Orden de los paquetes | ✅ Garantizado | ❌ No garantizado |
| Velocidad | 🐢 Más lento | 🚀 Mucho más rápido |
| Integridad de datos | ✅ Verificada | ❌ No verificada |

---

## Ventajas y desventajas de UDP

| ✅ Ventajas | ❌ Desventajas |
|------------|---------------|
| Es mucho más rápido que TCP | No le importa si los datos se reciben o no |
| Deja en manos de la aplicación (software de usuario) la decisión de si existe algún control sobre la velocidad de envío de los paquetes | En este sentido, ofrece bastante flexibilidad a los desarrolladores de software, pero sin garantías |
| No reserva una conexión continua en el dispositivo como hace TCP | Las conexiones inestables dan como resultado una experiencia terrible para el usuario |

> ⚠️ Como no se lleva a cabo ningún proceso para establecer la conexión, UDP **no tiene en cuenta si los datos se reciben o no**, y no existen salvaguardas como las que ofrece TCP, tales como verificación de integridad de datos.

---

## ¿Cuándo se usa UDP?

UDP se usa en situaciones donde las aplicaciones **pueden tolerar la pérdida de algunos datos**:

- 🎥 Transmisión de **video** (si se pixela un frame, no es el fin del mundo)
- 🎙️ **Chat de voz** / Videollamadas (un pequeño corte es aceptable)
- 🎮 **Videojuegos online** (la velocidad importa más que la perfección)
- 📡 **Streaming en general** (mejor fluido con pérdidas que lento pero perfecto)

---

## Los encabezados de un paquete UDP

Los paquetes UDP son **mucho más simples** que los de TCP — tienen menos encabezados. Sin embargo, comparten algunos encabezados estándar con TCP:

| Encabezado | ¿Qué es? |
|------------|----------|
| **Tiempo de vivir (TTL)** | Temporizador de caducidad. Si el paquete nunca llega a su destino ni puede escapar, este campo evita que sature la red indefinidamente. Cuando llega a 0, el paquete se descarta |
| **Dirección de origen** | La IP del dispositivo que envía el paquete, para que los datos sepan a dónde regresar si es necesario |
| **Dirección de destino** | La IP del dispositivo al que va dirigido el paquete, para que sepa a dónde viajar |
| **Puerto de origen** | El puerto que abre el remitente para enviar el paquete. Se elige aleatoriamente entre los puertos del 0 al 65535 que estén libres |
| **Puerto de destino** | El puerto en el que se ejecuta la aplicación o servicio en el host remoto (ej: puerto 80 para web). Este valor NO se elige al azar |
| **Datos** | Los bytes del archivo o información que se está transmitiendo |

> 💡 ¿Notas qué le falta comparado con TCP? No tiene **número de secuencia**, ni **acuse de recibo**, ni **bandera (flag)**. UDP no necesita esas cosas porque no le importa el orden ni la confirmación.

---

## ¿Cómo funciona una conexión UDP?

A diferencia de TCP con su handshake de 3 pasos, UDP es mucho más directo. **No se envía ninguna confirmación durante la conexión.**

```
[Alice - Cliente]              [Bob - Servidor]
        │                             │
        │ ◄──── REQUEST ───────────── │  Bob pide algo
        │                             │
        │ ──── RESPONSE ────────────► │  Alice responde
        │                             │
        │ ──── RESPONSE ────────────► │  Alice sigue enviando
        │                             │
        │ ──── RESPONSE ────────────► │  Alice sigue enviando
        │                             │
        [Bob no confirma nada — UDP no lo requiere]
```

> 📌 UDP no espera confirmación entre paquete y paquete. Los datos se mandan de forma continua sin pausar a verificar si llegaron. Por eso es tan rápido — y por eso puede perder datos sin que nadie se queje.

---

## Comparación final: TCP vs UDP en la vida real

```
TCP — como enviar un paquete con acuse de recibo:
"¿Llegó?" → "Sí llegó" → "Siguiente..." → "¿Llegó?" → "Sí llegó"

UDP — como tirar folletos desde un avión:
La información sale volando. Algunos llegarán, otros no.
No hay forma de saber cuáles cayeron en buenas manos. 🪃
```

---

## Conceptos para repasar

- [ ] ¿Por qué UDP no tiene número de secuencia?
- [ ] ¿Qué aplicaciones del día a día usan UDP? (DNS, DHCP, streaming...)
- [ ] ¿Qué pasa con la seguridad en UDP? (más fácil de falsificar paquetes)
- [ ] Diferencia entre TTL en TCP y TTL en UDP

---

