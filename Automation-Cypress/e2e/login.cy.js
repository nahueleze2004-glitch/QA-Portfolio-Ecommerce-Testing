describe('Suite de Pruebas Automatizadas - Swag Labs', () => {
  
  // Hook que se ejecuta antes de cada test
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
  });

  it('TC-01: Login Exitoso con usuario estándar', () => {
    // Definimos los selectores (Best Practice)
    const usernameInput = '[data-test="username"]';
    const passwordInput = '[data-test="password"]';
    const loginBtn = '[data-test="login-button"]';
    
    // Interacción con elementos
    cy.get(usernameInput).should('be.visible').type('standard_user');
    cy.get(passwordInput).type('secret_sauce');
    cy.get(loginBtn).click();

    // Aserción (Validación automática)
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('TC-02: Login Fallido - Usuario Bloqueado', () => {
    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Validar mensaje de error
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain', 'Epic sadface: Sorry, this user has been locked out.');
  });
});
