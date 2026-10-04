# Contrato de la API de práctica

Servicio local definido en [`fixtures/shop-api.mjs`](../fixtures/shop-api.mjs). Permite ejecutar pruebas HTTP con datos controlados; es independiente del sitio Swag Labs y no utiliza su backend.

Cada test inicia un proceso en un puerto libre de `127.0.0.1`, con catálogo, sesiones y pedidos nuevos. El proceso se cierra al terminar. No hay cuentas externas ni persistencia en disco.

## Endpoints

| Método y ruta | Entrada | Respuesta |
| --- | --- | --- |
| `GET /health` | — | `200`, estado del servicio |
| `GET /products` | — | `200`, catálogo con precio en centavos y stock |
| `POST /auth/login` | `username`, `password` | `200`, token opaco; `401` si no coinciden |
| `POST /auth/logout` | Bearer token | `200`, token revocado |
| `POST /orders` | Bearer token, `productId`, `quantity` | `201`, pedido; `400`, `404` o `409` según validación |
| `GET /orders/:id` | Bearer token | `200` para el propietario; `404` si no existe o pertenece a otra cuenta |

## Reglas del ejercicio

- Usuarios de prueba: `buyer-a` y `buyer-b`; contraseña pública de fixture: `demo-only`.
- Un token desconocido, ausente o revocado recibe `401` en las rutas protegidas.
- El producto 1 cuesta 2999 centavos y comienza con 3 unidades. El producto 2 cuesta 999 centavos y comienza sin stock.
- La cantidad debe ser un entero entre 1 y 10, inclusive. Una cantidad válida superior al stock disponible recibe `409`.
- Subtotal = precio × cantidad. Impuesto = 8 % del subtotal, redondeado al centavo. Total = subtotal + impuesto.
- Un pedido confirmado descuenta stock. Las solicitudes rechazadas no deben consumirlo.
- Un JSON malformado recibe `400 INVALID_JSON`; un cuerpo de más de 16384 caracteres recibe `413`.

Los importes son enteros para evitar comparaciones de dinero con coma flotante. Son reglas del ejercicio, no un modelo fiscal real.

## Credenciales y tokens

La fixture conserva tokens opacos en memoria y los elimina al cerrar sesión. No implementa expiración, recuperación de contraseña, hashing ni controles de producción. Los reportes de pruebas pueden incluir las credenciales públicas y tokens efímeros de esta fixture. No utilizar credenciales reales.

## Ejecución

`npm run test:api` inicia y detiene automáticamente la fixture por caso. Para inspección manual: `node fixtures/shop-api.mjs`; la consola muestra la URL local asignada. El contrato de tamaño máximo está documentado, pero su frontera todavía no tiene un caso automatizado dedicado.
