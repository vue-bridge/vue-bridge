/// <reference types="cypress" />
import { testString as testStringVue2 } from '../../../../playground/example-library/src/components/helpers/index.vue2'
import { testString as testStringVue3 } from '../../../../playground/example-library/src/components/helpers/index.vue3'

describe(`app-${Cypress.env('version')}`, () => {
  it('visits successfully', () => {
    cy.visit('/')
    cy.contains(
      Cypress.env('version') === 'vue2' ? testStringVue2 : testStringVue3
    ).should('be.visible')
  })

  it('syncs input', () => {
    cy.visit('/')
    cy.contains('label', 'Input:').should('be.visible')
    cy.contains('p', 'Text from input:').should('be.visible')
    cy.get('input#custom-input')
      .should('be.visible')
      .type('test')
      .should('have.value', 'test')
    cy.contains('p', 'Text from input: test').should('be.visible')
  })

  it('toggles transition', () => {
    cy.visit('/')
    cy.contains('h1', 'Comp A').should('be.visible')
    cy.contains('h1', 'Comp B').should('not.exist')
    cy.contains('button', 'Toggle Transition').should('be.visible').click()
    cy.contains('h1', 'Comp B').should('be.visible')
    cy.contains('h1', 'Comp A').should('not.exist')
  })
})
