import createLogger from 'debug'

import { Plugin } from 'vite'
import { VueBridgeOptions } from '../index'

const debug = createLogger('vite-bridge-style')

export function stylePlugin(options: VueBridgeOptions): Plugin {
  return {
    name: 'vite-bridge-style',
    enforce: 'pre',
    apply: options.apply,
    transform(code, id) {
      if (!id.endsWith('.vue')) return null
      const newCode = transformVersionedStyleBlock(
        code,
        `v${options.vueVersion}`
      )
      // debug('transformedCode:', newCode)
      return {
        code: newCode,
        map: null,
      }
    },
  }
}

const styleRE =
  /<(style (?:.*?)?(v(?:2|3))(?:.*?)?>)(?:(?:\n|\r|.)*?)<\/style>\n?/gm

function transformVersionedStyleBlock(code: string, version: 'v2' | 'v3') {
  const results = [...code.matchAll(styleRE)]
  if (!results.length) return code

  debug('style-parse results:', results[0][2], version)
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
