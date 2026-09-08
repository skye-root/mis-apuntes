

## ¿Qué es una VPN?

**VPN** = *Virtual Private Network* (Red Privada Virtual)

Es una tecnología que permite que dispositivos en **redes separadas y distintas** se comuniquen de forma segura, creando una **ruta dedicada entre ellos a través de Internet**, conocida como **túnel**.

Los dispositivos conectados dentro de ese túnel forman su propia red privada, aunque estén físicamente en lugares diferentes del mundo.

> 📌 **Analogía:** Imagina dos oficinas en ciudades distintas. Normalmente no pueden hablar directamente porque no están en la misma red. La VPN es como construir un **pasillo privado secreto** que conecta ambas oficinas a través de Internet — nadie más puede ver lo que se habla por ese pasillo.

---

## ¿Cómo funciona? — El ejemplo de las 3 redes

![[Pasted image 20260513032343.png|521]]

- **Red #1** → Oficina 1 (dispositivos normales de esa red)
- **Red #2** → Oficina 2 (dispositivos normales de esa red)
- **Red #3 (VPN)** → Red privada virtual formada por los dispositivos de ambas oficinas que se conectan a través del túnel

Los dispositivos en la Red #3 **siguen siendo parte de sus redes originales** (Red #1 y Red #2), pero además forman una red privada exclusiva a la que solo pueden acceder quienes están conectados por VPN.

---

## Beneficios de usar una VPN

| Beneficio | Descripción |
|-----------|-------------|
| **Conectar redes en diferentes lugares geográficos** | Una empresa con varias oficinas puede acceder a servidores e infraestructura de otra oficina como si estuvieran en la misma red local |
| **Ofrece privacidad** | La VPN usa **cifrado** para proteger los datos. Solo los dispositivos emisor y receptor pueden entenderlos — nadie puede interceptarlos. Especialmente útil en **WiFi público**, donde la red no cifra el tráfico |
| **Ofrece anonimato** | Tu proveedor de Internet (ISP) y otros intermediarios normalmente pueden ver y rastrear tu tráfico. La VPN lo oculta. Es usada por periodistas y activistas en países donde la libertad de expresión está controlada |

> ⚠️ El nivel de anonimato depende de cuánto respete la privacidad el proveedor de VPN. Una VPN que **registra todos tus datos e historial** es esencialmente lo mismo que no usar VPN.

---

## ¿Para qué usa TryHackMe la VPN?

THM te conecta a sus máquinas vulnerables a través de VPN. Esto significa que:

- Puedes **interactuar de forma segura** con sus máquinas sin que estén directamente expuestas en Internet
- Los proveedores de servicios (ISP) **no creerán que estás atacando otra máquina** en Internet (lo cual podría ir contra los términos de servicio)
- Las máquinas vulnerables de THM **no son accesibles desde Internet** directamente — solo a través de la VPN

---

## Tecnologías VPN

La tecnología VPN ha evolucionado con los años. Estas son las principales:

### PPP — Point-to-Point Protocol
- Es la tecnología base usada por PPTP (ver abajo)
- Permite la **autenticación y el cifrado de datos**
- Funciona mediante el uso de una **clave privada** y un **certificado público** (similar a SSH) — ambos deben coincidir para conectarse
- ❌ **No es capaz de salir de una red por sí sola** — no es enrutable, necesita de PPTP para funcionar a través de Internet

### PPTP — Point-to-Point Tunneling Protocol
- Protocolo de **tunelización punto a punto**
- Es la tecnología que permite que los datos de PPP **viajen y salgan de una red** hacia Internet
- ✅ Muy **fácil de configurar** y compatible con la mayoría de dispositivos
- ❌ Su **cifrado es débil** en comparación con otras alternativas modernas

### IPSec — Internet Protocol Security
- Cifra los datos usando el **marco del protocolo IP existente**
- ❌ Es **más difícil de configurar** que las otras alternativas
- ✅ Ofrece un **cifrado robusto y sólido** una vez configurado
- ✅ Compatible con muchos dispositivos

---

## Comparación de tecnologías VPN

| Tecnología | Facilidad de config. | Seguridad del cifrado | Enrutable |
|------------|---------------------|-----------------------|-----------|
| **PPP** | Media | Media | ❌ No |
| **PPTP** | ✅ Fácil | ❌ Débil | ✅ Sí |
| **IPSec** | ❌ Difícil | ✅ Robusto | ✅ Sí |

---

## Resumen rápido

```
Sin VPN:
[Tu PC] ──── Internet ────► [Servidor]
               ↑
        Tu ISP puede ver todo tu tráfico

Con VPN:
[Tu PC] ══ túnel cifrado ══► [Servidor VPN] ──► [Servidor]
               ↑
        Tu ISP solo ve tráfico cifrado — no sabe qué haces
```

---

## Conceptos para repasar

- [ ] ¿Qué es el cifrado y cómo protege los datos en una VPN?
- [ ] ¿Qué diferencia hay entre una VPN gratuita y una de pago en términos de privacidad?
- [ ] ¿Qué es un ISP y por qué puede ver tu tráfico?
- [ ] ¿Por qué PPTP ya no se recomienda para uso serio en seguridad?
- [ ] ¿Qué otros protocolos VPN existen? (OpenVPN, WireGuard...)

---

