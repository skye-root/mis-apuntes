# 🖧 Dispositivos de Red LAN — Router, Switch y VLAN

>

## 🔵 ¿Qué es un Router?

La función de un **router (enrutador)** es **conectar redes entre sí y transmitir datos entre ellas**. Lo hace mediante el proceso llamado **enrutamiento (routing)** — de ahí su nombre.

- Opera en la **Capa 3 del modelo OSI** (Network)
- Crea rutas entre redes para que los datos lleguen a su destino
- Suele tener una **interfaz interactiva** (web o consola) donde el administrador puede configurar reglas como el reenvío de puertos o el firewall
- Es un dispositivo **especializado** — no realiza las mismas funciones que un switch

### ¿Cómo decide la ruta?

Cuando hay múltiples caminos para llegar de A a B, el router elige la **ruta más óptima** basándose en:

- **¿Cuál es el camino más corto?** — Menos saltos entre dispositivos
- **¿Cuál es el camino más fiable?** — Historial de pérdida de paquetes
- **¿Qué ruta tiene el medio más rápido?** — Cable de cobre (lento) vs fibra óptica (rápida)

```
[Computer A] ──► [Router 1] ──► [Router 2] ──► [Computer B]
                      ↕
               [Router 3] (ruta alternativa)

El router analiza las 3 preguntas y elige el mejor camino.
```

---

## 🟢 ¿Qué es un Switch (Conmutador)?

Un **switch** es un dispositivo de red dedicado que permite **conectar múltiples dispositivos dentro de una misma red local**. Puede conectar entre **3 y 63 dispositivos** mediante cables Ethernet.

A diferencia del router (que conecta redes distintas), el switch conecta dispositivos **dentro de la misma red**.

Los switches pueden operar en **dos capas del modelo OSI**, pero estas capas son **excluyentes** — un switch de capa 2 no puede operar en capa 3 y viceversa.

---

### Switch de Capa 2 (Layer 2 Switch)

- Opera en la **Capa 2 — Data Link**
- Reenvía **tramas** a los dispositivos usando su **dirección MAC**
- Recuerda: los paquetes IP originales viajan encapsulados dentro de las tramas
- Es el único responsable de enviar las tramas al dispositivo correcto dentro de la red local

```
         [Router]
             │
      [Layer 2 Switch]
      /   /   |   \   \
   [PC1][PC2][PC3][PC4][PC5]

El switch usa las MACs para saber a cuál PC enviar cada trama.
```

---

### Switch de Capa 3 (Layer 3 Switch)

- Opera en la **Capa 3 — Network**
- Es más sofisticado que el de capa 2
- Puede hacer **todo lo que hace un switch de capa 2** (enviar tramas por MAC) **más** enrutar paquetes a otros dispositivos mediante el **protocolo IP**
- Básicamente cumple algunas funciones de un router

```
Un switch de Capa 3 puede manejar dos subredes distintas:
  → 192.168.1.1  (subred 1)
  → 192.168.2.1  (subred 2)
Y enrutar el tráfico entre ellas.
```

---

## 🔶 ¿Qué es una VLAN?

**VLAN** = *Virtual Local Area Network* (Red de Área Local Virtual)

Es una tecnología que permite **separar virtualmente dispositivos específicos dentro de una misma red física**. Aunque todos estén conectados al mismo switch, las VLANs los tratan como si fueran redes completamente independientes.

### ¿Por qué usarlas?

- Todos los dispositivos pueden seguir **beneficiándose de servicios compartidos** como Internet
- Pero se **tratan de forma independiente** entre sí
- Esto proporciona **seguridad** — las reglas establecidas determinan exactamente cómo se comunican los dispositivos entre sí

### Ejemplo real — Empresa con dos departamentos

```
              [Router]
                 │
         [Switch Capa 3]
          /            \
   192.168.1.1      192.168.2.1
        │                │
  ┌─────────────┐   ┌──────────────┐
  │  VLAN 1     │   │   VLAN 2     │
  │  Ventas     │   │ Contabilidad │
  │  (Sales)    │   │ (Accounting) │
  └─────────────┘   └──────────────┘
```

- **Departamento de Ventas (VLAN 1)** → puede acceder a Internet ✅
- **Departamento de Contabilidad (VLAN 2)** → puede acceder a Internet ✅
- **Ventas ↔ Contabilidad** → ❌ NO pueden comunicarse entre sí, aunque estén en el mismo switch físico

> 📌 Esto es fundamental para la seguridad empresarial. Si un atacante compromete un dispositivo en la VLAN de Ventas, **no puede saltar automáticamente** a la VLAN de Contabilidad donde pueden estar datos financieros sensibles.

---

## Comparación: Router vs Switch

| | Router | Switch |
|--|--------|--------|
| ¿Qué conecta? | Redes distintas entre sí | Dispositivos dentro de la misma red |
| Capa OSI | Capa 3 (Network) | Capa 2 o Capa 3 |
| ¿Cómo identifica destinos? | Por dirección IP | Por dirección MAC (capa 2) o IP (capa 3) |
| ¿Puede hacer firewall? | ✅ Sí | ❌ No |
| ¿Puede hacer VLAN? | ❌ No directamente | ✅ Sí (capa 3) |

---

## Resumen visual completo

```
[Internet]
    │
[Router] ← conecta tu red con Internet, gestiona el tráfico entre redes
    │
[Switch] ← distribuye el tráfico dentro de tu red local
  / | \ \
[PC][PC][PC][Impresora]

Con VLAN:
[Switch]
  ├── VLAN 1: Ventas      → solo hablan entre ellos
  └── VLAN 2: Contabilidad → solo hablan entre ellos
  (ambas VLANs tienen acceso a Internet, pero no entre sí)
```

---

## Conceptos para repasar

- [x] ¿Cuál es la diferencia entre un switch de capa 2 y uno de capa 3?
- [ ] ¿Puede un switch reemplazar a un router? (parcialmente sí, con capa 3)
- [ ] ¿Qué es el "VLAN hopping"? (ataque donde se salta de una VLAN a otra)
- [ ] ¿Cuándo conviene usar VLANs en una red empresarial?

---

