declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      registerbyEmail(value: string): Chainable<any>;
      registerbyPnoneNumber(value: string): Chainable<any>;
      stubGraphQlRequest(opName: string, response: string): Chainable<any>;
      stubWithFixtureGraphQlRequest(opName: string, fixtureName: string): Chainable<any>;
      getByDataCy(value: string): Chainable<any>;
    }
  }
}

Cypress.Commands.add("getByDataCy", (selector) => {
  console.log("SELECTOR: "+`[data-cy=${selector}]`)
  return cy.get(`[data-cy=${selector}]`)
})

Cypress.Commands.add('registerbyEmail', (input: string) => {
  

  cy.get('.cursor-pointer.pt-2').then((field) => {
    expect(field[0]).to.have.text('Connect with your email')
    expect(field['selector']).eq('.cursor-pointer.pt-2')
  }).click()

  cy.get('#identifier').type(`${input}`)
  cy.get('[type="submit"]').click()

})

Cypress.Commands.add('registerbyPnoneNumber', (input: string) => {

  cy.get('.font-bold.leading-5').contains('Connect with phone number')
  cy.get('.iti__flag-container [aria-label="Telephone country code"]').click();

  cy.get('[data-dial-code="359"]').then((field) => {
    expect(field.children()[1]).to.have.class("iti__country-name")
    expect(field.children()[1]).to.have.text("Bulgaria")
    expect(field.children()[2]).to.have.class("iti__dial-code")
    expect(field.children()[2]).to.have.text("+359")
  }).click()

  cy.get('#identifier').type(`${input}`)
  cy.get('[type="submit"]').click()
  
})


Cypress.Commands.add('stubGraphQlRequest', (opName: string, response: String) => {
  cy.intercept('POST', Cypress.env('apiUrl'), (req) => {
    if (req.body.operationName === opName) {
      req.reply({
        statusCode: 200,
        body: response
      });
      req.alias = opName
    }

  })
})

Cypress.Commands.add('stubWithFixtureGraphQlRequest', (opName: string, fixture: String) => {
  cy.intercept('POST', Cypress.env('apiUrl'), (req) => {
    if (req.body.operationName === opName) {
      req.reply({
        statusCode: 200,
        fixture: fixture
      });
      req.alias = opName
    }

  })
})



