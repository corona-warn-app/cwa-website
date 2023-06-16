const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  viewportWidth: 1000,
  viewportHeight: 600,
  fixturesFolder: './cypress/fixtures',
  screenshotsFolder: './cypress/screenshots',
  chromeWebSecurity: false,
  requestTimeout: 30000,
  numTestsKeptInMemory: 0,
  responseTimeout: 50000,
  pageLoadTimeout: 100000,
  e2e: {
    setupNodeEvents(on, config) {
      // This enables us to log to console by using cy.task("log", "Message to log")
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    },
    baseUrl: 'http://localhost:8000',
  },
})
