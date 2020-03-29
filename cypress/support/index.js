// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// support/index.js

// to support FETCH stubbing
const getFetchPolyfill = async () => {
  const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js'
  return await window.fetch(polyfillUrl).then((res) => {
    if (res.ok) {
      return res.text()
    }
  })
}

Cypress.Commands.overwrite('visit', async (originalFn, url, options) => {
  let polyfill = !window.fetchPoly && (await getFetchPolyfill())

  const opts = Object.assign({}, options, {
    onBeforeLoad: (window, ...args) => {
      if (!window.fetchPoly) {
        delete window.fetch
        window.eval(polyfill)
        window.fetchPoly = true
        window.fetch = window.unfetch
      }

      if (options && options.onBeforeLoad) {
        return options.onBeforeLoad(window, ...args)
      }
    }
  })

  return originalFn(url, opts)
})
