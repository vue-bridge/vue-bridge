import {
  // @ts-ignore
  DirectiveOptions as DirectiveVue2,
  // @ts-ignore
  DirectiveFunction,
  default as App,
} from 'vue'
import { defineComponent as defineComponent$1 } from '../src/defineComponent/vue2'

import { attrsListenersMixinVue2 as _attrsListenersMixin } from '../src/attrs-listeners'
import { lifecycleMixin as _lifecycleMixin } from '../src/lifecycleHooks'
import { setDeleteMixin as _setDeleteMixin } from '../src/set-delete'

// Helper functions
export declare interface Directive<T = any, V = any> {
  /** Equivalent of Vue2's `bind` */
  beforeMount: DirectiveFunction
  /** Equivalent of Vue2's `inserted` */
  mounted: DirectiveFunction
  /** @deprecated Do not use, not compatible with Vue 3 */
  update: DirectiveFunction
  /** Equivalent of Vue2's `componentUpdated` */
  updated: DirectiveFunction
  /** Equivalent of Vue2's `unbind` */
  unmounted: DirectiveFunction
}
export declare function defineDirective(
  directiveConfig: Directive
): DirectiveVue2
export declare const defineComponent: typeof defineComponent$1

// Mixins
export declare const attrsListenersMixin: typeof _attrsListenersMixin
export declare const lifecycleMixin: typeof _lifecycleMixin
export declare const setDeleteMixin: typeof _setDeleteMixin

export { App }
