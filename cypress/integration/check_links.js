const { softAssert, softExpect } = chai;

context("Check for broken links", () => {
  const pages = [ '/en/community', '/de/community', '/en/faq', '/de/faq','/en/rat-partner/','/en/terms-of-use/','/en/privacy/']
  pages.forEach(page => {
    it(`"${page}" - Check for broken links`, () => {
      cy.visit({log: false, url: page} )
      // filter / reg-ex mailto, tel does not work
      cy.get("a[href]:not([href^='mailto:'], [href$='tel:'])").each(url => {
      // ToDo: remove duplicates e.g. #top
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
