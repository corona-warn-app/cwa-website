/// <reference types="Cypress" />
const { softAssert, softExpect } = chai;
describe("Test cwa-webserver links used by Corona-Warn-App", () => {

    let languages = ["en", "de"];
    let links;

    // removeMatches => Remove n first matches from result, e.g. for removing XML validation URLs
    const fetchs = [
        {
            title: "[EN] Android external links",
            url: "https://raw.githubusercontent.com/corona-warn-app/cwa-app-android/main/Corona-Warn-App/src/main/res/values/links.xml",
            result: []
        },
        {
            title: "[DE] Android external links",
            url: "https://raw.githubusercontent.com/corona-warn-app/cwa-app-android/main/Corona-Warn-App/src/main/res/values-de/links.xml",
            result: []
        },
        {
            title: "[EN] iOS external links",
            url: "https://raw.githubusercontent.com/corona-warn-app/cwa-app-ios/main/src/xcode/ENA/ENA/Resources/Localization/en.lproj/Localizable.links.strings",
            result: []
        },
        {
            title: "[DE] iOS external links",
            url: "https://raw.githubusercontent.com/corona-warn-app/cwa-app-ios/main/src/xcode/ENA/ENA/Resources/Localization/de.lproj/Localizable.links.strings",
            result: []
        }
    ]

    const hashRegex = /[#][a-zA-Z0-9-_]{1,256}/g;
    before(() => {
        cy.fixture('appToWebLinks').then(webLinks => links = webLinks);

        fetchs.forEach(query => {
            fetch(query.url)
            .then(response => response.text())
            .then(data => {
                const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
                query.result = data.match(regex).filter(url => url.includes('www.coronawarn.app') && (url.includes('/faq/#') || url.includes('/faq/results/#')));
                query.result = query.result.map(url => url.replace('www.coronawarn.app', '').replace('/faq/#', '/faq/results/#'))
            });
        })
    });

    it("Test FAQ landing page", () => {
        languages.forEach(lang => {
            cy.visit("/" + lang + "/faq/").then(() => {
                cy.get('a[href=results]').click();
                cy.url().should('include', 'results');
            });
        });
    });

    it("Test FAQ direct links", () => {
        languages.forEach(lang => {
            cy.visit("/" + lang + "/faq/results/").then(() => {
                links.faqEntry.forEach(faqItem => {
                    cy.get(faqItem).parent().next().find('.faq-anchor').invoke('attr', 'href').should('include', faqItem);
                });
            });
        });
    });

    it("Test FAQ section links", () => {
        languages.forEach(lang => {
            cy.visit("/" + lang + "/faq/results/").then(() => {
                links.faqSection.forEach(faqItem => {
                    cy.get(faqItem).find('.faq').should('have.length.greaterThan', 0);
                });
            });
        });
    });

    it("Test FAQ redirected links", () => {
        var redirectFAQs = links.faqRedirect;
        languages.forEach(lang => {
            var i;
            for (i = 0; i < redirectFAQs.length; i = i + 2) {
                cy.testFaqRedirect(lang, redirectFAQs[i], redirectFAQs[i + 1]);
            }
        });
    });

    it("Test Blog links", () => {
        var blogUrl = "";
        if (links.blogEntry.length > 0) {
            languages.forEach(lang => {
                links.blogEntry.forEach(blogItem => {
                    blogUrl = "/" + lang + "/blog/" + blogItem;
                    cy.visit(blogUrl);
                    cy.url().should("include", blogUrl);
                });
            });
        } else {
            cy.log("No blog links to test");
        }
    });
    
    it("Test Accessibility links", () => {
        languages.forEach(lang => {
            cy.visit("/" + lang + "/accessibility/").then(() => {
                links.accessibilityTab.forEach(tab => {
                    cy.get(tab);
                });
            });
        });
    });

    it("Test Social Media links", () => {
        languages.forEach(lang => {
            cy.visit("/" + lang + "/community/").then(() => {
                cy.get("#socialmedia").should('have.text', "Social Media");
            });
        });
    });

    describe("Check external links", () => {
        fetchs.forEach(query => {
            it(query.title, () => {
                if(query.result) {
                    query.result.map(url => {
                        const hash = url.match(hashRegex);
                        // Check if is a redirect, if it is, we avoid checking it cause has been checked before
                        if(!links.faqRedirect.includes(hash.toString())) {
                            cy.log(url)
                            cy.visit(url). then(() => {
                                cy.get('body')
                                .then($body => {
                                    const elementInBody = $body.find(`${hash}`).length > 0 ? true : false;
                                    softExpect(elementInBody, "Link: " + url + " looking at: "+hash).to.eq(true)
                                    cy.log("stuck inside then")
                                })
                            });
                            
                        } 
                        cy.log("stuck after links")
                    });
                }
            })
        })    
    })
    
});
