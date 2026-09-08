# 🤝 Protocolo DHCP



## ¿Qué es DHCP?

**DHCP** = *Dynamic Host Configuration Protocol*  
(Protocolo de Configuración Dinámica de Host)

> 📌 Las IPs se pueden asignar de dos formas:
> - **Manual** → tú escribes la IP a mano en el dispositivo
> - **Automática** → un servidor DHCP te la da solo ✅ ← esto es DHCP

Imagínalo como llegar a un hotel: no traes tu cuarto asignado de casa, simplemente llegas y la recepción te da uno disponible. Cuando te vas, el cuarto queda libre para otro huésped.

---

## El proceso DORA (4 pasos)

Cuando un dispositivo se conecta a una red y no tiene IP, pasa esto:

---

### 1️⃣ DHCP Discover — *"¿Hay alguien ahí?"*
```
[Tu PC]  →→→→→→→→→→→→→→→→→→  [Servidor DHCP]

"Hey, soy nuevo aquí. ¿Hay algún servidor DHCP
que me pueda dar una IP?"

(Se manda a toda la red en broadcast)
```

---

### 2️⃣ DHCP Offer — *"¡Sí! Toma esta IP"*
```
[Tu PC]  ←←←←←←←←←←←←←←←←  [Servidor DHCP]

"¡Claro! Puedes usar la IP 192.168.1.10"
```

---

### 3️⃣ DHCP Request — *"Perfecto, la quiero"*
```
[Tu PC]  →→→→→→→→→→→→→→→→→→  [Servidor DHCP]

"Genial, confirmo que voy a usar 192.168.1.10"
```

---

### 4️⃣ DHCP ACK — *"Confirmado, es tuya... por ahora"*
```
[Tu PC]  ←←←←←←←←←←←←←←←←  [Servidor DHCP]

"Ok, esa IP es tuya por las próximas 24 horas"
```

> ⏰ La IP no es tuya para siempre — tiene un **tiempo de expiración** (lease time). Cuando se acaba, el proceso se repite.

---

## Resumen visual del flujo

```
[PC]                          [Servidor DHCP]
  │                                  │
  │──── 1. Discover ────────────────►│  "¿Hay DHCP aquí?"
  │                                  │
  │◄─── 2. Offer ───────────────────│  "Usa 192.168.1.10"
  │                                  │
  │──── 3. Request ─────────────────►│  "La acepto"
  │                                  │
  │◄─── 4. ACK ─────────────────────│  "Confirmado ✔"
  │                                  │
[Ya tiene IP y puede navegar 🎉]
```

---

## Resumen de los 4 mensajes

| Paso | Nombre | ¿Quién lo manda? | ¿Qué dice? |
|------|--------|-----------------|------------|
| 1 | **Discover** | El dispositivo | "¿Hay un servidor DHCP?" |
| 2 | **Offer** | El servidor | "Sí, toma esta IP" |
| 3 | **Request** | El dispositivo | "La acepto" |
| 4 | **ACK** | El servidor | "Confirmado, es tuya" |

> 🧠 Truco para recordarlo: **D·O·R·A** — Discover, Offer, Request, ACK

---

> [!important]
> ## Dato extra para ciberseguridad
> 
> > ⚠️ DHCP tampoco tiene autenticación. Un atacante puede montar un **servidor DHCP falso** (Rogue DHCP) y responder antes que el legítimo, asignándote una puerta de enlace maliciosa para interceptar tu tráfico.
> 

---
