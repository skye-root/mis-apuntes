---
tags: [web, nikto, automatizacion, fingerprinting, mern, nextjs, django, lamp, pentesting, modern-web-stacks]
módulo: Modern Web Stacks · 
estado: ✅ Completado
---

# 🤖 Automatización — Nikto para Identificar los 4 Stacks

## 🤔 ¿Por qué automatizar el fingerprinting?

El análisis manual de headers te enseña **qué buscar y por qué**. Pero cuando tienes muchos hosts en el scope, hacer `curl -I` a cada uno manualmente no escala.

**Nikto** hace eso por ti: se conecta a cada servicio, lee los headers de respuesta y detecta señales de stack y configuraciones erróneas conocidas — sin que escribas ningún payload.

> 💡 Nikto no explota nada. Es una herramienta de reconocimiento pasivo/activo que automatiza el fingerprinting que hiciste manualmente en las tareas anteriores.

---

## 🔍 Escaneando los 4 Stacks con Nikto

Los 4 stacks corren en puertos distintos en el mismo host. Se escanea cada uno por separado:

```bash
nikto -h http://10.65.165.190:3000   # MERN (Express)
nikto -h http://10.65.165.190:3001   # Next.js
nikto -h http://10.65.165.190:8000   # Django
nikto -h http://10.65.165.190:8080   # Apache (LAMP)
```

---

## 📋 Resultados por Stack

### Puerto 3000 — MERN (Express)

**¿Qué detecta Nikto?**
- No hay header `Server` — Express no lo envía por defecto
- Confirma el stack con: `x-powered-by: Express`
- Detecta la cookie de sesión `connect.sid`
- Bonus: flag `httponly` ausente en la cookie de sesión → hallazgo de seguridad adicional

> 💡 La ausencia del flag `HttpOnly` en una cookie de sesión significa que JavaScript en el navegador puede leer esa cookie — relevante para ataques XSS.

---

### Puerto 3001 — Next.js

**¿Qué detecta Nikto?**
- `x-powered-by: Next.js` → confirma el framework
- Detecta los tres headers `x-nextjs-*` → confirma que el **App Router está en modo producción**
- Eso es la condición necesaria para que aplique **CVE-2025-29927** (el middleware bypass)

> 💡 Si Nikto ve los headers `x-nextjs-cache`, `x-nextjs-prerender`, `x-nextjs-stale-time` → App Router en producción → vulnerable al bypass de middleware con un solo header.

---

### Puerto 8000 — Django

**¿Qué detecta Nikto?**
- Banner `WSGIServer/0.2 CPython/3.10.12` → específico de Django
- Headers `referrer-policy: same-origin` + `x-content-type-options: nosniff` juntos → confirman que el `SecurityMiddleware` de Django está activo

> ⚠️ **Limitación:** Nikto confirma el stack, pero **no tiene plantillas para vulnerabilidades de inyección a nivel de aplicación** como la SQL injection del parámetro `?order=`. Para eso son necesarias las técnicas manuales de la Tarea 4.

---

### Puerto 8080 — Apache (LAMP)

**¿Qué detecta Nikto?**
- `Server: Apache/2.4.49 (Unix)` → indicador directo de CVE-2021-41773

> 🔴 Este es el hallazgo más valioso de los cuatro escaneos. Un número de versión exacto que se corresponde con una vulnerabilidad crítica conocida. Apache también entrega la versión exacta sin necesidad de técnicas adicionales.

---

## 📊 Comparativa: Manual vs Nikto

| Stack | Fingerprint manual | Lo que detecta Nikto |
|-------|-------------------|---------------------|
| MERN | `curl -I` → `X-Powered-By: Express` | `x-powered-by: Express` + cookie sin `HttpOnly` |
| Next.js | `curl -I` → `X-Powered-By: Next.js` + headers `x-nextjs-*` | Igual + confirma modo producción |
| Django | `curl -I` → `WSGIServer` + `csrftoken` | Banner WSGI + combo `SecurityMiddleware` |
| LAMP | `curl -I` → `Server: Apache/2.4.49` | Versión exacta → CVE directo |

---

## ⚖️ ¿Cuándo usar Nikto vs análisis manual?

| Situación | Usa |
|-----------|-----|
| Muchos hosts, primer reconocimiento rápido | **Nikto** |
| Confirmar stack de un host específico | **Nikto** |
| Encontrar vulnerabilidades a nivel de lógica de aplicación (SQLi, prototype pollution) | **Manual** |
| Entender por qué una señal importa | **Manual** (como hiciste en las tareas anteriores) |

> 💡 Nikto te dice **qué stack es** y algunas malas configuraciones. Las técnicas manuales te dicen **cómo explotarlo** cuando Nikto no llega hasta ahí.

---

## 📌 Takeaways

> - **Nikto** automatiza el fingerprinting de headers — escanea y reporta señales de stack sin payloads.
> - En menos de un minuto identifica los 4 stacks correctamente.
> - El hallazgo más valioso fue en Apache: versión exacta `2.4.49` → CVE-2021-41773 directo.
> - Para Next.js: los headers `x-nextjs-*` confirman App Router en producción → condición del middleware bypass.
> - **Limitación clave:** Nikto no detecta vulnerabilidades de lógica de aplicación (SQLi en parámetros custom, prototype pollution). Para eso siempre se necesita análisis manual.
> - Flujo recomendado en un pentest: **Nikto primero** para reconocimiento rápido → **manual** para explotación específica.
