import { Plugin } from 'vite'
import { stylePlugin } from './src/stylePlugin'
import { localizeDepsPLugin } from './src/localizeDepsPlugin'
import { virtualVersionPlugin } from './src/virtualVersionPlugin'

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
}

export function vueBridge(options: VueBridgeOptions): Plugin[] {
  return [
    stylePlugin(options),
    localizeDepsPLugin(options),
    virtualVersionPlugin(options),
  ]
}
