# Cobertura de escenarios

35 escenarios en la suite principal: 13 web, 16 API y 6 controles SQL. Los 13 casos web se ejecutan en dos proyectos; esa repetición no se cuenta como escenarios nuevos. La suite Cypress anterior conserva sus 11 casos de regresión.

## Web · Swag Labs

| ID | Escenario | Archivo |
| --- | --- | --- |
| UI-AUTH-01 | Login válido e inventario | [auth](../tests/ui/auth.spec.ts) |
| UI-AUTH-02 | Usuario bloqueado | [auth](../tests/ui/auth.spec.ts) |
| UI-AUTH-03 | Contraseña incorrecta | [auth](../tests/ui/auth.spec.ts) |
| UI-AUTH-04 | Usuario vacío | [auth](../tests/ui/auth.spec.ts) |
| UI-AUTH-05 | Contraseña vacía | [auth](../tests/ui/auth.spec.ts) |
| UI-AUTH-06 | Logout y acceso directo | [auth](../tests/ui/auth.spec.ts) |
| UI-CART-01 | Persistencia del producto al recargar | [cart](../tests/ui/cart.spec.ts) |
| UI-CART-02 | Eliminación y contador vacío | [cart](../tests/ui/cart.spec.ts) |
| UI-CATALOG-01 | Orden numérico ascendente de precios | [cart](../tests/ui/cart.spec.ts) |
| UI-CHECKOUT-01 | Compra, importes y confirmación | [checkout](../tests/ui/checkout.spec.ts) |
| UI-CHECKOUT-02–04 | Nombre, apellido y código postal obligatorios | [checkout](../tests/ui/checkout.spec.ts) |

## API · Fixture local

| ID | Escenario | Resultado esperado |
| --- | --- | --- |
| API-01 | Contrato del catálogo | JSON, tipos y productos esperados |
| API-02 | Login válido | Token Bearer |
| API-03 | Login inválido | 401, sin token |
| API-04–05 | Token ausente / inválido | 401 |
| API-06 | Crear y recuperar pedido | 201, importes exactos y stock actualizado |
| API-07–10 | Cantidades 0, -1, 1.5 y 11 | 400, stock intacto |
| API-11 | Producto inexistente | 404 |
| API-12 | Producto sin stock | 409 |
| API-13 | Pedido de otra cuenta | 404, sin revelar datos |
| API-14 | Token después del logout | 401 |
| API-15 | JSON malformado | 400 INVALID_JSON |
| API-16 | Agotar stock y repetir compra | Primer pedido aceptado; siguiente rechazado |

[Código de los casos API](../tests/api/shop.spec.ts) · [Contrato](API-CONTRACT.md)

## Datos · SQLite

| ID | Anomalía detectada |
| --- | --- |
| SQL-01 | Pedido con cliente inexistente |
| SQL-02 | Ítem con producto inexistente |
| SQL-03 | Cantidad inválida |
| SQL-04 | Importes de pedido inconsistentes |
| SQL-05 | Pago capturado distinto al total |
| SQL-06 | Stock negativo |

Cada consulta devuelve los identificadores de los registros afectados. [Consultas SQL](../sql/checks) · [Pruebas con inyección de datos](../sql/test_quality.py) · [Resultados](VALIDATION.md)
