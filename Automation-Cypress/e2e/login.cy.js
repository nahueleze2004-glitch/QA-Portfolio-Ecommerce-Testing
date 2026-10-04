describe('Authentication', () => {
  it('AUTH-001 | accepts a standard user', () => {
    cy.login();
    cy.location('pathname').should('eq', '/inventory.html');
    cy.get('[data-test="title"]').should('have.text', 'Products');
    cy.get('[data-test="inventory-item"]').should('have.length', 6);
  });

  it('AUTH-002 | rejects a locked user', () => {
    cy.login('locked_out_user');
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.');
    cy.location('pathname').should('not.eq', '/inventory.html');
  });

  it('AUTH-003 | rejects an invalid password', () => {
    cy.login('standard_user', 'incorrect_password');
    cy.get('[data-test="error"]').should('be.visible')
      .and('contain.text', 'Username and password do not match');
    cy.location('pathname').should('not.eq', '/inventory.html');
  });

  it('AUTH-004 | requires a username', () => {
    cy.visit('/');
    cy.get('[data-test="login-button"]').click();
    cy.get('[data-test="error"]').should('contain.text', 'Username is required');
  });

  it('AUTH-005 | logs out and prevents access to inventory', () => {
    cy.login();
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.get('[data-test="login-button"]').should('be.visible');
    cy.visit('/inventory.html', { failOnStatusCode: false });
    cy.get('[data-test="login-button"]').should('be.visible');
    cy.location('pathname').should('not.eq', '/inventory.html');
  });
});
