import type { App } from 'vue'
import { isVue2 } from './constants'
import { lifecyclePlugin } from './lifecycleHooks'
import { listenersPlugin } from './listeners'
import { vModelPlugin } from './vModel'
import { setDeletePlugin } from './set-delete'

let installed = false

export function install(Vue: App) {
  if (isVue2 && !installed) {
    Vue.use(lifecyclePlugin)
    Vue.use(listenersPlugin)
    Vue.use(vModelPlugin)
    Vue.use(setDeletePlugin)
    installed = true
  }
}
