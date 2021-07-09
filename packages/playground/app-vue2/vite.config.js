import path from 'path'
import { defineConfig } from 'vite'
import ts2 from 'rollup-plugin-typescript2'
const { createVuePlugin } = require('vite-plugin-vue2')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: path.resolve(__dirname, './node_modules/vue'),
      '@vue-bridge/runtime': path.resolve(
        __dirname,
        '../../vue3-compat-lib/src/main.ts'
      ),
      'example-library': path.resolve(
        __dirname,
        '../example-library/src/main.js'
      ),
    },
  },
  plugins: [createVuePlugin(), ts2()],
  optimizeDeps: {
    exclude: ['vue'],
  },
})
