// @ts-expect-error
import { DirectiveOptions as Directive } from 'vue'
import { defineComponent as defineComponent$1 } from '../src/defineComponent/vue2'

import { attrsListenersMixin as _attrsListenersMixin } from '../src/attrs-listeners'
import { lifecycleMixin as _lifecycleMixin } from '../src/lifecycleHooks'
import { setDeleteMixin as _setDeleteMixin } from '../src/set-delete'

// Helper functions
declare function defineDirective(directiveConfig: Directive): Directive
declare const defineComponent: typeof defineComponent$1

// Mixins
declare const attrsListenersMixin: typeof _attrsListenersMixin
declare const lifecycleMixin: typeof _lifecycleMixin
declare const setDeleteMixin: typeof _setDeleteMixin
