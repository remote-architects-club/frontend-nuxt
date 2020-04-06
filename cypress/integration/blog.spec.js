describe('Blog Page', function() {
  it('From home, click on BLOG in the menu and go to blog page', function() {
    cy.visit('/')
    cy.contains('blog').click()
    cy.url().should('include', '/blog')
  })
  it('From home, click on BLOG in the footer and go to blog page', function() {
    cy.visit('/')
    cy.get('[data-cy=footer]')
      .contains('blog')
      .click()
    cy.url().should('include', '/blog')
  })
})
