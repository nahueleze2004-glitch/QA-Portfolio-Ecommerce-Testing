# 📄 Master Test Plan - Swag Labs E-commerce

| Metadatos | Detalle |
|-----------|---------|
| **Proyecto:** | Swag Labs Web 2.0 |
| **Versión:** | v1.5.2 (Release Candidate) |
| **Autor:** | Nahuel Cejas |
| **Estado:** | 🟢 APROBADO |

## 1. Alcance (Scope)
El objetivo de este ciclo de pruebas es validar el flujo crítico de compra ("End-to-End") y la estabilidad del módulo de autenticación.

### ✅ In Scope (Qué vamos a probar)
* Login con diferentes roles de usuario (`standard`, `locked_out`).
* Funcionalidad de "Agregar al carrito" y persistencia de datos.
* Flujo de Checkout (Información de envío y Finalización).
* Pruebas de UI en resoluciones Desktop y Mobile.

## 2. Estrategia de Pruebas
Se aplicará una estrategia de **Caja Negra** (Black Box Testing):
1.  **Smoke Testing:** Verificación rápida de que el sistema levanta.
2.  **Functional Testing:** Validación de reglas de negocio.
3.  **Regression Testing:** Asegurar que los cambios nuevos no rompieron lo viejo.

## 3. Entornos
* **QA/Staging:** `https://www.saucedemo.com`
* **Navegadores:** Chrome, Firefox, Edge.
* **Herramientas:** Jira (Gestión), GitHub Issues (Bugs).
