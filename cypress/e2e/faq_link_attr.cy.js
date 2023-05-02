/// <reference types="Cypress" />

const { softAssert, softExpect } = chai;

describe("Check attributes of FAQ links", () => {

    const faqResultsUrl = '/faq/results/';
    const languages = ["en", "de"];

    // This works around some timeout issues
    beforeEach(() => {
        cy.visit('/')
    })

    describe("Check links are using _blank to open in new frame", () => {

        const containers = [
            "#faq-container",
            "#glossary_container > .tab-content"
        ];

        it("Test links for _blank presence", () => {
            languages.forEach(lang => {
                let faqUrl = "/" + lang + faqResultsUrl;
                cy.visit(faqUrl);
                containers.forEach(container => {
                    cy.get(container).find("a:not([href*='mailto:'],[href*='tel:'],[href$='#top'],.faq-anchor,.email)")
                        .each(($el) => {
                            softExpect($el, ($el).prop('href') + " in " + faqUrl).to.have.attr('target', '_blank');
                        });
                });
            });
        });
    });

    describe("Check link cross-origin security for links with _blank", () => {

        it("Test FAQ external links for rel presence", () => {
            cy.log("Checking for external links with target='_blank' to include rel='noopener noreferrer'");
            languages.forEach(lang => {
                let faqUrl = "/" + lang + faqResultsUrl;
                cy.visit(faqUrl);
                cy.get("a[href^='https://'][target='_blank']")
                    .each(($el) => {
                        softExpect($el, ($el).prop('href') + " in " + faqUrl).to.have.attr('rel', 'noopener noreferrer');
                    });
            });
        });

        it("Test FAQ internal links for rel absence", () => {
            cy.log("Checking for internal links with target='_blank' not to include any rel attribute");
            languages.forEach(lang => {
                let faqUrl = "/" + lang + faqResultsUrl;
                cy.visit(faqUrl);
                cy.get("a:not([href^='https://'])[target='_blank']")
                    .each(($el) => {
                        softExpect($el, ($el).prop('href') + " in " + faqUrl).not.to.have.attr('rel');
                    });
            });
        });
    });
});
