const { result } = require("lodash");

const { softAssert, softExpect } = chai;

function parseUmlaut(string) {
  let result = string;
  if(result.includes('%C3%A4')) result = result.replaceAll('%C3%A4', 'ä');
  if(result.includes('%C3%AB')) result = result.replaceAll('%C3%AB', 'ë');
  if(result.includes('%C3%AF')) result = result.replaceAll('%C3%AF', 'ï');
  if(result.includes('%C3%B6')) result = result.replaceAll('%C3%B6', 'ö');
  if(result.includes('%C3%BC')) result = result.replaceAll('%C3%BC', 'ü');
  if(result.includes('%C3%9F')) result = result.replaceAll('%C3%9F', 'ß');
  return result;
}
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
                  '/de/faq/results/',
                  '/en/faq/',
                  '/en/faq/results/',
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
                  '/en/science/',
                  '/de/simple-language/',
                  '/en/simple-language/',
                  '/de/sign-language/',
                  '/en/sign-language/'
                ]

  it('Check if txt results exist',() => {
    cy.writeFile("cypress/logs/broken_anchor_links_result.txt", "==================== Broken anchor links ====================\n")
  })
  pages.forEach(page => {
    it(`"${page}" - Check for broken anchor links`, () => {
      cy.visit({log: false, url: page} )
      cy.get("a[href*='#']").each(url => {
        if (url.prop('href') && url.prop('href').includes("localhost") && url.prop('href').split("#")[1] !== "top" && url.prop('href').split("#")[1] !== "") {    
          if(url.prop('href').split(":8000") !== page) cy.visit({log: false, url: url.prop('href')} )
          cy.get("body").then($body => {
            if ($body.find(`#${url.prop('href').split("#")[1]}`).length > 0) {   
              softExpect(true, "Link: " + url.prop('href')).to.eq(true)
            } else {
              softExpect(false, "Link: " + url.prop('href')).to.eq(true)
              cy.readFile("cypress/logs/broken_anchor_links_result.txt")
              .then((text) => {
                cy.writeFile("cypress/logs/broken_anchor_links_result.txt", `${text}\n${url.prop('href')} on '${page}' `, {flags: 'as+'})
              })
            }
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
      cy.get("a:not([href*='mailto:'],[href*='tel:'],[href*='#'])").each(url => {
        if (url.prop('href') && url.prop('href').includes("localhost") && url.prop('href').split("#")[1] !== "top" && url.prop('href').includes(sub) && !pagesToAvoid.includes(url.prop('href').replace('http://localhost:8000', '')))  {  
          cy.visit({log: false, url: url.prop('href')} )
          cy.get("a[href*='#']").each(link => {
            if(link.prop('href').includes(url.prop('href')) && link.prop('href').split('#')[1] !== 'top' && link.prop('href').split('#')[1] !== ''){
              cy.get("body").then($body => {
                if ($body.find(parseUmlaut(`#${link.prop('href').split("#")[1]}`)).length > 0) {   
                  softExpect(true, "Link: " + parseUmlaut(link.prop('href'))).to.eq(true)
                } else {
                  softExpect(false, "Link: " + parseUmlaut(link.prop('href'))).to.eq(true)
                  cy.readFile("cypress/logs/broken_anchor_links_result.txt")
                  .then((text) => {
                    cy.writeFile("cypress/logs/broken_anchor_links_result.txt", `${text}\n${parseUmlaut(link.prop('href'))} on '${url.prop('href')}' `, {flags: 'as+'})
                  })
                }
              })
            }
          })       
        }         
      }) 
    })  
  })
})