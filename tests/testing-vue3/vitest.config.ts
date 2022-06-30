// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

const vuePath = new URL(
  'node_modules/vue/dist/vue.runtime.common.js',
  import.meta.url
).href
console.log(vuePath)
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      vue: vuePath,
      '@vue/test-utils': new URL(
        'node_modules/@vue/test-utils',
        import.meta.url
      ).href,
    },
  },
  optimizeDeps: {
    exclude: ['@vue/test-utils', '@vue-bridge/testing'],
  },
  test: {
    environment: 'jsdom',
    deps: {
      inline: true, // [/@vue-bridge\/testing/, /@vue\/test-utils/, 'vue'],
    },
  },
})
