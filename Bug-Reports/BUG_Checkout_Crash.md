# Ejemplo histórico · Supuesto error 500 en checkout

**Estado: NO VERIFICADO — no constituye un defecto confirmado de Swag Labs.**

La versión anterior afirmaba un error HTTP 500 al ingresar `1234@#` como código postal. No se dispone de una ejecución reproducible, respuesta HTTP ni evidencia propia que sustente esa afirmación. La imagen genérica fue retirada para evitar presentarla como prueba del sistema.

## Hipótesis a explorar

1. Ingresar con `standard_user` y agregar Sauce Labs Backpack.
2. Abrir checkout y completar nombre/apellido ficticios.
3. Ingresar `1234@#` en código postal y pulsar Continue.
4. Registrar pantalla, consola y red sin asumir que fallará.

**Resultado actual:** pendiente de observación.
**Resultado esperado:** requiere una regla de negocio documentada sobre formatos de código postal. Aceptar caracteres especiales no demuestra por sí solo un defecto.
**Severidad y prioridad:** pendientes de evaluación si se confirma un problema.

Si se reproduce, crear un reporte con la [plantilla](TEMPLATE.md) y evidencia real. Si no, registrar el resultado exploratorio sin inventar un fallo.
