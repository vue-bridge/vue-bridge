import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vueBridge } from '@vue-bridge/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueBridge({ vueVersion: '3' })],
  resolve: {
    alias: {
      'example-library': 'example-library/src/main.ts',
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue3',
    },
  },
  optimizeDeps: {
    exclude: ['vue', '@vue-bridge/runtime', 'example-library'],
  },
})
