/// <reference types="Cypress" />
import * as selectors from "/cypress/fixtures/selectors/sel.json"
import stringDe from "/cypress/fixtures/copy/stringDe.json"
import stringEn from "/cypress/fixtures/copy/stringEn.json"

describe("... Corona-Warn-App", () => {
  //no idea what to call this
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

  tests.forEach(({ views, domain, string }) => {
    views.forEach((view) => {
      describe(`Tests FAQ page features on ${domain}`, () => {
        beforeEach("Prepare device and language versions", () => {
          cy.viewport(view)
          cy.visit("/" + domain + "/faq/")
        })

        it.skip(`Loads faq page with search features on ${domain} for ${view}`, () => {
          cy.get(selectors.faq.headline).contains(string.faq.top)
          cy.get(selectors.faq.textField)
          cy.get(selectors.faq.topicField)
          cy.get(selectors.faq.submitButton).should("not.be.disabled")
        })

        it.skip(`Can interact with faq page search features on ${domain} for ${view}`, () => {
          cy.get(selectors.faq.textField).type("Test")
          cy.get(selectors.faq.topicField).select(string.faq.testTopic)
          cy.get(selectors.faq.submitButton).should("not.be.disabled")
        })

        it.skip(`Can display relevant search results on ${domain} for ${view}`, () => {
          cy.get(selectors.faq.textField).type("Test")
          cy.get(selectors.faq.topicField).select(string.faq.testTopic)
          cy.get(selectors.faq.submitButton).click()
          cy.get(selectors.faq.resultHeadline).contains(string.faq.testTopic)
          cy.url().should("include", `${domain}/faq/results/?search=Test`)
        })

        it(`Can display specific faq article on ${domain} for ${view}`, () => {
          cy.visit(`${domain}/faq/results/#further_details`)
          cy.url().should("include", `${domain}/faq/results/#further_details`)
          //wip in view assertion
          cy.get(selectors.faq.furtherDetailsDiv).scrollIntoView().should("be.visible")
          cy.get(selectors.faq.furtherDetailsDiv).contains(`${string.faq.resultAssertion}`)
        })
      })
    })
  })
})
