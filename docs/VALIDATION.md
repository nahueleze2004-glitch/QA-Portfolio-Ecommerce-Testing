# Registro de validación

## Suite QA Engineer · 2026-10-04

**Commit evaluado:** [`475570f`](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/commit/475570fd29a48bc23044fd0b1c2122da80e04c97).  
**Ejecución:** [QA Engineering · 37221126304](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/runs/37221126304).  
**Entorno:** Ubuntu 24.04, Node.js 22, Python 3.12, Playwright 1.63.0.

| Job | Resultado | Evidencia |
| --- | --- | --- |
| Playwright · Chromium escritorio | **13 aprobadas** | [Log del job](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/runs/37221126304/job/111491508736) |
| Playwright · emulación Pixel 7 | **13 aprobadas** | [Log del job](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/runs/37221126304/job/111491508528) |
| Playwright · API local | **16 aprobadas** | [Log del job](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/runs/37221126304/job/111491508691) |
| TypeScript y SQL | **Tipado correcto; 6 controles aprobados** | [Log del job](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/runs/37221126304/job/111491508714) |

35 escenarios distintos en la suite principal. Los casos web se repiten en dos configuraciones: 42 ejecuciones Playwright más 6 controles SQL. Los logs no registran fallos ni casos omitidos en esta ejecución. No se habilitaron reintentos.

## Regresión Cypress

La [ejecución 37221126266](https://github.com/nahueleze2004-glitch/QA-Portfolio-Ecommerce-Testing/actions/runs/37221126266) completó correctamente ambos jobs de Cypress (escritorio y viewport móvil) con el mismo commit. Esta suite conserva sus 11 casos; no se suman al conteo principal porque varios flujos se solapan.

## Consultar reportes

1. Abrir la ejecución y seleccionar un job para ver sus pasos y resultado.
2. En **Artifacts**, descargar `playwright-chromium`, `playwright-mobile-chromium` o `playwright-api` para consultar HTML y JUnit.
3. El artefacto `sql-results` contiene el log de los seis controles de datos.
4. Ante fallos web se conservan trazas, capturas y videos. Los artefactos tienen una retención de 14 días.

Para repetir: `npm run typecheck`, `npm test` y `npm run test:sql`. El resultado corresponde al commit enlazado; los indicadores del README muestran el estado actual de `main`.

## Límites

Las pruebas web usan una demo externa y emulación de navegador. API y SQL se ejecutan sobre fixtures independientes con datos sintéticos. Esta validación no acredita exploración manual, dispositivos físicos, carga ni una auditoría de seguridad.
