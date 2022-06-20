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
            removeMatches: 2,
            result: []
        },
        {
            title: "[DE] Android external links",
            url: "https://raw.githubusercontent.com/corona-warn-app/cwa-app-android/main/Corona-Warn-App/src/main/res/values-de/links.xml",
            removeMatches: 2,
            result: []
        },
        {
            title: "[EN] iOS external links",
            url: "https://raw.githubusercontent.com/corona-warn-app/cwa-app-ios/main/src/xcode/ENA/ENA/Resources/Localization/en.lproj/Localizable.links.strings",
            removeMatches: 0,
            result: []
        },
        {
            title: "[DE] iOS external links",
            url: "https://raw.githubusercontent.com/corona-warn-app/cwa-app-ios/main/src/xcode/ENA/ENA/Resources/Localization/de.lproj/Localizable.links.strings",
            removeMatches: 0,
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
                query.result = data.match(regex);
                if(query.removeMatches > 0) {
                    query.result = query.result.splice(query.removeMatches);
                }
            });
        })
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
                    query.result.forEach(url => {
                        const hash = url.match(hashRegex);
                        // Check if the URL has a hash, if it has one, we need to check if an element with the hash as ID exists
                        if(hash) {
                            // Check if is a CWA URL, if not, we can't check if the element exists
                            if(url.includes('coronawarn.app')) {
                                url = url.replace('www.coronawarn.app', '')
                                // Check if is a redirect, if it is, we avoid checking it cause has been checked before
                                if(!links.faqRedirect.includes(hash.toString())) {
                                    // Check if is an URL heading to the old FAQ page, if yes, redirect to the new one cause CWA site do it on visit
                                    if(url.includes('/faq/')) {
                                        url = url.replace('/faq/', '/faq/results/')
                                    }
                                    cy.visit({log: false, url: url} );
                                    cy.get('body').then($body => {
                                        const elementInBody = $body.find(`${hash}`).length > 0 ? true : false;
                                        softExpect(elementInBody, "Link: " + url + " looking at: "+hash).to.eq(true)
                                    })
                                }
                            }
                        } else {
                            cy.request({
                                failOnStatusCode: false, 
                                log: false,
                                url: url
                            }).then((response) => {
                                softExpect(response.status == 200 || response.status == 429 ? true : false, "Link: " + url).to.eq(true)
                            })
                        }
                    });
                }
            })
        })    
    })
    
});
