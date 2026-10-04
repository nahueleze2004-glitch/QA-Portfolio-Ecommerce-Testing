# Nahuel Cejas | QA Portfolio

[![E-commerce E2E](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/workflows/e2e.yml/badge.svg?branch=main)](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/workflows/e2e.yml)

**Testing funcional · JavaScript · Cypress · GitHub Actions**

Proyecto de QA sobre [Swag Labs](https://www.saucedemo.com/), enfocado en tres recorridos de un e-commerce: inicio de sesión, carrito y compra. Incluye diseño de casos, automatización E2E y reportes de ejecución.

[LinkedIn](https://www.linkedin.com/in/nahuel-cejas-050452308) · [Pruebas automatizadas](Automation-Cypress/e2e) · [Resultados](docs/VALIDATION.md) · [Plan de pruebas](Test-Plans/TP_Master_Plan.md)

## Qué se prueba

| Área | Escenarios | Validaciones principales |
| --- | --- | --- |
| Autenticación | 5 | Acceso válido, usuario bloqueado, contraseña incorrecta, formulario vacío y cierre de sesión |
| Carrito | 2 | Persistencia al recargar, producto y precio, eliminación y contador |
| Checkout | 4 | Producto, subtotal, impuestos, total, confirmación y campos obligatorios |

Los 11 escenarios se ejecutan en Electron con dos tamaños de pantalla: escritorio (1280 × 800) y móvil (390 × 844). La [matriz de cobertura](Test-Cases/COVERAGE.md) vincula cada escenario con su archivo de prueba.

## Resultados

La [ejecución del 4 de octubre de 2026](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/runs/37219676567) finalizó correctamente en ambas configuraciones. El [registro de validación](docs/VALIDATION.md) identifica el commit evaluado y explica cómo consultar los reportes.

GitHub Actions ejecuta la suite en cada push y pull request. Genera reportes JUnit, videos y capturas de fallos, con una retención de 14 días. El indicador de la portada muestra el estado de `main`.

## Organización

| Ruta | Contenido |
| --- | --- |
| [Automation-Cypress/e2e](Automation-Cypress/e2e) | Pruebas de autenticación, carrito y checkout |
| [Automation-Cypress/support](Automation-Cypress/support) | Comandos compartidos de login y preparación de compra |
| [Test-Plans](Test-Plans/TP_Master_Plan.md) | Riesgos, alcance y criterios de entrada y salida |
| [Test-Cases](Test-Cases/COVERAGE.md) | Matriz de escenarios y caso manual de compra |
| [Bug-Reports](Bug-Reports/TEMPLATE.md) | Plantilla de defectos; los registros sin reproducción se identifican como no confirmados |
| [.github/workflows/e2e.yml](.github/workflows/e2e.yml) | Pipeline de integración continua |

## Ejecutar el proyecto

Requisitos: Node.js 22, npm y acceso a internet. En Linux, instalar las [dependencias de sistema de Cypress](https://docs.cypress.io/app/get-started/install-cypress#Linux-Prerequisites).

```bash
git clone https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing.git
cd QA-Portfolio-Ecommerce-Testing
npm ci
npm test
```

| Comando | Uso |
| --- | --- |
| `npm test` | Ejecutar la suite en escritorio |
| `npm run test:open` | Abrir la interfaz de Cypress |
| `npm run test:mobile` | Ejecutar en viewport de 390 × 844 |
| `npm run test:report` | Generar reportes JUnit en `reports/` |

Se utilizan las credenciales públicas de demostración de Swag Labs y datos ficticios de envío.

## Decisiones de automatización

- Selectores `data-test` para identificar los controles de la aplicación.
- Comandos compartidos para evitar duplicar la preparación de los casos.
- Aislamiento entre pruebas y entorno centralizado en `baseUrl`.
- Aserciones sobre navegación, mensajes, productos e importes.
- Sin esperas de tiempo fijo; reintentos desactivados.
- Pipeline con permisos de lectura, sin dependencia de Cypress Cloud.

## Alcance y siguientes pasos

Proyecto de práctica de QA funcional sobre una aplicación de demostración. La configuración móvil utiliza un viewport reducido; no cubre dispositivos reales. Las pruebas actuales no incluyen API, pagos reales, carga ni auditoría de seguridad.

Próximas ampliaciones: ejecución manual documentada, compatibilidad con Chrome y Firefox, y un proyecto de API testing. Playwright con TypeScript queda previsto como una suite posterior.
