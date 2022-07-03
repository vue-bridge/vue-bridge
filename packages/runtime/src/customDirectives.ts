import type { Directive, DirectiveBinding, DirectiveHook, VNode } from 'vue'
import { isVue2 } from './constants'

const map = {
  beforeMount: 'bind' as const,
  // TODO: replace with fn's throwing dev warnings
  beforeCreate: null, // Vue 3 Only
  mounted: 'inserted',
  beforeUpdate: null, // Vue 3 Only
  update: null, // Vue 3 not supported
  updated: 'componentUpdated',
  beforeUnMount: null, // Vue 3 Only
  unmounted: 'unbind',
} as const

export function defineDirective<T, V>(
  directiveConfig: Directive<T, V>
): Directive<T, V> {
  if (!isVue2) {
    return directiveConfig
  } else {
    const newDirective = {} as Directive<T, V>
    Object.keys(directiveConfig).forEach((hook) => {
      const newName = map[hook as keyof typeof map]
      if (newName) {
        // @ts-ignore - Because of mismatching hook names between Vue 2 / 3 Directives
        newDirective[newName] = wrapDirectiveHook(directiveConfig[hook])
      }
    })

    return newDirective
  }
}

function wrapDirectiveHook<V>(hookFn: DirectiveHook): DirectiveHook {
  return (
    el: Element,
    binding: DirectiveBinding<V>,
    newVNode: VNode,
    oldVNode: VNode | null
  ) => {
    const instance = (newVNode as any).context
    // @ts-ignore - Vue 2/3 type conflict
    binding.instance = instance
    return hookFn(el, binding, newVNode, oldVNode)
  }
}
