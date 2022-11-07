/**
 * Inspired and partially copied from https://github.com/vueuse/vue-demi
 */
const path = require('path')
const fs = require('fs')

const pkgPath = path.join(__dirname, '..', 'package.json')

function switchVersion(version) {
  const pkg = require(pkgPath)

  pkg.main = `./dist-vue${version}/index.cjs.js`
  pkg.module = `./dist-vue${version}/index.es.mjs`
  pkg.exports['.'].types = `./dist-vue${version}/index.d.ts`
  pkg.exports['.'].require = pkg.main
  pkg.exports['.'].import = pkg.module
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
}

exports.switchVersion = switchVersion
