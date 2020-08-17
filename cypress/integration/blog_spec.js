describe('Blog', () => {
  const firstBlogEntry = () => cy.get('.blog-entry').first();
  const clickLanguage = (lng) => cy.get('.nav-item.lang a').contains(lng).click()
  const pageName = "2099-01-01-visual-test-page";

  it('slider overview and go to blog detail page', () => {
    cy.visit('/en/')
    cy.get('[data-e2e="blog-slider"] h2.headline').contains('Stay up to date!')
    cy.get('[data-e2e="blog-slider"] .slick-slide').contains('Visual Test')

    cy.get('[data-e2e="blog-slider"] .slick-active').first().find('a.btn').click()

    cy.expectPathToBe('/en/blog/' + pageName)
  })

  it('blog language switching', () => {
    cy.visit('/en/blog/' + pageName)
    clickLanguage('DE')
    cy.expectPathToBe('/de/blog/2099-01-01-visual-test-page')

    cy.get('a').contains('Zurück zum Blog').click()
    cy.expectPathToBe('/de/blog')

    firstBlogEntry().find('.headline').contains('Visual Test')
    firstBlogEntry().find('a').contains('Weiterlesen').click()
    cy.expectPathToBe('/de/blog/' + pageName)

    clickLanguage('EN');
    cy.expectPathToBe('/en/blog/' + pageName)
  })

  it('news archive', () => {
    cy.visit('/en/blog/archive')
    cy.get('.headline').contains('News Archive')

    clickLanguage('DE')
    cy.get('.headline').contains('News Archiv')
    cy.expectPathToBe('/de/blog/archiv')

    cy.get('a').contains('Zurück zum Blog').click()
    cy.expectPathToBe('/de/blog/')

    firstBlogEntry().find('.headline').contains('Visual Test')
    firstBlogEntry().find('a').contains('Weiterlesen').click()
    cy.expectPathToBe('/de/blog/'+ pageName)

    clickLanguage('EN')
    cy.expectPathToBe('/en/blog/' + pageName)
  })

  describe('Visual Comparison', () => {
    it('detail page', () => {
      cy.visit('/en/blog/' + pageName)
      // To update a snapshot image just delete it from __image_snapshots__, run e2e test and store it in fixtures/snapshots
      cy.get('.container-inner')
        .toMatchImageSnapshot({
          // "createDiffImage": true,                // Should a "diff image" be created, can be disabled for performance
          "threshold": 0.02,                      // Amount in pixels or percentage before snapshot image is invalid
          "name": pageName,            // Naming resulting image file with a custom name rather than concatenating test titles
          "separator": "-",  // Naming resulting image file with a custom separator rather than using the default ` #`
          "thresholdType": "percent",             // Can be either "pixel" or "percent"
        })
    })
  })
})
