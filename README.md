# Nahuel Cejas | E-commerce QA Portfolio

[![E-commerce E2E](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/workflows/e2e.yml/badge.svg?branch=main)](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/workflows/e2e.yml)

**E-commerce testing · Test design · Cypress automation · GitHub Actions**

Portfolio de práctica de Quality Assurance sobre [Swag Labs](https://www.saucedemo.com/). El proyecto conecta riesgos de negocio, casos manuales y pruebas automatizadas del recorrido de compra.

[LinkedIn](https://www.linkedin.com/in/nahuel-cejas-050452308) · [Plan de pruebas](Test-Plans/TP_Master_Plan.md) · [Matriz de cobertura](Test-Cases/COVERAGE.md) · [Automatización](Automation-Cypress/e2e)

## Resultados verificados

**11 escenarios automatizados · 2 tamaños de pantalla · 3 flujos de negocio**

La ejecución del 4 de octubre de 2026 finalizó correctamente en escritorio (1280 × 800) y viewport móvil (390 × 844). [Ver ejecución y reportes](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/runs/37219676567) · [Detalle de validación](docs/VALIDATION.md).

| Competencia | Evidencia en el proyecto |
| --- | --- |
| Diseño de pruebas | Escenarios positivos, negativos y campos obligatorios vinculados a riesgos |
| Automatización con JavaScript y Cypress | Comandos reutilizables, aislamiento y aserciones sobre el estado de la aplicación |
| Integración continua | GitHub Actions con dos configuraciones de pantalla y reportes JUnit |
| Documentación QA | Plan de pruebas, matriz de cobertura y plantilla de defectos reproducibles |

## Recorrido para revisar el proyecto

1. **Criterio de QA:** el [plan](Test-Plans/TP_Master_Plan.md) prioriza autenticación y compra por su impacto.
2. **Diseño de pruebas:** la [matriz](Test-Cases/COVERAGE.md) incluye caminos felices, negativos y validaciones.
3. **Código:** la suite verifica login, carrito, checkout y cierre de sesión con selectores `data-test` y aserciones de estado.
4. **Evidencia:** consultar [el registro de validación](docs/VALIDATION.md) y las ejecuciones de [Actions](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions). Una prueba escrita no equivale a una prueba aprobada.

## Ejecutar localmente

Requisitos: Node.js 22 LTS, npm y acceso a internet. En Linux, Cypress necesita sus [dependencias de sistema](https://docs.cypress.io/app/get-started/install-cypress#Linux-Prerequisites).

```bash
git clone https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing.git
cd QA-Portfolio-Ecommerce-Testing
npm ci
npx cypress install
npm test
```

```bash
npm run test:open     # Interfaz interactiva
npm run test:mobile   # Mismos flujos en viewport 390 × 844
npm run test:report   # Resultados JUnit en reports/
```

La suite utiliza únicamente usuarios y contraseña de demostración publicados por Swag Labs. No requiere cuentas personales ni secretos. El viewport móvil verifica flujos con una ventana estrecha; no representa pruebas en dispositivos reales.

## Qué contiene

| Área | Entregable |
| --- | --- |
| Estrategia | Alcance, riesgos, criterios de entrada/salida y límites |
| Testing manual | Compra completa y matriz de escenarios |
| Automatización | 11 casos Cypress en JavaScript, aislados entre sí |
| CI | Ejecución en escritorio y viewport móvil, reportes JUnit, videos y capturas de fallos |
| Defectos | Plantilla reproducible y revisión de un ejemplo histórico no confirmado |

## Decisiones técnicas

- Se conserva Cypress para desarrollar la base existente del repositorio.
- `baseUrl` centraliza el entorno; los comandos reutilizan login y preparación del carrito.
- No se usan esperas de tiempo fijo ni reintentos para ocultar fallos.
- Checkout valida producto, subtotal, impuestos, total y confirmación final.
- El pipeline usa permisos de lectura y no necesita Cypress Cloud.

## Estado y límites

Proyecto educativo independiente, sin relación laboral ni afiliación con Sauce Labs. No representa un sistema de pagos real. No se afirman defectos, cobertura porcentual ni resultados sin evidencia. El antiguo reporte de error 500 está marcado como **ejemplo no verificado**.

## Próximas iteraciones

- Adjuntar una ejecución manual fechada con evidencias.
- Ampliar compatibilidad a Chrome y Firefox después de validar la suite base.
- Agregar un proyecto separado de API testing con un servicio documentado.
- Incorporar Playwright/TypeScript como ejercicio posterior de comparación.

Mi formación en ciberseguridad complementa el interés por calidad de software; este repositorio se concentra en QA funcional.
