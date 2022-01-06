import { isVue2 } from './constants'

type ObjectEmitsOptions = Record<string, ((...args: any[]) => any) | null>

const listenerRE = /^on[A-Z]/

export const attrsListenersMixinVue2 = {
  methods: {
    $_attrs() {
      return (this as any).$attrs
    },
    $_listeners() {
      return (this as any).$listeners
    },
    $_class() {
      return ''
    },
    $_style() {
      return ''
    },
  },
}

export const attrsListenersMixinVue3 = {
  methods: {
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
      const self = this as Record<string, any>
      const emitsOptions = (self._ as any).emitsOptions as ObjectEmitsOptions
      const attrs = self.$attrs
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
