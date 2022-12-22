/// <reference types="Cypress" />

// To run this test on https://www.coronawarn.app execute the following
// from the root directory of a local copy of cwa-website
// npx cypress run -s cypress/integration/mime.js -c baseUrl=https://www.coronawarn.app

describe("Test MIME types", () => {

    it("css MIME type", () => {
        cy.request("/assets/css/style.css").then((response) => {
            const mime = response.headers['content-type'];
            expect(mime).to.contain('text/css');
        });
    });

    it("javascript MIME type", () => {
        cy.request("/assets/js/app.js").then((response) => {
            const mime = response.headers['content-type'];
            // production server should contain 'text/javascript'
            // local browswer-sync server should contain 'application/javascript'
            expect(mime).to.contain('/javascript');
        });
    });

});
