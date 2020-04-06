describe('Toast on Home Page', function() {
  it('When loading home, toast is present', function() {
    cy.visit('/')
    cy.get('[data-cy=toast-subscribe]')
  })
  it('Closes when clicking the close button', () => {
    cy.visit('/')
    cy.get('[data-cy=toast-subscribe]')
      .as('toast')
      .get('[data-cy=close-btn]')
      .click()
    cy.get('@toast').should('not.exist')
  })
})
