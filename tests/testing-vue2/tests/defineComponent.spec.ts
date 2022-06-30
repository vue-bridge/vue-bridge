import { describe, expect, test } from 'vitest'
import { h, nextTick } from 'vue'
import { defineComponent } from '@vue-bridge/runtime'
import { mount } from '@vue-bridge/testing'

describe('Runtime: DefineComponent', () => {
  test('$set & $delete', async () => {
    const wrapper = mount(
      defineComponent({
        data: () => ({
          state: {
            a: 'A',
          } as { a: 'A'; b?: 'B' },
          list: [1, 2, 3],
        }),
        async mounted() {
          this.$set(this.state, 'b', 'B')
          await this.$nextTick()
          this.$delete(this.state, 'b')
        },
        render() {
          return h('div', {}, JSON.stringify(this.state, null, 2))
        },
      })
    )

    expect(wrapper.element.innerHTML).toMatchInlineSnapshot(
      `
      "{
        \\"a\\": \\"A\\"
      }"
    `
    )
    await nextTick()

    expect(wrapper.element.innerHTML).toMatchInlineSnapshot(
      `
      "{
        \\"a\\": \\"A\\",
        \\"b\\": \\"B\\"
      }"
    `
    )
    await nextTick()

    expect(wrapper.element.innerHTML).toMatchInlineSnapshot(
      `
      "{
        \\"a\\": \\"A\\"
      }"
    `
    )
  })
  test.todo('lifecycle hooks', () => {})
  test.todo('v-model', () => {})
  test.todo('$bridgeSlots', () => {})
  test.todo('setup()', () => {})
  test.todo('<script setup>', () => {})
})
