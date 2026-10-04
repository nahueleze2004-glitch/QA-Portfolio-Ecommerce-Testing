# Checkout · Validación de caracteres en código postal

**Estado:** no confirmado · pendiente de exploración

El reporte inicial describía un error HTTP 500 al ingresar `1234@#` como código postal. No hay una respuesta HTTP registrada ni pasos verificados que permitan confirmar el defecto.

## Escenario de exploración

1. Ingresar con `standard_user` y agregar Sauce Labs Backpack.
2. Abrir checkout y completar nombre/apellido ficticios.
3. Ingresar `1234@#` en código postal y pulsar Continue.
4. Registrar el resultado en pantalla, la consola y las solicitudes de red.

**Resultado actual:** pendiente de observación.
**Resultado esperado:** requiere una regla de negocio documentada sobre formatos de código postal. Aceptar caracteres especiales no demuestra por sí solo un defecto.
**Severidad y prioridad:** pendientes de evaluación si se confirma un problema.

Documentar la ejecución y, si se confirma un defecto, completar la [plantilla de reporte](TEMPLATE.md) con la evidencia correspondiente.

