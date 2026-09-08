---
tags:
  - thm
  - web-hacking
  - reconnaissance
  - content-discovery
  - osint
  - gobuster
aliases:
  - Content Discovery
  - Web Recon
---

# 🔍 Content Discovery — TryHackMe

> [!abstract] Resumen del módulo
> Content discovery es una de las fases más importantes del web application reconnaissance. Las técnicas de este módulo trabajan en conjunto: los checks manuales revelan quick wins, OSINT expone información que el target ya publicó voluntariamente, y las herramientas automatizadas cubren la amplitud que ningún enfoque individual puede lograr solo.

---

## 📋 Índice de Tasks

| Task | Título | Estado |
|------|--------|--------|
| Task 1 | Introduction | ✅ |
| Task 2 | Manual Discovery - Common Files | ✅ |
| Task 3 | Manual Discovery - Headers & Framework Stack | ✅ |
| Task 4 | OSINT - Search Engines & Web Tools | ✅ |
| Task 5 | OSINT - Repositories & Archives | ✅ |
| Task 6 | Automated Discovery - Gobuster Fundamentals | ✅ |
| Task 7 | Automated Discovery - Subdomains & Virtual Hosts | ✅ |
| Task 8 | Conclusion | ✅ |

---

## 📚 Task 1 — Introduction

El **content discovery** es el proceso de identificar recursos de una aplicación web que no están directamente enlazados ni visibles para el usuario común. Esto incluye:

- Archivos y directorios ocultos
- Paneles de administración
- Archivos de configuración y backup
- Endpoints de APIs no documentados
- Subdominios y virtual hosts

> [!important] ¿Por qué importa en pentesting?
> Los directorios y archivos que descubres en esta fase alimentan directamente las etapas posteriores del penetration test: privilege escalation, exploitation, exfiltración.

---

## 🖐️ Task 2 — Manual Discovery: Common Files

Archivos que **siempre debes verificar manualmente** al llegar a un target:

### `robots.txt`
- Indica a los crawlers de motores de búsqueda qué **no** deben indexar.
- Para un pentester, las entradas `Disallow` son exactamente los paths que se quieren explorar.

```
# Ejemplo típico
User-agent: *
Disallow: /admin/
Disallow: /backup/
Disallow: /config/
```

> [!tip] Navegación directa
> Visita siempre `http://target.com/robots.txt` — es el primer lugar donde buscar paths sensibles.

### `sitemap.xml`
- Mapa completo del sitio para motores de búsqueda.
- Puede revelar secciones que no están enlazadas desde la UI.
- Formato: `http://target.com/sitemap.xml`

### `favicon.ico`
- **Favicon fingerprinting**: frameworks populares (Flask, WordPress, Drupal) usan favicons por defecto.
- Herramienta: [OWASP Favicon Database](https://wiki.owasp.org/index.php/OWASP_favicon_database)
- Proceso: descargar el favicon → calcular su hash MD5 → buscar en la base de datos

```bash
# Obtener hash del favicon
curl https://target.com/favicon.ico | md5sum
```

---

## 🔤 Task 3 — Manual Discovery: Headers & Framework Stack

### HTTP Headers
Los response headers pueden filtrar información crítica:

| Header | Qué puede revelar |
|--------|-------------------|
| `Server` | Software del servidor (Apache 2.4.51, nginx/1.21) |
| `X-Powered-By` | Lenguaje o framework (PHP/7.4, ASP.NET) |
| `Set-Cookie` | Nombre del framework en la cookie (e.g., `PHPSESSID`) |
| `X-Generator` | CMS usado (WordPress, Drupal) |
| `X-Frame-Options` | Políticas de seguridad configuradas |

```bash
# Inspección rápida de headers
curl -I https://target.com
# O con más detalle
curl -v https://target.com 2>&1 | grep -i "< "
```

### Framework Stack Detection
Combinando headers + favicon + código fuente HTML se puede identificar el stack completo:

- Revisar comentarios en el HTML source (`Ctrl+U`)
- Buscar paths característicos de CMS (`/wp-content/`, `/wp-admin/`, `/administrator/`)
- Verificar archivos de firma del framework

---

## 🌐 Task 4 — OSINT: Search Engines & Web Tools

### Google Dorking
Uso de operadores avanzados para filtrar resultados específicos del target:

| Operador | Uso | Ejemplo |
|----------|-----|---------|
| `site:` | Limita resultados a un dominio | `site:target.com` |
| `inurl:` | Busca texto en la URL | `inurl:admin site:target.com` |
| `intitle:` | Busca texto en el title | `intitle:"index of" site:target.com` |
| `filetype:` | Filtra por extensión | `filetype:pdf site:target.com` |
| `ext:` | Igual que filetype | `ext:sql site:target.com` |
| `cache:` | Versión en caché de Google | `cache:target.com` |

> [!warning] Uso ético
> Google dorking solo se usa en targets para los cuales tienes autorización explícita.

### Wappalyzer
- Extensión de browser y herramienta web.
- Detecta automáticamente el technology stack: CMS, frameworks, librerías JS, analytics, servidores.
- URL: `https://www.wappalyzer.com`

---

## 📦 Task 5 — OSINT: Repositories & Archives

### Wayback Machine
- URL: `https://web.archive.org`
- Almacena snapshots históricos de páginas web.
- Útil para encontrar:
  - Archivos que fueron expuestos en el pasado y luego eliminados
  - Versiones antiguas de código fuente
  - Endpoints que ya no existen en la versión actual

> [!tip] Flujo de uso
> Busca el dominio → explora snapshots cronológicamente → descarga recursos interesantes

### GitHub / GitLab / Bitbucket
- Repositorios públicos pueden contener:
  - Credenciales hardcodeadas
  - API keys filtradas
  - Código fuente del target
  - Archivos de configuración con rutas internas

```bash
# Dorks para GitHub
# En la barra de búsqueda de GitHub:
"target.com" password
"target.com" secret
"target.com" api_key
filename:.env target.com
```

### Amazon S3 Buckets
- Formato de URL: `https://BUCKET-NAME.s3.amazonaws.com`
- Buckets mal configurados permiten listado público de archivos.
- Herramientas: `aws s3 ls s3://bucket-name --no-sign-request`

---

## 🤖 Task 6 — Automated Discovery: Gobuster Fundamentals

**Gobuster** es una herramienta de fuerza bruta para descubrimiento de directorios, archivos, DNS y virtual hosts.

### Instalación
```bash
sudo apt install gobuster
# O desde Go:
go install github.com/OJ/gobuster/v3@latest
```

### Modo `dir` — Directory/File Brute Force

```bash
# Sintaxis básica
gobuster dir -u http://target.com -w /wordlist.txt

# Con extensiones de archivo
gobuster dir -u http://target.com -w /wordlist.txt -x php,txt,html,bak

# Con más threads (cuidado con el rate limiting)
gobuster dir -u http://target.com -w /wordlist.txt -t 50

# Ignorar códigos de respuesta específicos
gobuster dir -u http://target.com -w /wordlist.txt -b 404,403

# Con cookies de sesión (para directorios autenticados)
gobuster dir -u http://target.com -w /wordlist.txt -c "session=abc123"

# Output a archivo
gobuster dir -u http://target.com -w /wordlist.txt -o resultados.txt
```

### Flags más usados

| Flag | Descripción |
|------|-------------|
| `-u` | URL del target |
| `-w` | Wordlist |
| `-x` | Extensiones a probar (php,html,txt) |
| `-t` | Número de threads (default: 10) |
| `-b` | Status codes a ignorar |
| `-c` | Cookie para requests autenticados |
| `-o` | Output file |
| `--timeout` | Timeout por request |
| `-k` | Ignorar errores de certificado TLS |
| `-a` | User-Agent personalizado |

### Wordlists recomendadas (SecLists)

```bash
# Ubicación en Kali/ParrotOS
/usr/share/seclists/Discovery/Web-Content/

# Las más útiles:
common.txt                    # Paths comunes, rápida
directory-list-2.3-medium.txt # Balanceada
directory-list-2.3-big.txt    # Exhaustiva
raft-large-words.txt          # Alternativa completa
```

---

## 🌍 Task 7 — Automated Discovery: Subdomains & Virtual Hosts

### Modo `dns` — Subdomain Enumeration

```bash
# Enumeración de subdominios via DNS
gobuster dns -d target.com -w /path/to/subdomains-wordlist.txt

# Con resolución de IPs
gobuster dns -d target.com -w subdomains.txt -i

# Wordlist recomendada
gobuster dns -d target.com -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt
```

### Modo `vhost` — Virtual Host Discovery

> [!info] Diferencia: DNS vs VHOST
> - **DNS mode**: realiza queries DNS reales para encontrar subdominios que existen en el DNS.
> - **VHOST mode**: prueba hosts via el header HTTP `Host:`, útil cuando múltiples sitios corren en la misma IP (virtual hosting).

```bash
# Virtual host bruteforce
gobuster vhost -u http://target.com -w /wordlist.txt

# Especificando dominio base
gobuster vhost -u http://10.10.10.10 -w /wordlist.txt --domain target.com

# Añadir al /etc/hosts cualquier vhost descubierto:
echo "10.10.10.10 dev.target.com" >> /etc/hosts
```

---

## ✅ Task 8 — Conclusion

### Resumen completo del módulo

| Método | Técnicas cubiertas |
|--------|-------------------|
| **Manual** | `robots.txt`, `sitemap.xml`, favicon fingerprinting, HTTP headers, framework stack |
| **OSINT** | Google dorking, Wappalyzer, Wayback Machine, GitHub, S3 buckets |
| **Automated** | Gobuster `dir`, `dns` y `vhost` modes |

### Workflow recomendado para content discovery

```
Target identificado
       │
       ▼
┌─────────────────┐
│  MANUAL CHECKS  │  → robots.txt, sitemap.xml, headers, favicon
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     OSINT       │  → Google dorks, Wappalyzer, Wayback, GitHub
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   AUTOMATED     │  → Gobuster dir + dns + vhost
└────────┬────────┘
         │
         ▼
  Resultados consolidados
  → alimentan etapas de explotación
```

> [!success] Conclusión clave
> Un buen workflow de content discovery ejecuta los **tres métodos** contra el target antes de moverse a explotación. Los directorios y archivos que encuentras aquí alimentan directamente las etapas posteriores del penetration test.

---

## 🔗 Referencias y recursos

- [[TryHackMe - Jr Penetration Tester Path]]
- [SecLists (wordlists)](https://github.com/danielmiessler/SecLists)
- [Gobuster GitHub](https://github.com/OJ/gobuster)
- [OWASP Favicon Database](https://wiki.owasp.org/index.php/OWASP_favicon_database)
- [Wayback Machine](https://web.archive.org)
- [Wappalyzer](https://www.wappalyzer.com)
- [[Gobuster Cheatsheet]]
- [[Google Dorking]]
