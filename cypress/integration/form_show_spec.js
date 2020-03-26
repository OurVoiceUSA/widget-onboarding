describe('The Demo Page', function() {
  // NOTE! tests assume you are serving the widget-demo directory of the ourvoiceusa.github.io repo

  it('modal shows with all input fields (default)', () => {
    cy.visit('http://localhost:8081/local-test.html')
    cy.get('.onboarding-widget-button').click()
    cy.get('[data-cy=name-field]').click().should('be.visible')
    cy.get('[data-cy=age-field]').click().should('be.visible')
    cy.get('[data-cy=affiliation-field]').select('Independent').should('be.visible') // special test needed
    cy.get('[data-cy=address1-field]').click().should('be.visible')
    cy.get('[data-cy=address2-field]').click().should('be.visible')
    cy.get('[data-cy=city-field]').click().should('be.visible')
    cy.get('[data-cy=state-field]').click().should('be.visible')
    cy.get('[data-cy=zip-field]').click().should('be.visible')
    cy.get('[data-cy=registered-field]').should('be.visible')
  })

  it('modal shows with all input fields except the party affiliation and age (removed from widget config)', function() {
    cy.visit('http://localhost:8081/local-test-no-age-party-affiliation.html')
    cy.get('.onboarding-widget-button').click()
    cy.get('[data-cy=name-field]').click().should('be.visible')
    cy.get('[data-cy=age-field]').should('not.be.visible')
    cy.get('[data-cy=affiliation-field]').should('not.be.visible')
    cy.get('[data-cy=address1-field]').click().should('be.visible')
    cy.get('[data-cy=address2-field]').click().should('be.visible')
    cy.get('[data-cy=city-field]').click().should('be.visible')
    cy.get('[data-cy=state-field]').click().should('be.visible')
    cy.get('[data-cy=zip-field]').click().should('be.visible')
    cy.get('[data-cy=registered-field]').should('be.visible')
  })
})
