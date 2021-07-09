// TODO: Convert to Typescript
const { isVue2 } = require('vue-demi')
const { mount: _mount, ...testUtils } = require('@vue/test-utils')

module.exports = {
  mount,
  ...testUtils,
}

function mount(component, options) {
  if (isVue2) {
    patchProps(options)
    patchGlobals(options)
    return patchUnMount(_mount(component, options))
  } else {
    patchSlots(options)
    return _mount(component, options)
  }
}

function patchProps(options) {
  if (options.props) {
    options.propsData = options.props
    delete options.props
  }
}

function patchGlobals(options) {
  if (options.global) return

  const { createLocalVue } = testUtils
  const localVue = createLocalVue()

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

function patchUnMount(wrapper) {
  wrapper.unmount = () => wrapper.destroy()
}

function patchSlots(options) {
  if (options.scopedSlots) {
    options.slots = options.slots || {}
  }
  Object.keys(options.scopedSlots).forEach((key) => {
    options.slots[key] = options.scopedSlots[key]
  })
}
