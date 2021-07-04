import { App, isVue3 } from 'vue-demi'

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
  beforeCreate() {
    if (isVue3) return

    const _emit = this.$emit

    this.$emit = (event: string, payload?: any) => {
      event = event === 'update:modelValue' ? 'value' : event

      _emit(event, payload)
    }
  },
}
