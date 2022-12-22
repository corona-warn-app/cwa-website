describe('Test Appstore Buttons', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Apple and Google badge should be visible', () => {
    cy.get('img[src="/assets/img/App_Store_Badge_US-UK.svg"]').should('be.visible');
    cy.get('img[src="/assets/img/google-play-badge.svg"]').should('be.visible');
  })

  it('Click on Apple Badge should link to the correct URL which opens in a new tab/window', () => {
    cy.get('img[src="/assets/img/App_Store_Badge_US-UK.svg"]').parent().should('have.attr', 'target', '_blank')
    cy.get('img[src="/assets/img/App_Store_Badge_US-UK.svg"]').parent().should('have.attr', 'href', 'https://apps.apple.com/de/app/corona-warn-app/id1512595757')
  })

  it('Click on Google Badge should link to the correct URL which opens in a new tab/window', () => {
    cy.get('img[src="/assets/img/google-play-badge.svg"]').parent().should('have.attr', 'target', '_blank')
    cy.get('img[src="/assets/img/google-play-badge.svg"]').parent().should('have.attr', 'href', 'https://play.google.com/store/apps/details?id=de.rki.coronawarnapp')
  })

})
