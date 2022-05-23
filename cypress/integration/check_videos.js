const { softAssert, softExpect } = chai;

                context("Check for broken links", () => {
                    const pages = [ '/de/faq/results/', '/en/faq/results/']


  it('Check if txt results exist',() => {
    cy.writeFile("cypress/logs/broken_videos_result.txt", "==================== Broken videos ====================\n")
  })
  pages.forEach(page => {
    it(`"${page}" - Check for broken videos`, (done) => {
      cy.visit({log: false, url: page})
            cy.get('video').each(video => {
                if (video.prop('paused') == true && video.prop('ended') == false) {         
                    video[0].play().then(() => {
                    softExpect(video.prop('paused')).to.eq(false)
                    softExpect(video.prop('readyState') > 2).to.eq(true)
                    if(video.prop('paused') == true) {
                    cy.readFile("cypress/logs/broken_links_result.txt")
                    .then((text) => {
                        cy.writeFile("cypress/logs/broken_links_result.txt", `${text}\n${video.prop('src')} on '${page}' `, {flags: 'as+'})
                    })
                    } else {
                        video[0].pause()
                    }
                })
                }         
            })
    })
  })
})
