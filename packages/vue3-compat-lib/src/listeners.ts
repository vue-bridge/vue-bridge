import type { App } from 'vue'
import { isVue2 } from './constants'
export function listenersPlugin(Vue: App) {
  if (isVue2) {
    Object.defineProperty((Vue as any).prototype, '$_listeners', {
      get() {
        this.$listeners
      },
    })
  } else {
    Vue.config.globalProperties.$_listeners = {}
  }
}
