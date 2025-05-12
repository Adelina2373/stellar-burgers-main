describe('Constructor Page', () => {
  beforeEach(() => {
    // Используйте полный URL или относительный путь
    cy.visit('/constructor'); // или cy.visit('http://localhost:4000/constructor')
  });

  it('Should display main elements', () => {
    cy.contains('Соберите бургер', { matchCase: false }).should('be.visible');
    cy.get('[data-testid="ingredients-section"]').should('exist');
  });
});