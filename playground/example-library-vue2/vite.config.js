import { defineConfig } from 'vite'
import path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    alias: {
      // are we have Vue 2 and Vue 3 in this monorepo,
      // we have to tell vite which package to use
      vue: path.resolve(__dirname, 'node_modules/vue'),
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue2',
    },
  },
  build: {
    lib: {
      entry: '../example-library/src/main.js',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      // TODO: these should be added by vite plugin
      external: [
        'vue',
        'vue-demi',
        '@vue/composition-api',
        '@vue-bridge/runtime',
      ],
    },
  },
})
