# Plan de pruebas · Swag Labs

**Responsable del portfolio:** Nahuel Cejas
**Tipo:** proyecto de práctica · **Estado:** diseñado; ver ejecución en [VALIDATION](../docs/VALIDATION.md)
**Entorno:** https://www.saucedemo.com · versión de la aplicación no disponible

## Objetivo y riesgos

| Riesgo | Prioridad | Casos |
| --- | --- | --- |
| Usuario válido no puede ingresar / credenciales inválidas aceptadas | Alta | AUTH-001–004 |
| Acceso después de cerrar sesión | Alta | AUTH-005 |
| Pérdida o eliminación incorrecta de productos | Alta | CART-001–002 |
| Compra incompleta o importes incorrectos | Alta | CHECKOUT-001 |
| Envío sin información obligatoria | Media | CHECKOUT-002–004 |

## Alcance

Autenticación, carrito, persistencia al recargar, checkout de un producto y campos obligatorios. Ejecución automatizada prevista en Electron, a 1280 × 800 y 390 × 844. Cada prueba comienza en un contexto aislado.

Fuera de alcance: pagos reales, backend/API, seguridad ofensiva, carga, accesibilidad completa, dispositivos reales y compatibilidad con otros navegadores. Los usuarios de la demo representan comportamientos de prueba, no roles de autorización de un negocio real.

## Estrategia

Caja negra, clases de equivalencia (credenciales válidas/incorrectas/bloqueadas), validación de campos obligatorios y transiciones de estado (sin sesión → autenticado → carrito → compra). La automatización cubre regresión; la revisión manual complementa usabilidad y exploración.

## Entrada

Demo accesible, dependencias instaladas y datos públicos de prueba disponibles. No usar información personal o de pago.

## Salida

Todos los casos de la matriz ejecutados en ambos tamaños; fallos investigados y documentados con evidencia. Un fallo de conectividad se registra como bloqueo de entorno, no como defecto del producto. No declarar aprobación hasta revisar el resultado y los reportes.

## Evidencia y defectos

Actions conserva reportes JUnit, videos y capturas de fallos durante 14 días. Para una revisión manual registrar fecha, navegador, pasos, resultado observado y captura propia. Usar la [plantilla de defectos](../Bug-Reports/TEMPLATE.md). No atribuir errores HTTP sin respuesta de red reproducible.
