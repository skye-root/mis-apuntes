# 🗺️ nmap — Tarea 2: Introducción

**Módulo:** Jr Penetration Tester — nmap  
**Plataforma:** TryHackMe  
**Estado:** ✅ Completada

---

## ¿Por qué necesitamos escanear puertos?

En pentesting, el primer paso antes de atacar cualquier cosa es **conocer el objetivo**. Si te dan una IP (o varias), no puedes simplemente lanzarte a explotar cosas al azar — primero necesitas saber qué tiene encendido, qué servicios está corriendo, y por dónde puedes entrar.

Ahí es donde entra el **escaneo de puertos** (port scanning).

> [!info] ¿Qué es un puerto?
> Imagínate que un servidor es un edificio de apartamentos. La IP es la dirección del edificio, pero cada **puerto** es una puerta diferente. El servicio web puede estar en la puerta 80, el correo en la 25, el acceso remoto en la 22, etc. Para comunicarte con el servicio correcto, tienes que tocar la puerta correcta.

Cuando tu computadora se conecta a un servidor, **abre un puerto local de numeración alta** (elegido al azar, como el 49534) para comunicarse con el puerto del servidor (por ejemplo, el 443 de HTTPS). Así el servidor sabe a quién responderle cuando tiene múltiples conexiones simultáneas.

---

## Cuántos puertos existen

| Dato | Valor |
|------|-------|
| Total de puertos disponibles | **65,535** |
| Puertos "conocidos" (well-known ports) | **1,024** (del 0 al 1023) |
| Puerto HTTP estándar | **80** |
| Puerto HTTPS estándar | **443** |
| Puerto Windows NetBIOS | **139** |
| Puerto SMB / Windows shares | **445** |

> [!warning] Importante en CTFs
> Aunque los puertos estándar son ampliamente conocidos, en entornos CTF (y en la vida real también) los administradores a veces **mueven servicios a puertos no estándar** para dificultar la detección. Por eso siempre hay que escanear bien y no asumir que el puerto 80 es el único servicio web.

---

## ¿Qué hace nmap exactamente?

**nmap** (Network Mapper) es la herramienta estándar de la industria para escaneo de puertos. Su lógica básica es simple:

1. Se conecta a cada puerto del objetivo, **uno por uno**
2. Analiza cómo responde el puerto
3. Determina si está **abierto**, **cerrado** o **filtrado** (bloqueado por un firewall)
4. Una vez que sabe qué puertos están abiertos, puede identificar **qué servicios** están corriendo en cada uno

```
nmap <IP objetivo>
```

> [!tip] ¿Por qué nmap y no otra cosa?
> Ninguna otra herramienta de escaneo de puertos se acerca a nmap en términos de funcionalidad. Además de escanear puertos, tiene un **motor de scripting (NSE)** que permite:
> - Detectar versiones de servicios
> - Identificar el sistema operativo
> - Escanear vulnerabilidades conocidas
> - En algunos casos, explotar directamente

---

## El flujo de trabajo en pentesting

```
IP objetivo
    │
    ▼
┌─────────────────────────────────┐
│  Escaneo de puertos con nmap    │  ← Saber qué está abierto
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  Identificar servicios          │  ← ¿Qué corre en cada puerto?
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  Buscar vulnerabilidades        │  ← ExploitDB, searchsploit, CVEs
└─────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────┐
│  Explotación                    │  ← Atacar con la info recopilada
└─────────────────────────────────┘
```

> [!danger] Sin enumeración, no hay ataque efectivo
> Si intentas explotar algo sin haber enumerado bien, básicamente estás disparando a ciegas. El escaneo de puertos no es opcional — es el **primer paso obligatorio** de cualquier pentest.

---

## Diferencia entre puertos: abierto vs cerrado vs filtrado

| Estado | Qué significa |
|--------|--------------|
| **Open** (abierto) | Hay un servicio escuchando en ese puerto — posible punto de entrada |
| **Closed** (cerrado) | El puerto existe pero no hay servicio corriendo ahí |
| **Filtered** (filtrado) | Un firewall está bloqueando las respuestas — no podemos saber el estado real |

> [!tip] Tip de pentesting
> Los puertos **filtrados** son los más interesantes desde el punto de vista de un pentester avanzado — a veces un firewall mal configurado filtra el ping pero deja pasar ciertos tipos de paquetes. nmap tiene técnicas especiales para esto (las veremos en tareas siguientes).

---

## Preguntas de la tarea (respuestas)

| Pregunta | Respuesta |
|----------|-----------|
| ¿Qué estructuras de red dirigen el tráfico a la app correcta en un servidor? | `Ports` |
| ¿Cuántos puertos están disponibles en cualquier ordenador conectado a la red? | `65535` |
| ¿Cuántos de esos se consideran "conocidos"? | `1024` |

---

## Resumen rápido

- Antes de atacar un objetivo, hay que saber qué puertos tiene abiertos
- Cada puerto es una puerta de entrada a un servicio específico
- Existen 65,535 puertos; los primeros 1,024 son los "conocidos" con servicios estándar
- **nmap** es la herramienta estándar para hacer este escaneo
- nmap determina si un puerto está abierto, cerrado o filtrado por firewall
- Con esa info, puedes identificar servicios y buscar vulnerabilidades

![[nmap_ports_diagram.png]]
