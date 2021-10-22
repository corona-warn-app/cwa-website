const { softAssert, softExpect } = chai;

context("Check for broken anchor links", () => {
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


  pages.forEach(page => {
    it(`"${page}" - Check for broken anchor links`, () => {
      cy.visit({log: false, url: page} )
      cy.get("a[href*='#']").each(url => {
        if (url.prop('href') && url.prop('href').includes("localhost") && url.prop('href').split("#")[1] !== "top") {    
          if(url.prop('href').split(":8000") !== page) cy.visit({log: false, url: url.prop('href')} )
          cy.get("body").then($body => {
            if ($body.find(`#${url.prop('href').split("#")[1]}`).length > 0) {   
              softExpect(true, "Link: " + url.prop('href')).to.eq(true)
            } else softExpect(false, "Link: " + url.prop('href')).to.eq(true)
          })
        }         
      })
    })
  }) 
})

context("Check for broken anchor links on entries", () => {
  const subpages = ['/de/blog/','/en/blog/','/de/science/', '/en/science/']
  const pagesToAvoid = ['/de/blog/', '/en/blog/', '/de/science/', '/en/science/', '/de/blog/archiv', '/en/blog/archive']
  subpages.forEach(sub => {
    it(`"${sub}" entries - Check for broken links`, () => {
      cy.visit({log: false, url: sub} )
      cy.get("a[href*='#']").each(url => {
        if (url.prop('href') && url.prop('href').includes("localhost") && url.prop('href').split("#")[1] !== "top" && url.prop('href').includes(sub) && !pagesToAvoid.includes(url.prop('href').replace('http://localhost:8000', '')))  {    
          if(url.prop('href').split(":8000") !== page) cy.visit({log: false, url: url.prop('href')} )
          cy.get("body").then($body => {
            if ($body.find(`#${url.prop('href').split("#")[1]}`).length > 0) {   
              softExpect(true, "Link: " + url.prop('href')).to.eq(true)
            } else softExpect(false, "Link: " + url.prop('href')).to.eq(true)
          })
        }         
      })
    })  
  })
})