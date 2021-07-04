const testEnvLang = Cypress.env("testEnvLang")

import sel from "/cypress/fixtures/selectors/sel.json"

describe("Test Appstore Buttons", () => {
  beforeEach(() => {
    cy.visit(`/${testEnvLang}/eventregistration`)
  })

  it("Basic page assertions", () => {
    cy.get(sel.eventRegistration.section).contains(
      "The app now allows a check-in for events and locations. People who host events or have a business can now create a QR code. By scanning the QR code, guests can check in upon arrival to register their presence. If desired, the app will also create a corresponding diary entry. If a checked-in person later tests positive for the coronavirus, other people who were checked in at the same time can be warned."
    )
    cy.get(sel.eventRegistration.headline).contains(
      "Create QR code for event check-in"
    )

    //assert form elements
    cy.get(sel.eventRegistration.form.locationType)
    cy.get(sel.eventRegistration.form.description)
    cy.get(sel.eventRegistration.form.address)
    cy.get(sel.eventRegistration.form.defaultCheckinLengthHours)
    cy.get(sel.eventRegistration.form.defaultCheckinLengthMinutes)
    cy.get(sel.eventRegistration.form.generateQR)
    cy.get(sel.eventRegistration.eventPlaceholder)
  })
})
