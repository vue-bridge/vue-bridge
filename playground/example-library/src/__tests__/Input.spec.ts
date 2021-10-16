/// <reference types="cypress" />
import { mount } from '@cypress/vue'
import Input from '../components/Input.vue'

describe('Input', () => {
  it('v-model works', () => {
    const newValue = 'Hello You!'
    mount(Input, {
      propsData: {
        modelValue: 'Hello World',
      },
    })

    cy.get('input').should('have.value', 'Hello World')
    cy.get('input')
      .clear()
      .type(newValue)
      .then(() => {
        const wrapper = Cypress.vueWrapper
        expect(wrapper.emitted('update:modelValue')?.length).to.eql(
          newValue.length + 1
        )
        expect((wrapper.emitted('update:modelValue')?.[10] as any)?.[0]).to.eql(
          'Hello You!'
        )
      })
  })

  it.skip('v-model on input works')
})
