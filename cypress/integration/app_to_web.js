/// <reference types="Cypress" />

describe("Test cwa-webserver links used by Corona-Warn-App", () => {

    let languages = ["en", "de"];
    let links;
    before(() => {
        cy.fixture('appToWebLinks').then(webLinks => links = webLinks);
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

    it("Test document assets", () => {
        links.documentAssets.forEach(document => {
            cy.request("/assets/documents/" + document);
        });
    });
});
