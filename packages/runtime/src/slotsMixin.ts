import { isVue2 } from './constants'
export const slotsMixin = {
  beforeCreate() {
    if (isVue2) {
      Object.defineProperty(this, '$allSlots', {
        get() {
          return this.$scopedSlots
        },
      })
    } else {
      Object.defineProperty(this, '$allSlots', {
        get() {
          return this.$slots
        },
      })
    }
  },
}
