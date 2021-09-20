// import { isVue2 as _isVue2 } from 'vue-demi'

declare global {
  const __VUE_BRIDGE_TARGET_VERSION__: 2 | 3
}

export const isVue2 = __VUE_BRIDGE_TARGET_VERSION__ === 2
