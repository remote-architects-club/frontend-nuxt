// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add('mockGraphQL', ({ handler, data }) => {
//   cy.on('window:before:load', (win) => {
//     win.fetch = (path, { body, method }) => {
//       if (path === Cypress.env('API_BASE_URL') && method === 'POST') {
//         if (handler) return responseStub(handler(JSON.parse(body)))
//         return responseStub(data)
//       }
//       throw new Error('Unhandled fetch request that needs to be stubbed.')
//     }
//   })
// })

// function responseStub(result) {
//   return Promise.resolve({
//     json() {
//       return Promise.resolve(result)
//     },
//     text() {
//       return Promise.resolve(JSON.stringify(result))
//     },
//     ok: true
//   })
// }
