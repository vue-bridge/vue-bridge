import { mount, nextTick } from '@vue-bridge/testing'
import { describe, it, expect } from 'vitest'
import Input from '../components/Input.vue'

describe('Input', () => {
  it('v-model works', async () => {
    const newValue = 'Hello You!'
    const wrapper = mount(Input, {
      props: {
        modelValue: 'Hello World',
      },
    })
    await nextTick()

    const input = wrapper.find('input')
    expect(wrapper.props().modelValue).toBe('Hello World')
    expect(wrapper.vm.model).toBe('Hello World')
    expect(input!.element.value).toBe('Hello World')
    input.setValue(newValue)
    await nextTick()
    expect(wrapper.emitted()['update:modelValue']?.length).toEqual(1)
    expect((wrapper.emitted()['update:modelValue']?.[0] as any)?.[0]).toEqual(
      newValue
    )
  })
})
