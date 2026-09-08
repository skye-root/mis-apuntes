# The CIA Triad — Confidencialidad, Integridad y Disponibilidad

> [!abstract] ¿De qué va esto?
> La CIA Triad es el modelo fundamental de la ciberseguridad. Todo ataque que existe viola al menos uno de sus tres pilares. Todo control de seguridad que existe protege al menos uno. Antes de entender ataques y defensas, necesitas entender este modelo.

---

## ¿Qué es la CIA Triad?

Es un modelo de tres principios que define qué significa que un sistema sea "seguro". No tiene nada que ver con la agencia de inteligencia — CIA aquí son las iniciales de:

- **C**onfidentiality → Confidencialidad
- **I**ntegrity → Integridad
- **A**vailability → Disponibilidad

```
        Confidencialidad
              /\
             /  \
            /    \
           /  CIA \
          /  TRIAD \
         /____________\
   Integridad    Disponibilidad
```

Un sistema verdaderamente seguro debe cumplir los tres al mismo tiempo. Si falla uno solo, el sistema tiene una vulnerabilidad.

---

## C — Confidencialidad

> Solo las personas autorizadas pueden acceder a la información.

### ¿Qué protege?
Que los datos no sean leídos, vistos o robados por quien no debería tener acceso.

### Ejemplos cotidianos
- Tu contraseña de banco solo la conoces tú
- Un archivo de RRHH con salarios solo lo ven los gerentes autorizados
- Una conversación privada no puede ser interceptada por terceros

### Ejemplos en ciberseguridad
- **Cifrado (encryption)** → convierte datos en ilegibles para quien no tiene la clave
- **Control de acceso** → solo usuarios con permisos pueden ver ciertos archivos
- **VPN** → cifra el tráfico para que nadie en la red pueda leerlo

### Ataques que violan Confidencialidad
| Ataque | Cómo la viola |
|--------|---------------|
| Sniffing / interceptación de tráfico | Captura datos en tránsito que no deberías ver |
| Robo de credenciales | Accede a cuentas sin autorización |
| SQL Injection | Extrae datos de una base de datos sin permiso |
| Man-in-the-Middle (MitM) | Se pone entre dos partes y lee la comunicación |
| Data breach / fuga de datos | Exposición masiva de información privada |

> [!example] Caso real
> En 2013, Edward Snowden filtró documentos clasificados de la NSA. Desde la perspectiva de la NSA, fue una violación masiva de Confidencialidad — información que debía mantenerse secreta fue accedida y expuesta por alguien que tenía acceso legítimo pero no debería haber podido llevarse esos datos.

---

## I — Integridad

> La información solo puede ser modificada por personas autorizadas, y cualquier modificación no autorizada debe ser detectable.

### ¿Qué protege?
Que los datos sean exactos y confiables — que nadie los haya alterado sin permiso.

### Ejemplos cotidianos
- Un contrato firmado no puede ser modificado después
- Tu nota en la universidad no puede ser cambiada por alguien externo
- Un archivo descargado llega exactamente igual a como estaba en el servidor

### Ejemplos en ciberseguridad
- **Hashing** → genera una "huella digital" del archivo; si el archivo cambia un solo bit, el hash cambia completamente
- **Firmas digitales** → verifican que un mensaje viene de quien dice ser y no fue alterado
- **Logs de auditoría** → registran quién modificó qué y cuándo

### Ataques que violan Integridad
| Ataque | Cómo la viola |
|--------|---------------|
| Tampering | Modificar datos en tránsito o en reposo |
| SQL Injection | Alterar o borrar registros en una base de datos |
| Malware | Modifica archivos del sistema sin autorización |
| Man-in-the-Middle | Intercepta y altera mensajes antes de reenviarlos |
| Defacement | Modificar el contenido de una página web |

> [!example] Caso real
> En 2016, hackers modificaron registros de transferencias bancarias en el Banco Central de Bangladesh mediante el sistema SWIFT, cambiando los números de cuenta de destino. Lograron robar 81 millones de dólares. Violación pura de Integridad — datos financieros fueron alterados sin autorización.

> [!tip] Hashing en la práctica
> Cuando descargas un archivo de internet (una ISO de Kali Linux, por ejemplo), el sitio oficial publica su hash SHA-256. Después de descargar, calculas el hash del archivo que tienes. Si coincide → integridad confirmada. Si no coincide → el archivo fue modificado, ya sea por un atacante o por un error en la descarga.

---

## A — Disponibilidad

> Los sistemas y datos deben estar accesibles para los usuarios autorizados cuando los necesiten.

### ¿Qué protege?
Que el servicio funcione cuando se necesita. No sirve de nada que los datos sean confidenciales e íntegros si nadie puede acceder a ellos.

### Ejemplos cotidianos
- Tu app de banco debe funcionar cuando necesitas hacer una transferencia
- Un hospital necesita acceso a historiales médicos en todo momento
- Una tienda online caída = dinero perdido por cada minuto fuera de servicio

### Ejemplos en ciberseguridad
- **Backups** → si el sistema falla, los datos se pueden restaurar
- **Redundancia** → múltiples servidores para que si uno cae, otro tome el relevo
- **Rate limiting** → limita cuántas peticiones puede hacer un usuario para evitar sobrecarga

### Ataques que violan Disponibilidad
| Ataque | Cómo la viola |
|--------|---------------|
| DoS (Denial of Service) | Sobrecarga un servidor hasta que deja de responder |
| DDoS (Distributed DoS) | Lo mismo pero desde miles de máquinas simultáneamente |
| Ransomware | Cifra tus archivos y los hace inaccesibles hasta que pagues |
| Destrucción física | Dañar hardware crítico |
| Flood attacks | Inundar un sistema con tráfico basura |

> [!example] Caso real
> En 2016, el ataque DDoS a Dyn (un proveedor de DNS) dejó fuera de servicio a Twitter, Netflix, Reddit, Spotify y decenas de servicios más durante horas. No se robó ni modificó nada — simplemente se hizo inaccesible. Violación pura de Disponibilidad.

---

## Los tres pilares juntos — ejemplos de violaciones combinadas

Un ataque puede violar más de un pilar al mismo tiempo:

| Ataque | C | I | A |
|--------|---|---|---|
| Ransomware | ✅ cifra y roba datos | ✅ puede modificar archivos | ✅ hace archivos inaccesibles |
| SQL Injection | ✅ extrae datos privados | ✅ puede alterar registros | ✅ puede borrar la base de datos |
| Man-in-the-Middle | ✅ lee la comunicación | ✅ puede alterar mensajes | ❌ generalmente no |
| DDoS | ❌ no roba datos | ❌ no modifica nada | ✅ hace el servicio inaccesible |
| Defacement web | ❌ | ✅ modifica el contenido | ❌ |

---

## Tensiones entre los tres pilares

Aquí está algo que los cursos básicos no siempre mencionan: **los tres pilares pueden entrar en conflicto entre sí**, y los equipos de seguridad tienen que encontrar el balance.

> [!warning] Confidencialidad vs Disponibilidad
> Cuanto más restringes el acceso a algo (más confidencial), más difícil es para los usuarios legítimos accederlo (menos disponible). Un sistema con autenticación de 10 pasos es muy confidencial pero muy poco usable.

> [!warning] Seguridad vs Usabilidad
> Este es el equilibrio eterno en ciberseguridad. Más seguridad = más fricción para el usuario. El trabajo del profesional de seguridad es encontrar el punto justo — no el máximo de seguridad posible, sino el nivel adecuado al riesgo real.

---

## Extensiones del modelo — CIA + extras

Con el tiempo se han propuesto extensiones a la CIA Triad para cubrir casos modernos:

| Concepto adicional | Qué significa |
|-------------------|---------------|
| **No repudio** | Una persona no puede negar haber realizado una acción (ej: una firma digital prueba que firmaste tú) |
| **Autenticación** | Verificar que alguien es quien dice ser |
| **Autorización** | Verificar que alguien tiene permiso para hacer lo que intenta |
| **Privacidad** | Control sobre los propios datos personales (relacionado pero distinto a confidencialidad) |

Algunos llaman a esto el modelo **Parkerian Hexad** o simplemente CIA+.

---

## CIA Triad en el contexto del pentesting

> [!example] ¿Por qué me importa como pentester?
> Cuando haces un pentest, tu reporte debe clasificar cada hallazgo según qué pilar de la CIA viola:
>
> - Encontraste credenciales expuestas → **Confidencialidad**
> - Puedes modificar registros en la base de datos → **Integridad**
> - Puedes tirar el servidor → **Disponibilidad**
>
> Los clientes y los equipos de defensa (Blue Team) usan esta clasificación para priorizar qué arreglar primero. Una violación de Confidencialidad en datos de tarjetas de crédito es más urgente que una de Disponibilidad en un servidor de pruebas.

---

## Resumen visual

```
┌─────────────────────────────────────────────────────┐
│                    CIA TRIAD                        │
├──────────────────┬──────────────┬───────────────────┤
│ CONFIDENCIALIDAD │  INTEGRIDAD  │  DISPONIBILIDAD   │
├──────────────────┼──────────────┼───────────────────┤
│ Solo acceden     │ Solo         │ Accesible cuando  │
│ los autorizados  │ modifican    │ se necesita       │
│                  │ los          │                   │
│                  │ autorizados  │                   │
├──────────────────┼──────────────┼───────────────────┤
│ Cifrado          │ Hashing      │ Backups           │
│ Control acceso   │ Firmas digit.│ Redundancia       │
│ VPN              │ Logs         │ Rate limiting     │
├──────────────────┼──────────────┼───────────────────┤
│ Sniffing         │ Tampering    │ DoS / DDoS        │
│ MitM             │ SQL Inject.  │ Ransomware        │
│ Data breach      │ Defacement   │ Flood attacks     │
└──────────────────┴──────────────┴───────────────────┘
```

---

