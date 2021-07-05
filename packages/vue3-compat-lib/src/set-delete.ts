import type { App } from 'vue'
import { isVue3 } from './constants'

export function setDeletePlugin(Vue: App) {
  if (isVue3) {
    Vue.config.globalProperties.$set = (
      obj: { [k: string]: any },
      key: string | number,
      value: any
    ) => {
      obj[key] = value
    }
    Vue.config.globalProperties.$delete = (
      obj: { [k: string]: any },
      key: string | number
    ) => {
      if (Array.isArray(obj)) {
        obj.splice(+key)
      } else {
        delete obj[key]
      }
    }
  }
}
