import { mount } from '@vue-bridge/testing'
import { nextTick } from 'vue-demi'
import Input from '../components/Input.vue'
describe('Input', () => {
  test('mounts', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'Hello World',
      },
    })

    await nextTick()

    expect(wrapper.exists())
    expect(wrapper.find('input').element.value).toBe('Hello World')
  })

  test.todo('v-model on input works')
})
