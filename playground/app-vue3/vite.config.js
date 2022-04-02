import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vueBridge } from '@vue-bridge/vite-plugin'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueBridge({ vueVersion: '3' })],
  resolve: {
    alias: {
      // 'example-library': path.join(__dirname, '../example-library/src/main.ts'), //'example-library/src/main.ts',
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue3',
      '@': path.join(__dirname, './src'),
    },
    dedupe: ['vue'],
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
  optimizeDeps: {
    exclude: ['vue', '@vue-bridge/runtime', 'example-library'],
  },
})
