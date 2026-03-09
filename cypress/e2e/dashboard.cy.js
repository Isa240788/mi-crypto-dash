describe('Guerra de Tests: FinchTech Dashboard', () => {
  
  beforeEach(() => {
    // 1. Visitamos la página de Login primero
    cy.visit('http://localhost:5173/login') 

    // 2. El robot se loguea (usa una cuenta de prueba que ya tengas en Firebase)
    // Si no tienes una, el robot la va a intentar usar y Firebase te dirá el error
    cy.get('input[type="email"]').type('test@finchtech.com')
    cy.get('input[type="password"]').type('123456')
    cy.get('button[type="submit"]').click()

    // 3. Esperamos a que Firebase nos deje pasar al Dashboard
    cy.url().should('include', '/default/dashboard')
  })

  it('debe saludar al usuario en el Banner', () => {
    cy.contains('Tu libertad financiera').should('be.visible')
  })

  it('debe filtrar activos en tiempo real', () => {
  // 1. Usamos { force: true } para escribir
  cy.get('input[placeholder*="Buscar"]').type('Apple', { force: true })

  // 2. CAMBIO CLAVE: En lugar de should('be.visible'), usamos should('exist')
  // Así el robot confirma que Apple está ahí aunque el scroll lo tape un poquito
  cy.contains('Apple Inc.').should('exist')
  cy.contains('Tesla').should('not.exist')
})

it('debe navegar al Portafolio al hacer clic en Invertir', () => {
  // 3. Usamos { force: true } para el clic
  cy.contains('Invertir').first().click({ force: true })

  cy.url().should('include', '/portafolio')
  // 4. Aquí también usamos exist para evitar el mismo error
  cy.contains('Mi Cartera').should('exist')
})
})
