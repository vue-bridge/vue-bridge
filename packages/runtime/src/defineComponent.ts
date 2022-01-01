// We use 'vue-demi' as a virtual module here, it will be dynamically replaced with the right
// import from the ./defineComponent/ folder during build.
import { defineComponent as _defineComponent } from 'virtual:vue'
import { isVue2 } from './constants'
import { patchVModelProp } from './vModel'
import { lifecycleMixin } from './lifecycleHooks'
import { setDeleteMixin } from './set-delete'
import { slotsMixin } from './slotsMixin'

export const defineComponent: typeof _defineComponent = (component: any) => {
  if (typeof component === 'function') {
    component = {
      setup: component,
      name: component.name,
    }
  }
  component.mixins = component.mixins || []
  component.mixins.push(slotsMixin)
  if (isVue2) {
    patchVModelProp(component)
    component.mixins.push(lifecycleMixin)
  } else {
    component.mixins.push(setDeleteMixin)
  }
  return _defineComponent(component)
}
