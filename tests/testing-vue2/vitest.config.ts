// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue2'

const vuePath = new URL(
  'node_modules/vue/dist/vue.runtime.common.js',
  import.meta.url
).href

export default defineConfig({
  plugins: [
    // @ts-ignore - doesn't like the type for whatever reason
    vue(),
  ],
  define: {
    __VUE_TARGET_VERSION__: JSON.stringify('2'),
    'process.env.NODE_ENV': '"test"',
  },
  resolve: {
    alias: {
      vue: vuePath,
      '@vue/test-utils': new URL(
        'node_modules/@vue/test-utils',
        import.meta.url
      ).href,
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue2',
    },
  },
  test: {
    environment: 'jsdom',
    deps: {
      inline: true, // necessary for aliases to work in deps like `@vue/test-utils
    },
  },
})
