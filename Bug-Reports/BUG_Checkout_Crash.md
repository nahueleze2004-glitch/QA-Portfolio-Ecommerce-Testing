# 🐞 Bug: Error 500 al procesar Checkout con caracteres especiales

**ID Defecto:** DEF-2026-89
**Severidad:** Crítica (Bloqueante)
**Ambiente:** Staging (v1.5.2)
**Reportado por:** Nahuel Cejas

---

### 📝 Descripción del Problema
Al intentar finalizar una compra ingresando caracteres especiales (ej: `Ñ`, `@`) en el campo "Zip Code", la API responde con un error interno del servidor y la UI se congela.

### 🔄 Pasos para Reproducir
1.  Iniciar flujo de compra estándar.
2.  Llegar a la pantalla de información (`/checkout-step-one.html`).
3.  En el campo **Zip/Postal Code**, ingresar: `1234@#`
4.  Click en "Continue".

### 🔴 Comportamiento Actual (El Error)
La página no avanza y la consola del navegador muestra un error de API (500 Internal Server Error).

### 🟢 Comportamiento Esperado
El sistema debería mostrar un mensaje de validación: *"El código postal contiene caracteres inválidos"*.

---
**Estado:** 🔓 ABIERTO
