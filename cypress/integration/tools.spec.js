// import faker from 'faker'

describe('Tool Page', function() {
  const url = '/v1/graphql'
  beforeEach(() => {
    cy.server({
      method: 'POST',
      delay: 800,
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    })
  })

  it('From home, click on tools in the menu and go to tools page', function() {
    cy.fixture('companies').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.visit('/')
    cy.fixture('tools').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.contains('tools').click()
    cy.url().should('include', '/tools')
    cy.fixture('tool_by_pk').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.get('[data-cy="tools-list"]')
      .get('[data-cy="tool-item"]')
      .first()
      .click()
    cy.url().should('include', '/tools/tool?id=')
  })
})
