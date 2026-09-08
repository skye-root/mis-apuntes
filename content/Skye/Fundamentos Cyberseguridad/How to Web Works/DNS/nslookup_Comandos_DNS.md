# 🔍 nslookup — Consultar registros DNS desde la terminal


## ¿Qué es nslookup?

`nslookup` es una herramienta de línea de comandos que te permite **consultar registros DNS manualmente** desde la terminal. Es de las primeras herramientas que se usan en reconocimiento (fase de recon en hacking).

> 📌 En lugar de que tu navegador haga la consulta DNS en silencio, con `nslookup` tú la haces a mano y ves exactamente qué responde el servidor.

---

## Sintaxis básica

```bash
nslookup --type=TIPO_REGISTRO dominio
```

- `--type=` → indica qué tipo de registro DNS quieres consultar
- Si no pones `--type`, por defecto busca el registro **A** (IPv4)

---

## Comandos por tipo de registro

### 🔎 Registro A — Obtener la dirección IPv4

```bash
nslookup --type=A website.thm
```

**Salida:**
```
Server:    127.0.0.53
Address:   127.0.0.53#53

Non-authoritative answer:
Name:    website.thm
Address: 10.10.10.10
```

> 💡 `Non-authoritative answer` significa que la respuesta viene del **caché** del Recursive DNS Server, no directamente del servidor autoritativo del dominio. Es lo más común.

---

### 🔎 Registro CNAME — Ver a qué dominio apunta un alias

```bash
nslookup --type=CNAME shop.website.thm
```

**Salida:**
```
Server:    127.0.0.53
Address:   127.0.0.53#53

Non-authoritative answer:
shop.website.thm    canonical name = shops.myshopify.com
```

> 💡 `canonical name` = el nombre "real" al que apunta el alias. Aquí `shop.website.thm` es solo un alias que redirige a `shops.myshopify.com`.

---

### 🔎 Registro MX — Ver los servidores de correo

```bash
nslookup --type=MX website.thm
```

**Salida:**
```
Server:    127.0.0.53
Address:   127.0.0.53#53

Non-authoritative answer:
website.thm    mail exchanger = 30 alt4.aspmx.l.google.com
```

> 💡 El número `30` es la **prioridad** — cuanto más bajo, más prioritario. Si hay varios servidores MX, el cliente intenta primero el de menor número.

---

### 🔎 Registro TXT — Ver texto libre del dominio

```bash
nslookup --type=TXT website.thm
```

**Salida:**
```
Server:    127.0.0.53
Address:   127.0.0.53#53

Non-authoritative answer:
website.thm    text = "THM{7012BBA60997F35A9516C2E16D2944FF}"
```

> 💡 Los registros TXT pueden contener tokens de verificación, configuraciones SPF, flags de CTF, o cualquier texto que el dueño del dominio haya configurado. Son muy útiles en reconocimiento.

---

## Resumen de comandos

| Registro | Comando | ¿Qué obtienes? |
|----------|---------|----------------|
| **A** | `nslookup --type=A dominio` | Dirección IPv4 |
| **AAAA** | `nslookup --type=AAAA dominio` | Dirección IPv6 |
| **CNAME** | `nslookup --type=CNAME dominio` | Nombre canónico (alias) |
| **MX** | `nslookup --type=MX dominio` | Servidor(es) de correo + prioridad |
| **TXT** | `nslookup --type=TXT dominio` | Texto libre (SPF, verificaciones, etc.) |

---

## Entender la salida de nslookup

```
Server:    127.0.0.53       ← DNS que respondió tu consulta (tu Recursive DNS local)
Address:   127.0.0.53#53    ← IP:Puerto del servidor DNS (#53 = puerto DNS estándar)

Non-authoritative answer:   ← Viene del caché, no del servidor oficial del dominio
[resultado aquí]
```

> ⚠️ Si ves **Authoritative answer** (sin el "Non-"), significa que la respuesta viene directamente del servidor oficial del dominio — más fresca y confiable.

---

## Dato importante para ciberseguridad

Durante el reconocimiento de un objetivo, `nslookup` te permite:
- Descubrir **subdominios** y a dónde apuntan
- Identificar qué **proveedor de correo** usa el objetivo (MX)
- Encontrar **tokens o configuraciones** expuestas en registros TXT
- Ver si usan servicios de terceros como Shopify, Google, Cloudflare, etc.

---

## Herramientas alternativas

| Herramienta | Comando ejemplo | Ventaja |
|------------|----------------|---------|
| `nslookup` | `nslookup --type=A dominio` | Simple, disponible en Windows y Linux |
| `dig` | `dig dominio A` | Más detallado, solo Linux/Mac |
| `host` | `host -t MX dominio` | Más limpio y conciso |

---

