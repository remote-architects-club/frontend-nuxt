// tests that everything that should be on home is on home

describe('Home', () => {
  // const url = '/v1/graphql'
  beforeEach(() => {
    // cy.server({
    //   method: 'POST',
    //   delay: 800,
    //   headers: {
    //     'content-type': 'application/json; charset=utf-8'
    //   }
    // })
    // cy.fixture('companies').then((results) => {
    //   cy.route({
    //     url,
    //     status: 200,
    //     response: results
    //   })
    // })
    cy.visit('/')
  })
  it('Contains the logo', () => {
    cy.get('[data-cy=logo]')
  })
  it('Contains the main menu', () => {
    cy.get('[data-cy=main-menu]')
  })
  it('Contains the big contribute button', () => {
    cy.contains('contribute').click()
    cy.url().should('include', '/add')
  })
  it('Contains the map', () => {
    cy.get('[data-cy=map]')
  })
  it('Has a Experience comments section with 3 items and a read more link', () => {
    cy.get('[data-cy=snippets]')
      .as('snippets')
      .get('[data-cy=own-experience]')
      .get('[data-cy=own-experience-list]')
      .as('own-experience-list')
      .children()
      .should('have.length', 3)

    cy.get('@own-experience-list')
      .contains('read more')
      .first()
      .click()
    cy.url().should('include', '/company?id=')
  })
  it('Has a tools comments section with 4 items and a read more link', () => {
    cy.get('[data-cy=snippets]').as('snippets')
    cy.get('@snippets')
      .get('[data-cy=tools]')
      .get('[data-cy=tools-list]')
      .as('tools-list')
      .children()
      .should('have.length', 4)

    cy.get('@tools-list')
      .contains('read more')
      .first()
      .click()
    cy.url().should('include', '/company?id=')
  })
  it('Has a Tools Top 10 snippet section with 10 items and links to the tools', () => {
    cy.get('[data-cy=snippets]').as('snippets')
    cy.get('@snippets')
      .get('[data-cy=tools-top-10]')
      .get('[data-cy=tools-top-10-list]')
      .children()
      .as('tools-top-10-list-items')
      .should('have.length', 10)
    cy.get('@tools-top-10-list-items')
      .find('a')
      .first()
      .click()
    cy.url().should('include', '/tools/tool?id=')
  })
  it('Contains the main contributions list with 10 items', () => {
    cy.get('[data-cy=contribution-list]')
      .children()
      .should('have.length', 10)
  })
  it('Has a footer', () => {
    cy.get('[data-cy=footer]')
  })
})
