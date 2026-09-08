

## 🧠 ¿Qué es Cloud Computing?

> En lugar de correr tu app en una sola computadora física, la nube te permite usar **recursos de cómputo a través de internet** — más accesible, más confiable y listo para crecer.

En vez de comprar y mantener servidores físicos propios, **alquilas** lo que necesitas, cuando lo necesitas, y solo pagas por lo que usas.

---

## 📅 Evolución hacia la Nube (Evolution to the Cloud)

![[Pasted image 20260524195454.png|428]]

| Era | Período | Características |
|---|---|---|
| 🖥️ **Physical Servers Era** | 1960s – Early 2000s | Servidores físicos en edificios de empresas. Un servidor = un trabajo. Caro y lento de escalar |
| ⚙️ **Virtualization** | 1999 – 2006 | Múltiples servidores virtuales en una sola máquina. Mejor uso del hardware, aprovisionamiento más rápido |
| 🔧 **Automation & Remote Management** | 2003 – 2006 | Servidores gestionados por internet. Automatización temprana. Infraestructura más rápida y flexible |
| ☁️ **Cloud Computing (AWS Launch)** | 2006 | Alquilar computadoras y almacenamiento virtuales bajo demanda. Sin hardware propio. Escalado elástico en minutos |
| 🚀 **Modern Cloud Era** | 2012 – Hoy | AWS, Azure, Google Cloud. Containers. Enfoque en apps, no en servidores. Plataformas a escala global |

> 💡 El cloud computing no apareció de la noche a la mañana — es el resultado de décadas de evolución buscando reducir costos y ser más eficientes.

---

## ✅ Beneficios y Características del Cloud

| Beneficio | Descripción |
|---|---|
| 📈 **Scalability** (Escalabilidad) | Escala hacia arriba o hacia abajo según las necesidades de tu app |
| ⚡ **On-demand self-service** | Crea o elimina servidores y almacenamiento al instante, sin esperar hardware |
| 💰 **Pay only for what you use** | Se cobra por uso, no costos fijos por adelantado |
| 🔐 **Security** (Seguridad) | Los proveedores protegen la infraestructura con fuertes medidas de seguridad |
| 🔁 **High availability** (Alta disponibilidad) | Las apps siguen corriendo aunque parte del sistema falle |
| 🌍 **Global access** (Acceso global) | Tu app puede ser accedida por usuarios en cualquier parte del mundo |

---

## 🏗️ Tipos de Cloud (Deployment Types)

Según **quién controla** la infraestructura:

| Tipo | Quién lo usa | Por qué |
|---|---|---|
| ☁️ **Public Cloud** (Nube pública) | Startups, sitios web, apps globales | Económico, fácil de escalar, sin gestión de infraestructura. Preferido para casi todos los casos |
| 🏦 **Private Cloud** (Nube privada) | Bancos, salud, gobierno | Mayor control, personalización y cumplimiento normativo para datos sensibles |
| 🔀 **Hybrid Cloud** (Nube híbrida) | E-commerce, empresas mixtas | Mantienen datos sensibles en privado pero escalan públicamente en alta demanda |

---

## 🛎️ Modelos de Servicio — IaaS vs PaaS vs SaaS

La gran pregunta: **¿Cuánto quieres gestionar tú vs cuánto gestiona el proveedor?**

![[Pasted image 20260524195507.png|558]]
<!-- 📌 Insertar imagen de la analogía del apartamento aquí -->

### La analogía del alojamiento:

| Modelo | Analogía | Tú gestionas | El proveedor gestiona |
|---|---|---|---|
| **IaaS** | 🏠 Apartamento vacío | OS, apps, datos, configuración | Solo el hardware físico |
| **PaaS** | 🛋️ Apartamento semimueblado | Solo tu aplicación y datos | Hardware + OS + infraestructura |
| **SaaS** | 🏨 Hotel | Nada (solo usas) | Todo — hardware, OS, app |

### En detalle:

**IaaS — Infrastructure as a Service (Infraestructura como Servicio)**
- Alquilas recursos básicos: servidores virtuales, almacenamiento, red
- Tú instalas y gestionas el OS y todo lo demás
- Máximo control, máxima responsabilidad
- *Ej: Amazon EC2, Google Compute Engine*

**PaaS — Platform as a Service (Plataforma como Servicio)**
- El proveedor gestiona la infraestructura y el OS
- Tú solo construyes, despliegas y corres tu aplicación
- Sin preocuparte por servidores
- *Ej: Google App Engine, Heroku, AWS Elastic Beanstalk*

**SaaS — Software as a Service (Software como Servicio)**
- Usas una aplicación completa a través del navegador o una app
- El proveedor gestiona absolutamente todo
- *Ej: Gmail, Zoom, Google Docs, Spotify, Netflix*

```
¿Cuánto controlas?

IaaS  ████████████░░░░  Tú controlas más
PaaS  ████████░░░░░░░░
SaaS  ████░░░░░░░░░░░░  El proveedor controla más

¿Cuánto te preocupas por infraestructura?

IaaS  ████████████░░░░  Más trabajo tuyo
PaaS  ████████░░░░░░░░
SaaS  ░░░░░░░░░░░░░░░░  Cero trabajo tuyo
```

---

## 🏢 Major Cloud Vendors (Proveedores Principales)

| Proveedor | Fortaleza principal |
|---|---|
| 🟠 **AWS** (Amazon Web Services) | Líder del mercado. Mayor infraestructura y alcance global. El más popular |
| 🔵 **Microsoft Azure** | Fuerte en entornos empresariales y nube híbrida |
| 🔴 **Google Cloud Platform (GCP)** | Destacado en análisis de datos, AI y machine learning |
| 🟡 **Alibaba Cloud** | Principal jugador en Asia |
| ⚫ **IBM Cloud** | Enfocado en nube híbrida y soluciones AI para empresas |
| 🔶 **Oracle Cloud** | Enfocado en aplicaciones empresariales y bases de datos |

> 📊 **AWS es el líder indiscutible** — más de un tercio del mercado cloud global. En ciberseguridad, conocer AWS es casi obligatorio.

---

## 🌍 Empresas Reales Usando el Cloud

| Empresa | Cómo usa el cloud |
|---|---|
| 🎬 **Netflix** | Corre en AWS — escala globalmente, se mantiene online en picos de demanda, streaming a millones simultáneamente |
| 🎵 **Spotify** | Maneja millones de canciones y usuarios, escala rápido al lanzar funciones nuevas |
| 📸 **Instagram** | Almacena cantidades masivas de fotos y videos y los entrega rápido a todo el mundo |
| 🛒 **Tiendas online** | Usan el cloud para manejar picos de tráfico (Black Friday) sin comprar infraestructura permanente |

> 💡 Estas empresas usan el cloud porque les permite **escalar fácilmente, reducir costos, mantenerse confiables y enfocarse en mejorar sus productos** en lugar de gestionar hardware.

---

### ✅ Conclusión del Módulo — Terminología Clave

#### Glosario rápido (Quick Glossary)

|Término|Definición|
|---|---|
|**Public Cloud** (Nube pública)|Servicios en la nube accesibles por internet, compartidos entre muchas personas y empresas|
|**Private Cloud** (Nube privada)|Nube creada solo para una empresa — mayor control y seguridad|
|**Hybrid Cloud** (Nube híbrida)|Combinación de nube pública y privada que trabajan juntas y comparten datos|
|**IaaS**|Alquilas piezas básicas de cómputo — servidores y almacenamiento desde la nube|
|**PaaS**|Entorno listo para crear y ejecutar aplicaciones sin gestionar servidores|
|**SaaS**|Software que usas online sin instalar nada — Gmail, Zoom, etc.|
|**EC2** (Elastic Compute Cloud)|Computadoras en la nube de Amazon que puedes crear, usar y redimensionar rápidamente según necesites|

#### Beneficios clave del Cloud Computing

- 📈 Escalabilidad
- ⚡ Autoservicio bajo demanda
- 💰 Paga solo por lo que usas
- 🔐 Seguridad
- 🔁 Alta disponibilidad
- 🌍 Acceso global

> **Siguiente módulo:** Introduction to Operating Systems — cómo el OS gestiona hardware, procesos, memoria y seguridad. Esencial para entender cómo los sistemas en la nube ejecutan aplicaciones detrás de escena.

---

> 💡 **Nota:** EC2 es el servicio más famoso de AWS — básicamente es IaaS en la práctica. Vas a ver EC2 constantemente en labs de cloud hacking.

---

## 🔐 Relevancia en Ciberseguridad

- **AWS, Azure y GCP** son los entornos donde corre la mayoría de infraestructura moderna que vas a atacar o defender.
- Configuraciones incorrectas en el cloud (**cloud misconfigurations**) son una de las causas más comunes de brechas de seguridad — buckets S3 públicos, permisos mal asignados, etc.
- Roles como **Cloud Security Engineer** y **Cloud Penetration Tester** son de los más demandados y mejor pagados en ciberseguridad hoy.

---

