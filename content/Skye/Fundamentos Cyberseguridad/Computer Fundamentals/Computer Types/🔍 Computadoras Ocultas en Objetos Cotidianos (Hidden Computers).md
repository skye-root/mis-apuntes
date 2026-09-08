

## 💡 Idea Central

> El ordenador más potente que posee la mayoría de la gente cabe en su bolsillo.  
> Pero **millones más** se esconden dentro de objetos cotidianos: puertas, lámparas, cafeteras.

Las computadoras no siempre tienen pantalla, teclado o aspecto de "computadora".

---

## 📊 Tipos de Computadoras "Ocultas"

| Tipo | Lo que es | Ejemplos |
|---|---|---|
| **Smartphone** | Computadora de bolsillo optimizada para batería y conectividad | iPhone, teléfono Android |
| **Tablet (Tableta)** | Computadora táctil con pantalla más grande | iPad, tableta de dibujo |
| **IoT Device (Dispositivo IoT)** | Dispositivo conectado a red con un único propósito | Termostato, timbre inteligente, rastreador de actividad física |
| **Embedded Computer (Computadora integrada)** | Computadora integrada dentro de otro dispositivo | Controlador de cafetera, sensor de puerta, lámpara con chip atenuador |

---

## 📋 Detalle de Cada Tipo

---

### 📱 Smartphone

![[imagen-smartphone.png]]
<!-- 📌 Insertar imagen aquí -->

- Es una **computadora completa** que cabe en el bolsillo.
- Optimizada para dos cosas: **duración de batería** y **conectividad** (llamadas, WiFi, datos móviles, Bluetooth).
- Corre un sistema operativo completo (Android, iOS).
- Tiene CPU, RAM, almacenamiento, GPU — igual que una laptop, pero en miniatura.

---

### 📟 Tablet (Tableta)

![[imagen-tablet.png]]
<!-- 📌 Insertar imagen aquí -->

- Esencialmente un **smartphone con pantalla más grande**.
- Interfaz táctil como principal método de interacción.
- Optimizada para consumo de contenido, dibujo digital y productividad ligera.

---

### 🌐 IoT Device (Dispositivo de Internet de las Cosas)

![[imagen-iot.png]]
<!-- 📌 Insertar imagen aquí -->

- **IoT = Internet of Things** (Internet de las Cosas)
- Son dispositivos con **un único propósito específico**, conectados a una red.
- Se comunican con otros sistemas: envían datos o reciben comandos a través de internet o red local.

**Ejemplos:**
- Termostato inteligente → mide temperatura y ajusta la calefacción remotamente
- Timbre inteligente → detecta movimiento y envía video al smartphone
- Rastreador de actividad física (smartwatch/fitness tracker) → envía datos de salud a una app

**Características clave:**
- Siempre conectado a una red
- Diseñado para **una sola función**
- Controlado o monitoreado de forma remota

---

### ⚙️ Embedded Computer (Computadora Integrada)

![[imagen-embedded.png]]
<!-- 📌 Insertar imagen aquí -->

- Una computadora **integrada físicamente dentro de otro dispositivo** mayor.
- No está pensada para ser vista ni tocada por el usuario.
- Hace su trabajo **de forma invisible**, a menudo durante años sin que nadie sepa que existe.
- No necesita conectarse a ninguna red — simplemente ejecuta su tarea dentro de la máquina.

**Ejemplos:**
- Controlador de cafetera → sabe cuándo calentar, cuánto tiempo, a qué temperatura
- Sensor automático de puerta → detecta movimiento y le indica al motor que abra
- Chip atenuador de lámpara → ajusta el brillo según instrucciones

> 🧠 *Analogía de Sophia:* Pasaba por puertas automáticas en Nova Labs todos los días sin darse cuenta de que una pequeña computadora dentro del marco detectaba su movimiento y le indicaba al motor que se abriera. **Invisible, confiable, en todas partes.**

---

## ⚠️ La Distinción Crítica: IoT vs Embedded

> Esta es la diferencia más importante de esta tarea — fácil de confundir porque ambos son pequeños y de un solo propósito.

```
                    ¿Tiene un único propósito?
                    /                        \
                  SÍ                          NO
                  │                        (no aplica)
        ¿Se conecta a una red?
          /               \
        SÍ                 NO
        │                   │
  [IoT Device]       [Embedded Computer]
  Informa datos       Trabaja solo, dentro
  o recibe comandos   de su máquina, sin
  a través de red     conectarse a nada
```

| Característica | IoT Device | Embedded Computer |
|---|---|---|
| **Propósito** | Único y específico | Único y específico |
| **Conectividad** | ✅ Siempre conectado a red | ❌ No necesita red |
| **Comunicación** | Envía/recibe datos remotamente | Opera solo, dentro del dispositivo |
| **Visibilidad** | El usuario lo sabe (lo configura) | Invisible — el usuario no interactúa con él |
| **Ejemplo** | Termostato Nest, Alexa | Chip en una cafetera, sensor de puerta |
| **Años de vida** | Actualizable remotamente | Corre por años sin cambios |

### 🔑 Regla para recordarlo fácil:

> **IoT** → Está en la red, habla con el mundo exterior.  
> **Embedded** → Está dentro de algo, trabaja solo en silencio.

---

## 🔐 Relevancia en Ciberseguridad

### IoT — Superficie de ataque enorme
- Millones de dispositivos IoT tienen **seguridad débil o nula** (contraseñas por defecto, firmware sin actualizar).
- Han sido usados para formar **botnets** (redes de dispositivos zombies) como la famosa **Mirai Botnet**.
- Cada dispositivo IoT conectado es un **punto de entrada potencial** a la red.

### Embedded — Difíciles de parchear
- No tienen interfaz de usuario → **actualizar su firmware es complicado o imposible**.
- Vulnerabilidades en sistemas embebidos pueden quedarse **años sin corregirse**.
- Críticos en infraestructura: sistemas de control industrial (**ICS/SCADA**), dispositivos médicos, automóviles.

> 🚨 En ciberseguridad, tanto IoT como Embedded son categorías de alto riesgo precisamente porque son **invisibles, numerosos y difíciles de proteger**.

---

## 📝 Resumen Final

| | Smartphone | Tablet | IoT | Embedded |
|---|---|---|---|---|
| **Conectividad** | ✅ | ✅ | ✅ Red obligatoria | ❌ Opcional/ninguna |
| **Pantalla** | ✅ | ✅ | A veces | ❌ Casi nunca |
| **Un solo propósito** | ❌ | ❌ | ✅ | ✅ |
| **Visible al usuario** | ✅ | ✅ | ✅ | ❌ |
| **OS completo** | ✅ | ✅ | A veces | ❌ Firmware simple |

---

