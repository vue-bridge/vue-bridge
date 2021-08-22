import { defineComponent as _defineComponent, DefineComponent } from 'vue-demi'
import { isVue2 } from './constants'
import { patchVModelProp } from './vModel'
import { attrsListenersMixin } from './attrs-listeners'
import { lifecycleMixin } from './lifecycleHooks'
import { setDeleteMixin } from './set-delete'

export function /*#__PURE__*/ defineComponent(component: DefineComponent) {
  component.mixins = component.mixins || []
  component.mixins.push(attrsListenersMixin())
  if (isVue2) {
    patchVModelProp(component)
    component.mixins.push(lifecycleMixin)
  } else {
    component.mixins.push(setDeleteMixin)
  }
  return _defineComponent(component)
}
