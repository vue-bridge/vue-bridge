import { defineConfig } from 'vite'
import VueCompat from 'vite-plugin-vue3-compat-lib'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...VueCompat({ mainMode: 3 })],
  build: {
    lib: {
      entry: 'src/main.js',
      formats: ['es', 'umd'],
    },
  },
})
