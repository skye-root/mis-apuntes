# Criptografía — Cifrado Simétrico, Asimétrico y Certificados

> [!abstract] ¿De qué va esto?
> Criptografía es la ciencia de proteger información convirtiéndola en algo ilegible para quien no tenga la clave. Es la base de HTTPS, VPNs, SSH y prácticamente toda comunicación segura en internet. Esta nota cubre desde lo más básico hasta entender exactamente qué pasa cuando tu navegador muestra el candadito.

---

## Conceptos base — Texto plano vs Texto cifrado

Antes de entrar a los tipos de cifrado, los términos fundamentales:

| Término                          | Definición                                  | Ejemplo                    |
| -------------------------------- | ------------------------------------------- | -------------------------- |
| **Texto plano** *(plaintext)*    | El mensaje original, legible                | `HELLO`                    |
| **Texto cifrado** *(ciphertext)* | El mensaje transformado, ilegible sin clave | `KHOOR`                    |
| **Cifrar** *(encrypt)*           | Convertir texto plano → cifrado             | `HELLO` → `KHOOR`          |
| **Descifrar** *(decrypt)*        | Convertir texto cifrado → plano             | `KHOOR` → `HELLO`          |
| **Algoritmo**                    | La receta/proceso de transformación         | Cifrado César, AES, RSA... |
| **Clave** *(key)*                | El valor secreto que controla el algoritmo  | El número `3` en César     |

> [!tip] Regla de oro del cifrado
> El algoritmo puede ser completamente público (y en sistemas modernos lo es). Lo que debe permanecer en secreto es **la clave**. La seguridad no depende de que nadie sepa cómo funciona el método — depende de que nadie tenga tu clave.

---

## El Cifrado César — para entender el concepto

El cifrado más simple que existe. Cada letra se desplaza un número fijo de posiciones en el alfabeto. Ese número es la clave.

Con clave = **3**:
```
A → D    B → E    C → F    ...    X → A    Y → B    Z → C
```

Cifrando `HELLO` con clave 3:
```
H → K
E → H
L → O
L → O
O → R

HELLO → KHOOR
```

Para descifrar, Bob recibe `KHOOR`, aplica el mismo proceso al revés (resta 3) y obtiene `HELLO`.

> [!warning] El Cifrado César NO es seguro
> Solo existen 25 claves posibles (del 1 al 25). Una computadora prueba las 25 en un milisegundo. Se usa aquí únicamente para ilustrar el concepto de **algoritmo + clave**. En sistemas reales se usa AES, que tiene más combinaciones posibles que átomos en el universo observable.

---

## Cifrado Simétrico — una sola clave para todo

El Cifrado César es un ejemplo de cifrado **simétrico**. La misma clave cifra y descifra.

```
Alice                              Bob
  │                                 │
  │  texto plano + clave → cifrado  │
  │─────────── KHOOR ──────────────▶│
  │                                 │  cifrado + clave → texto plano
```

### Características

| | Detalle |
|--|---------|
| **Claves** | Una sola — la misma para cifrar y descifrar |
| **Quién la tiene** | Tanto el emisor como el receptor |
| **Velocidad** | Muy rápido — procesa enormes cantidades de datos |
| **Uso principal** | Cifrar archivos, discos duros, tráfico de red en cantidad |
| **Ejemplo moderno** | AES (Advanced Encryption Standard) |
| **Analogía** | Una caja con candado — la misma llave abre y cierra |

### El problema fatal del cifrado simétrico

**¿Cómo comparten Alice y Bob la clave de forma segura si nunca se han visto?**

Si la envían por internet → un atacante puede interceptarla → juego terminado.
Si intentan cifrar la clave → necesitan otra clave para eso → y otra para esa → bucle infinito.

Esto se llama el **problema de la distribución de claves** y es el talón de Aquiles del cifrado simétrico cuando se usa solo.

---

## Cifrado Asimétrico — dos claves vinculadas

La solución elegante al problema anterior. En lugar de una clave compartida, cada persona tiene **un par de claves matemáticamente vinculadas**:

- **Clave pública** → puede compartirse con cualquiera, sin problema
- **Clave privada** → nunca sale de tu computadora, jamás se comparte

La magia está en cómo funcionan juntas:

> **Lo que cifras con la clave pública de alguien, solo su clave privada puede descifrarlo.**

Y en sentido inverso (para firmas digitales):

> **Lo que cifras con tu clave privada, cualquiera con tu clave pública puede verificarlo.**

### La analogía del buzón de correo

Esta es la mejor forma de entenderlo:

```
┌─────────────────────────────────────────┐
│              BUZÓN DE BOB               │
│                                         │
│   [  ranura abierta  ]  ← CLAVE PÚBLICA │
│   │ cualquiera puede │                  │
│   │  meter cartas    │                  │
│                                         │
│   [🔒 puerta cerrada] ← CLAVE PRIVADA  │
│   │  solo Bob tiene  │                  │
│   │  la llave para   │                  │
│   │  sacar las cartas│                  │
└─────────────────────────────────────────┘
```

- Cualquiera puede **meter** una carta (cifrar con clave pública de Bob)
- Solo Bob puede **sacar** las cartas (descifrar con su clave privada)
- Que alguien conozca la ranura (clave pública) no le sirve para sacar cartas

### El flujo cuando Alice quiere enviarle un secreto a Bob

```
1. Bob genera su par de claves:
   - clave pública  → la publica en su web, la comparte libremente
   - clave privada  → se queda en su computadora, nunca la mueve

2. Alice obtiene la clave pública de Bob (de su web, por email, etc.)
   → No hay secreto aquí, es pública por diseño

3. Alice cifra su mensaje con la clave PÚBLICA de Bob
   → Solo la clave PRIVADA de Bob puede descifrar esto

4. Alice envía el mensaje cifrado

5. Bob lo descifra con su clave PRIVADA
   → Aunque un atacante intercepte el mensaje cifrado, no puede hacer nada
      porque no tiene la clave privada de Bob
```

> [!success] El problema resuelto
> En ningún momento Alice y Bob necesitaron intercambiar un secreto. La clave pública viajó abiertamente por internet — y eso está bien porque es pública por diseño. Nadie necesita protegerla.

### Características

| | Detalle |
|--|---------|
| **Claves** | Dos — pública y privada, matemáticamente vinculadas |
| **Quién las tiene** | La pública: todos. La privada: solo su dueño |
| **Velocidad** | Más lento que simétrico |
| **Uso principal** | Intercambiar claves de forma segura, firmas digitales |
| **Ejemplo moderno** | RSA, ECC (Elliptic Curve Cryptography) |
| **Analogía** | Buzón de correo — cualquiera mete cartas, solo el dueño las saca |

---

## El enfoque híbrido — cómo funciona HTTPS realmente

Aquí está la parte que no estaba clara. Los sistemas reales no usan solo simétrico ni solo asimétrico — usan **ambos juntos**.

¿Por qué? Porque cada uno tiene una fortaleza que compensa la debilidad del otro:
- Asimétrico resuelve el problema de distribución de claves, pero es **lento**
- Simétrico es muy **rápido**, pero tiene el problema de distribución de claves

La solución: usar asimétrico para compartir una clave simétrica de forma segura, y luego usar esa clave simétrica para todo el tráfico real.

### Lo que pasa cuando visitas `https://google.com`

```
Tu navegador                              Servidor de Google
     │                                           │
     │── "Hola, quiero conectarme" ─────────────▶│
     │                                           │
     │◀── Certificado (contiene clave pública) ──│
     │                                           │
     │  [Verifica el certificado con la CA]      │
     │                                           │
     │  Genera una clave simétrica aleatoria     │
     │  La cifra con la clave PÚBLICA de Google  │
     │── [clave simétrica cifrada] ─────────────▶│
     │                                           │
     │         Google descifra con su            │
     │         clave PRIVADA → obtiene           │
     │         la clave simétrica                │
     │                                           │
     │◀══════ A partir de aquí: cifrado ════════▶│
     │         SIMÉTRICO con esa clave           │
     │         para todo el tráfico              │
```

Paso a paso en lenguaje claro:

1. Tu navegador le pide la clave pública al servidor
2. El servidor responde con su **certificado** (que contiene la clave pública)
3. Tu navegador verifica que el certificado sea legítimo (más sobre esto abajo)
4. Tu navegador genera una clave simétrica aleatoria y la cifra con la clave pública del servidor
5. Solo el servidor puede descifrarla (con su clave privada)
6. Ahora ambos tienen la misma clave simétrica — **sin haberla enviado en texto plano**
7. A partir de ese momento, toda la comunicación usa cifrado simétrico (rápido)

> [!info] Esto es el "TLS Handshake" (apretón de manos TLS)
> Lo viste en la nota de Wireshark — cuando analizaste tráfico HTTPS aparecía el handshake. Ahora sabes exactamente qué estaba pasando en esos paquetes.

---

## Certificados digitales — ¿cómo sé que la clave pública es de verdad de Google?

Aquí está el problema que queda pendiente con el cifrado asimétrico:

**¿Qué impide que un atacante cree sus propias claves pública/privada, se haga pasar por Google y te envíe su clave pública en lugar de la de Google?**

Si no hay forma de verificar a quién pertenece una clave pública, un atacante podría hacer un ataque Man-in-the-Middle perfectamente.

La solución son los **certificados digitales**.

### ¿Qué es un certificado digital?

Un certificado es un documento digital que contiene:
- La **clave pública** del servidor
- El **dominio** al que pertenece (ej: `google.com`)
- Las **fechas de validez** (desde cuándo hasta cuándo es válido)
- La **firma digital** de una Autoridad de Certificación (CA)

La CA es una entidad de confianza (como DigiCert, Let's Encrypt, Sectigo) que dice: *"yo verifico que esta clave pública pertenece realmente a google.com"*.

### ¿Cómo sabe tu navegador en qué CAs confiar?

Tu sistema operativo y navegador vienen con una lista preinstalada de CAs de confianza. Son decenas de organizaciones verificadas.

Cuando un servidor te envía su certificado, tu navegador automáticamente:

```
1. ¿La CA que firmó este certificado está en mi lista de confianza?
        No → ⚠️ Advertencia de seguridad
        Sí → continúa

2. ¿El certificado no ha expirado?
        No → ⚠️ Certificado caducado
        Sí → continúa

3. ¿El dominio del certificado coincide con el sitio que visito?
        No → ⚠️ El certificado no corresponde a este dominio
        Sí → continúa

4. ✅ Todo OK → muestra el candadito 🔒
```

> [!example] Cómo ver un certificado real
> 1. Ve a `https://www.tryhackme.com`
> 2. Haz clic en el candado 🔒 en la barra de direcciones
> 3. Busca "Certificado" o "Ver certificado"
> 4. Verás: **Emitido a** (el dominio), **Emitido por** (la CA que lo firmó), **Válido desde/hasta**

> [!warning] Cuando el navegador da advertencia de certificado
> Significa que algo de la verificación anterior falló. Puede ser:
> - Certificado expirado (el dueño olvidó renovarlo)
> - CA no reconocida (certificado autofirmado, común en redes internas)
> - Dominio no coincide (posible ataque MitM o mala configuración)
>
> En un pentest, un certificado inválido es información útil — puede indicar configuración deficiente o redes internas mal aseguradas.

---

## Simétrico vs Asimétrico — tabla comparativa completa

| Característica | Cifrado Simétrico | Cifrado Asimétrico |
|----------------|-------------------|-------------------|
| Número de claves | Una sola | Par: pública + privada |
| Compartir claves | Ambos necesitan la misma clave secreta | La pública se comparte libremente |
| Velocidad | ✅ Muy rápido | ❌ Más lento |
| Cantidad de datos | ✅ Grandes volúmenes | ❌ Pequeñas cantidades |
| Problema | Distribución de claves | Velocidad |
| Uso principal | Cifrar tráfico y archivos | Intercambiar claves, firmas digitales |
| Ejemplos modernos | AES-256, ChaCha20 | RSA-2048, ECC |
| Analogía | Llave que abre y cierra la misma caja | Buzón: ranura abierta, puerta con llave |

---

## Relevancia en pentesting

> [!example] ¿Por qué me importa como pentester?
> - **SSL stripping**: ataque que degrada HTTPS a HTTP para interceptar tráfico que debería estar cifrado
> - **Certificados inválidos o expirados**: señal de mala configuración en un objetivo
> - **Weak cipher suites**: servidores que aceptan algoritmos de cifrado débiles u obsoletos — herramientas como `sslscan` o `testssl.sh` los detectan
> - **Self-signed certificates en redes internas**: común en laboratorios y entornos corporativos internos — tu navegador avisa pero el tráfico sigue cifrado
> - **HTTPS no garantiza que el sitio sea legítimo**: un sitio de phishing puede tener HTTPS válido con su propio certificado. El candado solo significa que la conexión está cifrada — no que el sitio sea de confianza

---

## Resumen rápido

```
Texto plano + algoritmo + clave → Texto cifrado
Texto cifrado + algoritmo + clave → Texto plano

SIMÉTRICO:  misma clave para cifrar y descifrar
            → rápido, pero ¿cómo compartes la clave?

ASIMÉTRICO: clave pública cifra, clave privada descifra
            → resuelve la distribución, pero es lento

HÍBRIDO (HTTPS, VPN):
  1. Asimétrico para intercambiar una clave simétrica de forma segura
  2. Simétrico para todo el tráfico real (rápido)

CERTIFICADOS: documento firmado por una CA que vincula
              una clave pública a un dominio verificado
              → el navegador verifica antes de confiar
```

---

## Relación con notas anteriores
> [!link] Ver también
> [[The CIA Triad]] — El cifrado es el mecanismo principal para garantizar Confidencialidad
> [[TryHackMe - Wireshark]] — Donde viste el TLS handshake en paquetes reales

---

