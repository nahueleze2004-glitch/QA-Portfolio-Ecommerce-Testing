describe('Checkout', () => {
  beforeEach(() => cy.startCheckout());

  it('CHECKOUT-001 | completes an order with correct totals', () => {
    cy.get('[data-test="firstName"]').type('Test');
    cy.get('[data-test="lastName"]').type('Buyer');
    cy.get('[data-test="postalCode"]').type('1629');
    cy.get('[data-test="continue"]').click();
    cy.location('pathname').should('eq', '/checkout-step-two.html');
    cy.get('[data-test="inventory-item-name"]').should('have.text', 'Sauce Labs Backpack');
    cy.get('[data-test="subtotal-label"]').should('have.text', 'Item total: $29.99');
    cy.get('[data-test="tax-label"]').should('have.text', 'Tax: $2.40');
    cy.get('[data-test="total-label"]').should('have.text', 'Total: $32.39');
    cy.get('[data-test="finish"]').click();
    cy.location('pathname').should('eq', '/checkout-complete.html');
    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });

  [
    { id: 'CHECKOUT-002', missing: 'firstName', message: 'First Name is required' },
    { id: 'CHECKOUT-003', missing: 'lastName', message: 'Last Name is required' },
    { id: 'CHECKOUT-004', missing: 'postalCode', message: 'Postal Code is required' },
  ].forEach(({ id, missing, message }) => {
    it(`${id} | requires ${missing}`, () => {
      const data = { firstName: 'Test', lastName: 'Buyer', postalCode: '1629' };
      Object.entries(data).forEach(([field, value]) => {
        if (field !== missing) cy.get(`[data-test="${field}"]`).type(value);
      });
      cy.get('[data-test="continue"]').click();
      cy.get('[data-test="error"]').should('be.visible').and('contain.text', message);
      cy.location('pathname').should('eq', '/checkout-step-one.html');
    });
  });
});
