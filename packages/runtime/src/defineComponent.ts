import {
  defineComponent as _defineComponent,
  isVue2,
  DefineComponent,
} from 'vue-demi'
import { patchVModelProp } from './vModel'
import { attrsListenersMixin } from './attrs-listeners'
import { lifecycleMixin } from './lifecycleHooks'

export const defineComponent = (component: DefineComponent) => {
  component.mixins = component.mixins || []
  component.mixins.push(attrsListenersMixin())
  if (isVue2) {
    patchVModelProp(component)
    component.mixins.push(lifecycleMixin)
  }
  console.log('patched component', component)
  return _defineComponent(component)
}
