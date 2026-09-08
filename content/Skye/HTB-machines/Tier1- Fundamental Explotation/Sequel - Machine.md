---
modulo: Tier1 - Fundamental Exploitation
maquina: Sequel
dificultad: Very Easy
plataforma: HackTheBox
categoria: MySQL / MariaDB Enumeration
---

# Sequel — Writeup

Máquina muy easy centrada en enumeración de una instancia MySQL/MariaDB accesible sin credenciales fuertes. El objetivo es practicar el flujo completo: identificar el servicio, conectarse con el cliente `mysql`, y navegar bases de datos → tablas → columnas hasta dar con la flag.

## Reconocimiento

### Task 1: Durante el escaneo, ¿qué puerto encontramos sirviendo MySQL?
*R:* `3306`

![[Pasted image 20260719153330.png]]

### Task 2: ¿Qué versión de MySQL desarrollada por la comunidad está corriendo el target?
*R:* `MariaDB`

En este caso, como no me salía la versión usando solo el parámetro `-sV`, agregué también `-sC` para correr los scripts por defecto de Nmap:

```bash
nmap -sV -sC 10.129.215.130
```

![[Pasted image 20260719160547.png]]

### Task 3: Al usar el cliente de línea de comandos de MySQL, ¿qué switch usamos para especificar un username de login?
*R:* `-u`

Lo confirmé revisando el manual:

```bash
man mysql | grep user_name
```

![[Pasted image 20260719193412.png]]

### Task 4: ¿Qué username permite loguearnos en esta instancia de MariaDB sin proporcionar contraseña?
*R:* `root`

`root` es uno de los usuarios más comunes para probar primero, así que lo intenté directo:

![[Pasted image 20260719202618.png]]

Salió un error de conexión, lo cual indicaba que el servidor MariaDB **no tiene SSL habilitado**. Busqué en el manual el parámetro para deshabilitar SSL del lado del cliente:

![[Pasted image 20260719202730.png]]

El comando final quedó así:

```bash
mysql --skip-ssl -h 10.129.215.225 -u root
```

![[Pasted image 20260719202756.png]]

Con eso logré ingresar exitosamente con el username **root** y sin password.

### Task 5: En SQL, ¿qué símbolo usamos para indicar en la query que queremos mostrar todo el contenido de una tabla?
*R:* `*`

### Task 6: En SQL, ¿con qué símbolo debemos terminar cada query?
*R:* `;`

Dato nuevo que aprendí: toda consulta SQL termina en `;`. Ojo con no confundir esto con el carácter de comentario (`#` o `--`) que se usa en técnicas de SQL injection — son conceptos distintos aunque aparezcan en el mismo contexto.

### Task 7: Hay tres bases de datos comunes a todas las instancias de MySQL. ¿Cuál es el nombre de la cuarta, que es única de este host?
*R:* `htb`

Tuve que buscar cómo listar las bases de datos disponibles dentro de `mysql`:

![[Pasted image 20260719211356.png]]

Consulté la sección de `Administration` del help:

![[Pasted image 20260719211422.png]]

Y usé el comando correspondiente:

```sql
SHOW DATABASES;
```

![[Pasted image 20260719211443.png]]

Ahí pude ver que existen 3 bases de datos comunes a cualquier instancia de MySQL (`information_schema`, `mysql`, `performance_schema`), así que la cuarta y única de este host es `htb`.

### Task 8: ¿Cuál es el comando en MySQL para seleccionar una base de datos con la que interactuar?
*R:* `USE`

Encontré el comando revisando el `help` interno del cliente:

![[Pasted image 20260719212206.png]]

Y lo probé para seleccionar la base de datos `htb`:

```sql
USE htb;
```

![[Pasted image 20260719212244.png]]

### Task 9: ¿Cuál es el comando en MySQL para mostrar las diferentes columnas de una tabla dada?
*R:* `DESCRIBE`

Encontré dos formas de ver las columnas de una tabla. Primero listé las tablas de la base de datos:

![[Pasted image 20260719214033.png]]

Y luego, para ver las columnas de una tabla específica, hay dos métodos:

###### Método 1 (salida con más información)
```sql
DESCRIBE nombre_tabla;
```
![[Pasted image 20260719214203.png]]

###### Método 2 (salida acortada)
```sql
SHOW FULL COLUMNS FROM nombre_tabla;
```
![[Pasted image 20260719214241.png]]

## Explotación / Extracción de datos

### Task 10: ¿Qué tabla tiene una columna llamada "flag"?
*R:* `config`

Hubo una pequeña confusión inicial porque, al revisar las columnas superficialmente, no fue obvio cuál tabla contenía el campo `flag`. Terminé confirmándolo con una lectura directa del contenido de la tabla:

```sql
SELECT * FROM config;
```

![[Pasted image 20260719223447.png]]

Ahí encontré la columna `flag` junto con su valor, que es la flag pedida para completar el módulo.

**Flag obtenida:**
`7b4bec00d1a39e3dd4e021ec3d915da8`

## Notas / aprendizajes

- Cuando `nmap -sV` no alcanza a detectar la versión exacta de un servicio, agregar `-sC` (scripts default) puede completar esa información sin necesidad de lanzar un escaneo de scripts más agresivo.
- El flag `--skip-ssl` del cliente `mysql` es clave cuando el servidor no tiene SSL configurado — es un error común al conectarse a instancias mal endurecidas o de práctica.
- Reforcé el flujo estándar de enumeración en MySQL: `SHOW DATABASES` → `USE <db>` → `SHOW TABLES` → `DESCRIBE <tabla>` / `SHOW COLUMNS FROM <tabla>` → `SELECT * FROM <tabla>`. Vale la pena memorizar este flujo porque se repite en casi cualquier máquina con MySQL/MariaDB expuesto.
- Diferencia importante para no mezclar conceptos: el `;` termina una query normal; el `#` o `--` comentan el resto de la línea (usado en SQL injection, como en el writeup de *Appointment*). Son mecanismos distintos aunque convivan en el mismo motor.

## Recomendaciones para el futuro

- **Documentar la sesión completa del cliente `mysql`** (no solo screenshots puntuales): copiar el bloque de comandos en texto ayuda a releer más rápido sin depender de imágenes.
- **Probar login con la lista de usuarios comunes** (`root`, `admin`, `mysql`) antes de asumir que se necesita fuerza bruta — en máquinas Very Easy suele bastar con esto.
- **Revisar siempre `information_schema`** como alternativa a `SHOW TABLES` / `DESCRIBE` cuando se quiera automatizar la enumeración (por ejemplo, consultar `information_schema.columns` para buscar columnas por nombre en todas las tablas de un tirón):
  ```sql
  SELECT table_name, column_name
  FROM information_schema.columns
  WHERE column_name LIKE '%flag%';
  ```
  Esto hubiera evitado la confusión de la Task 10.
- **Verificar SSL/TLS del servicio** como paso de rutina al conectarse a bases de datos remotas; si falla la conexión, el primer sospechoso debería ser la config de SSL antes que las credenciales.
- Para el próximo writeup similar, anotar también **qué privilegios tiene el usuario** con el que se logró ingresar (`SHOW GRANTS;`), ya que eso da contexto extra sobre qué tan crítico es el hallazgo (root de MySQL no siempre implica root del sistema operativo).
