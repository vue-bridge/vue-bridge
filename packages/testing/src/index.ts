// import { isVue2 } from 'vue-demi'
import type { ComponentPublicInstance, ComponentOptionsBase } from 'vue'
import {
  mount as _mount,
  shallowMount as _shallowMount,
  MountingOptions,
  VueWrapper,
} from '@vue/test-utils'
// import * as testUtils from '@vue/test-utils'

let version: string = ''
try {
  const vue = require('vue')
  version = vue.version
} catch {
  /* eslint-disable-next-line no-empty */
  console.warn('[@vue-bridge/testing] Vue version could not be determined')
}

export const isVue2 = version.startsWith('2.')
export const isVue3 = version.startsWith('3.')

type Comp = ComponentPublicInstance<
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  false,
  ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}>
>

interface Vue2Options {
  components?: any
  plugins?: any
  directives?: any
  mixins?: any
  provide?: any

  stubs?: any
  mocks?: any
}

export function mount<T extends Comp, P, D = {}>(
  component: T,
  options: MountingOptions<P, D>
): ReturnType<typeof _mount> {
  // console.log(component)
  if (isVue2) {
    patchProps(options)
    patchGlobals(options)
    return patchUnMount(_mount(component, options))
  } else {
    patchSlots(options)
    return _mount(component, options)
  }
}
export function shallowMount<T extends Comp, P, D = {}>(
  component: T,
  options: MountingOptions<P, D>
): ReturnType<typeof _shallowMount> {
  if (isVue2) {
    patchProps(options)
    patchGlobals(options)
    return patchUnMount(_shallowMount(component, options))
  } else {
    patchSlots(options)
    return _shallowMount(component, options)
  }
}

function patchProps<P, D = {}>(options: MountingOptions<P, D>) {
  if (options.props) {
    options.propsData = options.props
    delete options.props
  }
}

function patchGlobals<P, D = {}>(options: MountingOptions<P, D> & Vue2Options) {
  if (!options.global) return

  //@ts-expect-error - this is a Vue 2 API
  const { createLocalVue } = testUtils
  const localVue = createLocalVue()
  if (options.global) {
    if (options.global.components) {
      Object.entries(options.components).forEach(([name, component]) => {
        localVue.component(name, component)
      })
    }
    if (options.global.directives) {
      Object.entries(options.directives).forEach(([name, directive]) => {
        localVue.directive(name, directive)
      })
    }
    if (options.global.plugins) {
      Object.entries(options.plugins).forEach(([name, plugin]) => {
        localVue.use(name, plugin)
      })
    }
    if (options.global.mixins) {
      Object.entries(options.mixins).forEach(([name, mixin]) => {
        localVue.mixin(name, mixin)
      })
    }

    if (options.global.provide) {
      options.provide = options.global.provide
    }
    if (options.global.mocks) {
      options.mocks = options.global.mocks
    }
    if (options.global.stubs) {
      options.stubs = options.global.stubs
    }

    delete options.global
  }
}

function patchUnMount<T extends Comp>(wrapper: VueWrapper<T>) {
  // @ts-expect-error
  wrapper.unmount = () => wrapper.destroy()
  return wrapper
}

function patchSlots<P, D = {}>(
  options: MountingOptions<P, D> & { scopedSlots?: any }
) {
  if (options.scopedSlots) {
    options.slots = options.slots || {}
    Object.keys(options.scopedSlots).forEach((key) => {
      options.slots![key] = options.scopedSlots[key]
    })
  }
}
