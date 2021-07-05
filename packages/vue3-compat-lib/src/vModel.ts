import type { App, DefineComponent } from 'vue'
import { isVue3 } from './constants'
/**
 * Usage:
 * props: {
 *   [modelProp()]: string
 * }
 */
export const modelProp = (): 'modelValue' =>
  isVue3 ? 'modelValue' : ('value' as unknown as 'modelValue')

export function modelEmitPlugin(Vue: App) {
  Vue.mixin(modelEmitMixin)
}

const modelEmitMixin = {
  beforeCreate(this: DefineComponent) {
    if (isVue3) return

    const _emit = this.$emit

    this.$emit = (event: string, payload?: any) => {
      event = event === 'update:modelValue' ? 'value' : event

      _emit(event, payload)
    }
  },
}
