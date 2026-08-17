# 🧪 Test Case: Flujo de Compra Completo (E2E)

**ID:** TC-E2E-001
**Referencia Jira:** STORY-425
**Título:** Validar flujo de compra exitoso con usuario estándar
**Tipo:** Regresión
**Autor:** Nahuel Cejas

---

### 📝 Pre-condiciones
1.  El usuario no debe tener sesión iniciada.
2.  Cookies de sesión limpias.

### 👣 Pasos de Ejecución

| # | Acción | Datos de Entrada | Resultado Esperado | Estado |
|---|--------|------------------|--------------------|--------|
| 1 | Navegar a la Home y hacer Login | User: `standard_user`<br>Pass: `secret_sauce` | Redirección a `/inventory.html`. Productos visibles. | ✅ PASS |
| 2 | Agregar "Sauce Labs Backpack" al carrito | Click en btn `Add to cart` | El badge del carrito cambia a "1". | ✅ PASS |
| 3 | Ingresar al Carrito y dar click en Checkout | N/A | Redirección a `/checkout-step-one.html`. Formulario visible. | ✅ PASS |
| 4 | Completar formulario de envío | Name: `Nahuel`<br>Last: `Cejas`<br>Zip: `1629` | Los campos aceptan caracteres alfanuméricos. | ✅ PASS |
| 5 | Confirmar compra (Overview) | Click en `Finish` | Se muestra resumen con Total. | ✅ PASS |
| 6 | Validar pantalla final | N/A | Mensaje: "THANK YOU FOR YOUR ORDER". | ✅ PASS |
