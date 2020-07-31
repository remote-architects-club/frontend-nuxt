// const url = 'https://remotearchitectsclub-api.herokuapp.com/v1/graphql'
import faker from 'faker'
describe('Tool Page', function () {
  const url = '/v1/graphql'
  beforeEach(() => {
    cy.server({
      method: 'POST',
      delay: 800,
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    })
  })
  it('From home, click on an tool chip and go to tool page', function () {
    cy.fixture('companies').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results,
      })
    })
    cy.visit('/')
    cy.fixture('countries').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results,
      })
    })
    cy.fixture('tool_by_pk').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results,
      })
    })
    cy.contains('Microsoft Teams').click()
    cy.url().should('include', '/tools/tool?id=')
    cy.get('[data-cy=name]')
    cy.get('[data-cy=url]')
    cy.get('[data-cy=logo]')
    cy.get('[data-cy=price]')
    cy.get('[data-cy=categories]')
    cy.get('[data-cy=description]')
    cy.get('[data-cy=comments]')
    cy.get('[data-cy=companies]')
  })
  it('Can add comments', () => {
    cy.fixture('tool_by_pk').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results,
      })
    })
    const name = faker.name.firstName()
    const comment = faker.lorem.sentences().slice(0, 279)
    const date = new Date()
    const id = faker.random.uuid()
    cy.visit('/tools/tool?id=4712b8fe-b87e-49a4-8a3a-1f9bff06accd')
    cy.get('[data-cy=comments]').as('commentsSection').contains('comments')

    cy.get('@commentsSection')
      .contains('add comment')
      .as('addCommentBtn')
      .click()
    cy.get('@addCommentBtn').should('not.exist')
    cy.get('[data-cy=formAddComment]').as('formAddComment')
    cy.get('@formAddComment').contains('cancel').click()
    cy.get('@formAddComment').should('not.exist')

    cy.get('@addCommentBtn').click()
    cy.get('@formAddComment')
      .contains('save')
      .as('saveBtn')
      .should('be.disabled')
    cy.get('@formAddComment')
      .get('[data-cy="inputCommenterName"]')
      .type(name)
      .should('have.value', name)
    cy.get('@saveBtn').should('be.disabled')
    cy.get('@formAddComment')
      .get('[data-cy=inputComment]')
      .get('.input')
      .as('inputComment')
      .type(comment)
      .should('have.value', comment)
    cy.fixture('insert_tool_comment').then((results) => {
      results.data.insert_tool_comment.returning[0].id = id
      results.data.insert_tool_comment.returning[0].name = name
      results.data.insert_tool_comment.returning[0].comment = comment
      results.data.insert_tool_comment.returning[0].created_at = date
      cy.route({
        url,
        status: 200,
        response: results,
      })
    })
    cy.get('@saveBtn').click()
    cy.get('[data-cy=comment-list]').as('commentList').contains(name)
    cy.get('@commentList').contains(comment)
  })
  it('Displays all comments', () => {
    const numComments = 10

    cy.fixture('tool_by_pk').then((results) => {
      // get tool_id
      const tool_id = results.data.tool_by_pk.id
      // populate random comments
      const comments = []
      for (let i = 0; i < numComments; i++) {
        comments.push({
          id: faker.random.uuid(),
          name: faker.name.firstName(),
          comment: faker.lorem.sentences().slice(0, 279),
          created_at: faker.date.recent(),
          __typename: 'tool_comment',
        })
      }
      results.data.tool_by_pk.tool_comments = comments

      cy.route({
        url,
        status: 200,
        response: results,
      })
      cy.visit(`/tools/tool?id=${tool_id}`)
    })
    cy.get('[data-cy=comment-list]')
      .as('commentList')
      .children()
      .should('have.length', numComments)
  })
  it('Displays companies', () => {
    const numCompanies = 10

    cy.fixture('tool_by_pk').then((results) => {
      // get tool_id
      const tool_id = results.data.tool_by_pk.id
      // populate random comments
      const companies = []
      for (let i = 0; i < numCompanies; i++) {
        companies.push({
          office: {
            id: faker.random.uuid(),
            name: faker.company.companyName(),
            city: faker.address.city(),
            country_iso: faker.address.countryCode(),
            __typename: 'office',
          },
          __typename: 'office_tool',
        })
      }
      results.data.tool_by_pk.office_tools = companies

      cy.route({
        url,
        status: 200,
        response: results,
      })
      cy.visit(`/tools/tool?id=${tool_id}`)
    })
    cy.get('[data-cy=company-list]').should('not.exist')
    cy.get('[data-cy=companies]')
      .contains(`used by ${numCompanies} companies`)
      .as('openCompanyListBtn')
      .click()
    cy.get('[data-cy=company-list]')
      .children()
      .should('have.length', numCompanies)
    cy.get('@openCompanyListBtn').click()
    cy.get('[data-cy=company-list]').should('not.exist')
  })
})
