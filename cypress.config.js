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
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:8000',
  },
})
