import {
  defineComponent as defineComponent$1,
  DirectiveHook,
  VNode,
  App,
} from 'vue'

import { attrsListenersMixin as _attrsListenersMixin } from '../src/attrs-listeners'
import { lifecycleMixin as _lifecycleMixin } from '../src/lifecycleHooks'
import { setDeleteMixin as _setDeleteMixin } from '../src/set-delete'

export declare interface Directive<T = any, V = any> {
  /** @deprecated do not use, not supported by Vue 2 */
  created?: DirectiveHook<T, null, V>
  beforeMount?: DirectiveHook<T, null, V>
  mounted?: DirectiveHook<T, null, V>
  /** @deprecated do not use, not supported by Vue 2 */
  beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>
  updated?: DirectiveHook<T, VNode<any, T>, V>
  /** @deprecated do not use, not supported by Vue 2 */
  beforeUnmount?: DirectiveHook<T, null, V>
  unmounted?: DirectiveHook<T, null, V>
  getSSRProps?: (...args: [any]) => void
}

// Helper functions
declare function defineDirective<T, V>(
  directiveConfig: Directive<T, V>
): Directive<T, V>
declare const defineComponent: typeof defineComponent$1

// Mixins
declare const attrsListenersMixin: typeof _attrsListenersMixin
declare const lifecycleMixin: typeof _lifecycleMixin
declare const setDeleteMixin: typeof _setDeleteMixin

export { App }
