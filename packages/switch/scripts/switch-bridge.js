/**
 * Inspired and partially copied from https://github.com/vueuse/vue-demi
 */
const { switchVersion } = require('./utils')

const version = process.argv[2]

if (version == '2') {
  switchVersion(2)
  console.log(`[@vue-bridge/switch] Switched exports to Vue 2 version`)
} else if (version == '3') {
  switchVersion(3)
  console.log(`[@vue-bridge/switch] Switched exports to Vue 3 version`)
} else {
  console.warn(
    `[@vue-bridge/runtime] expecting version "2" or "3" but got "${version}"`
  )
  process.exit(1)
}
