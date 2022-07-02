import { describe, expect, test, vi } from 'vitest'
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
  test('lifecycle hooks', () => {
    const spy = vi.fn()
    const Comp = defineComponent({
      render() {
        return h('div')
      },
      beforeUnmount() {
        spy()
      },
      unmounted() {
        spy()
      },
    })

    const wrapper = mount(Comp)

    wrapper.unmount()

    expect(spy).toHaveBeenCalledTimes(2)
  })
  test('v-model', async () => {
    const ChildComp = defineComponent({
      props: ['modelValue'],
      emits: ['update:modelValue'],
      template: `
      <div>
        <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
        ><p>{{ modelValue }}</p>
      </div>`,
    })

    const Comp = {
      components: { ChildComp },
      data: () => ({ message: 'test' }),
      template: `<div><child-comp v-model="message" /></div>`,
    }

    const wrapper = mount(Comp)

    expect(wrapper.element.innerHTML).toMatchInlineSnapshot(
      '"<div><input><p>test</p></div>"'
    )

    const input = wrapper.find('input')
    input.element.value = 'changed'
    input.trigger('input')

    await nextTick()

    expect((wrapper.vm as any).message).toBe('changed')

    wrapper.setData({
      message: 'changed again',
    })

    await nextTick()

    expect(wrapper.element.innerHTML).toMatchInlineSnapshot(
      '"<div><input><p>changed again</p></div>"'
    )
  })
  test.todo('$bridgeSlots', () => {})
  test.todo('setup()', () => {})
  test.todo('<script setup>', () => {})
})
