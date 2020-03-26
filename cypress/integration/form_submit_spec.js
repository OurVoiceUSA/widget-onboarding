describe('The Demo Page', function() {
  // NOTE! tests assume you are serving the widget-demo directory of the ourvoiceusa.github.io repo

  beforeEach(() => {
    cy.visit('http://localhost:8081/local-test.html')
    cy.get('.onboarding-widget-button').click()
  })

  it('submitted form without a required field does not show QR code', () => {
    cy.get('[data-cy=age-field] input').type('33')
    cy.get('[data-cy=affiliation-field]').select('Independent')
    cy.get('[data-cy=address1-field] input').type('801 17th street north')
    cy.get('[data-cy=city-field] input').type('birmingham')
    cy.get('[data-cy=state-field] input').type('al')
    cy.get('[data-cy=zip-field] input').type('35203')
    cy.get('[data-cy=registered-field] input').click()
    cy.get('[data-cy=form]').submit()
    cy.get('[data-cy=qr-link]').should('not.be.visible')
  })

  it.skip('properly submitted form displays a valid QR', () => {
    cy.get('[data-cy=name-field] input').type('Test User')
    cy.get('[data-cy=age-field] input').type('33')
    cy.get('[data-cy=affiliation-field]').select('Independent')
    cy.get('[data-cy=address1-field] input').type('801 17th street north')
    cy.get('[data-cy=city-field] input').type('birmingham')
    cy.get('[data-cy=state-field] input').type('al')
    cy.get('[data-cy=zip-field] input').type('35203')
    cy.get('[data-cy=registered-field] input').click()
    cy.get('[data-cy=form]').submit()
    cy.get('[data-cy=qr-link]').should('be.visible')
  })
})
