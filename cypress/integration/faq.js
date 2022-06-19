/// <reference types="Cypress" />
import * as selectors from "/cypress/fixtures/selectors/sel.json"
import stringDe from "/cypress/fixtures/copy/stringDe.json"
import stringEn from "/cypress/fixtures/copy/stringEn.json"

describe("... Corona-Warn-App", () => {//no idea what to call this
  let settings = [
    {
      views: ["iphone-6", "macbook-13"],
      name: "en",
      string: stringEn,
    },
    {
      views: ["iphone-6", "macbook-13"],
      name: "de",
      string: stringDe,
    },
  ]

  settings.forEach(({ views, name, string }) => {
    views.forEach((view) => {
      describe(`Tests FAQ page features on ${name}`, () => {
        beforeEach("Prepare device and language versions", () => {
          cy.viewport(view)
          cy.visit("/" + name + "/faq/")
        })

        it(`Loads faq page with search features on ${name} for ${view}`, () => {
          cy.get(selectors.faq.headline).contains(string.faq.top)
          cy.get(selectors.faq.textField)
          cy.get(selectors.faq.topicField)
          cy.get(selectors.faq.submitButton).should("not.be.disabled")
        })

        it(`Can interact with faq page search features on ${name} for ${view}`, () => {})

        it(`Can display relevant search results on ${name} for ${view}`, () => {})

        it(`Can display specific faq article on ${name} for ${view}`, () => {})
      })
    })
  })
})
