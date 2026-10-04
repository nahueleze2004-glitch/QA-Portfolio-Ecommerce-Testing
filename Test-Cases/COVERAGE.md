# Cobertura de regresión Cypress

La [matriz principal](../docs/COVERAGE.md) documenta los escenarios de Playwright, API y SQL.

Cada ID aparece en el título del test. La suite automatizada finalizó correctamente en escritorio y viewport móvil el 2026-10-04; ver [registro](../docs/VALIDATION.md). Para pruebas manuales usar sesión limpia y datos ficticios.

| ID | Escenario / datos | Resultado esperado | Spec |
| --- | --- | --- | --- |
| AUTH-001 | Usuario estándar válido | Acceso a inventario y 6 productos | [login](../Automation-Cypress/e2e/login.cy.js) |
| AUTH-002 | Usuario locked_out_user | Error de bloqueo y sin inventario | [login](../Automation-Cypress/e2e/login.cy.js) |
| AUTH-003 | Contraseña incorrecta | Error de credenciales y sin inventario | [login](../Automation-Cypress/e2e/login.cy.js) |
| AUTH-004 | Formulario de login vacío | Nombre de usuario requerido | [login](../Automation-Cypress/e2e/login.cy.js) |
| AUTH-005 | Logout y acceso directo a inventario | Acceso rechazado; login visible | [login](../Automation-Cypress/e2e/login.cy.js) |
| CART-001 | Agregar mochila y recargar | Un producto, nombre y precio correctos | [cart](../Automation-Cypress/e2e/cart.cy.js) |
| CART-002 | Eliminar mochila | Carrito vacío y badge ausente | [cart](../Automation-Cypress/e2e/cart.cy.js) |
| CHECKOUT-001 | Envío válido y finalizar | Importes correctos, confirmación y carrito vacío | [checkout](../Automation-Cypress/e2e/checkout.cy.js) |
| CHECKOUT-002 | Nombre vacío, resto completo | First Name is required | [checkout](../Automation-Cypress/e2e/checkout.cy.js) |
| CHECKOUT-003 | Apellido vacío, resto completo | Last Name is required | [checkout](../Automation-Cypress/e2e/checkout.cy.js) |
| CHECKOUT-004 | Código postal vacío, resto completo | Postal Code is required | [checkout](../Automation-Cypress/e2e/checkout.cy.js) |

