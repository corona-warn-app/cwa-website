const { softAssert, softExpect } = chai;

context("Check for broken videos", () => {
    const pages = [
        '/de',
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
        '/de/faq/', '/de/faq/results/',
        '/en/faq/', '/en/faq/results/',
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
        '/en/sign-language/',
        '/de/sitemap/',
        '/en/sitemap/'
    ];


    it('Check if txt results exist',() => {
        cy.writeFile("cypress/logs/broken_videos_result.txt", "==================== Broken videos ====================\n")
    })

    pages.forEach(page => {
        it(`"${page}" - Check for broken videos`, () => {
            cy.visit({log: false, url: page});
            cy.get('#main').then($main => {
                if ($main.find('video').length > 0) {
                    cy.get('video').each(video => {
                        cy.request({
                            failOnStatusCode: false, 
                            log: false,
                            url: video.prop('src')
                        }).then((response) => {
                            softExpect(response.status === 200 ? true : false, "Link: " + video.prop('src')).to.eq(true)
                            if(response.status !== 200) {
                                cy.readFile("cypress/logs/broken_videos_result.txt")
                                .then((text) => {
                                    cy.writeFile("cypress/logs/broken_videos_result.txt", `${text}\n[RESPONSE ${response.status}] ${video.prop('src')} on '${page}' `, {flags: 'as+'})
                                })
                            }
                        })
                    })
                }
            })
        })
    })
})

context("Check for broken links on entries", () => {
    const pages = ['/de/blog/','/en/blog/','/de/science/', '/en/science/']

    pages.forEach(sub => {
        it(`"${sub}" entries - Check for broken videos`, () => {
            cy.visit({log: false, url: sub} )
            cy.get("a.blog-read-more").each(url => {
                cy.visit({log: false, url: url.prop('href')} )
                cy.get('main').then($main => {
                    if ($main.find('source').length > 0) {
                        cy.get('source').each(video => {
                            cy.request({
                                failOnStatusCode: false, 
                                log: false,
                                url: video.prop('src'),
                                timeout: 100000
                        }).then((response) => {
                            softExpect(response.status === 200 ? true : false, "Link: " + video.prop('src')).to.eq(true)
                            if(response.status !== 200) {
                                cy.readFile("cypress/logs/broken_videos_result.txt")
                                .then((text) => {
                                    cy.writeFile("cypress/logs/broken_videos_result.txt", `${text}\n[RESPONSE ${response.status}] ${video.prop('src')} on '${url.prop('href')}' `, {flags: 'as+'})
                                })
                            }
                        })
                    })
                } 
            })
        })  
        })
    })
})