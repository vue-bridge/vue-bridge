import type { ObjectEmitsOptions } from '@vue/runtime-core'
import { isVue2 } from './constants'

const listenerRE = /^on[A-Z]/

export function /*#__PURE__*/ attrsListenersMixin() {
  if (isVue2) {
    return {
      computed: {
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
          const emitsOptions = ((this as any)._ as any)
            .emitsOptions as ObjectEmitsOptions
          const attrs = (this as Record<string, any>).$attrs
          const listeners: Record<string, () => void> = {}
          Object.keys(attrs).forEach((key: string) => {
            if (listenerRE.test(key)) {
              const listener = lowerFirstChar(key.replace(/^on/, ''))
              // FIXME: only include events that are *not* declared in `emits` option
              if (!emitsOptions[listener]) {
                listeners[listener]
              }
            }
          })
          return listeners
        },
        $_class(): any {
          return (this as any).$attrs.class
        },
        $_style(): any {
          return (this as any).$attrs.style
        },
      },
    }
  }
}

function lowerFirstChar(v: string) {
  const first = v.slice(0, 1).toLowerCase()
  return first + v.slice(1)
}
