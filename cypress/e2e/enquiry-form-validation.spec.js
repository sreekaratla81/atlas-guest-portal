describe('Enquiry form validation', () => {
  it('requires user details before sending', () => {
    cy.visit('/');
    cy.get('.lc-card').first().within(() => {
      cy.contains('Book Now').click();
      cy.contains('Enquire').click();
    });
    cy.get('.modal').within(() => {
      cy.contains('Send Enquiry').click();
      cy.get('input:invalid').should('have.length', 3);
    });
  });
});
