describe('Sticky Date Bar', () => {
  it('prefills listing cards after search', () => {
    cy.visit('/');
    cy.contains('Preferred dates').click();
    cy.get('.rdp-day:not(.rdp-day_disabled)').eq(0).click();
    cy.get('.rdp-day:not(.rdp-day_disabled)').eq(4).click();
    cy.get('.sb-select').select('2');
    cy.contains('Search').click();
    cy.get('.lc-card').first().within(() => {
      cy.get('.lc-pill').contains('Dates noted');
      cy.get('select').should('have.value', '2');
    });
  });
});
