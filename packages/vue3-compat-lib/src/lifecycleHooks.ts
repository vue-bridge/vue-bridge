import { App, isVue2 } from 'vue-demi'

export function lifecyclePlugin(Vue: App) {
  if (isVue2) {
    Vue.mixin({
      beforeCreate() {
        const options = this.$options
        if (options.beforeUnmount) {
          options.beforeDestroy = options.beforeUnmount
          delete options.beforeUnmount
        }
        if (options.unmounted) {
          options.destroyed = options.unmounted
          delete options.unmounted
        }
      },
    })
  }
}
