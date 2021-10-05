const { softAssert, softExpect } = chai;

context("Check for broken links", () => {
  const pages = [ '/de',
                  '/en',
                  '/de/eventregistration/',
                  '/en/eventregistration/',
                  '/de/community/',
                  '/en/community/',
                  '/de/analysis/',
                  '/en/analysis/',
                  '/de/blog/archiv/',
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
                  '/en/event-qr-code-guide/',
                  '/de/blog/','/en/blog/',
                  '/de/science/',
                  '/en/science/'
                ]

  const subpages = ['/de/blog/','/en/blog/','/de/science/', '/en/science/']
  const pagesToAvoid = ['/de/blog/', '/en/blog/', '/de/science/', '/en/science/', '/de/blog/archiv', '/en/blog/archive']
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

  subpages.forEach(sub => {
    it(`"${sub}" entries - Check for broken links`, () => {
      cy.visit({log: false, url: sub} )
      cy.get("a:not([href*='mailto:'],[href*='tel:'])").not('.email').each(url => {
        if(url.prop('href').includes('localhost') && url.prop('href').includes(sub) && !pagesToAvoid.includes(url.prop('href').replace('http://localhost:8000', ''))) {
          cy.visit({log: false, url: url.prop('href')} )
          cy.get("a:not([href*='mailto:'],[href*='tel:'])").not('.email').each(entry => {
            if (entry.prop('href') ) {
              cy.request({
                failOnStatusCode: false, 
                log: false,
                url: entry.prop('href')
              }).then((response) => {
                softExpect(response.status, "Link: " + entry.prop('href')).to.eq(200)
              })
            }
          })
        }
      })  
    })  
  })
})