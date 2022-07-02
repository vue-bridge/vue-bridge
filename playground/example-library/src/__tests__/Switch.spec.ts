import { mount } from '@vue-bridge/testing'
// import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, test } from 'vitest'
import SwitchVue from '../components/Switch.vue'

describe('Switch', () => {
  test('works', async () => {
    const wrapper = mount(SwitchVue, {})

    // console.log(wrapper.element.outerHTML)
    expect(wrapper.find('h1').text()).toBe('Comp A')
    const btn = wrapper.find('button')
    btn.trigger('click')

    await nextTick()
    // console.log(wrapper.element.outerHTML)
    expect(wrapper.find('h1').text()).toBe('Comp B')
  })
})
