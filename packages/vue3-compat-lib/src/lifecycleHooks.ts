import type { App } from 'vue'
import { isVue2 } from './constants'

export function lifecyclePlugin(Vue: App) {
  if (isVue2) {
    Vue.mixin(lifecycleMixin)
  }
}

export const lifecycleMixin = {
  beforeCreate() {
    const options = (this as any).$options
    if (options.beforeUnmount) {
      options.beforeDestroy = options.beforeUnmount
      delete options.beforeUnmount
    }
    if (options.unmounted) {
      options.destroyed = options.unmounted
      delete options.unmounted
    }
  },
}
