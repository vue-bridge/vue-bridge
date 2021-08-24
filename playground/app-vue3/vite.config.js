import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'example-library': 'example-library/src/main.js',
    },
  },
  optimizeDeps: {
    exclude: ['@vue/composition-api', 'vue-demi', '@vue-bridge/runtime'],
  },
})
