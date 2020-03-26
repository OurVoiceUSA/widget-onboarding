describe('The Demo Page', function() {
  // NOTE! tests assume you are serving the widget-demo directory of the ourvoiceusa.github.io repo
  it('successfully loads', function() {
    cy.visit('http://localhost:8081/local-test.html')
  })

  it('button exists, when clicked, modal shows', () => {
    // button exists
    cy.get('.onboarding-widget-button').should('be.visible')

    // when clicked, modal shows
    cy.get('.onboarding-widget-button').click()
    cy.get('.ReactModal__Overlay.ReactModal__Overlay--after-open.onboarding-widget-overlay').should('be.visible')
    cy.get('[data-cy=onboarding-widget-modal]').should('be.visible')
  })
})
