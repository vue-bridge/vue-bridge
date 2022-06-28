/**
 * Inspired and partially copied from https://github.com/vueuse/vue-demi
 */
const path = require('path')
const fs = require('fs')

const pkgPath = path.join(__dirname, '..', 'package.json')

function switchVersion(version) {
  const pkg = require(pkgPath)

  pkg.main = `./dist-vue${version}/index.cjs.js`
  pkg.module = `./dist-vue${version}/index.es.js`
  pkg.exports['.'].types = `./dist-vue${version}/index.d.ts`
  pkg.exports['.'].require = pkg.main
  pkg.exports['.'].import = pkg.module
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

  // copy('index.cjs.js', version, 'cjs')
  // copy('index.es.js', version, 'es')
  // TODO: copy types after having figured out how to build them for Vue 2.
  // copy('index.d.ts', version)
}

// const distDir = path.resolve(__dirname, '..', 'dist')

// function copy(targetName, version, moduleFormat) {
//   // vue = vue || 'vue'
//   const src = path.join(distDir, `index.vue${version}.${moduleFormat}.js`)
//   const dest = path.join(distDir, targetName)
//   let content = fs.readFileSync(src, 'utf-8')
//   //content = content.replace(/'vue'/g, `'${vue}'`)
//   // unlink for pnpm, #92
//   try {
//     fs.unlinkSync(dest)
//   } catch {
//     /* eslint-disable-next-line no-empty */
//   }
//   fs.writeFileSync(dest, content, 'utf-8')
// }

exports.switchVersion = switchVersion
