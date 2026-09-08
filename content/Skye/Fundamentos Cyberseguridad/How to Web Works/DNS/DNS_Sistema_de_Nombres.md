# 🌐 DNS — Sistema de Nombres de Dominio

> 📋 Lista completa de TLDs: https://data.iana.org/TLD/tlds-alpha-by-domain.txt

---

## ¿Qué es DNS?

**DNS** = *Domain Name System* (Sistema de Nombres de Dominio)

Es básicamente la **agenda de contactos de Internet**. En lugar de recordar que TryHackMe vive en `104.26.10.229`, simplemente escribes `tryhackme.com` y DNS se encarga de traducirlo a la IP correcta.

> 📌 **Analogía:** Es como tener el número de teléfono de alguien guardado con su nombre. No recuerdas el número, pero sí el nombre. DNS hace exactamente eso con las IPs.

```
Tú escribes:  tryhackme.com
DNS traduce:  104.26.10.229
Tu navegador va directo a esa IP ✅
```

---

## Jerarquía de dominios

Los dominios están organizados en niveles, como un árbol. De derecha a izquierda:

```
        "."  ← Root Domain (raíz, invisible, siempre está)
       / | \ \
    .edu .com .gov .mil  ← TLD (Top-Level Domain)
      |    |    |    |
     MIT  THM Google NASA  ← Second-Level Domain
```

Ejemplo completo: `admin.tryhackme.com`

```
admin   .   tryhackme   .   com
  ↑              ↑            ↑
Subdominio   2nd Level     TLD
```

---

### 🔴 Root Domain (Dominio Raíz)
- Es el punto "." que existe al final de todo dominio (normalmente invisible)
- Es la cima de la jerarquía DNS
- Desde aquí parte toda la resolución de nombres

---

### 🔵 TLD — Top-Level Domain (Dominio de Nivel Superior)
Es la parte **más a la derecha** del dominio. Ej: `.com`, `.org`, `.edu`

Hay dos tipos:

| Tipo | Nombre | Para qué se usa | Ejemplos |
|------|--------|-----------------|---------|
| **gTLD** | Generic TLD | Indica el propósito del dominio | `.com` (comercial), `.org` (organización), `.edu` (educación), `.gov` (gobierno) |
| **ccTLD** | Country Code TLD | Indica el país | `.ca` (Canadá), `.co.uk` (Reino Unido), `.pe` (Perú) |

> 💡 Con el tiempo aparecieron muchos gTLD nuevos como `.online`, `.club`, `.website`, `.biz` y más de 2000 opciones.

---

### 🟢 Second-Level Domain (Dominio de Segundo Nivel)
Es la parte **a la izquierda del TLD**. En `tryhackme.com`, la parte `tryhackme` es el dominio de segundo nivel.

**Reglas al registrarlo:**
- Máximo **63 caracteres** + el TLD
- Solo puede usar letras, números del 0 al 9 y guiones
- ❌ No puede comenzar ni terminar con guión
- ❌ No puede tener guiones consecutivos

---

### 🟢 Subdominio
Es la parte **a la izquierda del dominio de segundo nivel**, separada por un punto.

Ejemplo: en `admin.tryhackme.com`, la parte `admin` es el subdominio.

- Mismas reglas de caracteres que el dominio de segundo nivel (máx. 63 caracteres)
- Puedes tener **múltiples subdominios**: `jupiter.servers.tryhackme.com`
- La longitud **total** del dominio no puede superar **253 caracteres**
- ✅ No hay límite en la cantidad de subdominios que puedes crear

---

## Tipos de registros DNS

> 💡 DNS no solo sirve para encontrar páginas web. Hay distintos tipos de registros para distintos propósitos. Aquí están los más importantes:

---

### 📌 Registro A (A Record)
- Traduce un dominio a una **dirección IPv4**
- IPv4 = el formato clásico de 4 números: `104.26.10.229`
- Ejemplo: `tryhackme.com` → `104.26.10.229`

```
¿Cuál es la IP de tryhackme.com?
→ Registro A → 104.26.10.229
```

---

### 📌 Registro AAAA (AAAA Rercord)
- Traduce un dominio a una **dirección IPv6**
- IPv6 = el formato nuevo y más largo: `2606:4700:20::681a:be5`
- Mismo concepto que el registro A, pero para IPs modernas de 128 bits

```
¿Cuál es la IPv6 de tryhackme.com?
→ Registro AAAA → 2606:4700:20::681a:be5
```

---

### 📌 Registro CNAME
- Traduce un dominio a **otro nombre de dominio** (no a una IP directamente)
- Se usa para crear **alias** — apuntar un subdominio a otro dominio

**Ejemplo real de THM:**
La tienda de TryHackMe tiene el subdominio `store.tryhackme.com`.
Este subdominio tiene un registro CNAME que apunta a `shops.shopify.com`.
Cuando alguien visita `store.tryhackme.com`, el DNS hace una segunda consulta a `shops.shopify.com` para obtener la IP real.

```
store.tryhackme.com
        ↓ CNAME
shops.shopify.com
        ↓ Registro A
[IP real del servidor]
```

> 📌 Piénsalo como un reenvío de llamadas: `store.tryhackme.com` te "reenvía" a `shops.shopify.com`, y desde ahí se obtiene la IP.

---

### 📌 Registro MX
- Traduce un dominio a la **dirección del servidor de correo** que gestiona los emails de ese dominio
- Se usa para saber a dónde enviar los correos de `@tryhackme.com`
- Incluye un **indicador de prioridad** — le dice al cliente en qué orden intentar conectarse a los servidores (útil si el servidor principal falla y hay un servidor de respaldo)

**Ejemplo:**
Un registro MX para `tryhackme.com` podría apuntar a `alt1.aspmx.l.google.com`

```
¿A dónde envío un email para @tryhackme.com?
→ Registro MX → alt1.aspmx.l.google.com (prioridad 1)
                alt2.aspmx.l.google.com (prioridad 2, respaldo)
```

---

### 📌 Registro TXT
- Son campos de **texto libre** — pueden almacenar cualquier dato textual
- Tienen múltiples usos, los más comunes son:

1. **Listar servidores autorizados para enviar correos** en nombre del dominio → ayuda a combatir el spam y correo falsificado (SPF records)
2. **Verificar la propiedad del dominio** al registrarse en servicios de terceros (ej: Google, Amazon)

**Ejemplos reales:**
```
_acme-challenge.example.com TXT "token_value_here"
@ TXT "v=spf1 ip4:192.0.2.0/24 include:_spf.google.com include:amazonses.com ~all"
_dmarc.example.com TXT "v=DMARC1; p=reject; rua=mailto:dmarc-reports@example.com"
@ TXT "MS=ms12345678"
```

---

## ¿Qué sucede cuando haces una solicitud DNS?

Este es el proceso completo que ocurre cada vez que escribes un dominio en tu navegador. Son **5 pasos**:

```
[Tu PC]
   │ 1. ¿Está en mi caché local?
   │    Sí → usa esa IP directamente ✅
   │    No → pregunta al Recursive DNS Server
   ▼
[Recursive DNS Server] (normalmente tu ISP)
   │ 2. ¿Está en mi caché?
   │    Sí → responde directamente ✅ (fin del proceso)
   │    No → pregunta al Root DNS Server
   ▼
[Root DNS Server]
   │ 3. "No sé la IP, pero sé quién gestiona .com"
   │    → redirige al servidor TLD correspondiente
   ▼
[TLD Server] (.com, .org, etc.)
   │ 4. "No sé la IP, pero sé dónde está el servidor
   │    autoritativo de tryhackme.com"
   │    → redirige al Authoritative DNS Server
   ▼
[Authoritative DNS Server]
   │ 5. "¡Yo sí sé la IP! Es 104.26.10.229"
   │    → responde con la IP + el TTL
   │    → el Recursive DNS guarda en caché
   └──────────────────────────────────────► [Tu PC] ✅
```

---

### Los 4 servidores explicados simple

| Servidor | ¿Quién es? | ¿Qué hace? |
|----------|-----------|------------|
| **Recursive DNS Server** | Normalmente tu ISP (o uno que eliges como Google 8.8.8.8) | Hace todo el trabajo de búsqueda por ti. Tiene su propio caché de búsquedas recientes |
| **Root DNS Server** | La columna vertebral de Internet | No sabe las IPs, pero sabe qué servidor TLD gestiona cada extensión (.com, .org, etc.) |
| **TLD Server** | Gestiona una extensión específica | Sabe qué servidor autoritativo tiene la info del dominio que buscas |
| **Authoritative DNS Server** | El servidor "oficial" del dominio | Es el dueño de los registros DNS del dominio. Tiene la IP real y definitiva |

> 📌 El servidor autoritativo también se llama **servidor de nombres del dominio**. Por ejemplo, el de `tryhackme.com` es `kip.ns.cloudflare.com` y `uma.ns.cloudflare.com`. Es frecuente tener varios para que si uno falla, el otro responda.

---

### ¿Qué es el TTL?

**TTL** = *Time To Live* (Tiempo de Vida)

Cuando el Authoritative DNS responde, incluye un valor TTL medido en **segundos**. Este número le dice a tu PC y al Recursive DNS **cuánto tiempo guardar esa respuesta en caché** antes de tener que volver a preguntar.

```
TTL = 3600 → guarda la respuesta 1 hora en caché
TTL = 86400 → guarda la respuesta 24 horas en caché
```

> 💡 El TTL es importante en ciberseguridad — un TTL bajo significa que los cambios en DNS se propagan rápido, útil cuando migas un servidor. Un TTL alto ahorra consultas pero tarda más en actualizarse.

---

## Resumen del proceso en una frase

> Tu PC pregunta → el Recursive busca → el Root apunta al TLD → el TLD apunta al Autoritativo → el Autoritativo da la IP → todos guardan en caché con el TTL → tú llegas al sitio web ✅

---



