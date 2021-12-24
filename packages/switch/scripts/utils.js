/**
 * Inspired and partially copied from https://github.com/vueuse/vue-demi
 */
const path = require('path')
const fs = require('fs')

const pkgPath = path.join(process.cwd(), 'package.json')
function switchVersion(version) {
  const exportsPath = version === 2 ? './vue2' : './vue3'
  const pkg = require(pkgPath)

  if (!pkg?.exports?.[exportsPath]) {
    throw new Error(
      `[@vue-bridge/switch] - Could not set up correct package exports for package ${pkg.name}:
        the "exports" field in its package.json is missing conditions for '${exportsPath}'.
        This has to be fixed by the package maintainer, if possible open an issue in their repository.
      `
    )
  }

  const vueExports = pkg.exports[exportsPath]
  pkg.exports['.'] = vueExports
  pkg.main = vueExports.require
  pkg.module = vueExports.import
  if (vueExports.types) {
    pkg.types = vueExports.types
    // pkg.exports.types = vueExports.types
  }
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
}

exports.switchVersion = switchVersion
