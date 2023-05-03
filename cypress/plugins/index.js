/// <reference types="cypress" />
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
  });
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
