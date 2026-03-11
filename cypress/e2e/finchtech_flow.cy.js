describe('FinchTech - Flujo Crítico de Usuario', () => {
  beforeEach(() => {
    // 1. Visitamos la Home (Pública)
    cy.visit('/')
  })

  it('debe mostrar la marquesina y navegar al Journal', () => {
    // Verificamos que cargue el nombre de la app
    cy.contains('FinchTech').should('be.visible')
    
    // Verificamos que exista el acceso al Journal (News)
    cy.get('a[href="/news"]').first().click()
    cy.url().should('include', '/news')
    cy.contains('Journal').should('be.visible')
  })

  it('debe intentar entrar al Dashboard y ser rebotado al Login', () => {
    // Intentamos entrar a una ruta protegida sin estar logueados
    cy.visit('/default/dashboard')
    
    // El Router Guard (beforeEach) debería mandarnos al Login
    cy.url().should('include', '/login')
    cy.contains('Bienvenido').should('be.visible')
  })

  it('debe permitir al usuario ver el formulario de registro', () => {
    cy.visit('/login')
    cy.contains('Regístrate aquí').click()
    cy.url().should('include', '/register')
    cy.contains('Únete a FinchTech').should('be.visible')
  })
})
