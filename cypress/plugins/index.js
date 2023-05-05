/// <reference types="cypress" />
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // This enables us to log to console by using cy.task("log", "Message to log")
  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
  });
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
}
