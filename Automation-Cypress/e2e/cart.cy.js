describe('Shopping cart', () => {
  beforeEach(() => cy.login());

  it('CART-001 | keeps the selected product after reload', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    cy.reload();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item"]').should('have.length', 1);
    cy.get('[data-test="inventory-item-name"]').should('have.text', 'Sauce Labs Backpack');
    cy.get('[data-test="inventory-item-price"]').should('have.text', '$29.99');
  });

  it('CART-002 | removes a product and clears the badge', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="inventory-item"]').should('not.exist');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });
});
