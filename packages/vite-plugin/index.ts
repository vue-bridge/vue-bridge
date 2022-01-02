import path from 'path'
import type { Plugin, UserConfig } from 'vite'
import resolve from 'resolve-pkg'
import createLogger from 'debug'

const debug = createLogger('vue-bridge')

export interface VueBridgeOptions {
  vueVersion: '2' | '3'
  apply?: 'build' | 'serve'
  localizeDeps?: string[] | true
  projectRoot?: string // Directory containing package.json
}

const isVirtualBridge = (source: string) =>
  source.startsWith('virtual-bridge:') || source.startsWith('v-bridge:')
// const virtualBridgeRE = /virtual-bridge:(.+?):(.+)$/
const virtualBridgeRESingle = /v(?:irtual)?-bridge:([^:]+?)$/
const fileExtRE = /(\.(?:jsx?|tsx?|vue))$/

export function vueBridge(options: VueBridgeOptions) {
  const compatPlugin: Plugin = {
    name: 'vue-bridge',
    enforce: 'pre',
    apply: options.apply,

    config(config) {
      // resolve all vue-related plugins to absolute paths
      // so symlinked src files don't resolve deps to the wrong node_modules
      const addConfig: Partial<UserConfig> = {}
      if (options.localizeDeps) {
        const alias = resolveFullPathForPackages(options)
        debug('config aliases generated:', alias)

        addConfig.resolve = {
          alias: {
            ...alias,
            ...config.resolve?.alias,
          },
        }
      }

      // TODO: inline packages in `test` config for vitest?
      return addConfig
    },
    configResolved(config) {
      debug('config aliases resolved:', config.resolve.alias)
    },

    async resolveId(source, importer) {
      if (!isVirtualBridge(source)) return null
      let [, virtualPath] = source.match(virtualBridgeRESingle)
      debug('initial: ', source, virtualPath)
      if (virtualPath.startsWith('.')) {
        const fileExt = (virtualPath.match(fileExtRE) ?? [])[1]
        if (fileExt) {
          virtualPath = virtualPath.replace(
            fileExt,
            '.vue' + options.vueVersion + fileExt
          )
        } else {
          // likely a .ts file which don't have a file extensions in impor paths
          virtualPath = virtualPath + '.vue' + options.vueVersion
        }
      }
      debug('prepared:', virtualPath)

      const resolvedPath = await this.resolve(virtualPath, importer, {
        skipSelf: true,
      })
      debug('resolved:', resolvedPath.id)
      return resolvedPath
    },

    transform(code, id) {
      if (!id.endsWith('.vue')) return null
      const newCode = transformVersionedStyleBlock(
        code,
        `v${options.vueVersion}`
      )
      // debug('tranformedCode:', newCode)
      return {
        code: newCode,
        map: null,
      }
    },
  }

  return compatPlugin
}

const styleRE =
  /<(style (?:.*?)?(v(?:2|3))(?:.*?)?>)(?:(?:\n|\r|.)*?)<\/style>\n?/gm

function transformVersionedStyleBlock(code: string, version: 'v2' | 'v3') {
  const results = [...code.matchAll(styleRE)]
  if (!results.length) return code

  debug('styleparse results:', results[0][2], version)
  // implementation:
  // - remove style blocks of non-matching versions
  results.forEach((result) => {
    if (result[2] !== version) {
      const n = (result[0].match(/\n/gm) ?? []).length
      code = code.replace(result[0], '\n'.repeat(n))
    } else {
      code = code.replace(result[1], result[1].replace(version, ''))
    }
  })
  return code
}

function resolveFullPathForPackages(options: VueBridgeOptions) {
  const alias: Record<string, string> = {}
  const deps: string[] = []
  if (options.localizeDeps === true) {
    const { dependencies, devDependencies } = require(path.join(
      options.projectRoot ?? process.cwd(),
      './package.json'
    ))
    deps.push(...Object.keys(dependencies), ...Object.keys(devDependencies))
  } else {
    deps.push(...options.localizeDeps)
  }
  deps.forEach((dep) => {
    let fullPath: string
    try {
      fullPath = resolve(dep)
    } catch (error) {
      /* do nothing, dep seems not to be installed */
    }
    if (fullPath) {
      alias[dep] = fullPath
    }
  })

  return alias
}
