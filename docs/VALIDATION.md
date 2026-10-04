# Registro de validación

## Ejecución verificada · 2026-10-04

- **Commit evaluado:** [`6e3122d`](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/commit/6e3122dd2090c44ef63e514899923037c7eb3613).
- **Rama:** `main`, después de integrar el [pull request #1](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/pull/1).
- **Evidencia:** [GitHub Actions · ejecución 37219676567](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/runs/37219676567).
- **Entorno configurado:** Ubuntu 24.04, Node.js 22, Cypress 16.1.1 y navegador Electron.

| Comprobación | Resultado |
| --- | --- |
| Sintaxis de configuración, soporte y tres specs | Correcta (`node --check`) |
| Dependencias y lockfile | Versión de Cypress consistente |
| E2E escritorio · 1280 × 800 | Job completado correctamente |
| E2E viewport móvil · 390 × 844 | Job completado correctamente |
| Publicación | Cambios integrados en `main` |

La suite contiene 11 escenarios: 5 de autenticación, 2 de carrito y 4 de checkout. Ambos jobs ejecutan la suite completa. Los resultados corresponden al commit y a la ejecución enlazados; el badge del README muestra el estado de la rama principal.

## Consultar y reproducir evidencia

1. Abrir la ejecución enlazada y consultar los pasos **Run E2E** de ambos jobs.
2. Descargar los artefactos con reportes JUnit y videos mientras estén disponibles. Las capturas se generan ante fallos. La retención configurada es de 14 días.
3. Para repetir localmente, instalar las dependencias con `npm ci` y ejecutar `npm test` y `npm run test:mobile`.
4. Para generar JUnit, usar `npm run test:report`.

## Límites

El viewport móvil no representa un dispositivo real. Esta ejecución no acredita pruebas de API, carga, seguridad ni otros navegadores. La ejecución manual del caso de compra sigue pendiente de evidencia propia.

## Antecedente de instalación local

Durante la preparación inicial del paquete, la descarga del binario de Cypress no pudo descomprimirse. Ese bloqueo local no se reprodujo en los jobs exitosos de GitHub Actions y no se atribuye a Swag Labs.
