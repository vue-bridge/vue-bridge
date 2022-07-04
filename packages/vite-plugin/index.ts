import type { Plugin } from 'vite'
import type { Options as SWCOptions } from '@swc/core'
import { stylePlugin } from './src/stylePlugin'
import { localizeDepsPLugin } from './src/localizeDepsPlugin'
import { virtualVersionPlugin } from './src/virtualVersionPlugin'
import { swcPlugin } from './src/swcPlugin'
export interface VueBridgeOptions {
  vueVersion: '2' | '3'
  apply?: 'build' | 'serve'
  localizeDeps?: string[] | true
  /**
   * Directory containing package.json
   */
  projectRoot?: string
  /**
   * Aliases to recognize in v-bridge: virtual paths, i.e. "@/" for "v-bridge:@/bridges/my-file.js"
   */
  aliases?: string[]
  /**
   * Regular Expression to detect fileExtensions in import paths
   * @default /(\.(?:jsx?|tsx?|vue))$/
   */
  fileExtensionsRE?: RegExp

  /**
   * Wether or not to use SWC to compile JS/TS (allows transpilation to ES5 and polyfills like babel)
   */
  useSwc?: boolean
  /**
   * Options for swc - see: https://swc.rs/docs/configuration/swcrc
   */
  swcOptions?: SWCOptions
}

export function vueBridge(options: VueBridgeOptions): Plugin[] {
  return [
    stylePlugin(options),
    localizeDepsPLugin(options),
    virtualVersionPlugin(options),
    (options.vueVersion === '2' && options.useSwc !== false) ||
    options.useSwc === true
      ? swcPlugin(options)
      : undefined,
  ]
}
