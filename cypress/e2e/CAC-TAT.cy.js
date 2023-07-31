/// <reference types="Cypress"/>

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() =>{
    //Given
    cy.visit('../../src/index.html')
  })

  it('Verifica o título da aplicação', () => {
    //Then
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    cy.get('#title').should('have.text', 'CAC TAT')
  })

  it('Preenche todos os campos obrigatórios e envia o formulário', () => {
    //Given
    const messageLong = `abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi 
                         abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi abcdefghi `

    //When
    cy.get('#firstName').type('Icaro')
    cy.get('#lastName').type('Dias')
    cy.get('#email').type('icaro@qa.test')
    cy.get('#open-text-area').type(messageLong,{delay:0})
    cy.contains('button', 'Enviar').click()

    //Then
    cy.get('.success').should('be.visible')
    cy.get('.success').should('contain.text', 'Mensagem enviada com sucesso.')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    //When
    cy.get('#firstName').type('Icaro')
    cy.get('#lastName').type('Dias')
    cy.get('#email').type('icaro@qaest')
    cy.get('#open-text-area').type('Teste')
    
    cy.contains('button', 'Enviar').click()

    //Then
    cy.get('.error').should('be.visible')
    cy.get('.error').should('contain.text', 'Valide os campos obrigatórios!')
    
  })

  it('Telefone continua vazio ao inserir valores não númericos', () =>{
    //When
    cy.get('#phone').should('be.empty')
    cy.get('#phone').type('teste')

    //Then
    cy.get('#phone').should('be.empty')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório e não é preenchido antes do envio do formulário',() => {
    //When
    cy.get('#firstName').type('Icaro')
    cy.get('#lastName').type('Dias')
    cy.get('#email').type('icaro@qate.st')
    cy.get('#open-text-area').type('Teste')
    
    cy.get('#phone-checkbox').check()

    cy.contains('button', 'Enviar').click()

    //Then
    cy.get('.error').should('be.visible')
    cy.get('.error').should('contain.text', 'Valide os campos obrigatórios!')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //When
    cy.contains('button', 'Enviar').click()
    
    //Then
    cy.get('.error').should('be.visible')
    cy.get('.error').should('contain.text', 'Valide os campos obrigatórios!')
  })


  it('Envia formulário usando comando customizado', () => {
    //When
    cy.fillMandatoryFieldsAndSubmit()

    //Then
    cy.get('.success').should('be.visible')
    cy.get('.success').should('contain.text', 'Mensagem enviada com sucesso.')
  })


  it('Seleciona um produto (YouTube) por seu texto', () => {
    //When
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    //When
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu índice', () => {
    //When
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')  //Then
  })


  it('Marca tipo de atendimento "Feedback"', () => {
    
    cy.get('input[type="radio"][value="feedback"]')
      .check() //When
      .should('have.value', 'feedback')  //Then
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each((radio) => {
      cy.wrap(radio).check()
      cy.wrap(radio).should('be.checked')
    })
  })

  it('Marca ambos checkboxs, depois desmarca o ultimo', () => {
    cy.get('input[type="checkbox"]')
      .should('have.length', 2)
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .should('have.not.value')
      .selectFile('cypress/fixtures/example.json') //When
      .then((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo da pasta fixtures simulando drag-and-drop', () => {
    cy.get('input[type="file"]')
      .should('have.not.value')
      .selectFile('cypress/fixtures/example.json', {action:'drag-drop'}) //When
      .then((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo da pasta fixtures com alias', () => {
    cy.fixture('example.json', { encoding: null }).as('exampleFile')
    cy.get('input[type="file"]')
      .should('have.not.value')
      .selectFile('@exampleFile') //When
      .then((input) => {
        expect(input[0].files[0].name).to.equal('example.json')  //Then
      })
  })

  it('Verifica que a política de privacidade abre em outra aba sem necessidade de um clique', () => {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('Acessa página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.url().should('have.text', '/src/privacy.html')
  })
})