import { App, isVue2 } from 'vue-demi'
import { lifecyclePlugin } from './lifecycleHooks'
import { listenersPlugin } from './listeners'
import { modelEmitPlugin } from './vModel'

let installed = false

export function install(Vue: App) {
  if (isVue2 && !installed) {
    Vue.use(lifecyclePlugin)
    Vue.use(listenersPlugin)
    Vue.use(modelEmitPlugin)
    installed = true
  }
}
