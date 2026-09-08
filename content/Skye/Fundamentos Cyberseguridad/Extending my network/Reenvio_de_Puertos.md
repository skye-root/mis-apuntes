# 🔀 Reenvío de Puertos (Port Forwarding)

## ¿Qué es el reenvío de puertos?

El **reenvío de puertos** es un componente esencial para conectar aplicaciones y servicios a Internet.

Sin él, cualquier servidor o aplicación que tengas en tu red **solo es accesible para los dispositivos dentro de esa misma red local**. Nadie desde fuera (Internet) puede llegar a él.

> 📌 Esto se conoce como **intranet** — una red privada accesible solo desde adentro.

---

## El problema que resuelve

Imagina esta situación:

![[Pasted image 20260513023743.png|289]]

El servidor web con IP `192.168.1.10` en el puerto `80` solo puede ser visto por **PC 1 y PC 2** porque están en la misma red. Nadie en Internet puede acceder a él.

---

## La solución: Port Forwarding

Si el administrador quiere que ese servidor web sea **accesible desde Internet**, configura el reenvío de puertos en el router:

![[Pasted image 20260513023901.png|640]]
Ahora la **Red #2** puede acceder al servidor web de la Red #1 usando la **IP pública del router** (`82.62.51.70`), no la IP privada del servidor.

> 💡 El router actúa como intermediario: recibe la solicitud en su IP pública y la redirige internamente al servidor correcto.

---

## Resumen del flujo

```
[Usuario en Internet]
        │
        │ Escribe: http://82.62.51.70
        ▼
[Router de la Red #1]
   IP pública: 82.62.51.70
   Puerto 80 → redirige a → 192.168.1.10:80
        │
        ▼
[Servidor web interno]
   IP: 192.168.1.10 | Puerto: 80
   Responde con la página web ✅
```

---

## Port Forwarding vs Cortafuegos (Firewall)

Es fácil confundirlos, pero son cosas distintas:

| | Port Forwarding | Cortafuegos (Firewall) |
|--|----------------|----------------------|
| ¿Qué hace? | **Abre** un puerto específico y redirige el tráfico hacia un dispositivo interno | **Decide** si el tráfico puede circular a través de los puertos (aunque estén abiertos) |
| ¿Dónde actúa? | En el **router** | En el **router o dispositivo** |
| Analogía | Abrir una puerta | El guardia que decide quién pasa por esa puerta |

> ⚠️ El port forwarding abre el camino, pero el cortafuegos decide quién puede usarlo. Pueden coexistir: un puerto puede estar abierto por port forwarding, pero el firewall puede seguir bloqueando cierto tráfico.

---

## ¿Dónde se configura?

El reenvío de puertos **se configura en el router** de la red. Normalmente se accede desde el panel de administración del router (generalmente en `192.168.1.1` o `192.168.0.1`).

---

## Dato importante para ciberseguridad

> ⚠️ El port forwarding mal configurado es una de las formas más comunes en que los atacantes acceden a redes privadas. Si abres un puerto innecesario hacia Internet (como el 3389 de RDP), cualquier persona en el mundo puede intentar conectarse a ese servicio.

---

## Conceptos para repasar

- [ ] ¿Cuál es la diferencia entre IP pública e IP privada?
- [ ] ¿Qué es una intranet vs Internet?
- [ ] ¿Qué es NAT (Network Address Translation)? — está relacionado con port forwarding
- [ ] ¿Por qué es peligroso hacer port forwarding del puerto 22 (SSH) o 3389 (RDP)?

---

