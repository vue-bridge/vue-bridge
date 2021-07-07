import path from 'path'
import { defineConfig } from 'vite'
const { createVuePlugin } = require('vite-plugin-vue2')

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: path.resolve(__dirname, './node_modules/vue'),
    },
  },
  plugins: [createVuePlugin()],
})
