import { isVue2 } from './constants'

const listenerRE = /^on[A-Z]/
const isOn = (v: string) => !!v.match(listenerRE)
const CACHE = '__vb_alCache'
type Attrs = Record<string, string>
type Listeners = Record<string, (...args: any[]) => void>

export const attrsListenersMixinVue2 = {
  methods: {
    $bridgeAttrs(): Attrs {
      return (this as any).$attrs
    },
    $bridgeListeners(): Listeners {
      return (this as any).$listeners
    },
    $bridgeClass(): string {
      return ''
    },
    $bridgeStyle(): string {
      return ''
    },
    $bridgeNativeOn(): Listeners {
      return {}
    },
  },
}

export const attrsListenersMixinVue3 = {
  beforeCreate(this: any) {
    this[CACHE] = generateData(this)
  },
  beforeUpdate(this: any) {
    this[CACHE] = generateData(this)
  },
  methods: {
    $bridgeAttrs(this: any): Attrs {
      return this[CACHE].attrs
    },
    $bridgeListeners(this: any): Listeners {
      return this[CACHE].listeners
    },
    $bridgeNativeOn(this: any): Listeners {
      return this[CACHE].nativeOn
    },
    $bridgeClass(this: any): string {
      return this.$attrs.class
    },
    $bridgeStyle(this: any): string {
      return this.$attrs.style
    },
  },
}

interface Data {
  attrs: Attrs
  listeners: Listeners
  nativeOn: Listeners
}
function generateData(vm: any): Data {
  const $attrs = vm.$attrs as Attrs
  const emitsOptions: string[] | Record<string, any> = vm._.emitsOptions || []
  const emits = Array.isArray(emitsOptions)
    ? emitsOptions
    : Object.keys(emitsOptions)
  const rawProps = vm._.vnode.props as Record<string, any>

  const attrs: Attrs = {}
  const listeners: Listeners = {}
  const nativeOn: Listeners = {}
  for (const key in $attrs) {
    if (isOn(key)) {
      const _key = key[2].toLowerCase() + key.slice(3)
      nativeOn[_key] = $attrs[key] as any
    } else if (key !== 'class' && key !== 'style') {
      attrs[key] = $attrs[key]
    }
  }
  emits.forEach((_key) => {
    const key = 'on' + _key[0].toUpperCase() + _key.slice(1)
    if (rawProps[key]) {
      listeners[key] = rawProps[key]
    }
  })

  return {
    attrs,
    listeners,
    nativeOn,
  }
}
export const attrsListenersMixin = isVue2
  ? attrsListenersMixinVue2
  : attrsListenersMixinVue3
