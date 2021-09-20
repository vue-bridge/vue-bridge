import { defineComponent as _defineComponent } from 'vue-demi'
import { isVue2 } from './constants'
import { patchVModelProp } from './vModel'
import { lifecycleMixin } from './lifecycleHooks'
import { setDeleteMixin } from './set-delete'

export const defineComponent: typeof _defineComponent = (component: any) => {
  if (typeof component === 'function') {
    component = {
      setup: component,
      name: component.name,
    }
  }
  component.mixins = component.mixins || []
  if (isVue2) {
    patchVModelProp(component)
    component.mixins.push(lifecycleMixin)
  } else {
    component.mixins.push(setDeleteMixin)
  }
  return _defineComponent(component)
}
