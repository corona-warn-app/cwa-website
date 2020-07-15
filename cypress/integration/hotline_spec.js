describe('Test Hotline phone number', () => {
  
  it('Should contain App Hotline', () => {
    cy.visit('http://localhost:8000/')
    cy.contains('+49 800 7540001')
  })

  it('Should contain TAN Hotline', () => {
    cy.visit('http://localhost:8000/')
    cy.contains('+49 800 7540002')
  })
})
