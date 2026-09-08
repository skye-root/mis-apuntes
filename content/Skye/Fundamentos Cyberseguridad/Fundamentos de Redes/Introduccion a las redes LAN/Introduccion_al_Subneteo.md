# 🌐 Introducción al Subneteo


## ¿Qué es el Subneteo?

El **subneteo** *(Subenetting)* consiste en dividir una red en subredes más pequeñas.

> 📌 *Analogía:* Es como cortar un pastel entre amigos. Hay una cantidad limitada de "espacio IP", y el subneteo decide quién recibe qué porción.

En el contexto empresarial, una red puede dividirse por departamentos:
- Contabilidad (Accounting)
- Recursos Humanos (Human Resources)
- Finanzas (Finance)

![[Pasted image 20260508124737.png|356]]

---

## ¿Cómo funciona técnicamente?

El subneteo se logra usando una **máscara de subred**, que determina cuántos hosts pueden existir dentro de una red.

### Recordatorio: Estructura de una IP

Una dirección IP tiene **4 octetos** - 4 bytes (32 bits), cada uno de `0` a `255`:

![[Pasted image 20260508025544.png|407]]


> La **máscara de subred** sigue la misma estructura de 4 octetos.

---

## Los 3 usos de una dirección IP en subredes

### 1. Dirección de red (_Network Address_)

- **Objetivo:** Identifica el **inicio de la red**. Sirve para saber a qué red pertenece un dispositivo.
- **Explicación:** Cada red tiene un rango de IPs. La **dirección de red** es la primera dirección de ese rango y representa toda la red.
- **Ejemplo:** Si una red tiene el rango `192.168.1.0` a `192.168.1.255`, la dirección de red es `192.168.1.0`. Todos los dispositivos de esa red pertenecen a este rango.

---

### 2. Dirección del host (_Host Address_)

- **Objetivo:** Identifica un **dispositivo específico** dentro de la red.
- **Explicación:** Cada dispositivo (computadora, impresora, celular) necesita una IP única dentro de la red para poder comunicarse.
- **Ejemplo:** Dentro de la red `192.168.1.0`, un host podría tener la IP `192.168.1.100`. Esta IP indica que pertenece a la red `192.168.1.0`, pero es un dispositivo específico.

---

### 3. Puerta de enlace predeterminada (_Default Gateway_)

- **Objetivo:** Permite que los datos salgan de la red local hacia otra red.
- **Explicación:** Si un dispositivo necesita enviar información a otra red (por ejemplo, a Internet), utiliza la **puerta de enlace**. Es como un "puente" que conecta tu red con otras redes. Generalmente, esta IP es la primera o última IP de la red.
- **Ejemplo:** En la red `192.168.1.0`, la puerta de enlace suele ser `192.168.1.254`. Todos los dispositivos que quieren comunicarse fuera de la red local enviarán sus datos a esta IP primero.

---

💡 **Resumen rápido:**

- **Network Address** → identifica toda la red (`192.168.1.0`).
- **Host Address** → identifica un dispositivo dentro de esa red (`192.168.1.100`).
- **Default Gateway** → conecta la red con otras redes o Internet (`192.168.1.254`).

| Tipo                           | Objetivo                                              | Ejemplo         |
| ------------------------------ | ----------------------------------------------------- | --------------- |
| **Dirección de red**           | Identifica el inicio/existencia de la red             | `192.168.1.0`   |
| **Dirección del host**         | Identifica un dispositivo específico en la subred     | `192.168.1.100` |
| **Puerta de enlace (Gateway)** | Dispositivo capaz de enviar tráfico hacia otras redes | `192.168.1.254` |

### Notas clave:
- Un dispositivo con IP `192.168.1.100` pertenece a la red `192.168.1.0`
- La puerta de enlace suele ser la **primera** (`.1`) o la **última** (`.254`) dirección host disponible

---

## ¿Cuándo se usa el subneteo?

| Escenario | ¿Subneteo? |
|-----------|------------|
| Red doméstica pequeña | ❌ Generalmente no (1 sola subred, máx. 254 dispositivos) |
| Empresa / Oficina | ✅ Sí (muchos dispositivos: PCs, impresoras, cámaras, sensores) |

---

## Ventajas del Subneteo

- ⚡ **Eficiencia** — Mejor uso del espacio de direcciones IP
- 🔒 **Seguridad** — Separación de tráfico entre grupos
- 🎛️ **Control total** — Los administradores pueden gestionar cada segmento

### Ejemplo práctico: Cafetería

Una cafetería puede tener **dos subredes separadas**:
1. Red interna para empleados, cajas registradoras y dispositivos del negocio
2. Red Wi-Fi pública para clientes

> Ambas redes comparten el acceso a Internet, pero están **aisladas entre sí**.

---

## Resumen Visual

```
           [Internet]
                │
            [Router]
                │
        ┌───────┴───────┐
    [Subred A]      [Subred B]
    Empleados        Clientes
    (Privada)       (Pública Wi-Fi)
```

---

## Conceptos para repasar

- [ ] Clases de redes IP (A, B, C)
- [ ] Notación CIDR (`/24`, `/16`, etc.)
- [ ] Cálculo de hosts disponibles por subred
- [ ] Máscaras de subred comunes (`255.255.255.0`, etc.)

---

