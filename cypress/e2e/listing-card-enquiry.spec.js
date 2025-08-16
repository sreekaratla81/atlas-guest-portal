describe('Listing Card enquiry flow', () => {
  it('opens enquiry modal with selected details', () => {
    cy.visit('/');
    cy.get('.lc-card').first().within(() => {
      cy.get('select').select('2');
      cy.contains('Preferred dates').click();
    });
    cy.get('.lc-popover .rdp-day:not(.rdp-day_disabled)').eq(0).click();
    cy.get('.lc-popover .rdp-day:not(.rdp-day_disabled)').eq(4).click();
    cy.contains('Enquire Now').click();
    cy.get('.modal').should('be.visible');
    cy.contains('Send Enquiry');
  });
});
