describe('Test Hotline phone number', () => {
  
  it('Should contain App Hotline', () => {
    cy.visit('http://localhost:8000/')
    cy.contains('+498007540001')
  })

  it('Should contain TAN Hotline', () => {
    cy.visit('http://localhost:8000/')
    cy.contains('+498007540002')
  })
})
