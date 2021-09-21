import path from 'path'
import { defineConfig } from 'vite'
const { createVuePlugin } = require('vite-plugin-vue2')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    alias: {
      // this is just necessary because we have both Vue 2 and 3 in this monorepo
      vue: path.resolve(__dirname, './node_modules/vue'),

      'example-library-vue2': path.resolve(
        __dirname,
        '../example-library/src/main.js'
      ),
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue2',
    },
  },
  server: {
    fs: {
      restrict: false,
    },
  },
  optimizeDeps: {
    exclude: ['vue', '@vue-bridge/runtime', 'vue-demi', '@vue/composition-api'],
  },
})
