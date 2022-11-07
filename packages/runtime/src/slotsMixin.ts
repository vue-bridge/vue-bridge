import { isVue2 } from './constants'
import { type VNode } from 'vue-demi'
type Slot = (...args: any[]) => VNode[]
export const slotsMixin = {
  beforeCreate() {
    if (isVue2) {
      Object.defineProperty(this, '$bridgeSlots', {
        get(): Record<string, Slot> {
          const slots: Record<string, Slot> = {}
          Object.keys(this.$slots).forEach((key) => {
            slots[key] = () => this.$slots[key]
          })
          return {
            ...slots,
            ...this.$scopedSlots,
          }
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
