describe('Test Hotline phone number', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Verify App and TAN Hotline', () => {
    cy.get('body').find('[data-e2e="hotline-app"]').contains('Hotline App')
    cy.get('body').find('[data-e2e="hotline-app"]').contains('0800 7540001')
    cy.get('body').find('[data-e2e="hotline-app"]').contains('+49 30 498 75401')

    cy.get('body').find('[data-e2e="hotline-tan"]').contains('Hotline TAN')
    cy.get('body').find('[data-e2e="hotline-tan"]').contains('0800 7540002')
    cy.get('body').find('[data-e2e="hotline-tan"]').contains('+49 30 498 75402')
  })
})
