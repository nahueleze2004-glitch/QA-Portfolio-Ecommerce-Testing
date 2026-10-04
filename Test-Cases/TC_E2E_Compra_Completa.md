# CHECKOUT-001 · Compra completa

**Prioridad:** alta · **Tipo:** funcional / regresión · **Estado manual:** pendiente de ejecución documentada
**Estado automatizado:** ejecución CI exitosa el 2026-10-04; ver [evidencia](../docs/VALIDATION.md)
**Automatización:** [checkout.cy.js](../Automation-Cypress/e2e/checkout.cy.js)

Precondiciones: Swag Labs accesible, almacenamiento limpio, usuario público `standard_user` / `secret_sauce`. Los datos de envío son ficticios.

| Paso | Acción | Resultado esperado |
| --- | --- | --- |
| 1 | Ingresar con usuario estándar | Se abre inventario |
| 2 | Agregar Sauce Labs Backpack | Badge indica 1 |
| 3 | Abrir carrito | Producto seleccionado a $29.99 |
| 4 | Seleccionar Checkout | Formulario de envío visible |
| 5 | Completar Test / Buyer / 1629 y Continue | Se abre resumen de compra |
| 6 | Revisar producto e importes antes de Finish | Subtotal $29.99, impuesto $2.40, total $32.39 |
| 7 | Seleccionar Finish | Confirmación “Thank you for your order!” y carrito vacío |

Los importes esperados corresponden al producto de demostración seleccionado. Si cambia el catálogo, revisar las expectativas del test. Para la ejecución manual, registrar fecha, navegador, resultado y evidencia.
