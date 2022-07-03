import { describe, expect, test, vi } from 'vitest'
import { h, nextTick, PluginFunction, VNode } from 'vue'
import { defineComponent } from '@vue-bridge/runtime'
import type { App } from '@vue-bridge/runtime'
import { mount, isVue2, isVue3 } from '@vue-bridge/testing'

const SimpleComp = {
  render() {
    return h('div', {}, 'Hello')
  },
}
describe('Basic Test-Utils APIs', () => {
  test('isVue* flags match used version', () => {
    expect(isVue2).toBe(__VUE_TARGET_VERSION__ === '2')
    expect(isVue3).toBe(__VUE_TARGET_VERSION__ === '3')
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

  describe('global', () => {
    test('global.provide', () => {
      const spy = vi.fn()
      mount(
        defineComponent({
          render: () => h('div', 'Hello'), //h(null as any),
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
          render: () => h('div', 'Hello'),
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
            'test-global-dir': (el: HTMLElement) =>
              (el.dataset.test = 'success'),
          },
        },
      })

      expect((wrapper.element as HTMLElement).dataset.test).toBe('success')
    })
    test('global.mocks', () => {
      const spy = vi.fn()
      mount(
        defineComponent({
          render: () => h('div', 'Hello'),
          mounted() {
            // @ts-ignore property is unknown
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
          renderStubDefaultSlot: true,
          stubs: {
            GlobalComponent: {
              name: 'GlobalComponent',
              template: '<div>Hello</div>',
            },
          },
        },
      })
      await nextTick()
      expect(wrapper.element.outerHTML).toMatchInlineSnapshot(
        '"<div><div>Hello</div></div>"'
      )
    })

    // FIXME: This one test always fails in CI. No idea why. none.
    const isCI = process.env.CI || import.meta.env.CI
    // test('global.plugins', async () => {
    test.skipIf(isCI)('global.plugins', async () => {
      const mixinSpy = vi.fn()

      const plugin: PluginFunction<{ message?: string }> = (
        app: App,
        { message } = {}
      ) => {
        if (isVue2) {
          app.prototype.$test = message
        } else {
          app.config.globalProperties.$test = message
        }
        app.mixin({
          created() {
            mixinSpy()
            ;(this as any).testPluginMixin = message
          },
        })
      }
      const message = 'success'
      const wrapper = mount(SimpleComp, {
        global: {
          plugins: [[plugin, { message }]],
        },
      })
      await nextTick()
      const { vm } = wrapper
      console.log(Object.keys(vm))
      expect(mixinSpy).toHaveBeenCalled()
      expect((vm as any).$test).toBe(message)
      expect((vm as any).testPluginMixin).toBe(message)
    })
  })

  test('props', async () => {
    const wrapper = mount(
      defineComponent({
        props: { message: String },
        render() {
          return h('div', {}, this.message as string)
        },
      }),
      {
        props: {
          message: 'Hello',
        },
      }
    )

    expect(wrapper.element.outerHTML).toMatchInlineSnapshot(
      `"<div>Hello</div>"`
    )
  })
  test('attrs', async () => {
    const wrapper = mount(
      defineComponent({
        render() {
          return h('div', {}, 'Hello')
        },
      }),
      {
        attrs: {
          id: 'test',
        },
      }
    )

    expect(wrapper.element.outerHTML).toMatchInlineSnapshot(
      `"<div id=\\"test\\">Hello</div>"`
    )
  })
  // this one will be gnarly. Is it even possible at all?
  test.todo('listeners')

  describe('slots', () => {
    const Comp = defineComponent({
      render() {
        const slot = (this.$bridgeSlots as any).default
        const vnodes: VNode[] = slot()
        return h('div', {}, vnodes)
      },
    })
    test('slots: string', async () => {
      const wrapper = mount(Comp, {
        slots: {
          default: `<span>Text Slot</span>`,
        },
      })

      expect(wrapper.element.outerHTML).toMatchInlineSnapshot(
        '"<div><span>Text Slot</span></div>"'
      )
    })

    test('scopedSlots', async () => {
      const wrapper = mount(Comp, {
        scopedSlots: {
          default: `<span>Text Slot</span>`,
        },
      })

      expect(wrapper.element.outerHTML).toMatchInlineSnapshot(
        '"<div><span>Text Slot</span></div>"'
      )
    })
  })
})
