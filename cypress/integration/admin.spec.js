describe('Admin', function () {
  it('If user not logged in, goes to login page', function () {
    cy.visit('/admin')
    cy.url().should('include', '/admin/login')
    cy.contains('click to login')
    cy.visit('/admin/tools')
    cy.url().should('include', '/admin/login')
    cy.contains('click to login')
    cy.visit('/admin/articles')
    cy.url().should('include', '/admin/login')
    cy.contains('click to login')
  })
})
