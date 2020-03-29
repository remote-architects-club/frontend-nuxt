describe('Subscribe', function() {
  beforeEach(() => {
    cy.visit('/')
  })
  it('can fill the form', function() {
    cy.get('[data-cy="subscribe"]')
      .as('subscribe-form')
      .get('[data-cy="email-input"]')
      .as('email-input')
      .type('danrocha@gmail.com')
    cy.get('@email-input').should('have.value', 'danrocha@gmail.com')
  })
  it('does not submit if email is invalid', function() {
    cy.get('input:invalid').should('have.length', 0)
    cy.get('[data-cy="subscribe"]')
      .as('subscribe-form')
      .get('[data-cy="email-input"]')
      .as('email-input')
      .type('danrocha')
    cy.get('@subscribe-form')
      .contains('subscribe')
      .as('submit-button')
      .click()
    cy.get('input:invalid').should('have.length', 1)
    // cy.get('@email-input').then(($input) => {
    //   expect($input[0].validationMessage).to.eq('I expect an email!')
    // })
  })
  it('submits and shows success message', function() {
    cy.server()
    cy.route({
      url: '/.netlify/functions/**',
      method: 'GET',
      response: 'subscribed',
      status: 200
    })
    cy.get('[data-cy="subscribe"]')
      .as('subscribe-form')
      .get('[data-cy="email-input"]')
      .as('email-input')
      .type('danrocha@gmail.com')
    cy.get('@subscribe-form')
      .contains('subscribe')
      .as('submit-button')
      .click()
    cy.get('@subscribe-form').should('not.exist')
    cy.get('[data-cy="subscribe-success"]')
  })
  it.only('submits and shows error message', function() {
    cy.server()
    cy.route({
      url: '/.netlify/functions/**',
      method: 'GET',
      response: 'server error',
      status: 500
    })
    cy.get('[data-cy="subscribe"]')
      .as('subscribe-form')
      .get('[data-cy="email-input"]')
      .as('email-input')
      .type('danrocha@gmail.com')
    cy.get('@subscribe-form')
      .contains('subscribe')
      .as('submit-button')
      .click()
    cy.get('[data-cy="subscribe-failure"]')
      .contains('try again')
      .click()
    cy.get('[data-cy="subscribe-failure"]').should('not.exist')
    cy.get('@subscribe-form')
  })
})
