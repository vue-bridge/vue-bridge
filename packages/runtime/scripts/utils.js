/**
 * Inspired and partially copied from https://github.com/vueuse/vue-demi
 */
const path = require('path')
const fs = require('fs')

const pkgPath = path.join(__dirname, '..', 'package.json')

function switchVersion(version) {
  const pkg = require(path.join(__dirname, '..', 'package.json'))

  pkg.main = `dist/index.vue${version}.cjs.js`
  pkg.module = `dist/index.vue${version}.es.js`
  pkg.exports['.'].require = pkg.main
  pkg.exports['.'].import = pkg.module

  // copy('index.cjs', version)
  // copy('index.es.js', version)
  // copy('index.d.ts', version)

  fs.writeFileSync(pkgPath, JSON.stringify(pkg.module))
}

const dir = path.resolve(__dirname, '..', 'dist')

function copy(name, version) {
  // vue = vue || 'vue'
  const src = path.join(dir, `index.vue${version}.js`, name)
  const dest = path.join(dir, name)
  let content = fs.readFileSync(src, 'utf-8')
  //content = content.replace(/'vue'/g, `'${vue}'`)
  // unlink for pnpm, #92
  try {
    fs.unlinkSync(dest)
  } catch (error) {
    return
  }
  fs.writeFileSync(dest, content, 'utf-8')
}

exports.switchVersion = switchVersion
