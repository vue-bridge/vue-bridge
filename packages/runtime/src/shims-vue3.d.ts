declare module '*.vue' {
  import { DefineComponent } from 'vue-demi'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const ___V3COMPAT_LIB_VUE_2___: boolean
declare const ___V3COMPAT_LIB_VUE_3___: boolean
declare const __VUE_BRIDGE_TARGET_VERSION__: 2 | 3
