describe('Booking Summary validation', () => {
  it('requires guest details before proceeding', () => {
    cy.visit('/');
    cy.get('.card').first().within(() => {
      cy.get('select').select('2');
      cy.contains('Select dates').click();
    });
    cy.get('.popover .rdp-day:not(.rdp-day_disabled)').eq(0).click();
    cy.get('.popover .rdp-day:not(.rdp-day_disabled)').eq(4).click();
    cy.contains('Book Now').click();
    cy.url().should('include', '/booking/summary');
    cy.window().then(win => cy.stub(win.console, 'log').as('log'));
    cy.contains('Proceed to Pay').click();
    cy.get('@log').should('not.be.called');
    cy.get('input[name="name"]').type('Alice');
    cy.get('input[name="phone"]').type('1234567890');
    cy.get('input[name="email"]').type('alice@example.com');
    cy.contains('Proceed to Pay').click();
    cy.get('@log').should('be.called');
  });
});
