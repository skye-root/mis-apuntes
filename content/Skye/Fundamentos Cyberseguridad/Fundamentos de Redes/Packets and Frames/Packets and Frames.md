# 📦 Paquetes y Tramas (Packets & Frames)


## ¿Qué son los paquetes y las tramas?

Ambos son **pequeñas unidades de datos** que, al unirse, forman un mensaje o información más grande. Pero en el modelo OSI son dos cosas distintas y cada una vive en una capa diferente.

---

## La diferencia clave

| Concepto | Capa OSI | ¿Qué contiene? |
|----------|----------|----------------|
| **Paquete** | Capa 3 — Network | Datos + cabecera IP (IP origen, IP destino, etc.) |
| **Trama** (Frame) | Capa 2 — Data Link | Envuelve al paquete + añade direcciones MAC |

> 📌 Piénsalo así: el **paquete** es la **carta** que escribiste. La **trama** es el **sobre** en el que metes esa carta para enviarla por correo. Una vez que el destinatario abre el sobre (trama), encuentra la carta (paquete) adentro.

```
┌─────────────────────────────────┐
│  TRAMA (Capa 2)                 │
│  ┌───────────────────────────┐  │
│  │  PAQUETE (Capa 3)         │  │
│  │  [IP origen | IP destino] │  │
│  │  [       DATOS           ]│  │
│  └───────────────────────────┘  │
│  [MAC origen | MAC destino]     │
└─────────────────────────────────┘
```

---

## ¿Por qué se divide la información en paquetes?

Imagina que quieres descargar una foto de un gato desde una web. Esa imagen **no llega entera de una sola vez** — se divide en pequeños fragmentos (paquetes) que viajan por la red y se **reconstruyen en tu equipo** al llegar.

**¿Por qué no enviarla completa?**
- Si se envía todo junto y algo falla en el camino → hay que reenviar **todo** desde cero
- Si se envía en paquetes y uno se pierde → solo se reenvía **ese paquete**
- Además, enviar todo de una vez podría crear **cuellos de botella** en la red

```
[Servidor web]                        [Tu PC]
      │                                  │
      │──── Paquete 1 (cabeza del gato) ─►│
      │──── Paquete 2 (cuerpo)  ─────────►│
      │──── Paquete 3 (cola)    ─────────►│
      │                                  │
      │              [Tu PC reconstruye la imagen completa 🐱]
```

---

## ¿Qué lleva un paquete por dentro?

Un paquete que usa el **Protocolo de Internet (IP)** tiene un conjunto de **encabezados** (headers) que acompañan a los datos. Estos encabezados contienen información adicional necesaria para que el paquete llegue correctamente.

Los encabezados más importantes son:

| Encabezado | ¿Para qué sirve? |
|------------|-----------------|
| **Tiempo de vivir** (TTL) | Es un temporizador de caducidad. Si el paquete se pierde en la red y nunca llega a su destino, este campo evita que siga rebotando para siempre saturando la red. Cuando el contador llega a 0, el paquete se descarta. |
| **Suma de verificación** (Checksum) | Es como una firma de integridad. Verifica que los datos no hayan sido modificados o corrompidos durante el viaje. Si el valor no coincide con lo esperado, el paquete se considera dañado. |
| **Dirección de origen** | La dirección IP del dispositivo que **envió** el paquete, para que los datos sepan a dónde regresar si es necesario. |
| **Dirección de destino** | La dirección IP del dispositivo al que **va dirigido** el paquete, para que sepa a dónde debe dirigirse a continuación. |

---

## La encapsulación explicada simple

Este proceso de "meter una cosa dentro de otra" se llama **encapsulación**. Es el concepto central de cómo funciona el modelo OSI.

Cuando los datos bajan por las capas al ser enviados, **cada capa añade su propio encabezado** (su "sobre"). Al llegar al destino, cada capa va **quitando su parte** hasta que quedan los datos originales.

```
ENVIANDO (encapsulando, de arriba hacia abajo):
─────────────────────────────────────────────
Capa 7 → [DATOS]
Capa 4 → [TCP/UDP | DATOS]
Capa 3 → [IP header | TCP/UDP | DATOS]       ← esto es un PAQUETE
Capa 2 → [MAC header | IP | TCP/UDP | DATOS] ← esto es una TRAMA
Capa 1 → 101010110101... (señales eléctricas)

RECIBIENDO (desencapsulando, de abajo hacia arriba):
─────────────────────────────────────────────
Capa 1 → recibe señales eléctricas
Capa 2 → quita la cabecera MAC → obtiene el PAQUETE
Capa 3 → quita la cabecera IP  → obtiene los datos TCP/UDP
Capa 4 → quita la cabecera TCP → obtiene los DATOS originales
Capa 7 → ¡el usuario ve la información! ✅
```

> 💡 Cuando hablamos de **direcciones IP** → hablamos de **paquetes** (capa 3).  
> Cuando eliminamos la encapsulación → hablamos de la **trama** en sí (capa 2).

---

## Resumen en una frase

> Un **paquete** es la carta. Un **frame (trama)** es el sobre. La **encapsulación** es el proceso de meterla en el sobre para enviarla, y abrirla al recibirla.

---

## Conceptos para repasar

- [ ] ¿Qué es el TTL y por qué es importante en ciberseguridad?
- [ ] ¿Cómo se puede ver el TTL de un paquete? (comando `ping`)
- [ ] ¿Qué pasa si la suma de verificación (checksum) falla?
- [ ] Diferencia entre paquete, trama y segmento (capa 4)

---

