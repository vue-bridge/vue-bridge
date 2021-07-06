import { isVue2 } from './constants'

const listenerRE = /^on[A-Z]/
export function attrsListenersMixin() {
  if (isVue2) {
    return {
      computed: {
        $_attrs() {
          return (this as any).$listeners
        },
        $_listeners() {
          return (this as any).$listeners
        },
      },
    }
  } else {
    return {
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
          const attrs = (this as Record<string, any>).$attrs
          const listeners: Record<string, () => void> = {}
          Object.keys(attrs).forEach((key: string) => {
            if (listenerRE.test(key)) {
              listeners[lowerFirstChar(key.replace(/^on/, ''))]
            }
          })
        },
      },
    }
  }
}

function lowerFirstChar(v: string) {
  const first = v.slice(0, 1).toLowerCase()
  return first + v.slice(1)
}
