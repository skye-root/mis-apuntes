---
tags: [pentesting, jr-pentester, reconocimiento, redes]
curso: " Jr Penetration Tester"
room: "Active Reconnaissance"
---

# 🎯 Reconocimiento Activo

> [!note] Diferencia clave con el recon pasivo
> Acá **sí tocas al objetivo directamente** (le mandas paquetes, te conectas a sus puertos). Ya no es sigiloso como [[Reconocimiento Pasivo]] — el objetivo puede ver tus consultas en sus logs. Son herramientas simples, pero dan una base sólida antes de pasar a scanners más avanzados como Nmap.

---

## 1️⃣ Navegador web (Developer Tools)

El navegador es en sí una herramienta de recon. Con las **Dev Tools** puedes ver:
- Tecnologías del servidor (headers de respuesta)
- Código fuente y **JavaScript** cargado (rutas, comentarios, endpoints)
- Detalles del **certificado SSL/TLS**

| Sistema operativo | Atajo |
|---|---|
| Linux / Windows | `Ctrl + Shift + I` |
| macOS | `Option + Command + I` |

> [!tip] Qué mirar primero
> Pestaña **Network** para headers (`Server:`, `X-Powered-By:`) y pestaña **Sources** para JS que a veces trae rutas o claves hardcodeadas por error.

---

## 2️⃣ Ping

- Confirma si un objetivo está **alcanzable** (reachable).
- Da pistas del sistema operativo según el **TTL** de la respuesta (Linux ~64, Windows ~128, aprox.).

```bash
ping -c 10 MACHINE_IP        # Linux/macOS
ping -n 10 MACHINE_IP        # Windows
ping -6 MACHINE_IPV6         # IPv6 (Linux/macOS)
ping6 MACHINE_IPV6           # IPv6 (alternativa)
```

---

## 3️⃣ Traceroute

- Mapea la **ruta de red** entre tú y el objetivo.
- Revela **routers intermedios** y posibles puntos de **filtrado** (firewalls que bloquean o descartan paquetes en el camino).

```bash
traceroute MACHINE_IP         # Linux/macOS
tracert MACHINE_IP            # Windows
traceroute -6 MACHINE_IPV6    # IPv6 (Linux/macOS)
tracert6 MACHINE_IPV6         # IPv6 (Windows/alternativa)
mtr MACHINE_IP                # monitoreo de ruta en tiempo real
```

---

## 4️⃣ Telnet

- Herramienta **legacy** para conectarse a puertos individuales y hacer **banner grabbing** (ver qué servicio y versión corre).
- No es seguro (sin cifrado) — solo úsalo para recon, nunca para conexiones reales sensibles.

```bash
telnet MACHINE_IP PORT_NUMBER
```

> [!warning]
> Para servicios HTTP/HTTPS, es mejor usar `curl` que `telnet` — más flexible y seguro.

---

## 5️⃣ Netcat (nc)

- La "navaja suiza" de redes. Sirve tanto de **cliente** como de **servidor/listener**.
- Se puede usar para banner grabbing, transferir datos, o incluso montar shells.

```bash
nc MACHINE_IP PORT_NUMBER       # como cliente (conectar a un puerto)
nc -lvnp PORT_NUMBER            # como servidor/listener
nc -6 MACHINE_IPV6 PORT_NUMBER  # IPv6
```

> [!tip] Conexión con lo que ya vengo documentando
> Este `nc -lvnp` es el mismo patrón que uso para levantar un listener y recibir reverse shells en mis writeups de DockerLabs — vale la pena recordar la sintaxis de memoria.

---

## 📋 Quick Reference (resumen de comandos)

| Herramienta | Comando |
|---|---|
| Ping | `ping -c 10 MACHINE_IP` |
| Ping (Windows) | `ping -n 10 MACHINE_IP` |
| Ping IPv6 | `ping -6 MACHINE_IPV6` o `ping6 MACHINE_IPV6` |
| Traceroute | `traceroute MACHINE_IP` |
| Traceroute (Windows) | `tracert MACHINE_IP` |
| Traceroute IPv6 | `traceroute -6 MACHINE_IPV6` |
| mtr (ruta en tiempo real) | `mtr MACHINE_IP` |
| Telnet (legacy) | `telnet MACHINE_IP PORT_NUMBER` |
| Netcat como cliente | `nc MACHINE_IP PORT_NUMBER` |
| Netcat como servidor | `nc -lvnp PORT_NUMBER` |
| Netcat IPv6 | `nc -6 MACHINE_IPV6 PORT_NUMBER` |
| curl banner HTTP | `curl -I http://MACHINE_IP` o `curl -I https://MACHINE_IP` |

---

## 🧩 Cómo se combinan estas herramientas

```
ping        → ¿el host está vivo?
   ↓
traceroute  → ¿cómo llego hasta él? (ruta, filtros)
   ↓
nc / curl   → ¿qué puertos/servicios responden y con qué versión?
```

> [!tip] Regla práctica
> Para servicios HTTP/HTTPS, prefiere `curl -I` o `nc` antes que `telnet` — son más seguros y flexibles para banner grabbing.

---

## 🔜 Próximos pasos (lo que sigue en el módulo)

- **Nmap** → automatiza y extiende el descubrimiento de hosts y escaneo de puertos mucho más allá de `ping`/`nc` (ver [[nmap - Notas]])
- **Walking An Application** → exploración más profunda con Dev Tools e inspección manual web
- **Escaneo sigiloso (stealth scanning)** y **Burp Suite** → temas avanzados: timing lento, proxy chaining, tráfico mezclado

---


## 📌 Resumen ultra-rápido
- **Dev Tools del navegador** → tecnologías, headers, JS, certificados
- **ping** → ¿está vivo? + pista de SO por TTL
- **traceroute** → ruta de red, routers intermedios, filtros
- **telnet** → banner grabbing legacy (sin cifrar, evitar si hay alternativa)
- **netcat** → cliente/servidor todo-en-uno, banner grabbing y listeners
