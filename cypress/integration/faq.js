/// <reference types="Cypress" />
import * as selectors from "/cypress/fixtures/selectors/sel.json"
import stringDe from "/cypress/fixtures/copy/stringDe.json"
import stringEn from "/cypress/fixtures/copy/stringEn.json"
let tests = [
  {
    views: ["iphone-6", "macbook-13"],
    domain: "en",
    string: stringEn,
  },
  {
    views: ["iphone-6", "macbook-13"],
    domain: "de",
    string: stringDe,
  },
]

describe("Test CWA FAQ Pages", () => {
  tests.forEach(({ views, domain, string }) => {
    views.forEach((view) => {
      describe(`Page features on ${domain} with ${view}`, () => {
        beforeEach("Prepare device and language versions", () => {
          cy.viewport(view)
          cy.visit("/" + domain + "/faq/")
        })

        Cypress.Commands.add("searchFaq", (search) => {
          cy.get(selectors.faq.textField).type(search.text)
          cy.get(selectors.faq.topicField).select(search.topic)
          cy.get(selectors.faq.submitButton).click()
        })

        it(`Loads faq page with search features on ${domain} for ${view}`, () => {
          cy.get(selectors.faq.headline).contains(string.faq.top)
          cy.get(selectors.faq.textField)
          cy.get(selectors.faq.topicField)
          cy.get(selectors.faq.submitButton).should("not.be.disabled")
        })

        it(`Can interact with faq page search features on ${domain} for ${view}`, () => {
          cy.get(selectors.faq.submitButton).should("not.be.disabled")
          cy.searchFaq(string.faq.testSearch)
        })

        it(`Can display relevant search results on ${domain} for ${view}`, () => {
          cy.searchFaq(string.faq.testSearch)
          cy.get(selectors.faq.resultHeadline).contains(string.faq.testSearch.topic)
          cy.url().should("include", `${domain}/faq/results/?search=Test`)
        })

        it(`Can display specific faq article on ${domain} for ${view}`, () => {
          cy.visit(`${domain}/faq/results/#further_details`)
          cy.url().should("include", `${domain}/faq/results/#further_details`)
          cy.get(selectors.faq.furtherDetailsDiv).find(".accordion-faq-header").should("have.class", "active")
          cy.get(selectors.faq.furtherDetailsDiv).contains(`${string.faq.resultAssertion}`)
        })
      })
    })
  })
})
