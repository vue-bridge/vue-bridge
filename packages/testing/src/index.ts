/// <reference types="node" />

import {
  mount as _mount,
  shallowMount as _shallowMount,
  MountingOptions,
  VueWrapper,
} from '@vue/test-utils'
import * as testUtils from '@vue/test-utils'

export { flushPromises } from './utils/flushPromises'

export const isVue2 = 'createLocalVue' in testUtils
export const isVue3 = !isVue2
interface Vue2Options {
  components?: any
  plugins?: any
  directives?: any
  mixins?: any
  provide?: any

  stubs?: any
  mocks?: any
}

function mountFn(
  component: any,
  options: any = {} // MountingOptions<P, D> = {}
): ReturnType<typeof _mount> {
  // console.log(component)
  if (isVue2) {
    patchProps(options)
    patchGlobals(options)
    return patchUnMount(_mount(component, options)) as ReturnType<typeof _mount>
  } else {
    patchSlots(options)
    return _mount(component, options) as ReturnType<typeof _mount>
  }
}
export const mount = mountFn as typeof _mount

function shallowMountFn(
  component: any,
  options: any
): ReturnType<typeof _shallowMount> {
  if (isVue2) {
    patchProps(options)
    patchGlobals(options)
    return patchUnMount(_shallowMount(component, options)) as ReturnType<
      typeof _shallowMount
    >
  } else {
    patchSlots(options)
    return _shallowMount(component, options) as ReturnType<typeof _shallowMount>
  }
}
export const shallowMount = shallowMountFn as typeof _shallowMount

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
  // @ts-ignore - not known to Vue 3 / TU 2
  options.localVue = localVue
  if (options.global) {
    if (options.global.components) {
      Object.entries(options.global.components).forEach(([name, component]) => {
        localVue.component(name, component)
      })
    }
    if (options.global.directives) {
      Object.entries(options.global.directives).forEach(([name, directive]) => {
        localVue.directive(name, directive)
      })
    }
    if (options.global.plugins) {
      options.global.plugins.forEach((pluginEntry) => {
        const [plugin, ...options] = Array.isArray(pluginEntry)
          ? pluginEntry
          : [pluginEntry]
        localVue.use(plugin, ...options)
      })
    }
    if (options.global.mixins) {
      options.global.mixins.forEach((mixin) => {
        localVue.mixin(mixin)
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

function patchUnMount(wrapper: VueWrapper<any>) {
  // @ts-expect-error
  wrapper.unmount = () => wrapper.destroy()
  return wrapper
}

function patchSlots<P, D = {}>(
  // in Vue 3 , we only have slots, so scopedSlots have to merged with those.
  options: MountingOptions<P, D> & { scopedSlots?: any }
) {
  if (options.scopedSlots) {
    options.slots = options.slots || {}
    Object.keys(options.scopedSlots).forEach((key) => {
      options.slots![key] = options.scopedSlots[key]
    })
  }
}

export function enableAutoUnmount(hook: Function) {
  return isVue2
    ? // @ts-ignore
      testUtils.enableAutoUnmount(hook)
    : // @ts-ignore
      testUtils.enableAutoDestroy(hook)
}

export function disableAutoUnmount() {
  isVue2
    ? // @ts-ignore
      testUtils.disableAutoUnmount()
    : // @ts-ignore
      testUtils.disableAutoDestroy()
}
