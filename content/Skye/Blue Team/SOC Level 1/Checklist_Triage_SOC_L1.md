---
tags: [SOC, triage, checklist, blue-team]
created: 2025-08-04
status: activo
---

# 🔍 Checklist de Triage — SOC L1


## 🎯 Regla general antes de cerrar cualquier alerta

Antes de marcar True Positive o False Positive, pregúntate:

1. **¿Qué fuente de información me falta para estar 100% seguro?**
2. **¿Tengo acceso a esa fuente en este entorno?**
   - Sí → investígala antes de cerrar
   - No → documéntalo explícitamente en el comentario (no cierres "a ciegas")
3. **¿Mi comentario le sirve a un L2/L3 que revise mi cierre sin repetir todo el análisis?**

---

## 📁 Ejecución de Archivos / Doble Extensión

**Red flags a validar:**
- [ ] ¿Nombre de archivo tiene doble extensión? (`*.pdf.exe`, `*.mp4.exe`, `*.jpg.scr`)
- [ ] ¿El File MotW (Mark of the Web) viene de un dominio conocido/confiable?
- [ ] TLD sospechoso (`.monster`, `.xyz`, `.top`, `.click`, etc.)
- [ ] Nombre del archivo usa "cebo" genérico (videos, facturas, premios, cracks)
- [ ] Proceso que originó la descarga (browser normal vs. algo inusual)

**Regla rápida:** doble extensión + dominio no confiable + MotW presente = casi siempre **True Positive** (phishing/dropper).

---

## 📡 Exfiltración de Datos

**Red flags a validar:**
- [ ] ¿El destino es un dominio de confianza (Zoom, Google, Microsoft) o desconocido?
- [ ] ⚠️ **Ojo:** dominio confiable NO es suficiente para cerrar como FP — atacantes abusan de "living off trusted domains"
- [ ] ¿El volumen enviado/recibido es simétrico? (simétrico = más consistente con videollamada; muy asimétrico = más sospechoso de exfil)
- [ ] ¿Hay reunión agendada en el calendario corporativo para esa hora/sala?
- [ ] ¿El dispositivo/red origen es hardware dedicado (ej. Zoom Room) o un endpoint de usuario normal?
- [ ] ¿Se puede confirmar en inventario de activos (CMDB) qué es ese origen?

**Fuentes a consultar si están disponibles:** calendario corporativo, CMDB/inventario de activos, logs de autenticación del servicio.

**Si no tienes acceso a esas fuentes:** cierra con baja confianza y dilo explícitamente en el comentario.

---

## 🌐 Descargas / URLs (GitHub, repos, sitios externos)

**Red flags a validar:**
- [ ] ¿Quién descargó? (usuario, rol, red de origen)
- [ ] ¿El rol del usuario es consistente con la actividad? (developer descargando librería = normal)
- [ ] **¿El repo/URL en sí es legítimo?** (esto es lo que se me pasó)
  - [ ] Estrellas/forks del repo (muchas = señal de legitimidad)
  - [ ] Organización dueña verificada (Meta, Google, Microsoft, etc.)
  - [ ] Dominio real vs. typosquat (`github.com` vs `qithub.com`, `github-io.com`)
  - [ ] Estructura de URL normal (`owner/repo`) vs. algo armado para parecer legítimo

**Regla rápida:** "developer + red de developers" es solo la mitad del análisis. La otra mitad es validar que el recurso descargado también sea legítimo.

---

## ✍️ Plantilla de comentario cuando falta contexto

```
[Hallazgo principal]: <qué se observó>
[Validado]: <qué lograste confirmar>
[No se pudo confirmar]: <qué información faltó y por qué>
[Recomendación]: <a quién escalar o qué validar después>
[Veredicto]: <TP/FP> — confianza <alta/media/baja>
```

**Ejemplo (caso Zoom):**
> Volumen de datos consistente con videollamada de Zoom (envío/recepción simétricos). No se pudo confirmar reunión agendada en calendario ni verificar si el endpoint corresponde a hardware de sala de conferencias. Se recomienda validar con IT/Facilities. Cerrando como FP — confianza baja, requiere verificación adicional.

---

## 📌 Lección clave de esta práctica

> No cerrar una alerta con la info que ya tienes solo porque "suena razonable" — identifica activamente qué falta y de dónde se saca, o documenta la limitación. Eso es lo que separa seguir el playbook de pensar como analista.
