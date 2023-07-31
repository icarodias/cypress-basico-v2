Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Icaro')
    cy.get('#lastName').type('Dias')
    cy.get('#email').type('icaro@qate.st')
    cy.get('#open-text-area').type('Teste')
    
    cy.contains('button','Enviar').click()
})