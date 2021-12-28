import type { ObjectEmitsOptions } from 'vue'
import { isVue2 } from './constants'

const listenerRE = /^on[A-Z]/

export const attrsListenersMixinVue2 = {
  computed: {
    $_attrs() {
      return (this as any).$attrs
    },
    $_listeners() {
      return (this as any).$listeners
    },
  },
  methods: {
    $_class() {
      return ''
    },
    $_style() {
      return ''
    },
  },
}

export const attrsListenersMixinVue3 = {
  computed: {
    $_attrs() {
      const attrs = (this as Record<string, any>).$attrs
      const _attrs: Record<string, any> = {}
      Object.keys(attrs).forEach((key: string) => {
        if (key !== 'class' && key !== 'style' && !listenerRE.test(key)) {
          _attrs[key] = attrs[key]
        }
      })
      return _attrs
    },
    $_listeners() {
      const emitsOptions = ((this as any)._ as any)
        .emitsOptions as ObjectEmitsOptions
      const attrs = (this as Record<string, any>).$attrs
      const listeners: Record<string, () => void> = {}
      Object.keys(attrs).forEach((key: string) => {
        if (listenerRE.test(key)) {
          const listener = lowerFirstChar(key.replace(/^on/, ''))
          if (!emitsOptions[listener]) {
            listeners[listener]
          }
        }
      })
      return listeners
    },
  },
  methods: {
    $_class(): string {
      return (this as any).$attrs.class
    },
    $_style(): string {
      return (this as any).$attrs.style
    },
  },
}

export const attrsListenersMixin = isVue2
  ? attrsListenersMixinVue2
  : attrsListenersMixinVue3

function lowerFirstChar(v: string) {
  const first = v.slice(0, 1).toLowerCase()
  return first + v.slice(1)
}
