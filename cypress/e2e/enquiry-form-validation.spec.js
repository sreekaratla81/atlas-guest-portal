describe('Enquiry form validation', () => {
  it('requires user details before sending', () => {
    cy.visit('/');
    cy.get('.lc-card').first().within(() => {
      cy.contains('Enquire Now').click();
    });
    cy.get('.modal').within(() => {
      cy.contains('Send Enquiry').click();
      cy.get('input:invalid').should('have.length', 3);
    });
  });
});
