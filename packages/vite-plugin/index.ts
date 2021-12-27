import type { Plugin, UserConfig } from 'vite'
import resolve from 'resolve-pkg'

interface VueBridgeOptions {
  vueVersion: '2' | '3'
  apply?: 'build' | 'serve'
  localizePackages?: string[] | false
}

export const defaultPackages = [
  'vue',
  '@vue-bridge/runtime',
  'vue-demi',
  '@vue-bridge/testing',
  '@vue/test-utils',
]

export function vueBridge(options: VueBridgeOptions) {
  const compatPlugin: Plugin = {
    name: 'vue-bridge',
    enforce: 'pre',
    apply: options.apply ?? 'build',
    config() {
      // resolve all vue-related plugins to absolute paths
      // so symlinked src files don't resolve deps to the wrong node_modules
      const addConfig: Partial<UserConfig> = {}
      if (options.localizePackages !== false) {
        const alias = resolveFullPathForPackages(options)
        addConfig.resolve = {
          alias,
        }
      }

      // TODO: inline packages in `test` config for vitest
      return addConfig
    },
    transform(code, id) {
      if (!id.endsWith('.vue')) return
      return transformVersionedStyleBlock(code, `v${options.vueVersion}`)
    },
  }

  return compatPlugin
}

const styleRE =
  /<(style (?:.*?)?(v(?:2|3))(?:.*?)?>)(?:(?:\n|\r|.)*?)<\/style>\n?/gm

function transformVersionedStyleBlock(code: string, version: 'v2' | 'v3') {
  const results = [...code.matchAll(styleRE)]
  if (!results.length) return code

  // implementation:
  // - remove style blocks of non-matching versions
  results.forEach((result) => {
    if (result[2] !== version) {
      const n = (result[0].match(/\n/gm) ?? []).length
      code.replace(result[0], '\n'.repeat(n))
    } else {
      code.replace(result[1], result[1].replace(version, ''))
    }
  })
  // remove `v2`/`v3` attribute from remaining style blocks
  return code
}

function resolveFullPathForPackages(options: VueBridgeOptions) {
  const alias: Record<string, string> = {}
  const packages = options.localizePackages || defaultPackages
  packages.forEach((pkg) => {
    const fullPath = resolve(pkg)
    if (fullPath) {
      alias[pkg] = fullPath
    }
  })

  return alias
}
