# How Websites Work — Tarea 1: Cómo funcionan los sitios web

> [!info] Módulo: How Websites Work
> Objetivo: entender cómo se crean los sitios web y conocer algunos problemas básicos de seguridad.

---

## 🌐 ¿Qué pasa cuando visitas un sitio web?

Cuando escribes una URL en tu navegador, ocurre esto:

1. Tu **navegador** (Chrome, Firefox, Safari...) envía una **solicitud (request)** a través de internet
2. Esa solicitud llega a un **servidor web**
3. El servidor procesa la solicitud y envía una **respuesta (response)** de vuelta
4. Tu navegador usa esa respuesta para **mostrar la página**

```
[Browser] --Request--> [Internet] --Request--> [Server]
[Browser] <--Response-- [Internet] <--Response-- [Server]
```

> [!note] ¿Qué es un servidor web?
> Es simplemente una computadora dedicada, ubicada en algún lugar del mundo, cuya única función es recibir solicitudes y responder con los datos de la página web. No es diferente a tu PC, solo está siempre encendida y conectada.

---

## 🧩 Los dos componentes principales de un sitio web

| Componente | También llamado | ¿Qué hace? |
|------------|----------------|------------|
| **Front End** | Lado del cliente | Es lo que tu navegador descarga y renderiza: HTML, CSS, JavaScript. Lo que **ves** en pantalla. |
| **Back End** | Lado del servidor | Es el código que corre en el servidor. Procesa tu solicitud, consulta bases de datos y genera la respuesta. Lo que **no ves**. |

> [!tip] Analogía
> Piensa en un restaurante: el **Front End** es el salón y la presentación del plato (lo que ves). El **Back End** es la cocina (lo que no ves pero hace que todo funcione).

---

## 🔄 Flujo completo simplificado

```
Tu navegador                 Internet                Servidor
─────────────               ─────────               ─────────
Escribes URL
      │
      ▼
Envía REQUEST ──────────────────────────────────────► Recibe request
                                                      Procesa
                                                      Busca datos
Recibe RESPONSE ◄────────────────────────────────── Envía response
      │
      ▼
Renderiza la página
(HTML + CSS + JS)
```

---

## 📌 Conceptos clave

> [!note] Request (Solicitud)
> Mensaje que el navegador envía al servidor pidiendo información. Incluye: qué página quiere, qué tipo de navegador es, cookies, etc.

> [!note] Response (Respuesta)
> Lo que el servidor devuelve al navegador. Generalmente contiene el código HTML de la página, archivos CSS, JavaScript, imágenes, etc.

> [!note] Front End vs Back End en seguridad
> Esta distinción es importante en hacking web. Las vulnerabilidades del **Front End** (XSS, clickjacking) afectan al navegador del usuario. Las del **Back End** (SQLi, RCE) afectan al servidor. Cada lado tiene su propio vector de ataque.

---

