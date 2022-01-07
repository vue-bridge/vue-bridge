import { isVue2 } from './constants'
export const patchLifecycleHooks = (options: any) => {
  if (isVue2) {
    if (options.beforeUnmount) {
      options.beforeDestroy = options.beforeUnmount
      delete options.beforeUnmount
    }
    if (options.unmounted) {
      options.destroyed = options.unmounted
      delete options.unmounted
    }
  }
}
