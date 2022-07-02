// <reference types="vitest" />
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

const vuePath = new URL('node_modules/vue/index.mjs', import.meta.url).href

export default defineConfig({
  plugins: [
    // @ts-expect-error - doesn't like the type for whatever reason
    vue(),
  ],
  define: {
    __VUE_TARGET_VERSION__: JSON.stringify('3'),
    'process.env.NODE_ENV': '"test"',
  },
  resolve: {
    alias: {
      vue: vuePath,
      '@vue/test-utils': new URL(
        'node_modules/@vue/test-utils',
        import.meta.url
      ).href,
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue3',
    },
  },
  optimizeDeps: {
    exclude: ['@vue/test-utils', '@vue-bridge/testing'],
  },
  test: {
    include: [
      '../testing-vue2/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    environment: 'jsdom',
    deps: {
      inline: true, // [/@vue-bridge\/testing/, /@vue\/test-utils/, 'vue'],
    },
  },
})
