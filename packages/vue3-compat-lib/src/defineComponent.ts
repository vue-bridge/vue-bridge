import { defineComponent as _defineComponent, isVue2, DefineComponent } from 'vue-demi'
import { patchVModelProp } from './vModel'
import { attrsListenersMixin } from './attrs-listeners'
import { lifecycleMixin } from './lifecycleHooks'

export const defineComponent = (component: DefineComponent) => {
  component.mixins = component.mixins || []
  if (isVue2) {
    patchVModelProp(component)
    component.mixins.push(attrsListenersMixin())
    component.mixins.push(lifecycleMixin)
  }
  else {
    component.mixins.push(attrsListenersMixin())
  }
  console.log('patched component', component)
  return _defineComponent(component)
}
