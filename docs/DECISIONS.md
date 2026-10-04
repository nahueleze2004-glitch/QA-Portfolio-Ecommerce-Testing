# Decisiones técnicas

| Decisión | Motivo | Límite |
| --- | --- | --- |
| Playwright + TypeScript | Un runner para web y HTTP, tipado estricto y reportes compartidos | TypeScript requiere una comprobación separada; CI ejecuta `tsc` |
| Page object pequeño | Reutilizar login y preparación de compra | Las aserciones de negocio permanecen visibles en los specs |
| API local por test | Datos predecibles y ejecución paralela sin cuentas compartidas | No evalúa un backend productivo |
| Tokens opacos en memoria | Ejercitar acceso, propiedad del pedido y revocación | Sin expiración ni gestión de identidad de producción |
| Dinero en centavos | Evitar comparaciones ambiguas con decimales | La tasa de impuesto es una regla del ejercicio |
| SQLite en memoria | Consultas ejecutables sin instalar un servidor | No demuestra administración de una base productiva |
| Cero reintentos | Mantener visibles los fallos intermitentes | La demo externa puede fallar por conectividad |
| Cypress como regresión separada | Conservar la suite existente durante la incorporación de Playwright | Casos solapados no aumentan el conteo de escenarios principales |

Referencias: [configuración de Playwright](https://playwright.dev/docs/test-configuration), [pruebas API](https://playwright.dev/docs/api-testing), [integración continua](https://playwright.dev/docs/ci-intro).
