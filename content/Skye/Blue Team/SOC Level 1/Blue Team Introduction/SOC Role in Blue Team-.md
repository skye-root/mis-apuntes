## Jerarquía de seguridad en una empresa
---
![[Pasted image 20260803015038.png|625]]

La pirámide tiene 4 niveles, y cada uno responde a una pregunta distinta: ¿qué tan técnico es el trabajo y a cuánta gente gestiona?

| Nivel | Quién | Se enfoca en |
|---|---|---|
| **Executives** | CEO / CFO / dueño de la empresa | Objetivos de negocio globales, cero detalle técnico. |
| **Security Leadership** | CTO / CIO / **CISO** (si existe el puesto) | Liderar el programa de seguridad o TI de toda la empresa. |
| **Security Managers** | Team Lead / **SOC Manager** / Red Team Lead | Gestionar un solo equipo o departamento (ej. el SOC). |
| **Technical** | SOC Analyst / SOC Engineer / GRC Specialist / Penetration Tester | Tareas técnicas del día a día, como análisis de logs. |

El **CISO** (Chief Information Security Officer / director de seguridad de la información) es el puente entre "lo que el negocio necesita" y "cómo se protege técnicamente" — traduce objetivos de negocio en decisiones de seguridad.

Debajo de ese liderazgo, en una empresa grande hay tres equipos con funciones bien distintas:

| Equipo | A qué se dedica |
|---|---|
| **Red Team** | Ataca (de forma autorizada) para encontrar vulnerabilidades antes que un atacante real. Pentesters / hackers éticos. |
| **GRC Team** | Gestiona políticas y cumplimiento normativo (ej. PCI DSS, normativa de pagos con tarjeta). |
| **Blue Team** | Defiende: monitorea, detecta y responde a ataques. Aquí viven los SOC analistas. |

> **Contexto extra (no está explícito en el módulo de THM):** GRC = Governance, Risk & Compliance. No es "seguridad técnica" en sí, pero define las reglas que Red y Blue Team deben respetar (ej. qué se puede probar, qué logs hay que guardar por ley).

---

## Blue Team: la seguridad defensiva

Su trabajo es monitorear constantemente y responder rápido cuando algo raro pasa. Dentro del Blue Team, el corazón operativo es el **SOC**.

### Security Operations Center (SOC)

Es el equipo que vigila la red buscando actividad sospechosa, estructurado en niveles para no saturar a los analistas más experimentados con alertas simples:

| Rol | Función |
|---|---|
| **Analyst L1** | Clasifica alertas (triage): decide si es ruido, falso positivo, o algo real que hay que escalar. |
| **Analyst L2** | Recibe los casos escalados por L1 e investiga ataques más complejos. |
| **Engineer** | Configura y mantiene las herramientas: **EDR** (Endpoint Detection and Response — detecta amenazas en equipos/endpoints) y **SIEM** (Security Information and Event Management — centraliza y correlaciona logs de toda la red). |
| **Manager** | Gestiona al equipo SOC completo. |

![[Pasted image 20260803020026.png]]

THM resume al SOC como **"primera línea de defensa"**, y en la práctica eso significa 6 funciones que el equipo cubre en conjunto (no una sola persona hace las 6):

- Opera normalmente 24/7 (por turnos).
- Crea reglas de detección.
- Investiga alertas de seguridad.
- Recolecta y monitorea logs.
- Coopera con el equipo de TI.
- Escribe reportes/resúmenes de lo investigado.

**Así lo vas a usar en un SOC real:** como L1, tu día a día es literalmente esa cola de alertas — el SIEM te las muestra, tú decides en segundos si es ruido o si amerita escalar a L2 con evidencia (logs, IOCs, contexto). La velocidad y el criterio para no escalar de más (ni de menos) es lo que te hace bueno en el puesto.

### Cuando el SOC no alcanza: CIRT (Cyber Incident Response Team)

Si un incidente se sale de control o supera la experiencia del SOC, se activa un CIRT. No es un reemplazo del SOC, es refuerzo especializado para incidentes grandes.

| CIRT | A qué se dedica |
|---|---|
| **JPCERT** | Primer equipo de respuesta a incidentes de Japón (a nivel país). |
| **Mandiant** | Empresa privada que responde a incidentes cibernéticos a nivel global. |
| **AWS CIRT** | Investiga incidentes de seguridad específicos de clientes de AWS. |

---

## Roles que dan soporte al Blue Team

Fuera de la estructura SOC/CIRT, hay especialistas que se enfocan en un área muy concreta:

| Rol | A qué se dedica |
|---|---|
| **Digital Forensics Analyst** | Encuentra evidencia de amenazas en discos y memoria (post-incidente, o en investigaciones). |
| **Threat Intelligence / Threat Analyst** | Investiga grupos de amenazas: quiénes son, cómo operan, qué IOCs dejan. |
| **AppSec Engineer** | Se asegura de que el software se desarrolle de forma segura desde el diseño (no solo al final). |
| **AI Researcher** | Estudia amenazas relacionadas con IA y cómo defenderse de ellas. |
| **DevSecOps** | Integra seguridad directamente en el pipeline de desarrollo/despliegue (CI/CD), no como paso aparte. |
| **GRC Auditor** | Verifica que las políticas de GRC realmente se cumplan (auditoría, no solo redacción de política). |
| **Penetration Tester** | Aparece aquí como rol "de soporte" al Blue Team, aunque formalmente es Red Team — su valor para el Blue Team está en que sus hallazgos retroalimentan qué detectar. |

![[Pasted image 20260803021336.png]]

> **Contexto extra:** que un Penetration Tester aparezca como "soporte al Blue Team" es la idea detrás del **purple teaming**: Red Team ataca, pero comparte cómo lo hizo para que el Blue Team mejore su detección. No es que el pentester cambie de equipo, es que ambos equipos colaboran.

---

## Camino para llegar a SOC Analyst L1

1. **Base técnica:** adquirir y practicar habilidades SOC básicas — esto además te sirve de base si luego migras a red team.
2. **Ser proactivo:** participar en CTFs, mantenerte al día con noticias de ciberseguridad.
3. **Preparación de entrevista:** entender bien la diferencia entre trabajar en un SOC interno o en un MSSP (ver tabla abajo) antes de postular.
4. **Progresión:** tras un tiempo en el puesto de entrada, buscar ascender a roles de más responsabilidad (L2, especializaciones, etc.).

### SOC interno vs MSSP

No toda empresa tiene el músculo para operar su propio SOC, así que muchas contratan un **MSSP** (Managed Security Service Provider / proveedor de servicios de seguridad gestionados).

| Tema | SOC Interno | MSSP |
|---|---|---|
| **Escenario típico** | Trabajas en el SOC de un banco, protegiendo solo los sistemas de ese banco. | Trabajas para un MSSP que protege a 60 clientes distintos en Europa. |
| **Ritmo de trabajo** | Turnos generalmente tranquilos, poca presión de tiempo. | El turno suele arrancar con una cola de alertas urgentes ya esperando. |
| **Herramientas** | Pocas herramientas, pero las conoces a fondo. | ~60 herramientas y plataformas distintas que manejar. |
| **Experiencia en incidentes** | Quizás 1-2 incidentes grandes vistos en un año. | Incidentes cada semana — la experiencia se acumula mucho más rápido. |

**Así lo vas a usar en la práctica:** si tu objetivo final es red team, un MSSP como primer trabajo te da exposición a muchos más ataques reales en menos tiempo, lo cual acelera el aprendizaje — a costa de más presión y contexto cambiante constantemente (cliente distinto = red distinta).

#### Los 4 consejos de THM para un analista SOC

![[Pasted image 20260803024818.png]]

| Consejo | Qué significa en la práctica |
|---|---|
| **Aprende de cada alerta** | No la cierres y ya — entiende *por qué* se disparó la regla. Eso afina tu criterio de detección con el tiempo. |
| **Piensa como atacante** | Antes de preguntarte "¿cómo lo hizo?", pregúntate "¿por qué un atacante haría esto?". El motivo te da contexto para triagear mejor. |
| **Verifica todo** | Nunca asumas. Valida la alerta y el comportamiento sospechoso directamente en los logs, no confíes solo en la descripción de la alerta. |
| **Involúcrate en incidentes reales** | Ningún lab enseña lo que enseña un ataque real — vale la pena quedarte hasta tarde por uno. |

---

## En una frase
El Blue Team defiende, el SOC es su núcleo operativo (L1 filtra, L2 investiga, Engineer mantiene las herramientas), el CIRT entra cuando el incidente se sale de control, roles como Red Team o GRC colaboran con el Blue Team sin ser parte de él, y elegir entre SOC interno o MSSP como primer trabajo define qué tan rápido acumulas experiencia real.

---

**Suelto para anotar aparte:** EDR, SIEM y el concepto de **purple teaming** (mencionado arriba como contexto extra) aparecen de pasada aquí pero son temas grandes por sí solos — vale la pena un apunte dedicado a cada uno cuando THM los cubra a fondo.
