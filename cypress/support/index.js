import 'cypress-plugin-snapshots/commands';

const removeTrailingSlash = (str) => {
  if (str.endsWith('/')) {
    str = str.slice(0, -1);
  }
  return str;
}

Cypress.Commands.add('expectPathToBe', (pathToCheck, timeout = undefined) =>
  cy.location({ timeout }).should(location => {
    expect(removeTrailingSlash(location.pathname)).to.eq(removeTrailingSlash(pathToCheck));
  })
);