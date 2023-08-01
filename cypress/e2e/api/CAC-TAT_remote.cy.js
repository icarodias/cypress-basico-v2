describe('Test de API', () => {
    
  it('faz uma requisição HTTP', () => {
    const url = 'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html'
    
    cy.request(url).then( response => {
      const {status, statusText, body} = response
      
      expect(status).to.equal(200)
      expect(statusText).to.equal('OK')
      expect(body).to.include('CAC TAT')
    })
  })
})