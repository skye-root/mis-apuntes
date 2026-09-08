# 🧱🔥 Cortafuegos (Firewall)


## ¿Qué es un cortafuegos?

Un **cortafuegos (firewall)** es un dispositivo dentro de una red responsable de determinar **qué tráfico puede entrar y salir**.

> 📌 Piénsalo como el **guardia de seguridad en la entrada de un edificio**. No deja pasar a cualquiera — revisa quién eres, de dónde vienes y a dónde quieres ir antes de dejarte entrar o salir.

Un administrador puede configurar el cortafuegos para **permitir o denegar** el tráfico basándose en varios factores.

---

## ¿Qué factores analiza un firewall?

Los cortafuegos realizan una **inspección de paquetes** para responder estas preguntas:

- **¿De dónde viene el tráfico?**
  ¿Se ha indicado al firewall que acepte o rechace tráfico proveniente de una red específica?

- **¿Hacia dónde se dirige el tráfico?**
  ¿Se ha indicado al firewall que acepte o rechace tráfico destinado a una red específica?

- **¿Para qué puerto es el tráfico?**
  ¿Se ha indicado al firewall que acepte o deniegue tráfico destinado únicamente al puerto 80, por ejemplo?

- **¿Qué protocolo está usando el tráfico?**
  ¿Se ha indicado al firewall que acepte o deniegue tráfico que usa UDP, TCP, o ambos?

---

## Tipos y tamaños de firewalls

Los cortafuegos vienen en todas las formas y tamaños:

- **Hardware dedicado** → Se encuentran en grandes redes empresariales. Pueden manejar enormes cantidades de datos
- **Routers domésticos** → El router de tu casa tiene un firewall básico integrado
- **Software** → Como **Snort**, que es un programa que actúa como firewall/IDS en un sistema

Los cortafuegos se pueden clasificar en **2 a 5 categorías**, pero las dos principales son:

---

## Las 2 categorías principales de firewalls

### 🔵 Cortafuegos Con Estado (Stateful)

> *"Mira el contexto completo de la conexión, no solo el paquete"*

Este tipo de firewall usa **toda la información de una conexión** para tomar decisiones. En lugar de inspeccionar un paquete individual de forma aislada, analiza el **comportamiento del dispositivo en función de toda la conexión**.

**Características:**
- Toma decisiones **dinámicas** basadas en el estado y contexto de la conexión completa
- Consume **más recursos** del sistema porque tiene que rastrear cada conexión
- Es más inteligente — por ejemplo, puede **permitir las primeras partes de un handshake TCP** que después falla y bloquear todo el dispositivo si detecta comportamiento sospechoso
- Si la conexión con el host resulta ser deficiente o maliciosa, **bloquea todo el dispositivo**

```
[Paquete llega]
      │
      ▼
¿Conozco esta conexión? → Sí → ¿Sigue siendo válida? → Sí → ✅ Permitir
                        → No → Analizar conexión completa → ¿Es confiable? → ❌ Bloquear dispositivo
```

---

### ⚪ Cortafuegos Sin Estado (Stateless)

> *"Mira cada paquete por separado, sin importar el contexto"*

Este tipo usa un **conjunto estático de reglas** para determinar si los paquetes individuales son aceptables o no. Cada paquete se evalúa de forma independiente, sin recordar conexiones anteriores.

**Características:**
- Consume **muchos menos recursos** que el stateful
- Es **mucho menos eficaz** — su efectividad depende exclusivamente de las reglas que contiene
- Si una regla no se cumple exactamente → resulta inútil
- Si un dispositivo envía un paquete defectuoso, **no necesariamente bloquea todo el dispositivo**, solo ese paquete
- Son excelentes para manejar **grandes cantidades de tráfico** de muchos hosts a la vez, como en un ataque de **denegación de servicio distribuido (DDoS)**

```
[Paquete llega]
      │
      ▼
¿Cumple alguna regla estática? → Sí → ✅ Permitir
                               → No → ❌ Bloquear solo ese paquete
(No recuerda nada de conexiones anteriores)
```

---

## Comparación directa

| | Con Estado (Stateful) | Sin Estado (Stateless) |
|--|----------------------|----------------------|
| ¿Qué analiza? | Toda la conexión completa | Paquetes individuales |
| Toma de decisiones | Dinámica (se adapta) | Estática (reglas fijas) |
| Consumo de recursos | 🔴 Alto | 🟢 Bajo |
| Eficacia | 🟢 Alta | 🔴 Baja |
| Mejor para | Conexiones complejas, detectar ataques sofisticados | Grandes volúmenes de tráfico, ataques DDoS |
| Riesgo | Puede ser pesado en redes grandes | Una regla mal definida lo inutiliza |

---

## Analogía para no olvidarlo

> **Stateful** = El guardia de seguridad que te recuerda, sabe si ya entraste antes, y si haces algo sospechoso te saca del edificio completo.
>
> **Stateless** = El torniquete automático que solo lee si tu ticket es válido o no. No sabe quién eres ni qué hiciste antes. Si el ticket pasa la regla, entras.

---

## Conceptos para repasar

- [ ] ¿Qué es la inspección de paquetes (packet inspection)?
- [ ] ¿Qué es un IDS (Intrusion Detection System) y en qué se diferencia del firewall?
- [ ] ¿Qué es un ataque DDoS y por qué los firewalls stateless son útiles contra ellos?
- [ ] ¿Qué es Snort y para qué se usa?
- [ ] ¿Puede un firewall reemplazar al antivirus? (spoiler: no)

---

