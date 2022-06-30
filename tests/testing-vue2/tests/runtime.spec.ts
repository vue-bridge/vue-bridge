import { describe, expect, test, vi } from 'vitest'
import { computed, ObjectDirective, reactive } from 'vue'
import { isVue2, set, del, defineDirective } from '@vue-bridge/runtime'

describe('Runtime: Basics', () => {
  test('version flags work', () => {
    expect(isVue2).toBe(__VUE_TARGET_VERSION__ === '2')
    expect(!isVue2).toBe(__VUE_TARGET_VERSION__ === '3')
  })

  test('set/del:object', () => {
    const state = reactive<{ a: string; b?: string }>({
      a: 'A',
    })
    const derived = computed(() => (state.b ? true : false))
    set(state, 'b', 'B')
    expect(state.b).toBe('B')
    expect(derived.value).toBe(true)

    del(state, 'b')
    expect(state.b).toBe(undefined)
    // FIXME: this should evaluate to true?
    // expect(derived.value).toBe(false)
  })
  test('set/del:array', () => {
    const state = reactive<{ arr: number[] }>({
      arr: [1, 2, 3],
    })
    const derived = computed(() => state.arr.length)
    set(state.arr, 2, 0)
    expect(state.arr[2]).toBe(0)
    expect(derived.value).toBe(3)
    set(state.arr, 3, 4)
    expect(state.arr[3]).toBe(4)
    expect(derived.value).toBe(4)

    del(state.arr, 3)
    expect(derived.value).toBe(3)
  })
})
describe('Runtime: defineDirective', () => {
  test('lifecycle hooks translate correctly', () => {
    const spy = vi.fn()
    let binding: any = null
    const directive = defineDirective({
      beforeMount(el: any, _binding: any) {
        binding = _binding
        spy(arguments.length)
      },
      mounted(el: any) {
        el
      },
      updated(el: any) {
        el
      },
      unmounted(el: any) {
        el
      },
    }) as ObjectDirective
    if (isVue2) {
      expect(directive).toMatchObject({
        bind: expect.any(Function),
        inserted: expect.any(Function),
        componentUpdated: expect.any(Function),
        unbind: expect.any(Function),
      })
      // @ts-ignore - type conflict
      directive.bind(...([1, {}, { context: 1 }, 1] as any[]))
      expect(binding).toMatchObject({
        instance: 1,
      })
    } else {
      expect(directive).toMatchObject({
        beforeMount: expect.any(Function),
        mounted: expect.any(Function),
        updated: expect.any(Function),
        unmounted: expect.any(Function),
      })
      // @ts-ignore - type conflict
      directive.beforeMount(...([1, 1, 1, 1] as any[]))
    }
    expect(spy).toHaveBeenCalledWith(4)
  })
})
describe.todo('Runtime: attrsListeners', () => {})
