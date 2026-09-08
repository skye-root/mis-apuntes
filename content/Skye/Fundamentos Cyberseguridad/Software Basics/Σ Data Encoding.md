____

# ASCII — Codificación de Caracteres

> [!abstract] ¿De qué va esto?
> Las computadoras solo entienden ceros y unos. ASCII es el "diccionario" que decidió qué secuencia de bits representa cada letra, número o símbolo — para que todos los sistemas se entiendan entre sí.

---

## ¿Por qué necesitamos ASCII?

Imagina que quieres guardar la palabra `TryHackMe` en un archivo. La computadora no puede guardar letras directamente — solo bits (`0` y `1`). Entonces alguien tuvo que definir las reglas:

- La letra `T` → se guarda como `01010100`
- La letra `r` → se guarda como `01110010`
- La letra `y` → se guarda como `01111001`
- ... y así con cada carácter

Sin un estándar común, cada fabricante de computadoras haría sus propias reglas y los sistemas no podrían comunicarse. ASCII fue uno de los primeros acuerdos universales.

---

## ¿Qué es ASCII?

- **Nombre completo:** American Standard Code for Information Interchange *(Código Estándar Estadounidense para el Intercambio de Información)*
- **Año:** 1963
- **Rango:** del 0 al 127 (128 caracteres en total)
- **Tamaño:** usa **7 bits** por carácter
- **Cubre:** letras en inglés (mayúsculas y minúsculas), dígitos del 0-9, signos de puntuación y algunos caracteres de control

> [!note] La "A" de ASCII significa *American*
> ASCII fue diseñado pensando solo en el alfabeto inglés. Eso se convirtió en un problema cuando otros idiomas necesitaron sus propios caracteres (como la ñ, la ü, la ç...). Lo veremos más adelante.

---

## La tabla ASCII (selección)

Cada carácter tiene tres representaciones: **decimal**, **hexadecimal** y **binario**. En la práctica se usa más el hexadecimal.

| Decimal | Hexadecimal | Binario    | Símbolo | Descripción         |
|---------|-------------|------------|---------|---------------------|
| 48      | 30          | 00110000   | `0`     | Dígito cero         |
| 57      | 39          | 00111001   | `9`     | Dígito nueve        |
| 65      | 41          | 01000001   | `A`     | A mayúscula         |
| 88      | 58          | 01011000   | `X`     | X mayúscula         |
| 89      | 59          | 01011001   | `Y`     | Y mayúscula         |
| 90      | 5A          | 01011010   | `Z`     | Z mayúscula         |
| 91      | 5B          | 01011011   | `[`     | Corchete apertura   |
| 92      | 5C          | 01011100   | `\`     | Barra invertida     |
| 93      | 5D          | 01011101   | `]`     | Corchete cierre     |
| 94      | 5E          | 01011110   | `^`     | Caret / circunflejo |
| 95      | 5F          | 01011111   | `_`     | Subrayar            |
| 96      | 60          | 01100000   | `` ` `` | Acento grave        |
| 97      | 61          | 01100001   | `a`     | a minúscula         |
| 98      | 62          | 01100010   | `b`     | b minúscula         |
| 99      | 63          | 01100011   | `c`     | c minúscula         |
| 122     | 7A          | 01111010   | `z`     | z minúscula         |
| 127     | 7F          | 01111111   | DEL     | Borrar              |

> [!tip] Truco para navegar la tabla
> Las letras están **en orden**. Si sabes que `a` es `61` en hex, entonces `b` es `62`, `c` es `63`... lo mismo aplica para mayúsculas (desde `A = 41`) y dígitos (desde `0 = 30`). No hay que memorizar todo — solo los puntos de partida.

---

## Ejemplo real: `TryHackMe` en binario

Si abres un editor de texto, escribes `TryHackMe` y guardas el archivo, a nivel de bits el archivo contiene exactamente esto:

```
01010100 01110010 01111001 01001000 01100001 01100011 01101011 01001101 01100101 00001010
```

Ese `00001010` al final es el **salto de línea** (`\n`) — se agrega automáticamente cuando presionas Enter.

Cuando tu editor abre el archivo, lee esos bits y los convierte de vuelta a los caracteres `T r y H a c k M e \n`.

### Las tres formas de ver lo mismo

| Representación | Valores |
|----------------|---------|
| **Binario**    | `01010100 01110010 01111001 01001000 01100001 01100011 01101011 01001101 01100101 00001010` |
| **Hexadecimal**| `54 72 79 48 61 63 6b 4d 65 0a` |
| **Decimal**    | `84 114 121 72 97 99 107 77 101 10` |

> [!info] ¿Por qué usamos hex y no decimal?
> El binario es difícil de leer. El decimal no se mapea limpiamente a los bits (un número decimal puede necesitar distinta cantidad de bits). El hex agrupa exactamente **4 bits por dígito**, así que es compacto y preciso. Por eso en seguridad y programación de bajo nivel siempre verás hex.

---

## ASCII y el pentesting

> [!example] ¿Por qué me importa como pentester?
> - Al analizar tráfico de red en Wireshark, los datos crudos aparecen en hex — saber leer ASCII te permite ver contraseñas, tokens o texto plano "oculto" en los paquetes.
> - En CTFs, a menudo te dan una cadena de números o hex y tienes que decodificarla a texto.
> - Herramientas como `xxd`, `hexdump` o CyberChef convierten entre estas representaciones en segundos.

---

## Más allá del inglés: ISO-8859

ASCII cubre perfectamente el inglés, pero no tiene `ñ`, `ü`, `ç`, `ő`, `ș`... Para solucionar esto, se creó la serie **ISO/IEC 8859** — una familia de estándares que añade 128 caracteres extra (usando el 8° bit que ASCII dejaba libre).

| Norma          | Idiomas que cubre |
|----------------|-------------------|
| **ISO-8859-1** *(Latin-1)* | Europa occidental: alemán (ß, ü), francés (é, ç), **español (ñ, ¿)**, italiano, portugués, catalán, nórdicos (ð/Ð) |
| **ISO-8859-2** *(Latin-2)* | Europa Central y Oriental: polaco (ł, ń), checo (č, ř), húngaro (ő, ű), croata (đ), rumano (ș, ț), eslovaco |

> [!warning] El problema de las codificaciones incompatibles
> Si guardas un documento con ISO-8859-1 y lo abres con ISO-8859-2, todos los caracteres que no sean inglés se verán como símbolos raros o basura. Esto es porque los mismos números representan caracteres distintos en cada norma.
>
> Por eso hoy en día casi todo usa **UTF-8**, que es compatible con ASCII y puede representar *todos* los idiomas del mundo en un solo estándar. Pero ISO-8859 sigue apareciendo en sistemas legados.

---

## Resumen rápido

```
Bits → ASCII → Caracteres que podemos leer
```

- ASCII: 128 caracteres, 7 bits, solo inglés
- Cada carácter tiene su código en decimal, hex y binario
- En la práctica se usa hex porque es compacto
- Para otros idiomas → ISO-8859-1 (occidental) o ISO-8859-2 (central/oriental)
- Hoy el estándar global es UTF-8, pero ASCII es la base de todo

---

#thm #pre-security #encoding #fundamentos #ascii

-----

# Unicode — Codificación Universal

> [!abstract] ¿De qué va esto?
> ASCII funcionaba bien para el inglés, pero el mundo habla muchos idiomas. Unicode es el estándar que resolvió eso de una vez por todas: un código único para cada carácter de todos los idiomas del mundo — en un solo sistema.

---

## El problema que Unicode vino a resolver

ASCII usaba 7 bits → 128 caracteres. Solo alcanzaba para el inglés básico. Para parchar esto, se crearon extensiones de 8 bits como ISO-8859-1, ISO-8859-2, Windows-1252, entre muchas otras.

El problema: **cada extensión usaba los mismos números para representar caracteres distintos.**

> [!warning] El caos de las codificaciones incompatibles
> Si alguien guarda un archivo con ISO-8859-1 (Latin-1) y tú lo abres con ISO-8859-2 (Latin-2), los caracteres no ingleses se ven como símbolos raros o basura. Para que un archivo se vea bien, el emisor y el receptor tienen que usar exactamente la misma codificación.

Y el parche de 128 caracteres extra tampoco era suficiente para idiomas como:

| Idioma | Caracteres necesarios |
|--------|----------------------|
| Árabe | +250 (ligaduras y diacríticos) |
| Japonés (kanji de uso diario) | 2136 según el Ministerio de Educación |
| Japonés (estándar JIS X 0208) | 6879 |
| Chino (estándar GB 18030-2022) | +87 887 hanzi |
| Emojis | ~4000 secuencias |

Está claro: no hay parche posible. Hacía falta un sistema nuevo desde cero.

---

## ¿Qué es Unicode?

Unicode es un **estándar universal de codificación de caracteres**. En lugar de tener docenas de tablas incompatibles, hay una sola tabla enorme que asigna un número único — llamado **punto de código** — a cada carácter de todos los sistemas de escritura del mundo, modernos e históricos.

- No importa qué idioma uses
- No importa qué sistema operativo o programa tengas
- No importa quién escribió el archivo original

Todo el mundo habla el mismo idioma a nivel de bits.

> [!info] Unicode 17.0 — la versión más reciente
> Define cerca de **157 000 caracteres**, de los cuales casi 4 000 son secuencias de emojis.

---

## Los puntos de código (`U+XXXX`)

Cada carácter en Unicode tiene una dirección única escrita como `U+` seguido de un número en hexadecimal. Se llama **punto de código**.

| Punto de código | Carácter | Descripción |
|-----------------|----------|-------------|
| `U+0041` | `A` | A latina mayúscula |
| `U+03A9` | `Ω` | Omega griega |
| `U+3042` | `あ` | Hiragana japonés "a" |
| `U+9F8D` | `龍` | Dragón en chino/japonés (UTF-16) |
| `U+00009F8D` | `龍` | Dragón en chino/japonés (UTF-32) |
| `U+1F60A` | `😊` | Carita sonriente |
| `U+30C4` | `ツ` | Letra japonesa "tsu" |
| `U+062A` | `ت` | Letra árabe "taa" |
| `U+265E` | `♞` | Caballo negro de ajedrez |

> [!tip] ¿Cómo leer un punto de código?
> `U+0041` se lee "U más 0041". El `U+` es solo el prefijo estándar para indicar que es un punto de código Unicode. El número es hex, así que `U+0041` = decimal 65 = la misma `A` de ASCII. ¡Unicode es retrocompatible con ASCII en ese rango!

---

## UTF-8, UTF-16 y UTF-32

Unicode define *qué número* tiene cada carácter. Pero UTF-8, UTF-16 y UTF-32 definen *cómo guardar ese número en bytes*. Son tres estrategias distintas para el mismo problema.

---

### UTF-8 — El más usado en la web

Usa **1 a 4 bytes por carácter de forma dinámica** — decide cuántos bytes necesita según la complejidad del carácter. Nunca desperdicia espacio.

| Tipo de carácter | Bytes que usa | Ejemplo |
|------------------|---------------|---------|
| ASCII normal (`U+0000` a `U+007F`) | 1 byte | `A` |
| Caracteres no-ASCII como `Ω` (`U+03A9`) | 2 bytes | `Ω` |
| Caracteres complejos / emojis como 🔥 (`U+1F525`) | 4 bytes | `🔥` |

> [!success] ¿Por qué UTF-8 domina la web?
> - Es retrocompatible con ASCII: un archivo ASCII puro es válido en UTF-8 sin cambios.
> - Es eficiente: el texto en inglés sigue usando 1 byte por carácter.
> - Es el estándar de facto para HTML, JSON, APIs y casi todo en internet.

---

### UTF-16 — Usado internamente en Windows y Java

Usa **2 o 4 bytes por carácter**.

- La mayoría de caracteres (latinos, cirílicos, chinos Hanzi comunes) → **2 bytes**
- Los raros (emojis, escrituras antiguas) → **4 bytes** (dos unidades de 16 bits, llamadas *surrogate pair*)

| Carácter | UTF-16 |
|----------|--------|
| `A` | `U+0041` (2 bytes) |
| `🔥` | `U+D83D U+DD25` (4 bytes — surrogate pair) |

---

### UTF-32 — El más simple, el más derrochador

Usa **siempre exactamente 4 bytes** por carácter, sin importar cuál sea.

- Ventaja: búsquedas y posicionamiento son más simples (cada carácter ocupa lo mismo)
- Desventaja: un texto en inglés ocupa 4× más espacio que en ASCII o UTF-8

| Carácter | UTF-32 |
|----------|--------|
| `A` | `U+00000041` |
| `🔥` | `U+0001F525` |

---

## Comparativa rápida: UTF-8 vs UTF-16 vs UTF-32

| | UTF-8 | UTF-16 | UTF-32 |
|-|-------|--------|--------|
| Bytes por carácter | 1–4 (dinámico) | 2–4 | Siempre 4 |
| Compatible con ASCII | ✅ Sí | ❌ No directo | ❌ No directo |
| Eficiencia en inglés | ✅ Máxima | Media | ❌ Mínima |
| Uso típico | Web, Linux, APIs | Windows, Java, XML | Procesamiento interno |

---

## Ejemplos curiosos

> [!example] Caracteres que parecen emojis pero no lo son
> - `ツ` (`U+30C4`) — Es la letra japonesa "tsu". Algunas personas la usan como carita sonriente fuera de Japón, pero para una computadora es simplemente un carácter de hiragana.
> - `ت` (`U+062A`) — Es la letra árabe "taa". También se parece a una carita y se usa como emoticono en el mundo árabe.
> - `♞` (`U+265E`) — El caballo negro del ajedrez. La computadora lee `0010 0110 0101 1110` y te muestra un caballo negro — gracias a Unicode.
> - `😊` (`U+0001F60A`) — Este sí es un emoji. En binario es `0000 0000 0000 0001 1111 0110 0000 1010`.

---

## Unicode y el pentesting

> [!example] ¿Por qué me importa como pentester?
> - **Bypass de filtros**: algunos WAFs y validaciones de input no manejan bien Unicode. Caracteres como `Ａ` (`U+FF21`, A de ancho completo) pueden parecer iguales visualmente a `A` pero son distintos para el sistema — útil para evadir blacklists.
> - **Homoglyph attacks**: usar caracteres que se ven idénticos a letras latinas para registrar dominios falsos (phishing). Por ejemplo, `раypal.com` con una `р` cirílica en lugar de `p` latina.
> - **Análisis de tráfico**: en Wireshark o Burp Suite, los datos pueden aparecer en hex. Saber decodificar puntos de código Unicode te ayuda a entender qué se está transmitiendo.
> - **Encoding bypass**: a veces la entrada `%u0041` (A en Unicode URL encoding) pasa filtros que bloquean la `A` directa.

---

## Resumen rápido

```
ASCII (128 chars, solo inglés)
  → Parches regionales (ISO-8859, etc.) → caos de incompatibilidad
    → Unicode: 1 tabla, 157 000+ caracteres, todos los idiomas

Punto de código → U+XXXX (el "nombre" del carácter)
UTF-8/16/32    → cómo guardar ese punto de código en bytes
```

- **Unicode** define *qué número* corresponde a cada carácter
- **UTF-8** es el encoding más usado: 1–4 bytes, compatible con ASCII
- **UTF-16** usa 2–4 bytes, común en Windows y Java
- **UTF-32** siempre 4 bytes, simple pero costoso en espacio

---

## Relación con la nota anterior

> [!link] Ver también
> [[ASCII - Codificación de Caracteres]] — La base sobre la que Unicode construyó todo. Los primeros 128 puntos de código de Unicode (`U+0000` a `U+007F`) son exactamente los mismos que ASCII.

---

