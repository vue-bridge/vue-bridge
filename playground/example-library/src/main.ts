import type { App } from '@vue-bridge/runtime'
export { default as MyInput } from './components/MyInput.vue'
export { default as MySwitch } from './components/MySwitch.vue'
import MyInput from './components/MyInput.vue'
import MySwitch from './components/MySwitch.vue'

export function install(app: App) {
  app.component('MyInput', MyInput)
  app.component('MySwitch', MySwitch)
}
