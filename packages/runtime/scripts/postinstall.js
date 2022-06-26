/**
 * Inspired and partially copied from https://github.com/vueuse/vue-demi
 */
const Vue = loadModule('vue')
const { switchVersion } = require('./utils')

if (!Vue || typeof Vue.version !== 'string') {
  console.warn(
    '[@vue-bridge/runtime] Vue was not found. Please install Vue version ^2.7.0 || >= 3.2'
  )
} else if (Vue.version.startsWith('2.7')) {
  switchVersion(2)
} else if (Vue.version.startsWith('3.')) {
  switchVersion(3)
} else {
  console.warn(
    `[@vue-bridge/runtime] Vue version v${Vue.version} is not supported.`
  )
}

function loadModule(name) {
  try {
    return require(name)
  } catch (e) {
    return undefined
  }
}
