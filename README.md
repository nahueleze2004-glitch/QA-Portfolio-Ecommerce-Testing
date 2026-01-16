# QA Engineering Portfolio - Swag Labs E-commerce

Este repositorio contiene la documentación técnica y los scripts de automatización para la validación de calidad del sitio *Swag Labs* (SauceDemo).

El objetivo del proyecto es simular un ciclo de vida de pruebas (STLC) completo, abarcando desde la planificación estratégica hasta la ejecución de pruebas automatizadas E2E, enfocado en la detección temprana de defectos y la estabilidad del producto.

## 📂 Documentación del Proyecto

| Componente | Descripción Técnica | Acceso |
|------------|---------------------|--------|
| **Master Test Plan** | Definición del alcance, estrategia de pruebas, riesgos y entorno de ejecución. | [📂 Ver Plan](Test-Plans/) |
| **Test Scenarios** | Casos de prueba detallados para flujos críticos (Smoke & Regression). | [📂 Ver Test Cases](Test-Cases/) |
| **Defect Reports** | Reportes de incidentes técnicos con logs, severidad y pasos de reproducción. | [📂 Ver Bug Reports](Bug-Reports/) |

### ⚙️ Automatización (Test Automation)

Implementación de scripts de prueba para validación de regresión automática.

| Framework | Lenguaje | Script Principal | Estado |
|-----------|----------|------------------|--------|
| **Cypress** | JavaScript | [📄 login.cy.js](Automation-Cypress/e2e/login.cy.js) | ✅ Stable |

### 📸 Evidencia de Ejecución (Snapshot)

Validación exitosa del script de Login. Se observan los pasos ejecutados y las aserciones (validaciones) en estado **PASS**.

![Evidencia Cypress Pass](assets/images/evidencia-cypress-final.png)

## 🛠️ Stack Tecnológico

* **Automation Framework:** Cypress (E2E Testing).
* **Lenguaje:** JavaScript (ES6).
* **Gestión de Defectos:** GitHub Issues / Jira Simulation.
* **Metodologías:** Black Box Testing, Page Object Model (POM).

---
**Autor:** Nahuel Cejas | QA Engineer.
