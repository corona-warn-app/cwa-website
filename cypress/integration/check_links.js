const { softAssert, softExpect } = chai;

context("Check for broken links", () => {
  const pages = [ '/de',
                  '/en',
                  '/de/eventregistration/',
                  '/en/eventregistration/',
                  '/de/community/',
                  '/en/community/',
                  '/de/science/',
                  '/en/science/',
                  '/de/analysis/',
                  '/en/analysis/',
                  '/de/blog/',
                  '/en/blog/',
                  '/de/blog/archive/',
                  '/en/blog/archive/',
                  '/de/screenshots/',
                  '/en/screenshots/',
                  '/de/faq/',
                  '/en/faq/',
                  '/de/rat-partner/',
                  '/en/rat-partner/',
                  '/de/privacy/',
                  '/en/privacy/',
                  '/de/terms-of-use/',
                  '/en/terms-of-use/',
                  '/de/event-qr-code-guide/',
                  '/en/event-qr-code-guide/'
                ]

  pages.forEach(page => {
    it(`"${page}" - Check for broken links`, () => {
      cy.visit({log: false, url: page} )
      cy.get("a:not([href*='mailto:'],[href*='tel:'])").not('.email').each(url => {
        if (url.prop('href') ) { 
          cy.request({
            failOnStatusCode: false, 
            log: false,
            url: url.prop('href')
          }).then((response) => {
            softExpect(response.status, "Link: " + url.prop('href')).to.eq(200)
          })
        }         
      })
    })
  })
})
