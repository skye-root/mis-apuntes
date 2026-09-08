# Apunte: SQL Básico (SELECT, FROM, WHERE, ORDER BY)

## 1. SELECT y FROM
- **SELECT**: Indica qué columnas queremos mostrar.
- **FROM**: Especifica la tabla de la que se obtienen los datos.

Ejemplos:
```sql
-- Seleccionar todas las columnas
SELECT * FROM Orders;

-- Seleccionar columnas específicas
SELECT drink, price FROM Orders;
 
```

## 2. WHERE (Filtrar resultados)

- **WHERE**: Permite aplicar condiciones para mostrar solo las filas que cumplen un criterio.
    

Ejemplo:

``sql``

```
SELECT * FROM Orders WHERE drink = 'Coffee';
```

### Operadores comunes en WHERE

- `=` igual a
    
- `!=` distinto de
    
- `>` mayor que
    
- `<` menor que
    
- `>=` mayor o igual
    
- `<=` menor o igual
    
- `LIKE` búsqueda por patrón (ejemplo: `WHERE drink LIKE 'Lat%'`)
    
- `IN` comprobar si un valor está en una lista (`WHERE drink IN ('Tea','Latte')`)
    

## 3. ORDER BY (Ordenar resultados)

- **ORDER BY**: Ordena los resultados por una columna.
    
- Por defecto es **ASC** (ascendente).
    
- Se puede usar **DESC** para descendente.
    

Ejemplos:
```-- Ordenar por precio ascendente
SELECT * FROM Orders ORDER BY price;

-- Ordenar por precio descendente
SELECT * FROM Orders ORDER BY price DESC;
```

También se puede ordenar por varias columnas:

```
SELECT * FROM Orders ORDER BY drink ASC, price DESC;
```

## 4. Combinar WHERE y ORDER BY

Las consultas reales suelen combinar filtrado y ordenación:

```
SELECT * FROM Orders 
WHERE drink = 'Coffee' 
ORDER BY price DESC;
```

## 5. Orden de ejecución en SQL

Aunque escribimos `SELECT ... FROM ... WHERE ... ORDER BY ...`, el motor SQL ejecuta en este orden:

1. **FROM** → se identifica la tabla.
    
2. **WHERE** → se filtran las filas.
    
3. **SELECT** → se seleccionan las columnas.
    
4. **ORDER BY** → se ordenan los resultados.
    

## 6. Datos importantes a recordar

- **NULL**: representa valores desconocidos o faltantes. En ordenaciones, su posición depende del motor SQL (ej. primero en PostgreSQL, último en MySQL).
    
- **ASC y DESC**: aplican tanto a números como a texto y fechas.
    
- **Buenas prácticas**:
    
    - Evitar `SELECT *` en producción, ya que puede traer datos innecesarios.
        
    - Usar alias para tablas y columnas (`SELECT o.drink FROM Orders o`).
        
    - Siempre probar consultas con filtros antes de ejecutarlas en bases grandes.


