## De evento a alerta
---
```
Evento (login, proceso, descarga)
   → Log (el sistema lo registra)
   → SIEM / EDR (centraliza logs de miles de sistemas — millones/día)
   → Alerta (solo lo que se sale del patrón esperado)
```
Resultado: el analista revisa docenas de alertas al día, no millones de logs sin filtrar.

### Plataformas de gestión de alertas

| Tipo | Ejemplos | Para qué sirve |
|---|---|---|
| **SIEM** | Splunk ES, Elastic | Gestión de alertas propiamente dicha — la opción estándar en un SOC. |
| **EDR / NDR** | Defender, CrowdStrike | Tiene panel propio, pero se recomienda centralizar en SIEM/SOAR. |
| **SOAR** | Splunk SOAR, Cortex SOAR | Agrega alertas de varias fuentes — para SOCs grandes. |
| **ITSM** | Jira, TheHive, Trello | Gestión de tickets, a veces con implementación propia del equipo. |

![[Pasted image 20260804052412.png|700]]

---

## Quién hace qué con las alertas

| Rol | Función |
|---|---|
| **L1** | Revisa, distingue buena de mala, escala a L2 si es amenaza real. |
| **L2** | Recibe lo escalado, hace análisis y corrección más profunda. |
| **Engineer** | Asegura que la alerta traiga info suficiente para clasificar rápido. |
| **Manager** | Supervisa velocidad y calidad del triage — que no se pase nada por alto. |

L1 maneja entre **0 y 100 alertas/día** — el rango tan amplio depende de si es SOC interno o MSSP (ver apunte anterior).

---

## Anatomía de una alerta

![[Pasted image 20260804053412.png|700]]

| # | Propiedad | Qué te dice | Ejemplo |
|---|---|---|---|
| 1 | **Hora de alerta** | Cuándo se generó (suele ir unos minutos detrás del evento real). | Evento 15:32 → alerta 15:35 |
| 2 | **Nombre** | Resumen basado en la regla de detección que se disparó. | "Login desde ubicación inusual", "RDP brute force" |
| 3 | **Severidad** | Urgencia inicial, la fija el ingeniero, el analista puede ajustarla. | 🟢 Bajo · 🟡 Medio · 🟠 Alto · 🔴 Crítico |
| 4 | **Estado** | Si alguien la está trabajando o ya se triageó. | Nuevo · En progreso · Cerrado |
| 5 | **Veredicto** | Si es amenaza real o ruido. | 🔴 Verdadero positivo · 🟢 Falso positivo |
| 6 | **Asignado** | Quién la tiene bajo su responsabilidad. | El "dueño" de la alerta |
| 7 | **Descripción** | Lógica de la regla + por qué esto podría ser un ataque + cómo priorizarla. | — |
| 8 | **Campos** | Valores concretos que la dispararon. | Hostname, comando ejecutado, IP origen |

---

## Priorización de alertas

Cuando hay cientos en cola y no las puedes atender todas de una:

1. **Filtra** — no tomes alertas que ya tienen dueño o están en investigación.
2. **Ordena por severidad** — crítica → alta → media → baja.
3. **Ordena por fecha** — la más antigua primero.

Cada equipo automatiza esta lógica en el SIEM/EDR; no es algo que decidas manualmente alerta por alerta.

---

## Triaje de alerta
---
*(triaje = clasificación = investigación = gestión de alertas, son el mismo proceso con distintos nombres)*

![[Pasted image 20260804105509.png]]
*El flujo exacto varía según el equipo.*

```
Acciones iniciales → Investigación → Acciones finales
```

### 1. Acciones iniciales
- Asignarte la alerta.
- Cambiar el estado a "En curso".
- Revisar nombre, descripción e indicadores clave.

### 2. Investigación (la parte difícil)
1. ¿Quién está bajo amenaza? (usuario, host, cloud, red, sitio)
2. ¿Qué acción describe la alerta? (login sospechoso, malware, phishing)
3. Revisar eventos alrededor — antes y después de la alerta.
4. Verificar con threat intelligence u otros recursos disponibles.

Si tu equipo tiene **playbooks/runbooks**, síguelos — están hechos justo para reducir el margen de error en este paso.

### 3. Acciones finales
- Veredicto: **verdadero positivo** o **falso positivo**.
- Comentario con el razonamiento del análisis (no solo el veredicto).
- Cambiar estado a **cerrado**.

---

## En una frase
El flujo completo es evento → log → alerta filtrada por SIEM → triage (asignar, investigar, cerrar con veredicto), priorizando por severidad y antigüedad para que nada crítico se quede esperando en la cola.
