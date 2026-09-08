---
tags: [pentesting, jr-pentester,reconocimiento, osint, dns]
curso: "Jr Penetration Tester"
room: "Passive Reconnaissance"

---

# 🕵️ Reconocimiento Pasivo

> [!note] Idea central de esta sala
> Todo lo que se ve acá se hace **sin tocar directamente al objetivo**. Las consultas van a terceros (registradores, resolvers públicos, bases de datos de certificados), nunca al servidor de la víctima. Por eso es la fase más sigilosa: **no genera alertas ni logs en el objetivo**.

---

## 1️⃣ WHOIS

- Protocolo de consulta/respuesta ([[RFC 3912]]), corre en **TCP/43**.
- Lo mantiene el **registrador** del dominio (Namecheap, GoDaddy, etc.).

**Qué puede revelar (si no está redactado):**

| Campo | Info |
|---|---|
| Registrar | Empresa que registró el dominio |
| Contacto | Nombre, org, email (casi siempre oculto por GDPR desde 2018) |
| Fechas | Creación, última actualización, expiración |
| Name servers | DNS autoritativos del dominio |
| Status codes | Ej. `clientTransferProhibited` = bloqueado contra transferencias |
| Abuse contacts | Email/tel del registrador para reportes |

> [!tip] Qué se saca en la práctica hoy
> Como la privacidad ya oculta casi todo el contacto personal, lo útil ahora es: **fechas** (estimar antigüedad, ventanas de phishing por renovación), **registrador** (patrones de phishing), **name servers** (posibles objetivos nuevos) y **cambios históricos** (vía `whoxy.com`).

```bash
whois tryhackme.com
```

### ⚠️ WHOIS está siendo reemplazado por RDAP

- Desde el **28 de enero de 2025**, ICANN retiró oficialmente WHOIS tradicional para dominios genéricos (gTLDs) a favor de **RDAP** (Registration Data Access Protocol).
- RDAP = mismo propósito, pero moderno: usa **HTTPS**, devuelve **JSON estructurado**, mejor control de privacidad.

```bash
curl -s https://rdap.verisign.com/com/v1/domain/tryhackme.com | jq .
```

**Qué mirar en la respuesta RDAP:**
- Cadena de redirección (Verisign → servidor del registrador)
- Fechas (antigüedad, ventanas de phishing)
- Name servers (posibles objetivos si están en scope)
- Status (`clientTransferProhibited` = más difícil de secuestrar)

**Alternativas online si `whois`/RDAP fallan:**
- https://whois.icann.org/ (WHOIS legado)
- https://lookup.icann.org/ (RDAP moderno)
- https://www.whoxy.com/ (snapshots históricos, gratis con límites)

---

## 2️⃣ nslookup y dig

Mismo objetivo: consultar registros **DNS**, pero contra resolvers públicos/abiertos, no contra el servidor del objetivo → sigue siendo 100% pasivo.

**Tipos de registro DNS comunes:**

| Tipo | Qué devuelve |
|---|---|
| A | IP(s) IPv4 del dominio |
| AAAA | IP(s) IPv6 del dominio |
| CNAME | Alias que apunta a otro dominio |
| MX | Servidores de correo (con prioridad: número más bajo = más prioridad) |
| SOA | Servidor primario, admin, número de serie de zona |
| TXT | Texto libre, usado para SPF, DKIM, DMARC, verificaciones |

### nslookup (el más antiguo)

```bash
nslookup -type=A tryhackme.com 1.1.1.1
nslookup -type=MX tryhackme.com
```

### dig (la herramienta moderna y preferida)

`dig` = "Domain Information Groper". Salida más limpia, muestra TTL por defecto, mejor para scripting.

```bash
dig @1.1.1.1 tryhackme.com MX
dig tryhackme.com A
dig tryhackme.com TXT
```

> [!tip] Privacidad
> Usar resolvers públicos como `1.1.1.1` (soporta DNS over HTTPS/TLS) evita que tu ISP registre tus consultas.

> [!info] Nota de Blue Team (para mi meta SOC)
> Un defensor debería monitorear cambios inesperados de DNS (nuevos MX, TXT raros) — pueden ser señales de **subdomain takeover** o mala configuración.

---

## 3️⃣ Enumeración de subdominios

Las búsquedas DNS normales (`dig`/`nslookup`) **solo resuelven nombres que ya conoces**. No van a mostrar subdominios no anunciados como `blog.`, `app.`, `dev.internal.`, etc.

Los subdominios importan porque suelen exponer:
- Servicios olvidados (CMS viejos, paneles de desarrollo)
- TI en la sombra (shadow IT)
- Superficie de ataque extra (APIs, paneles admin)

### DNSDumpster

- Herramienta gratuita que agrega datos DNS públicos: cachés de buscadores, bases de transferencia de zona, registros de certificados.
- **No hace fuerza bruta** → sigue siendo completamente pasivo.
- Devuelve subdominios, IPs con geolocalización, registros MX/TXT/CNAME, y un **mapa visual** de relaciones.

### crt.sh — Certificate Transparency (CT) logs

- El método **más efectivo** hoy en día para descubrir subdominios pasivamente.
- Desde ~2015 es obligatorio que toda Autoridad Certificadora registre públicamente cada certificado SSL/TLS emitido en los **logs de Transparencia de Certificados**.
- Cada certificado tiene un campo **SAN (Subject Alternative Name)** que lista todos los dominios/subdominios que cubre.
- Consultarlos no envía ninguna petición al objetivo.

```
https://crt.sh/?q=%.tryhackme.com
```
El `%` es comodín — matchea cualquier subdominio. Suele revelar **10 a 100 veces más subdominios** que DNSDumpster solo.

**Otras opciones pasivas:** SecurityTrails (búsquedas gratis limitadas), Subfinder (CLI, agrega varias fuentes pasivas).

> [!info] Nota de Blue Team
> Las organizaciones monitorean sus propios logs de CT para detectar certificados no autorizados (riesgo de subdomain takeover) y dominios/subdominios no reconocidos.

---

## 📋 Referencia rápida de comandos

| Objetivo | Comando |
|---|---|
| WHOIS de un dominio | `whois tryhackme.com` |
| RDAP moderno | `curl -s https://rdap.verisign.com/com/v1/domain/tryhackme.com \| jq .` |
| DNS A (legado) | `nslookup -type=A tryhackme.com` |
| DNS MX en servidor específico (legado) | `nslookup -type=MX tryhackme.com 1.1.1.1` |
| DNS A (recomendado) | `dig tryhackme.com A` |
| DNS MX en servidor específico (recomendado) | `dig @1.1.1.1 tryhackme.com MX` |
| DNS TXT (recomendado) | `dig tryhackme.com TXT` |
| Subdominios (navegador) | `https://crt.sh/?q=%.tryhackme.com` |

---

## ✅ Checklist de recon pasivo para un objetivo nuevo

- [ ] `whois DOMINIO` → registrador, fechas, name servers, status
- [ ] `dig DOMINIO A` / `dig DOMINIO MX` / `dig DOMINIO TXT`
- [ ] DNSDumpster → subdominios + mapa visual
- [ ] crt.sh → `%.DOMINIO` para subdominios vía certificados
- [ ] Shodan.io → servicios expuestos, banners, puertos

> [!warning] Recordatorio ético
> Aunque el recon pasivo no toca al objetivo directamente, siempre debe estar dentro del alcance autorizado del engagement.

---


## 📌 Resumen ultra-rápido
- **WHOIS/RDAP** → info del registro del dominio (RDAP es el reemplazo moderno desde ene 2025)
- **dig/nslookup** → registros DNS (usa `dig`, es el estándar actual)
- **DNSDumpster** → agrega datos DNS + mapa visual, sin fuerza bruta
- **crt.sh** → mejor fuente para descubrir subdominios, vía certificados SSL/TLS públicos
