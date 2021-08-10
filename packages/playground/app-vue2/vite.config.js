import path from 'path'
import { defineConfig } from 'vite'
const { createVuePlugin } = require('vite-plugin-vue2')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // this is just necessary because we have both Vue 2 and 3 in this monorepo
      vue: path.resolve(__dirname, './node_modules/vue'),

      'example-library': path.resolve(
        __dirname,
        '../example-library/src/main.js'
      ),
    },
  },
  plugins: [createVuePlugin()],
  optimizeDeps: {
    exclude: ['vue'],
  },
})
