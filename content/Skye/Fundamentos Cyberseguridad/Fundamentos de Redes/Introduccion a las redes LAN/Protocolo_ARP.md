# 📡 Protocolo ARP (Address Resolution Protocol)



## ¿Qué es ARP?

**ARP** = *Address Resolution Protocol* (Protocolo de Resolución de Direcciones)

> 📌 Recuerda: los dispositivos tienen **dos identificadores**:
> - Dirección **MAC** → identidad física
> - Dirección **IP** → identidad lógica en la red

ARP es el "traductor" entre estos dos: **asocia una dirección IP con su dirección MAC** correspondiente.

Cada dispositivo mantiene un registro local llamado **caché ARP**, donde guarda las relaciones IP↔MAC de otros dispositivos que ya conoce.

---

## ¿Cómo funciona ARP?

ARP usa **2 tipos de mensajes**:

| Mensaje | Función |
|---------|---------|
| **ARP Request** (Pedido) | Pregunta a la red: *"¿Quién tiene esta IP?"* |
| **ARP Reply** (Respuesta) | Responde: *"Yo tengo esa IP, y mi MAC es esta"* |
___
### Diferencia de Unicast, Broadcast y Multicast

| Tipo          | Qué hace                                                                                   | Ejemplo                                                                         |
| ------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| **Unicast**   | Mensaje enviado de un dispositivo a **otro específico** usando la MAC de destino.          | PC A envía un archivo a PC B en la misma red.                                   |
| **Broadcast** | Mensaje enviado a **todos los dispositivos** de la red (MAC `FF:FF:FF:FF:FF:FF`).          | ARP Request: “¿Quién tiene esta IP?”                                            |
| **Multicast** | Mensaje enviado a **un grupo específico** de dispositivos que están suscritos a ese grupo. | Streaming de video a varias computadoras que se suscriben a un canal multicast. |


---

## El proceso paso a paso

```
Dispositivo A quiere hablar con 192.168.1.10
pero no sabe su MAC address...
```

**Paso 1 — ARP Request (broadcast)**
```
SRC MAC: 01:00:AB:78:99:33      ← MAC del que pregunta
DST MAC: FF:FF:FF:FF:FF:FF      ← Broadcast = a TODOS en la red
MSG: "¿Quién tiene la IP 192.168.1.10?"
```
> 📢 `FF:FF:FF:FF:FF:FF` es la dirección de **broadcast** — llega a todos los dispositivos de la red.

**Paso 2 — ARP Reply (unicast)**
```
SRC MAC: 18:AC:33:12:88:29      ← MAC del dispositivo que responde
DST MAC: 01:00:AB:78:99:33      ← Solo responde al que preguntó
MSG: "Yo tengo la IP 192.168.1.10"
```

**Paso 3 — Se guarda en caché**
```
El dispositivo A almacena la relación:
192.168.1.10  →  18:AC:33:12:88:29
```
> 💾 Esta info queda guardada en la **caché ARP** para no tener que preguntar de nuevo.

---

## Diagrama del flujo

```
[Dispositivo A]
      │
      │ 1. ARP Request → broadcast a toda la red
      │    "¿Quién tiene 192.168.1.10?"
      │
      ├──────────────► [PC]        (no es él, ignora)
      ├──────────────► [Webcam]    (no es él, ignora)
      └──────────────► [Switch]    ← ES ÉL ✓
                            │
                            │ 2. ARP Reply → solo a Dispositivo A
                            │    "Yo soy 192.168.1.10"
                            ▼
                     [Dispositivo A]
                     guarda en caché ✔
```

---

## Resumen rápido

| Concepto | Descripción |
|----------|-------------|
| **ARP** | Protocolo que relaciona IP ↔ MAC |
| **Caché ARP** | Tabla local donde se guardan las relaciones conocidas |
| **ARP Request** | Mensaje broadcast preguntando por una MAC |
| **ARP Reply** | Respuesta unicast con la MAC solicitada |
| **Broadcast MAC** | `FF:FF:FF:FF:FF:FF` — llega a todos en la red |

---

## Dato importante para ciberseguridad

> ⚠️ ARP **no tiene autenticación**. Cualquier dispositivo puede responder a un ARP Request, aunque no sea el legítimo dueño de esa IP. Esto se usa en ataques como **ARP Spoofing / ARP Poisoning**.

---

## Conceptos para repasar

- [ ] ¿Qué es el caché ARP y cómo se puede ver? (`arp -a` en terminal)
- [ ] ARP Spoofing / ARP Poisoning (ataque Man-in-the-Middle)
- [x] Diferencia entre unicast, broadcast y multicast

---






