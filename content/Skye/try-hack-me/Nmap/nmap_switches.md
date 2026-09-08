# ⚙️ nmap — Tarea 3: Interruptores (Switches)

**Módulo:** Jr Penetration Tester — nmap  
**Plataforma:** TryHackMe  
**Estado:** 🔄 En progreso

---

## ¿Qué es un "switch" o interruptor?

Cuando ejecutas nmap desde la terminal, siempre puedes agregarle **flags** (también llamados switches o interruptores) que modifican cómo trabaja. Son esas letras que van después de un guion, como `-sS`, `-v`, `-p`, etc.

La estructura general de un comando nmap es:

```bash
nmap [switches] <IP objetivo>
```

Si alguna vez no recuerdas un switch, puedes consultarlos así:

```bash
nmap -h          # Menú de ayuda rápido
man nmap         # Manual completo (más detallado)
```

> [!tip] Hábito recomendado
> Siempre que no recuerdes una opción, usa `nmap -h | grep "lo que buscas"` para filtrar el resultado rápidamente. Por ejemplo: `nmap -h | grep "UDP"`.

---

## 1. Tipos de escaneo — ¿Cómo escanea nmap los puertos?

### `-sS` — SYN Scan (Syn Stealth Scan)

Este es el tipo de escaneo **más común y recomendado**. Se le llama "stealth(sigilo)" porque nunca completa la conexión TCP — solo envía el primer paquete del handshake y analiza la respuesta.

```
Tu máquina  ──── SYN ────►  Puerto objetivo
Tu máquina  ◄─── SYN/ACK ─  (si está abierto)
Tu máquina  ──── RST ────►  (corta la conexión antes de completarla)
```

**¿Por qué es útil?** Muchos sistemas solo loguean conexiones completas. Al no completar el handshake, el escaneo pasa más desapercibido. Además, es más rápido que otros métodos.

> [!warning] Requiere privilegios
> El SYN scan necesita permisos de administrador (`sudo`) porque manipula paquetes a bajo nivel. Sin sudo, nmap usará automáticamente el TCP Connect Scan en su lugar.

---

### `-sU` — UDP Scan

Escanea puertos **UDP** en lugar de TCP. La mayoría de servicios usan TCP, pero hay servicios importantes que usan UDP:

| Servicio | Puerto UDP |
|----------|-----------|
| DNS | 53 |
| DHCP | 67, 68 |
| SNMP | 161 |
| NTP | 123 |

```bash
sudo nmap -sU <IP>
```

> [!warning] Es lento
> El escaneo UDP es **mucho más lento** que el TCP porque UDP no tiene respuesta de confirmación — nmap tiene que esperar un tiempo antes de asumir que un puerto está abierto o filtrado. En pentesting real, a veces se combina con `--top-ports` para escanear solo los UDP más comunes y ahorrar tiempo.

```bash
sudo nmap -sU --top-ports 20 <IP>   # Solo los 20 puertos UDP más comunes
```

---

### `-sT` — TCP Connect Scan

Completa el handshake TCP completo. Es el escaneo que usa nmap cuando **no tienes privilegios de root**.

```
Tu máquina  ──── SYN ────►  Puerto
Tu máquina  ◄─── SYN/ACK ─  Puerto
Tu máquina  ──── ACK ────►  Puerto   (conexión completa)
Tu máquina  ──── RST ────►  Puerto   (luego la cierra)
```

Es más ruidoso y más fácil de detectar que `-sS`, pero funciona sin sudo.

---

### `-sN` / `-sF` / `-sX` — Escaneos "Stealth" avanzados

Estos envían paquetes TCP malformados para confundir al objetivo y detectar si un puerto está abierto:

| Switch | Nombre | Qué hace |
|--------|--------|----------|
| `-sN` | Null Scan | Envía un paquete sin ningún flag TCP |
| `-sF` | FIN Scan | Envía solo el flag FIN |
| `-sX` | Xmas Scan | Envía FIN + PSH + URG (como un árbol de navidad 🎄) |

> [!info] ¿Para qué sirven estos?
> Estos escaneos pueden evadir algunos firewalls y sistemas de detección de intrusos (IDS) que solo monitorean conexiones normales. Son útiles cuando `-sS` está siendo bloqueado.

---

## 2. Detección de OS y servicios

### `-O` — Detección de sistema operativo

nmap intenta adivinar qué sistema operativo está corriendo en el objetivo, analizando pequeñas diferencias en cómo responde a los paquetes.

```bash
sudo nmap -O <IP>
```

**Ejemplo de output:**
```
OS details: Linux 3.10 - 4.11
```

> [!warning] No es 100% exacto
> La detección de OS es una estimación. nmap puede equivocarse, especialmente si el objetivo tiene un firewall que modifica las respuestas. Tómalo como una pista, no como un dato definitivo.

---

### `-sV` — Detección de versión de servicios

Detecta **qué versión exacta** está corriendo en cada puerto abierto. Esto es crítico en pentesting porque las vulnerabilidades conocidas están ligadas a versiones específicas.

```bash
nmap -sV <IP>
```

**Ejemplo de output:**
```
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 7.4 (protocol 2.0)
80/tcp open  http    Apache httpd 2.4.18
```

Con esa info, puedes ir a ExploitDB y buscar: "Apache 2.4.18 exploit" — y quizás encuentres algo directamente explotable.

> [!tip] Combínalo siempre
> En la práctica, casi siempre usarás `-sV` junto con otras opciones:
> ```bash
> sudo nmap -sS -sV -O <IP>
> ```

---

## 3. Verbosidad — ¿Cuánta información muestra nmap?

Por defecto, nmap no muestra mucho mientras trabaja. Con los flags de verbosidad le dices que te cuente más cosas en tiempo real.

### `-v` — Verbose (nivel 1)

Muestra resultados parciales mientras escanea, en lugar de esperar al final.

```bash
nmap -v <IP>
```

### `-vv` — Verbose nivel 2 (el recomendado)

Muestra aún más detalle. THM lo recomienda **siempre** usarlo al menos en este nivel.

```bash
nmap -vv <IP>
```

> [!tip] Útil en escaneos largos
> Cuando escaneas muchos puertos o una red grande, puede parecer que nmap se "colgó". Con `-vv` puedes ver que sí está trabajando y ver resultados conforme llegan, sin esperar hasta el final.

---

## 4. Guardar resultados — Formatos de output

**Siempre debes guardar los resultados de tus escaneos.** Así no necesitas re-escanear (que genera ruido en la red), y tienes referencia para tus reportes.

### `-oA <nombre>` — Guardar en los 3 formatos principales

Guarda el resultado en los tres formatos a la vez, con el nombre base que indiques.

```bash
nmap -oA escaneo_inicial <IP>
# Crea: escaneo_inicial.nmap  |  escaneo_inicial.xml  |  escaneo_inicial.gnmap
```

### `-oN <archivo>` — Formato Normal (legible para humanos)

```bash
nmap -oN resultado.txt <IP>
```

Genera un archivo de texto tal como lo ves en la terminal. Ideal para leerlo directamente.

### `-oG <archivo>` — Formato Grepable

```bash
nmap -oG resultado_grep.txt <IP>
```

Genera un formato donde cada línea tiene toda la info del host, fácil de filtrar con `grep` o `awk`.

```bash
grep "open" resultado_grep.txt   # Ver solo puertos abiertos
```

### `-oX <archivo>` — Formato XML

```bash
nmap -oX resultado.xml <IP>
```

Útil para importar en otras herramientas como **Metasploit**, **Faraday** o procesarlo con scripts.

> [!tip] Recomendación profesional
> Usa `-oA` siempre. Genera los tres formatos de una sola vez y no cuesta nada extra. En un pentest real, vas a necesitar el `.xml` para Metasploit, el `.gnmap` para grep, y el `.nmap` para leer a mano.

---

## 5. Modo agresivo

### `-A` — Aggressive Scan

Activa todo a la vez: detección de OS, versiones de servicios, traceroute, y scripts comunes del NSE.

```bash
nmap -A <IP>
```

Es equivalente a combinar: `-O -sV --traceroute --script=default`

> [!danger] Muy ruidoso
> Este modo genera **mucho tráfico**. En un pentest real en entorno de producción, esto puede activar alertas de seguridad fácilmente. Úsalo en CTFs o laboratorios con libertad, pero en ambientes reales sé más cuidadoso.

---

## 6. Velocidad — Templates de temporización

nmap tiene 6 niveles de velocidad (del 0 al 5). La velocidad afecta cuánto tiempo espera nmap entre paquetes.

| Template | Nombre | Velocidad | Uso recomendado |
|----------|--------|-----------|-----------------|
| `-T0` | Paranoid | Extremadamente lento | Evasión máxima de IDS |
| `-T1` | Sneaky | Muy lento | Evasión de IDS |
| `-T2` | Polite | Lento | No saturar la red |
| `-T3` | Normal | Velocidad por defecto | Uso general |
| `-T4` | Aggressive | Rápido | Redes rápidas / CTFs |
| `-T5` | Insane | Muy rápido | Puede generar errores |

```bash
nmap -T4 <IP>   # Rápido, bueno para CTFs
nmap -T5 <IP>   # Tan rápido que puede perder resultados
```

> [!warning] Velocidad vs precisión
> A mayor velocidad, mayor probabilidad de que nmap pierda puertos o marque resultados incorrectos. En un entorno real con conexión lenta, `-T5` puede darte falsos negativos. Para CTFs de TryHackMe, `-T4` es el punto ideal.

---

## 7. Selección de puertos

Por defecto, nmap escanea los **1000 puertos más comunes**. Pero puedes controlarlo:

### `-p <puerto>` — Escanear un puerto específico

```bash
nmap -p 80 <IP>       # Solo el puerto 80
nmap -p 22,80,443 <IP>  # Puertos 22, 80 y 443
```

### `-p <rango>` — Escanear un rango de puertos

```bash
nmap -p 1000-1500 <IP>   # Puertos del 1000 al 1500
```

### `-p-` — Escanear TODOS los puertos (1-65535)

```bash
nmap -p- <IP>
```

> [!tip] Muy importante en CTFs
> En TryHackMe y otros CTFs, los servicios a veces están en puertos altos no estándar (como el 8080, 31337, etc.). Si solo escaneas los 1000 más comunes, te los puedes perder. Cuando un CTF parece que "no tiene nada", prueba `-p-` — suele revelar cosas.

```bash
sudo nmap -p- -T4 <IP>   # Todos los puertos, velocidad CTF
```

### `--top-ports <n>` — Los N puertos más comunes

```bash
nmap --top-ports 100 <IP>   # Solo los 100 más usados
```

---

## 8. Scripts NSE (Nmap Scripting Engine)

nmap tiene un motor de scripts que permite automatizar tareas avanzadas. Los scripts están organizados en categorías.

### `--script=<categoría o nombre>`

```bash
nmap --script=vuln <IP>         # Scripts de detección de vulnerabilidades
nmap --script=default <IP>      # Scripts básicos recomendados
nmap --script=auth <IP>         # Detección de autenticación débil
nmap --script=http-title <IP>   # Script específico: título de páginas web
```

**Categorías principales de scripts NSE:**

| Categoría | Qué hace |
|-----------|----------|
| `default` | Scripts seguros y útiles por defecto |
| `vuln` | Detecta vulnerabilidades conocidas |
| `auth` | Prueba credenciales débiles o vacías |
| `exploit` | Intenta explotar vulnerabilidades (¡cuidado!) |
| `discovery` | Recopila más info del objetivo |
| `safe` | Scripts que no dañan el objetivo |
| `brute` | Ataques de fuerza bruta a servicios |

> [!tip] Dónde están los scripts
> En Kali Linux, los scripts NSE están en `/usr/share/nmap/scripts/`. Puedes listarlos con:
> ```bash
> ls /usr/share/nmap/scripts/ | grep "vuln"
> ```

> [!info] Actualizar scripts
> Para actualizar la base de datos de scripts:
> ```bash
> sudo nmap --script-updatedb
> ```

---

## 9. Comando "todo en uno" recomendado para CTFs

Para la mayoría de los CTFs y labs, este comando te da mucha información de forma eficiente:

```bash
sudo nmap -sS -sV -O -vv -p- -T4 -oA escaneo_completo <IP>
```

Desglosado:
- `-sS` → SYN scan (rápido y semi-sigiloso)
- `-sV` → Versiones de servicios
- `-O` → Detectar sistema operativo
- `-vv` → Verbosidad nivel 2
- `-p-` → Todos los puertos
- `-T4` → Velocidad agresiva
- `-oA escaneo_completo` → Guardar en los 3 formatos

---

## Tabla resumen de switches

| Switch | Función |
|--------|---------|
| `-sS` | SYN Scan (stealth, requiere sudo) |
| `-sU` | UDP Scan |
| `-sT` | TCP Connect Scan (sin sudo) |
| `-sN` | Null Scan |
| `-sF` | FIN Scan |
| `-sX` | Xmas Scan |
| `-O` | Detectar sistema operativo |
| `-sV` | Detectar versión de servicios |
| `-v` | Verbose nivel 1 |
| `-vv` | Verbose nivel 2 (recomendado) |
| `-oA <nombre>` | Guardar en 3 formatos |
| `-oN <archivo>` | Guardar formato normal |
| `-oG <archivo>` | Guardar formato grepable |
| `-oX <archivo>` | Guardar formato XML |
| `-A` | Modo agresivo (todo activado) |
| `-T0` a `-T5` | Plantillas de velocidad |
| `-p <puerto>` | Puerto específico |
| `-p <x>-<y>` | Rango de puertos |
| `-p-` | Todos los puertos |
| `--top-ports <n>` | N puertos más comunes |
| `--script=<cat>` | Activar scripts NSE por categoría |

---

## Preguntas de la tarea — Pistas para responderlas tú mismo

> [!info] Antes de ver las respuestas, intenta deducirlas con la tabla de arriba 👆

| Pregunta | Pista |
|----------|-------|
| ¿Primer switch para Syn Scan? | Está en la sección de tipos de escaneo |
| ¿Switch para escaneo UDP? | Busca la sección UDP Scan |
| ¿Switch para detectar sistema operativo? | Sección "Detección de OS y servicios" |
| ¿Parámetro para detectar versión de servicios? | Misma sección anterior |
| ¿Cómo aumentar el nivel de detalle? | Sección "Verbosidad" |
| ¿Cómo configurar verbose nivel 2? | La opción recomendada de esa sección |
| ¿Guardar en 3 formatos a la vez? | Sección "Guardar resultados" |
| ¿Guardar en formato normal? | Misma sección |
| ¿Guardar en formato grepable? | Misma sección |
| ¿Activar modo agresivo? | Sección "Modo agresivo" |
| ¿Temporización nivel 5? | Sección "Velocidad" |
| ¿Escanear solo puerto 80? | Sección "Selección de puertos" |
| ¿Escanear puertos 1000-1500? | Misma sección |
| ¿Escanear TODOS los puertos? | Misma sección |
| ¿Activar scripts de categoría "vuln"? | Sección "Scripts NSE" |
