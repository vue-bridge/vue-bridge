import {
  defineComponent as defineComponent$1,
  DirectiveHook,
  VNode,
  App,
} from 'vue'

import { attrsListenersMixinVue3 as _attrsListenersMixin } from '../src/attrs-listeners'
import { lifecycleMixin as _lifecycleMixin } from '../src/lifecycleHooks'
import { setDeleteMixin as _setDeleteMixin } from '../src/set-delete'

export declare interface Directive<T = any, V = any> {
  /** @deprecated do not use, not supported by Vue 2 */
  created?: DirectiveHook<T, null, V>
  /** Equivalent of Vue 2's `bind` */
  beforeMount?: DirectiveHook<T, null, V>
  /** Equivalent of Vue 2's `inserted` */
  mounted?: DirectiveHook<T, null, V>
  /** @deprecated do not use, not supported by Vue 2 */
  beforeUpdate?: DirectiveHook<T, VNode<any, T>, V>
  /** Equivalent of Vue 2's `componentUpdated` */
  updated?: DirectiveHook<T, VNode<any, T>, V>
  /** @deprecated do not use, not supported by Vue 2 */
  beforeUnmount?: DirectiveHook<T, null, V>
  /** Equivalent of Vue 2's `unbind` */
  unmounted?: DirectiveHook<T, null, V>
  getSSRProps?: (...args: [any]) => void
}

// Helper functions
export declare function defineDirective<T, V>(
  directiveConfig: Directive<T, V>
): Directive<T, V>
export declare const defineComponent: typeof defineComponent$1

// Mixins
export declare const attrsListenersMixin: typeof _attrsListenersMixin
export declare const lifecycleMixin: typeof _lifecycleMixin
export declare const setDeleteMixin: typeof _setDeleteMixin

export { App }
