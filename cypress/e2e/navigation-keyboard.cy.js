describe('main navigation keyboard access', () => {
  it('opens listing dropdown and tabs through items', () => {
    cy.visit('/');
    cy.get('button[aria-haspopup="true"]').focus().type('{downarrow}');
    cy.focused().should('contain', 'Penthouse 501');
    cy.focused().type('{tab}');
    cy.focused().should('contain', 'Room 301');
  });
});
