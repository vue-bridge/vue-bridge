declare global {
  const __VUE_BRIDGE_TARGET_VERSION__: 2 | 3
}

export const isVue2 = __VUE_BRIDGE_TARGET_VERSION__ === 2
