import type { App } from '@vue-bridge/runtime'
export { default as Input } from './components/Input.vue'
export { default as Switch } from './components/Switch.vue'
import Input from './components/Input.vue'
import Switch from './components/Switch.vue'

export function install(app: App) {
  app.component('MyInput', Input)
  app.component('Switch', Switch)
}
