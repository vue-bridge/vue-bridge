import { describe, expect, test, vi } from 'vitest'
import { h, nextTick } from 'vue'
import { defineComponent } from '@vue-bridge/runtime'
import { mount, isVue2, isVue3 } from '@vue-bridge/testing'
import * as Pkg from '../package.json'

const SimpleComp = {
  render() {
    return h('div', {}, 'Hello')
  },
}
describe('Basic Test-Utils APIs', () => {
  test('isVue* flags match used version', () => {
    // TODO: improve this by providing actual intended major version through vite define global var
    expect(isVue2).toBe(Pkg.dependencies.vue.slice(1, 2) === '2')
    expect(isVue3).toBe(Pkg.dependencies.vue.slice(1, 2) === '3')
  })

  test('mounts basic component', () => {
    const wrapper = mount(SimpleComp)

    expect(wrapper.element.innerHTML).toBe('Hello')
  })

  test('wrapper.unmount()', async () => {
    const spy = vi.fn()
    const wrapper = mount(
      defineComponent({
        ...SimpleComp,
        beforeUnmount: spy,
      })
    )

    wrapper.unmount()
    await nextTick()
    expect(spy).toHaveBeenCalled()
  })

  test('global.provide', () => {
    const spy = vi.fn()
    mount(
      defineComponent({
        render: () => null,
        inject: ['A'],
        mounted() {
          // @ts-expect-error property is unknown
          this.A()
        },
      }),
      {
        global: {
          provide: {
            A: spy,
          },
        },
      }
    )

    expect(spy).toHaveBeenCalled()
  })

  test('global.mixin', () => {
    const spy = vi.fn()
    mount(
      defineComponent({
        render: () => null,
        mounted() {
          // @ts-expect-error property is unknown
          this.mixinSpy()
        },
      }),
      {
        global: {
          mixins: [
            {
              data: () => ({
                mixinSpy: spy,
              }),
            },
          ],
        },
      }
    )

    expect(spy).toHaveBeenCalled()
  })

  test('global.components', async () => {
    const GlobalComponent = (
      await import('../fixtures/global-components/GlobalComponent.vue')
    ).default

    const TestComp = (
      await import('../fixtures/global-components/TestComponent.vue')
    ).default

    const wrapper = mount(TestComp, {
      global: {
        components: {
          GlobalComponent,
        },
      },
    })
    expect(wrapper.findComponent(GlobalComponent).exists()).toBe(true)
  })
  test('global.directives', async () => {
    const TestComp = (await import('../fixtures/GlobalDirective.vue')).default
    const wrapper = mount(TestComp, {
      global: {
        directives: {
          'test-global-dir': (el: HTMLElement) => (el.dataset.test = 'success'),
        },
      },
    })

    expect((wrapper.element as HTMLElement).dataset.test).toBe('success')
  })
  test('global.mocks', () => {
    const spy = vi.fn()
    mount(
      defineComponent({
        render: () => null,
        mounted() {
          // @ts-expect-error property is unknown
          this.$myFunction()
        },
      }),
      {
        global: {
          mocks: {
            $myFunction: spy,
          },
        },
      }
    )

    expect(spy).toHaveBeenCalled()
  })
  test('global.stubs', async () => {
    // This component relies on `<GlobalComponent>` being defined
    const TestComp = (
      await import('../fixtures/global-components/TestComponent.vue')
    ).default
    const wrapper = mount(TestComp, {
      global: {
        stubs: {
          GlobalComponent: {
            render: () => h('div', 'Hello'),
          },
        },
      },
    })
    expect(wrapper.element.outerHTML).toMatchInlineSnapshot(
      '"<div>Hello</div>"'
    )
  })

  test.todo('props')
  test.todo('attrs')
  test.todo('listeners')
  test.todo('slots')
  test.todo('scopedSlots')
})
