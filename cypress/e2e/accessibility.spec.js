describe('Accessibility checks', () => {
  it('Home page has no detectable a11y violations on load', () => {
    cy.visit('/');
    cy.checkA11y();
  });
});
