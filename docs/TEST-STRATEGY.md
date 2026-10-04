# Estrategia de pruebas

## Objetivo

Evaluar recorridos de compra y controles de integridad mediante tres ejercicios complementarios. Los resultados se reportan por entorno para evitar atribuir a Swag Labs las validaciones de la API o del dataset local.

| Capa | Sistema evaluado | Herramientas |
| --- | --- | --- |
| Web | Swag Labs, demo pública | Playwright, TypeScript, Chromium |
| API | Servicio HTTP local de práctica | Playwright APIRequestContext, Node.js |
| Datos | Dataset sintético de comercio electrónico | SQL, SQLite, Python unittest |

## Riesgos y prioridad

| Riesgo | Prioridad | Controles |
| --- | --- | --- |
| Acceso con credenciales inválidas o después de logout | Alta | UI-AUTH, API-02–05 y API-14 |
| Lectura de un pedido ajeno | Alta | API-13 |
| Importes incorrectos o pagos inconsistentes | Alta | UI-CHECKOUT-01, API-06, SQL-04–05 |
| Pérdida de artículos del carrito | Alta | UI-CART-01–02 |
| Compra sin stock o con cantidad inválida | Alta | API-07–12 y API-16 |
| Datos sin referencias o inventario negativo | Alta | SQL-01–03 y SQL-06 |
| Formulario incompleto o catálogo mal ordenado | Media | UI-CHECKOUT-02–04 y UI-CATALOG-01 |

## Diseño

Se combinan particiones de equivalencia, valores límite y transiciones de estado. La cantidad de API incluye cero, negativo, fracción, valor superior al máximo y stock exacto. Las pruebas SQL verifican tanto la ausencia de falsos positivos con datos limpios como la detección de una anomalía inyectada.

La suite web corre en Chromium de escritorio y emulación Pixel 7. Cada test dispone de un contexto de navegador aislado. Las pruebas HTTP crean un proceso por caso, sin reutilizar sesiones ni pedidos. Cada control SQL usa una base en memoria independiente.

## Criterios de entrada y salida

**Entrada:** dependencias instaladas, demo web accesible y entorno con Chromium. API y SQL no requieren servicios externos una vez instaladas las herramientas.

**Salida:** TypeScript sin errores, suites finalizadas sin fallos ni casos omitidos y resultados enlazados al commit evaluado. Los errores de descarga o conectividad se investigan como problemas de entorno antes de atribuirlos al producto. Los reintentos están desactivados.

## Evidencia

GitHub Actions conserva reportes HTML y JUnit, log SQL y trazas/capturas/videos ante fallos durante 14 días. El registro de validación enlaza cada ejecución. Los reportes HTML se descargan desde los artefactos; no hay una web de reportes publicada.

## Límites

No se incluyen pagos reales, carga, una auditoría de seguridad, cobertura completa de accesibilidad ni dispositivos físicos. La API usa almacenamiento en memoria y el dataset SQL es independiente: no existe una integración entre ambas capas. La exploración manual se documentará por separado con evidencia de ejecución.
