## Security Controls
---
Los controles de seguridad son la base de cualquier entorno de seguridad robusta, ofreciendo diversas medidas para mitigar riesgos, detectar incidentes y garantizar el cumplimiento de la normativa vigente.

### Control Categories
Las cuatro categorías principales son: **gerencial, operativo, técnico y físico**. Cada categoría representa un aspecto diferente del control dentro de una organización y es crucial para garantizar la *eficiencia, la eficacia y el cumplimiento normativo*.

#### Explicación simple
Pensemos en los 4 tipos de control como una cadena de mando:

- **Managerial** = la gerencia **decide** las reglas ("debemos hacer evaluaciones de riesgo cada año")
- **Operational** = las **personas ejecutan esas reglas** en el día a día ("el equipo de IT hace la evaluación de riesgo siguiendo el procedimiento")
- **Technical** = la **tecnología** hace cumplir la regla automáticamente (el sistema bloquea accesos no autorizados)
- **Physical** = **barreras físicas** protegen el acceso (cámaras, cerraduras, guardias)

---

#### Managerial controls (Controles de Gestión)
Son controles centrados en la **planificación y la toma de decisiones**: políticas, procedimientos y prácticas que la gerencia define para dirigir el comportamiento de las personas hacia los objetivos de seguridad de la organización.

💡 **Idea clave para el examen**: son "controles de papel" — se enfocan en el *qué* y *por qué* (estrategia y dirección), no en el *cómo* técnico (eso son los controles técnicos) ni en la ejecución diaria (eso son los operacionales).

Ejemplos:
- Evaluaciones de desempeño
- Evaluaciones de riesgos
- Código de conducta

---

#### Operational controls (Controles Operacionales)
Son controles ejecutados **por personas en el día a día** para mantener la seguridad: procedimientos que el personal sigue de forma rutinaria para responder a amenazas y mantener buenas prácticas de seguridad.

💡 **Idea clave para el examen**: son la "ejecución humana diaria" — a diferencia de Managerial (que decide las políticas) o Technical (que las automatiza en sistemas), aquí la seguridad depende de que las personas actúen correctamente.

Ejemplos:
- Procedimientos de respuesta a incidentes
- Capacitación en concientización sobre seguridad (security awareness training)
- Gestión de acceso de usuarios (altas/bajas de cuentas, revisión de permisos)

📌 **Ejemplo concreto (respuesta a incidentes)**: ocurre un phishing exitoso. El analista de seguridad (persona) sigue el procedimiento ya establecido: aísla la cuenta comprometida, resetea la contraseña, notifica al usuario y documenta el incidente. Managerial ya decidió *qué* pasos seguir; aquí una persona los *ejecuta* en el momento.

---

#### Technical controls (Controles Técnicos)
Son controles implementados **directamente en los sistemas** (hardware, software, redes) para reducir vulnerabilidades y proteger la confidencialidad, integridad y disponibilidad de los datos.

💡 **Idea clave para el examen**: son el "cómo técnico" — la ejecución automatizada de la seguridad dentro de la tecnología misma, a diferencia de los Managerial (que son políticas y decisiones) o los operacionales (que dependen de las personas ejecutando procesos día a día).

Ejemplos:
- Implementación de Firewall (Cortafuego), Antivirus
- Data Encryption (Cifrado de datos)
- Control de acceso a nivel de sistema operativo (permisos, ACLs)

---

#### Physical controls (Controles Físicos)
Son controles que protegen los **activos tangibles** de una organización (edificios, equipos, personas) mediante barreras y mecanismos físicos que previenen el acceso no autorizado.

💡 **Idea clave para el examen**: son la "última barrera" — protegen el mundo físico/real, a diferencia de los otros tres controles que operan en el plano de decisiones (Managerial), acciones humanas (Operational) o sistemas digitales (Technical).

⚠️ **Cuidado con la trampa del examen**: los guardias de seguridad son *personas*, pero se clasifican como control **físico** (no operacional), porque su función es proteger el acceso físico, no ejecutar un procedimiento administrativo.

Ejemplos:
- Control de acceso físico (tarjetas, biometría, PIN)
- Guardias/personal de seguridad
- Vallas de seguridad
- Cámaras CCTV
- Precintos de seguridad
- Trampas (mantrap): esclusa con dos puertas donde solo una se abre a la vez, para evitar el "tailgating"
- Botones/alarmas de pánico

---

### Resumen comparativo

| Tipo | Pregunta clave | Ejemplo |
| --- | --- | --- |
| **Managerial** | ¿Qué reglas decidimos? | Evaluación de riesgo |
| **Operational** | ¿Quién las ejecuta día a día? | Respuesta a incidentes |
| **Technical** | ¿Cómo lo hace el sistema automáticamente? | Firewall, cifrado |
| **Physical** | ¿Cómo protegemos el acceso físico? | Cámaras, guardias |
