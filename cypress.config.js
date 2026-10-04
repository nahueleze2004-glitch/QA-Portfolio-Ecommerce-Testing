const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  video: true,
  screenshotOnRunFailure: true,
  retries: 0,
  reporter: 'spec',
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'Automation-Cypress/e2e/**/*.cy.js',
    supportFile: 'Automation-Cypress/support/e2e.js',
    testIsolation: true,
  },
});
