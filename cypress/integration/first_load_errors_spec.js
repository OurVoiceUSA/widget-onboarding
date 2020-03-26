describe('The Demo Page (with config errors)', function() {
  // NOTE! tests assume you are serving the widget-demo directory of the ourvoiceusa.github.io repo

  function testButtonAndModal () {
    // button exists
    cy.get('.onboarding-widget-button')
      .should('be.visible')
      // button's innerHTML says error: "HelloVoter widget failed to load."
      .should('contain', 'HelloVoter widget failed to load.')

    // when clicked, modal does not show
    cy.get('.onboarding-widget-button').click()
    cy.get('.ReactModal__Overlay.ReactModal__Overlay--after-open.onboarding-widget-overlay').should('not.be.visible')
    cy.get('[data-cy=onboarding-widget-modal]').should('not.be.visible')
  }

  /*
   * Testing invalid configuration (no server)
   *
   */
  it('successfully loads', function() {
    cy.visit('http://localhost:8081/local-test-no-server.html')
  })

  it('button exists, but because no server is defined in config, shows error state, and clicking does not show modal', () => {
    testButtonAndModal()
  })

  /*
   * Testing invalid configuration (no form ID)
   *
   */
  it('successfully loads', function() {
    cy.visit('http://localhost:8081/local-test-no-formid.html')
  })

  it('button exists, but because no form ID is defined in config, shows error state, and clicking does not show modal', () => {
    testButtonAndModal()
  })

  /*
   * Testing invalid configuration (invalid questions)
   *
   */
  it('successfully loads', function() {
    cy.visit('http://localhost:8081/local-test-invalid-questions.html')
  })

  it('button exists, but because no invalid questions are defined in config, shows error state, and clicking does not show modal', () => {
    testButtonAndModal()
  })
})
