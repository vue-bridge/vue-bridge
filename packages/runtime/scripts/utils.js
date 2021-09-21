/**
 * Inspired and partially copied from https://github.com/vueuse/vue-demi
 */
const path = require('path')
const fs = require('fs')

// const pkgPath = path.join(__dirname, '..', 'package.json')

function switchVersion(version) {
  // const pkg = require(path.join(__dirname, '..', 'package.json'))

  // // pkg.main = `./dist/index.vue${version}.cjs.js`
  // // pkg.module = `./dist/index.vue${version}.es.js`
  // // pkg.exports['.'].require = pkg.main
  // // pkg.exports['.'].import = pkg.module
  // // fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

  copy('index.cjs', version, 'cjs')
  copy('index.es.js', version, 'es')
  // TODO: copy types after having figured out how to build them for Vue 2.
  // copy('index.d.ts', version)
}

const dir = path.resolve(__dirname, '..', 'dist')

function copy(name, version, type) {
  // vue = vue || 'vue'
  const src = path.join(dir, `index.vue${version}.${type}.js`)
  const dest = path.join(dir, name)
  let content = fs.readFileSync(src, 'utf-8')
  //content = content.replace(/'vue'/g, `'${vue}'`)
  // unlink for pnpm, #92
  try {
    fs.unlinkSync(dest)
  } catch {
    /* eslint-disable-next-line no-empty */
  }
  fs.writeFileSync(dest, content, 'utf-8')
}

exports.switchVersion = switchVersion
