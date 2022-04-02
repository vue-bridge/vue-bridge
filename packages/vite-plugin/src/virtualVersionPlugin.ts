import { Plugin } from 'vite'
import { VueBridgeOptions } from '..'

// import { URL } from 'url'
import createLogger from 'debug'

const debug = createLogger('vite-bridge-virtual-version')

const isVirtualBridge = (source: string) =>
  source.startsWith('virtual-bridge:') ||
  source.startsWith('v-bridge:') ||
  source.includes('?v-bridge') ||
  source.includes('&v-bridge')

export function virtualVersionPlugin(options: VueBridgeOptions): Plugin {
  const fileExtRE = options.fileExtensionsRE ?? /(\.(?:jsx?|tsx?|vue))$/
  return {
    name: 'vue-bridge-virtual-version',
    enforce: 'pre',
    apply: options.apply,

    async resolveId(source, importer) {
      if (source.startsWith('\0')) return null
      // debug(source)
      if (!isVirtualBridge(source)) return null
      let virtualPath: string = ''
      const url = new URL(source, 'file:')

      debug('url search: ' + url.search)
      debug('url pathname: ' + url.pathname)
      if (url.searchParams.has('v-bridge')) {
        url.searchParams.delete('v-bridge')
        const filePath = url.pathname.slice(1)
        const fileExt = (filePath.match(fileExtRE) ?? [])[1]
        if (fileExt) {
          url.pathname = filePath.replace(
            fileExt,
            '.vue' + options.vueVersion + fileExt
          )
        } else {
          // likely a .ts file which don't have a file extensions in import paths
          url.pathname = filePath + '.vue' + options.vueVersion
        }
        virtualPath = url.pathname + '?' + url.search
        debug('virtualPath from query: ', virtualPath)

        const resolvedPath = await this.resolve(virtualPath, importer, {
          skipSelf: true,
        })
        debug('resolved:', resolvedPath)
        return resolvedPath
      }

      return null
    },
  }
}
