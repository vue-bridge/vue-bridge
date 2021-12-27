import {
  // @ts-ignore
  DirectiveOptions as DirectiveVue2,
  // @ts-ignore
  DirectiveFunction,
  default as App,
} from 'vue'
import { defineComponent as defineComponent$1 } from '../src/defineComponent/vue2'

import { attrsListenersMixin as _attrsListenersMixin } from '../src/attrs-listeners'
import { lifecycleMixin as _lifecycleMixin } from '../src/lifecycleHooks'
import { setDeleteMixin as _setDeleteMixin } from '../src/set-delete'

// Helper functions
export declare interface Directive<T = any, V = any> {
  /** Equivalent of Vue2's `bind` */
  beforeMount: DirectiveFunction
  /** Equivalent of Vue2's `inserted` */
  mounted: DirectiveFunction
  /** @ Do not use, not compatible with Vue 3 */
  update: DirectiveFunction
  /** Equivalent of Vue2's `componentUpdated` */
  updated: DirectiveFunction
  /** Equivalent of Vue2's `unbind` */
  unmounted: DirectiveFunction
}
declare function defineDirective(directiveConfig: Directive): DirectiveVue2
declare const defineComponent: typeof defineComponent$1

// Mixins
declare const attrsListenersMixin: typeof _attrsListenersMixin
declare const lifecycleMixin: typeof _lifecycleMixin
declare const setDeleteMixin: typeof _setDeleteMixin

export { App }
