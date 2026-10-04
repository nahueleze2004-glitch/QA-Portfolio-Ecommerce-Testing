# Controles SQL de calidad de datos

Dataset sintético de clientes, productos, pedidos, ítems y pagos. No contiene datos personales ni proviene de Swag Labs o de la fixture HTTP.

```bash
python -m unittest discover -s sql -p 'test_*.py' -v
```

Cada prueba carga `seed.sql` en una base SQLite en memoria, ejecuta una consulta con datos consistentes, introduce una anomalía y verifica que la misma consulta identifique el registro afectado.

Las relaciones no tienen restricciones de clave foránea en este dataset: representa datos de staging que necesitan controles de calidad, y permite introducir referencias rotas de manera deliberada. Los importes se expresan en centavos.

Las consultas ilustran `LEFT JOIN`, `GROUP BY`, `HAVING`, agregaciones y conciliación de pagos. El alcance actual es de seis reglas; no constituye una validación exhaustiva de todas las combinaciones de nulos, duplicados o estados de negocio.
