describe('Listing Card booking flow', () => {
  it('navigates to summary with selected details', () => {
    cy.visit('/');
    cy.get('.card').first().within(() => {
      cy.get('select').select('2');
      cy.contains('Select dates').click();
    });
    cy.get('.popover .rdp-day:not(.rdp-day_disabled)').eq(0).click();
    cy.get('.popover .rdp-day:not(.rdp-day_disabled)').eq(4).click();
    cy.contains('Book Now').click();
    cy.url().should('include', '/booking/summary');
    cy.contains('Guests: 2');
  });
});
