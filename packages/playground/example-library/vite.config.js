import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import VueCompat from '@vue-bridge/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [...VueCompat({ mainMode: 3 })],
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/main.js',
      // name: 'VueExampleLib',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      external: [
        'vue',
        'vue-demi',
        '@vue/composition-api',
        '@vue-bridge/runtime',
      ],
    },
  },
})
