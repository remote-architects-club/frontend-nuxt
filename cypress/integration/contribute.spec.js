// import mockGraphQL from 'cypress-mock-graphql'
// import schema from '../fixtures/schema.graphql'

describe('Contribute', function() {
  const url = 'https://remotearchitectsclub-stg.herokuapp.com/v1/graphql'
  beforeEach(() => {
    cy.server({
      method: 'POST',
      delay: 800,
      headers: {
        'content-type': 'application/json; charset=utf-8'
      }
    })
    cy.route({
      url: 'https://api.ipify.org/?format=json',
      method: 'GET',
      status: 200,
      response: {
        ip: '95.90.239.239'
      }
    })
    cy.fixture('search_offices').as('search_offices')
  })
  it('Goes to first step of contributing process when clicking on contribute', function() {
    cy.visit('/')
    cy.contains('contribute').click()
    cy.url().should('include', '/add')
    cy.get('[data-cy=office-name]')
  })
  it('Adds new company', function() {
    const name =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    const city = 'Berlin'
    const website = 'http://example.com'
    const country = 'ZW'
    // search page
    cy.fixture('countries').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.visit('/add')
    cy.url().should('include', '/add')
    // search offices results will be empty
    cy.route({
      url,
      status: 200,
      response: { data: { search_offices: [] } }
    })
    cy.get('[data-cy=office-name]')
      .type(name)
      .should('have.value', name)
    cy.get('[data-cy=results]').should('not.exist')
    cy.get('[data-cy=not-found]')
    cy.get('[data-cy=btn-add-new')
      .contains(name)
      .click()
    // add form
    cy.get('[data-cy="add-form"]').as('add-form')
    cy.get('[data-cy=input-name]')
      .as('name')
      .should('have.value', name)
    cy.get('[data-cy=input-city]').as('city')
    cy.get('[data-cy=select-country]').as('country')
    cy.get('[data-cy=input-website]').as('website')
    cy.get('[data-cy=radio-size]').as('size')
    cy.get('[data-cy=btn-save]')
      .as('save')
      .should('be.disabled')
    cy.get('[data-cy=btn-cancel]').as('cancel')
    // type values
    cy.get('@city').type(city)
    cy.get('@city').should('have.value', city)
    cy.get('@save')
      .as('save')
      .should('be.disabled')
    cy.get('@country').select('Andorra') // first country
    cy.get('@country').select('Zimbabwe') // last country
    cy.get('@save').should('be.enabled')
    cy.get('@website').type(website)
    cy.get('@website').should('have.value', website)
    // check error website
    cy.get('@website')
      .clear()
      .type('wrong format')
    cy.get('[data-cy=error-website]').should('be.visible')
    cy.get('@website')
      .clear()
      .type(website)
    cy.get('[data-cy=error-website]').should('not.be.visible')
    //check error city
    cy.get('@city').clear()
    cy.get('[data-cy=error-city]').should('be.visible')
    cy.get('@city')
      .clear()
      .type(city)
    cy.get('[data-cy=error-city]').should('not.be.visible')
    //check error name
    cy.get('@name').clear()
    cy.get('[data-cy=error-name]').should('be.visible')
    cy.get('@name')
      .clear()
      .type(name)
    cy.get('[data-cy=error-name]').should('not.be.visible')
    cy.fixture('insert_office').then((results) => {
      results.data.insert_office.returning[0].name = name
      results.data.insert_office.returning[0].url = website
      results.data.insert_office.returning[0].city = city
      results.data.insert_office.returning[0].country_iso = country
      cy.route({
        url,
        status: 200,
        response: results
      })
      cy.get('@save').click()
      cy.url().should(
        'include',
        `/add/company?id=${results.data.insert_office.returning[0].id}`
      )
    })
    cy.contains(name)
    cy.contains(city)
    cy.contains(country)
    // cancel
    // cy.get('@cancel').click()
    // cy.get('@add-form').should('not.exist')
    // cy.get('[data-cy=office-name]')
  })
  it('Searches and finds and uses an existing company', function() {
    cy.fixture('countries').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.visit('/add')
    cy.url().should('include', '/add')
    cy.fixture('search_offices').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.get('[data-cy=office-name]')
      .type('henn')
      .should('have.value', 'henn')

    cy.get('[data-cy=results]').contains('HENN')
    cy.fixture('office_by_pk').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.get('[data-cy=results]')
      .contains('select')
      .first()
      .click()
    cy.fixture('office_by_pk').then((results) => {
      cy.url().should(
        'include',
        `/add/company?id=${results.data.office_by_pk.id}`
      )
      cy.contains(`${results.data.office_by_pk.name}`)
    })
    cy.contains('All good, continue').click()
    cy.fixture('office_by_pk').then((results) => {
      cy.url().should(
        'include',
        `/add/personal?id=${results.data.office_by_pk.id}`
      )
    })
  })
  it('Goes through personal flow wfh01', function() {
    cy.fixture('office_by_pk').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
      cy.visit(`/add/personal?id=${results.data.office_by_pk.id}`)
    })
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
    cy.get('[data-cy=own_experience_text]')
      .get('.input')
      .type('trying to type')
    cy.get('@next').click()
    //hardware
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=hardware]')
    cy.get('[data-cy=false]')
    cy.get('[data-cy=true]').check()
    cy.get('@next').click()
    //colleagues
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=is_wfh_colleagues]')
    cy.get('[data-cy=1]')
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]').check()
    cy.get('@next').click()
    //tools
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=tools]')
    cy.get('[data-cy=1]')
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]').check()
    cy.get('[data-cy=tools_text]')
      .get('.input')
      .type('trying to type')
    cy.get('@next').click()
    //company
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=company]')
    cy.get('[data-cy=1]')
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]').check()
    cy.get('[data-cy=company_text]')
      .get('.input')
      .type('trying to type')
    cy.get('@next').click()
    // final tips
    cy.get('@previous')
    cy.get('@next')
      .contains('finish')
      .should('be.enabled')
    cy.get('[data-cy=final_tips]')
      .get('.input')
      .type('trying to type')
    // cy.get('@next').click()
  })
  it('Goes through personal flow wfh02', function() {
    cy.visit('/add')
    cy.url().should('include', '/add')
    cy.fixture('search_offices').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.get('[data-cy=office-name]')
      .type('henn')
      .should('have.value', 'henn')

    cy.get('[data-cy=results]').contains('HENN')
    cy.get('[data-cy=results]')
      .contains('select')
      .first()
      .click()
    cy.fixture('office_by_pk').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })

    cy.url().should('include', '/add/')
    cy.contains('All good, continue').click()
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
    cy.get('[data-cy=1]').check()
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]')
    cy.get('[data-cy=own_experience_text]')
    cy.get('@next').click()
    //hardware
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=hardware]')
    cy.get('[data-cy=false]').check()
    cy.get('[data-cy=true]')
    cy.get('@next').click()
    //colleagues
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=is_wfh_colleagues]')
    cy.get('[data-cy=1]')
    cy.get('[data-cy=2]').check()
    cy.get('[data-cy=0]')
    cy.get('@next').click()
    //tools
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=tools]')
    cy.get('[data-cy=1]')
    cy.get('[data-cy=2]').check()
    cy.get('[data-cy=0]')
    cy.get('[data-cy=tools_text]')
    cy.get('@next').click()
    //company
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=company]')
    cy.get('[data-cy=1]').check()
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]')
    cy.get('[data-cy=company_text]')
    cy.get('@next').click()
    // final tips
    cy.get('@previous')
    cy.get('@next')
      .contains('finish')
      .should('be.enabled')
    cy.get('[data-cy=final_tips]')
    // cy.get('@next').click()
  })
  it('Goes through personal flow NOT wfh01', function() {
    cy.fixture('countries').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.visit('/add')
    cy.url().should('include', '/add')
    cy.fixture('search_offices').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })

    cy.get('[data-cy=office-name]')
      .type('henn')
      .should('have.value', 'henn')

    cy.get('[data-cy=results]').contains('HENN')
    cy.get('[data-cy=results]')
      .contains('select')
      .first()
      .click()
    cy.fixture('office_by_pk').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.route({
      url: 'https://api.ipify.org/?format=json',
      method: 'GET',
      status: 200,
      response: {
        ip: '95.90.239.239'
      }
    })
    cy.url().should('include', `/add/company?id=`)
    cy.contains('HENN')
    cy.contains('All good, continue').click()
    // personal form
    cy.url().should('include', '/personal?id=')
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
    cy.get('[data-cy=1]').check() //not working from home
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]')
    cy.get('@next').click()
    // not wfh reason
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=not_wfh_reason]')
    cy.get('[data-cy=1]').check()
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]')
    cy.get('[data-cy=not_wfh_reason_text]')
    cy.get('@next').click()
    //colleagues
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=not_wfh_colleagues]')
    cy.get('[data-cy=1]')
    cy.get('[data-cy=2]').check()
    cy.get('[data-cy=0]')
    cy.get('@next').click()
    //tools
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=tools]')
    cy.get('[data-cy=1]')
    cy.get('[data-cy=2]').check()
    cy.get('[data-cy=0]')
    cy.get('[data-cy=tools_text]')
    cy.get('@next').click()
    //company
    cy.get('@previous')
    cy.get('@next').should('be.disabled')
    cy.get('[data-cy=company]')
    cy.get('[data-cy=1]').check()
    cy.get('[data-cy=2]')
    cy.get('[data-cy=0]')
    cy.get('[data-cy=company_text]')
    cy.get('@next').click()
    // final tips
    cy.get('@previous')
    cy.get('@next')
      .contains('finish')
      .should('be.enabled')
    cy.get('[data-cy=final_tips]')
    cy.fixture('insert_experience').then((results) => {
      cy.route({
        url,
        status: 200,
        response: results
      })
    })
    cy.get('@next').click()
    cy.contains('Thank you!')
  })
})
