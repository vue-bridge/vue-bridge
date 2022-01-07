import { isVue2 } from './constants'

const listenerRE = /^on[A-Z]/
const isOn = (v: string) => !!v.match(listenerRE)
const CACHE = '__vb_alCache'
type Attrs = Record<string, string>
type Listeners = Record<string, (...args: any[]) => void>

export const attrsListenersMixinVue2 = {
  methods: {
    $_attrs(): Attrs {
      return (this as any).$attrs
    },
    $_listeners(): Listeners {
      return (this as any).$listeners
    },
    $_class(): string {
      return ''
    },
    $_style(): string {
      return ''
    },
    $_nativeOn(): Listeners {
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
    $_attrs(this: any): Attrs {
      return this[CACHE].attrs
    },
    $_listeners(this: any): Listeners {
      return this[CACHE].listeners
    },
    $_nativeOn(this: any): Listeners {
      return this[CACHE].nativeOn
    },
    $_class(this: any): string {
      return this.$attrs.class
    },
    $_style(this: any): string {
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
  const emits = Object.keys(vm._.emitsOptions || {}) as string[]
  const rawProps = vm._.vnode.props as Record<string, any>

  const attrs: Attrs = {}
  const listeners: Listeners = {}
  const nativeOn: Listeners = {}
  for (const key in $attrs) {
    if (isOn(key)) {
      nativeOn[key] = $attrs[key] as any
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
