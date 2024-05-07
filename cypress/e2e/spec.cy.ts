
beforeEach(() => {
  cy.visit('/auth/sign-up', { failOnStatusCode: false })
})

describe('Register Page', () => {

  it.only('Register with Phone Number', () => {
    cy.registerbyPnoneNumber("879325037")
    cy.getByDataCy('submit')
  })




  
  it('Register - Verify code send to phone number', () => {
    cy.registerbyEmail("test@topfallower")
  })






  


  
})