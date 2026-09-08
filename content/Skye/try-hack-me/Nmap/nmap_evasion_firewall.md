# 🛡️ nmap — Tarea 13: Evasión de Cortafuegos (Firewall Evasion)

**Módulo:** Jr Penetration Tester — nmap  
**Plataforma:** TryHackMe  
**Estado:** 🔄 En progreso

---

## El problema: Windows bloquea ICMP por defecto

Cuando nmap va a escanear un host, primero hace un **ping** para verificar que el objetivo está activo (alive). Si no responde al ping, nmap asume que está apagado y **no lo escanea**.

El problema: los sistemas **Windows** bloquean todos los paquetes ICMP por defecto con su firewall. Eso incluye el ping. Entonces nmap ve silencio, concluye que el host está muerto, y no hace nada.

```
Tu máquina  ──── PING (ICMP) ────►  Windows
                                     🔥 Firewall bloquea ICMP
Tu máquina  ◄────  (silencio)  ────  nmap cree que está offline
```

Esto pasa mucho en entornos corporativos y en algunos CTFs.

---

## La solución: `-Pn`

El switch `-Pn` le dice a nmap: **"no hagas ping, asume que el host está activo y escanéalo de todas formas"**.

```bash
nmap -Pn <IP>
```

Con esto, nmap salta la fase de descubrimiento ICMP y va directo a escanear los puertos, tratando al objetivo como si estuviera encendido pase lo que pase.

> [!warning] Puede ser lento
> Si el host realmente está apagado o no existe, nmap igual intentará conectarse a cada puerto especificado — y esperará respuesta en cada uno. Esto puede hacer el escaneo **muy lento**. Úsalo cuando estés seguro de que el objetivo existe pero no responde al ping.

> [!info] En red local: ARP al rescate
> Si estás en la misma red local que el objetivo, nmap puede usar **solicitudes ARP** en lugar de ICMP para verificar si el host está activo. ARP no puede ser bloqueado por el firewall de la misma forma, así que en redes locales este problema es menos frecuente.

---

## Otros switches de evasión

Estos switches están diseñados para hacer el escaneo más difícil de detectar por firewalls e IDS (Intrusion Detection Systems). No se usan en todos los escaneos, pero son herramientas valiosas cuando el objetivo tiene defensas activas.

---

### `-f` — Fragmentar paquetes

Divide los paquetes en **fragmentos más pequeños** antes de enviarlos.

```bash
nmap -f <IP>
```

**¿Por qué funciona?** Muchos firewalls e IDS analizan paquetes completos para detectar escaneos. Si el paquete llega partido en trozos pequeños, el sistema de detección puede no reconocerlo como un escaneo y dejarlo pasar. El objetivo los reconstruye normalmente al recibirlos.

```
Sin -f:   [Paquete completo grande] ──►  Firewall lo detecta fácil
Con -f:   [frag1][frag2][frag3]    ──►  Firewall no lo reconoce
```

---

### `--mtu <número>` — Control manual del tamaño de fragmentos

Es una versión más precisa de `-f`. En lugar de dejar que nmap decida el tamaño de los fragmentos, tú lo controlas.

```bash
nmap --mtu 16 <IP>
nmap --mtu 24 <IP>
```

> [!warning] Debe ser múltiplo de 8
> El valor que le pases **obligatoriamente** debe ser múltiplo de 8 (8, 16, 24, 32...). Si no lo es, nmap dará error. Esto es una restricción del protocolo de red, no de nmap.

---

### `--scan-delay <tiempo>ms` — Retraso entre paquetes

Añade una pausa entre cada paquete enviado.

```bash
nmap --scan-delay 200ms <IP>
nmap --scan-delay 1000ms <IP>   # 1 segundo entre paquetes
```

Útil en dos escenarios:

**1. Red inestable:** Si la red tiene mucho lag o pérdida de paquetes, enviar todo de golpe genera errores. Un pequeño delay mejora la precisión.

**2. Evadir IDS basados en tiempo:** Muchos sistemas de detección de intrusos se activan cuando detectan una gran cantidad de conexiones en un período corto (lo reconocen como un escaneo). Con `--scan-delay`, el tráfico parece más "normal" y humano.

> [!tip] Combínalo con templates de velocidad
> Si usas `-T1` o `-T2` ya estás introduciendo delays automáticamente. `--scan-delay` te da control más fino sobre ese tiempo exacto.

---

### `--badsum` — Suma de verificación inválida

Envía paquetes con un **checksum (suma de verificación) TCP/IP intencionalmente incorrecto**.

```bash
nmap --badsum <IP>
```

**¿Cómo funciona esto?**

- Cualquier sistema real (Windows, Linux, routers) descartará estos paquetes automáticamente porque detecta que están corruptos.
- Pero algunos **firewalls y IDS mal configurados** responden a estos paquetes sin verificar el checksum primero — simplemente los procesan.

Si recibes respuesta con `--badsum`, sabes que hay un **firewall/IDS** en el camino que está respondiendo sin validar los paquetes correctamente. Es una técnica de **fingerprinting de firewalls**, no de escaneo real.

> [!info] ¿Para qué sirve esto en la práctica?
> `--badsum` no te va a dar información sobre puertos abiertos — su uso real es **detectar la presencia de un firewall o IDS** y entender cómo está configurado. Si el firewall responde a paquetes corruptos, es probable que también tenga otras configuraciones débiles que puedas aprovechar.

---

## Tabla resumen de evasión

| Switch | Qué hace | Cuándo usarlo |
|--------|----------|---------------|
| `-Pn` | Salta el ping, asume host activo | Windows con ICMP bloqueado |
| `-f` | Fragmenta paquetes | Evadir IDS que analizan paquetes completos |
| `--mtu <n>` | Fragmenta con tamaño exacto (múltiplo de 8) | Control fino de fragmentación |
| `--scan-delay <t>ms` | Pausa entre paquetes | Redes inestables / evadir IDS por tiempo |
| `--badsum` | Paquetes con checksum inválido | Detectar presencia de firewall/IDS |

---

## Contexto más amplio: evasión en pentesting real

> [!tip] La evasión es una habilidad, no un truco
> En un pentest real, si el objetivo tiene un buen IDS/IPS (como Snort, Suricata, o un SIEM corporativo), un escaneo normal de nmap va a generar alertas en segundos. Saber cuándo y cómo combinar estas técnicas es lo que separa a un pentester junior de uno senior.

La estrategia general en entornos con defensas activas:

```
1. Empezar lento y sigiloso
   → -T1 o -T2, --scan-delay, -f

2. Si hay firewall, identificarlo
   → --badsum, escaneos NULL/FIN/Xmas

3. Saltar detección de host
   → -Pn si ICMP está bloqueado

4. Aumentar agresividad solo cuando sea necesario
   → Guardar siempre resultados con -oA antes de escalar
```

> [!danger] Solo en entornos autorizados
> Estas técnicas están diseñadas para evadir sistemas de seguridad. Usarlas contra objetivos sin autorización es ilegal. En un CTF o lab como TryHackMe, tienes luz verde — en la vida real, siempre necesitas un contrato de pentest que lo autorice explícitamente.

---

## Recursos adicionales

La documentación oficial de nmap tiene más switches de evasión avanzados que no se cubren en este módulo:
→ [https://nmap.org/book/man-bypass-firewalls-ids.html](https://nmap.org/book/man-bypass-firewalls-ids.html)

Vale la pena leer esa página cuando quieras profundizar en evasión avanzada.
