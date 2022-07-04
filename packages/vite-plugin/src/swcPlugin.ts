import { Options as SWCOptions, transform } from '@swc/core'
import { Plugin } from 'vite'

export function swcPlugin(
  options: {
    swcOptions?: SWCOptions
    [key: string]: any
  } = {}
): Plugin {
  const { swcOptions = {} } = options
  return {
    name: 'vite-bridge-swc',
    // enforce: 'pre',
    config(config) {
      config.esbuild = false
    },
    async transform(code, id) {
      if (/\.(js|[tj]sx?)$/.test(id)) {
        const transformed = await transform(code, swcOptions)
        return transformed
      }
    },
  }
}
