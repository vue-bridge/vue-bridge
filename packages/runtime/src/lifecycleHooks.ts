import { isVue2 } from './constants'
export const lifecycleMixin = {
  beforeCreate() {
    if (isVue2) {
      const options = (this as any).$options
      if (options.beforeUnmount) {
        options.beforeDestroy = options.beforeUnmount
        delete options.beforeUnmount
      }
      if (options.unmounted) {
        options.destroyed = options.unmounted
        delete options.unmounted
      }
    }
  },
}
