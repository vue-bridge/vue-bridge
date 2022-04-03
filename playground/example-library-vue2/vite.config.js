import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import { vueBridge } from '@vue-bridge/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    createVuePlugin(),
    vueBridge({
      vueVersion: '2',
      localizeDeps: true,
    }),
  ],
  resolve: {
    alias: {
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue2',
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      external: ['vue', '@vue/composition-api', '@vue-bridge/runtime'],
    },
  },
  test: {
    environment: 'jsdom',
    deps: {
      inline: [
        // '@vue-bridge/runtime',
        // '@vue-bridge/runtime/vue2',
        // regex needed, as with a string it checks for `node_modules/${package}`
        // and this is a local workspace package.
        /packages\/testing\/dist/,
        '@vue/testing-utils',
        '@vue/composition-api',
        // 'vue',
      ],
      // external: [],
    },
  },
})
