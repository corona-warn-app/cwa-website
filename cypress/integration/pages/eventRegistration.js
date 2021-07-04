const testEnvLang = Cypress.env("testEnvLang")
import sel from "/cypress/fixtures/selectors/sel.json"
/* npx: npx cypress run --spec 'cypress/integration/pages/eventRegistration.js' --browser electron */

describe("Test Event Registration Page", () => {
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

    //fill event type and assert duration fields
    cy.get(sel.eventRegistration.form.locationType).select("Cultural event")
    cy.get(sel.eventRegistration.form.startTimeDate)
    cy.get(sel.eventRegistration.form.startTimeTime)
    cy.get(sel.eventRegistration.form.endTimeDate)
    cy.get(sel.eventRegistration.form.endTimeTime)
  })

  it("Registration criteria validations", () => {
    //assert defualt form field feedbacks
    cy.get(sel.eventRegistration.form.generateQR).click()
    cy.get(sel.eventRegistration.form.locationTypeError)
      .should("be.visible")
      .contains("The location type is required")
    cy.get(sel.eventRegistration.form.descriptionError)
      .should("be.visible")
      .contains("The description is required")
    cy.get(sel.eventRegistration.form.addressError)
      .should("be.visible")
      .contains("The address is required")

    //assert other dynamic form field errors
    cy.get(sel.eventRegistration.form.locationType).select("Cultural event")
    cy.get(sel.eventRegistration.form.generateQR).click()
    cy.get(sel.eventRegistration.form.startTimeError)
      .should("be.visible")
      .contains("Start is required")
    cy.get(sel.eventRegistration.form.endTimeError)
      .should("be.visible")
      .contains("End is required")

    //other qr section assertions
    cy.get(sel.eventRegistration.printCode).should("have.attr", "disabled")
    cy.get(sel.eventRegistration.downloadCode).should("have.attr", "disabled")
  })

  it("Test Registration Functionality", () => {
    //fill form fields
    cy.get(sel.eventRegistration.form.locationType).select("Cultural event")
    cy.get(sel.eventRegistration.form.description).type("Hairdresser")
    cy.get(sel.eventRegistration.form.address).type(
      "Sample street 12, 12345 Sample Street"
    )
    cy.get(sel.eventRegistration.form.defaultCheckinLengthHours).select("03")
    cy.get(sel.eventRegistration.form.defaultCheckinLengthMinutes).select("30")
    cy.get(sel.eventRegistration.form.startTimeDate).type("02021991")
    cy.get(sel.eventRegistration.form.startTimeTime).type("0909")
    cy.get(sel.eventRegistration.form.endTimeDate).type("02021991")
    cy.get(sel.eventRegistration.form.endTimeTime).type("0909")

    cy.get(sel.eventRegistration.form.generateQR).click()

    //assert QR code via style: needs improvement
    cy.get(sel.eventRegistration.eventqrcode).should(
      "have.attr",
      "width",
      "1654"
    )
    //assert qr action buttons
    cy.get(sel.eventRegistration.printCode).should("not.have.attr", "disabled")
    cy.get(sel.eventRegistration.downloadCode).should(
      "not.have.attr",
      "disabled"
    )

    cy.screenshot({ capture: "fullPage" })
  })
})
