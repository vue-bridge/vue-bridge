import { isVue2 } from './constants'
export const slotsMixin = {
  beforeCreate() {
    if (isVue2) {
      Object.defineProperty(this, '$bridgeSlots', {
        get() {
          return this.$scopedSlots
        },
      })
    } else {
      Object.defineProperty(this, '$bridgeSlots', {
        get() {
          return this.$slots
        },
      })
    }
  },
}
