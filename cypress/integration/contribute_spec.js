// import mockGraphQL from 'cypress-mock-graphql'
// import schema from '../fixtures/schema.graphql'

describe('Contribute', function() {
  const companyId = '00e89587-e92e-44cb-b64a-a470100ffeb4'

  it('Goes to forst step of contributing process when clicking on contribute', function() {
    cy.visit('/')
    cy.contains('contribute').click()
    cy.url().should('include', '/add')
    cy.get('[data-cy=office-name]')
  })
  it('Searches and finds and uses an existing company', function() {
    cy.visit('/add')
    cy.url().should('include', '/add')
    cy.get('[data-cy=office-name]')
      .type('henn')
      .should('have.value', 'henn')

    cy.get('#results').contains('HENN')
    cy.get('#results')
      .contains('select')
      .first()
      .click()

    cy.url().should('include', '/add/')
    cy.contains('HENN')
    cy.contains('All good, continue').click()
  })
  it.only('Goes through personal flow wfh01', function() {
    cy.visit(`/add/${companyId}/personal`)
    // personal form
    cy.url().should('include', '/personal')
    // name
    cy.get('[data-cy=previous]')
      .as('previous')
      .should('not.be.visible')
    cy.get('[data-cy=next]')
      .as('next')
      .should('be.disabled')
    cy.get('[data-cy=name]')
      .type('John')
      .should('have.value', 'John')
    cy.get('@next').click()
    // wfh
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=wfh]')
    cy.get('[data-cy=1]')
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]').check()
    cy.get('@next').click()
    // own_experience
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=own_experience]')
    cy.get('[data-cy=1]')
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]').check()
    cy.get('@next').click()
    // own_experience_text
    cy.get('@previous')
    cy.get('@next').contains('skip').should('be.enabled')
    cy.get('[data-cy=own_experience_text]').get('.input').type('trying to type')
    cy.get('@next').contains('next').click()
    //hardware
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=hardware]')
    cy.get('[data-cy=false]')
    cy.get('[data-cy=true]').check()
    cy.get('@next').click()
  })
})
