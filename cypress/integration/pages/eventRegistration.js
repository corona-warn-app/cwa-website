import sel from "/cypress/fixtures/selectors/sel.json"
import stringDe from "/cypress/fixtures/copy/stringDe.json"
import stringEn from "/cypress/fixtures/copy/stringEn.json"
/* npx: npx cypress run --spec 'cypress/integration/pages/eventRegistration.js' --browser electron */

describe("Test Event Registration Page", () => {
  /*############### Lang: DE ############### */
  it("DE: Basic page assertions", () => {
    cy.log("Testing on DE")
    cy.visit(`/de/eventregistration`)
    cy.get(sel.eventRegistration.section).contains(
      stringDe.eventRegistration.headlineText
    )
    cy.get(sel.eventRegistration.headline).contains(
      stringDe.eventRegistration.headlineTitle
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
    cy.get(sel.eventRegistration.form.locationType).select(
      stringDe.eventRegistration.lTypeCultural
    )
    cy.get(sel.eventRegistration.form.startTimeDate)
    cy.get(sel.eventRegistration.form.startTimeTime)
    cy.get(sel.eventRegistration.form.endTimeDate)
    cy.get(sel.eventRegistration.form.endTimeTime)
  })

  it("DE: Registration criteria validations", () => {
    cy.log("Testing on DE")
    cy.visit(`/de/eventregistration`)
    //assert defualt form field feedbacks
    cy.get(sel.eventRegistration.form.generateQR).click()
    cy.get(sel.eventRegistration.form.locationTypeError)
      .should("be.visible")
      .contains(stringDe.eventRegistration.locationTypeError)
    cy.get(sel.eventRegistration.form.descriptionError)
      .should("be.visible")
      .contains(stringDe.eventRegistration.descriptionError)
    cy.get(sel.eventRegistration.form.addressError)
      .should("be.visible")
      .contains(stringDe.eventRegistration.addressError)

    //assert other dynamic form field errors
    cy.get(sel.eventRegistration.form.locationType).select(
      stringDe.eventRegistration.lTypeCultural
    )
    cy.get(sel.eventRegistration.form.generateQR).click()
    cy.get(sel.eventRegistration.form.startTimeError)
      .should("be.visible")
      .contains(stringDe.eventRegistration.startTimeError)
    cy.get(sel.eventRegistration.form.endTimeError)
      .should("be.visible")
      .contains(stringDe.eventRegistration.endTimeError)

    //other qr section assertions
    cy.get(sel.eventRegistration.printCode).should("have.attr", "disabled")
    cy.get(sel.eventRegistration.downloadCode).should("have.attr", "disabled")
  })

  it("DE: Test Registration Functionality", () => {
    cy.log("Testing on DE")
    cy.visit(`/de/eventregistration`)
    //fill form fields
    cy.get(sel.eventRegistration.form.locationType).select(
      stringDe.eventRegistration.lTypeCultural
    )
    cy.get(sel.eventRegistration.form.description).type(
      stringDe.eventRegistration.lTypeHairdresser
    )
    cy.get(sel.eventRegistration.form.address).type(
      stringDe.eventRegistration.address
    )
    cy.get(sel.eventRegistration.form.defaultCheckinLengthHours).select("03")
    cy.get(sel.eventRegistration.form.defaultCheckinLengthMinutes).select("30")
    cy.get(sel.eventRegistration.form.startTimeDate).type("02022040")
    cy.get(sel.eventRegistration.form.startTimeTime).type("0909")
    cy.get(sel.eventRegistration.form.endTimeDate).type("02022040")
    cy.get(sel.eventRegistration.form.endTimeTime).type("0909")

    cy.get(sel.eventRegistration.form.generateQR).click()

    //assert QR code via style: needs improvement
    cy.get(sel.eventRegistration.eventqrcode)

    //assert qr action buttons
    cy.get(sel.eventRegistration.printCode).should("not.have.attr", "disabled")
    cy.get(sel.eventRegistration.downloadCode).should(
      "not.have.attr",
      "disabled"
    )

    cy.screenshot({ capture: "fullPage" })
  })

  /*############### Lang: EN ############### */
  it("EN: Basic page assertions", () => {
    cy.log("Testing on EN")
    cy.visit(`/en/eventregistration`)
    cy.get(sel.eventRegistration.section).contains(
      stringEn.eventRegistration.headlineText
    )
    cy.get(sel.eventRegistration.headline).contains(
      stringEn.eventRegistration.headlineTitle
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
    cy.get(sel.eventRegistration.form.locationType).select(
      stringEn.eventRegistration.lTypeCultural
    )
    cy.get(sel.eventRegistration.form.startTimeDate)
    cy.get(sel.eventRegistration.form.startTimeTime)
    cy.get(sel.eventRegistration.form.endTimeDate)
    cy.get(sel.eventRegistration.form.endTimeTime)
  })

  it("EN: Registration criteria validations", () => {
    cy.log("Testing on EN")
    cy.visit(`/en/eventregistration`)
    //assert defualt form field feedbacks
    cy.get(sel.eventRegistration.form.generateQR).click()
    cy.get(sel.eventRegistration.form.locationTypeError)
      .should("be.visible")
      .contains(stringEn.eventRegistration.locationTypeError)
    cy.get(sel.eventRegistration.form.descriptionError)
      .should("be.visible")
      .contains(stringEn.eventRegistration.descriptionError)
    cy.get(sel.eventRegistration.form.addressError)
      .should("be.visible")
      .contains(stringEn.eventRegistration.addressError)

    //assert other dynamic form field errors
    cy.get(sel.eventRegistration.form.locationType).select(
      stringEn.eventRegistration.lTypeCultural
    )
    cy.get(sel.eventRegistration.form.generateQR).click()
    cy.get(sel.eventRegistration.form.startTimeError)
      .should("be.visible")
      .contains(stringEn.eventRegistration.startTimeError)
    cy.get(sel.eventRegistration.form.endTimeError)
      .should("be.visible")
      .contains(stringEn.eventRegistration.endTimeError)

    //other qr section assertions
    cy.get(sel.eventRegistration.printCode).should("have.attr", "disabled")
    cy.get(sel.eventRegistration.downloadCode).should("have.attr", "disabled")
  })

  it("EN: Test Registration Functionality", () => {
    cy.log("Testing on EN")
    cy.visit(`/en/eventregistration`)
    //fill form fields
    cy.get(sel.eventRegistration.form.locationType).select(
      stringEn.eventRegistration.lTypeCultural
    )
    cy.get(sel.eventRegistration.form.description).type(
      stringEn.eventRegistration.lTypeHairdresser
    )
    cy.get(sel.eventRegistration.form.address).type(
      stringEn.eventRegistration.address
    )
    cy.get(sel.eventRegistration.form.defaultCheckinLengthHours).select("03")
    cy.get(sel.eventRegistration.form.defaultCheckinLengthMinutes).select("30")
    cy.get(sel.eventRegistration.form.startTimeDate).type("02022040")
    cy.get(sel.eventRegistration.form.startTimeTime).type("0909")
    cy.get(sel.eventRegistration.form.endTimeDate).type("02022040")
    cy.get(sel.eventRegistration.form.endTimeTime).type("0909")

    cy.get(sel.eventRegistration.form.generateQR).click()

    //assert QR code via style: needs improvement
    cy.get(sel.eventRegistration.eventqrcode)
    
    //assert qr action buttons
    cy.get(sel.eventRegistration.printCode).should("not.have.attr", "disabled")
    cy.get(sel.eventRegistration.downloadCode).should(
      "not.have.attr",
      "disabled"
    )

    cy.screenshot({ capture: "fullPage" })
  })
})
