describe('Sticky Date Bar', () => {
  it('prefills listing cards after search', () => {
    cy.visit('/');
    cy.contains('Select dates').click();
    cy.get('.rdp-day:not(.rdp-day_disabled)').eq(0).click();
    cy.get('.rdp-day:not(.rdp-day_disabled)').eq(4).click();
    cy.get('.sticky-bar select').select('2');
    cy.contains('Search').click();
    cy.get('.card').first().within(() => {
      cy.get('.availability').contains('Available');
      cy.get('select').should('have.value', '2');
    });
  });
});
