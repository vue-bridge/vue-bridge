import { App, isVue2 } from 'vue-demi'

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
