const { softAssert, softExpect } = chai;

context("Check for broken videos", () => {
    const pages = [
        '/de',
        '/en',
        '/de/faq/', '/de/faq/results/',
        '/en/faq/', '/en/faq/results/',
        '/de/blog/', '/en/blog/',
        '/de/science/',
        '/en/science/',
        '/de/sign-language/',
        '/en/sign-language/'
    ];


    it('Check if txt results exist',() => {
        cy.writeFile("cypress/logs/broken_videos_result.txt", "==================== Broken videos ====================\n")
    })

    pages.map(page => {
        it(`"${page}" - Check for broken videos`, () => {
            cy.visit({log: false, url: page});
            cy.get('main').then($main => {
                if ($main.find('video').length > 0) {
                    cy.get('video')
                    .should(($video) => {
                        expect(Number.isNaN($video.prop('duration')), `duration should be a number - broken '${$video.prop('src')}' on '${page}' `).to.eq(false);
                        expect($video.prop('duration')).to.be.gt(0)
                    })
                    .and('have.prop', 'paused', true)
                    .and('have.prop', 'ended', false)
                }
            })
        })
    })
})

context("Check for broken links on blog/science entries", () => {
    const pages = ['/de/blog/','/en/blog/','/de/science/', '/en/science/']

    pages.map(page => {
        it(`"${page}" entries - Check for broken videos`, () => {
            cy.visit({log: false, url: page} )
            cy.get("a.blog-read-more").each(url => {
                cy.visit({log: false, url: url.prop('href')} )
                cy.get('main').then($main => {
                    if ($main.find('video').length > 0) {
                        cy.get('video')
                        .should(($video) => {
                            expect(Number.isNaN($video.prop('duration')), `duration should be a number - broken '${$video.prop('src')}' on '${page}' `).to.eq(false);
                            expect($video.prop('duration')).to.be.gt(0)
                        })
                        .and('have.prop', 'paused', true)
                        .and('have.prop', 'ended', false)
                    }
                })
            })
        })
    })
})
