import type { App } from 'vue'
import { isVue2 } from './constants'
import { lifecyclePlugin } from './lifecycleHooks'
import { listenersPlugin } from './listeners'
import { modelEmitPlugin } from './vModel'
import { setDeletePlugin } from './set-delete'

let installed = false

export function install(Vue: App) {
  if (isVue2 && !installed) {
    Vue.use(lifecyclePlugin)
    Vue.use(listenersPlugin)
    Vue.use(modelEmitPlugin)
    Vue.use(setDeletePlugin)
    installed = true
  }
}
