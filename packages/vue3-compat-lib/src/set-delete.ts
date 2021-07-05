import { isVue3 } from './constants'

export function setDeletePlugin(Vue: App) {
  if (isVue3) {
    Vue.config.globalProperties.$set = (obj, key, value) => {
      obj[key] = value
    }
    Vue.config.globalProperties.$delete = (obj, key) => {
      if (Array.isArray(obj)) {
        obj.splice(+key)
      } else {
        delete obj[key]
      }
    }
  }
}
