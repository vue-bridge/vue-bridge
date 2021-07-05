import type { App, DefineComponent } from 'vue'
import { isVue2 } from './constants'
/**
 * Usage:
 * props: {
 *   [modelProp()]: string
 * }
 */
export const modelProp = (): string =>
  isVue2 ? 'value' : 'modelValue'

export function modelEmitPlugin(Vue: App) {
  Vue.mixin(modelEmitMixin)
}

const modelEmitMixin = {
  beforeCreate(this: DefineComponent) {
    if (!isVue2) return

    const _emit = this.$emit

    this.$emit = (event: string, payload?: any) => {
      event = event === 'update:modelValue' ? 'input' : event

      _emit(event, payload)
    }

    if (!this.$options.keepValueProp && Object.prototype.hasOwnProperty.call(this.$options.props || {}, 'value')) {
      this.$options.props.modelValue = this.$options.props.value
      delete this.$options.props.value
    }
  },
}
