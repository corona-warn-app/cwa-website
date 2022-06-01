describe('Blog - News Archive', () => {
  const clickLanguage = (lng) => cy.get('.nav-item.lang a').contains(lng).click()

  it('news archive', () => {
    cy.visit('/en/blog/archive')
    cy.get('.headline').contains('News Archive')

    clickLanguage('DE')
    cy.get('.headline').contains('News Archiv')
    cy.expectPathToBe('/de/blog/archiv')

    cy.get('a').contains('Zurück zum Blog').click()
    cy.expectPathToBe('/de/blog/')
  })

})
