describe('Desafio aula 13', () => {
    const url = 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    
    it('Encontrando o gato', () => {
        cy.visit(url)

        cy.get('#cat')
            .invoke('show')
            .should('be.visible')

    
    })
})