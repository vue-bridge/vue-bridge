import vue3 from '@vitejs/plugin-vue'
import { createVuePlugin as vue2 } from 'vite-plugin-vue2'
import type { VueViteOptions as Vue2Options } from 'vite-plugin-vue2'
import type { Options as Vue3Options } from '@vitejs/plugin-vue'
import type { Plugin } from 'vite'

/**
 * Usage:
 * import Vue3Compat from 'vite-plugin-vue3-compat'
 *
 * plugins: [
 *   Vue3Compat(
 *     mainMode: 3,
 *     vue3PluginOptions: {}
 *     vue2PluginOptions: {}
 *   )
 * ]
 */

interface VueCompatOptions {
  mainMode: 2 | 3
  vue3PluginOptions?: Vue3Options
  vue2PluginOptions?: Vue2Options
}

export default function viteVueCompatPlugin(_options: VueCompatOptions) {
  const {
    vue2PluginOptions = {},
    vue3PluginOptions = {},
    ...options
  } = _options

  const vueCompatPlugin = createVueCompatPlugin(options)

  const vuePlugin =
    process.env.BUILD_TARGET_VUE === '2'
      ? vue2(vue2PluginOptions)
      : vue3(vue3PluginOptions)

  return [vueCompatPlugin, vuePlugin]
}

function createVueCompatPlugin(
  options: Omit<VueCompatOptions, 'vue3PluginOptions' | 'vue2PluginOptions'>
) {
  const compatPlugin: Plugin = {
    name: 'vue3-compat',
    // @ts-expect-error - return type mismatch in vite's types
    config(config) {
      const mode = process.env.BUILD_TARGET_VUE || options.mainMode
      const baseFileName =
        (config.build?.lib && config.build.lib.fileName) ?? 'index'
      const fileName =
        mode === options.mainMode
          ? baseFileName
          : `vue${options.mainMode}/${baseFileName}`

      return {
        build: {
          lib: {
            fileName,
          },
          rollupOptions: {
            external: ['vue3-compat-lib'],
          },
        },
        resolve: {
          alias: {
            vue: mode === 2 ? 'vue2' : 'vue',
          },
        },
      } // as UserConfig
    },
  }

  return compatPlugin
}
