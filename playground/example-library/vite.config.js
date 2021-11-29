import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [...VueCompat({ mainMode: 3 })],
  plugins: [vue()],
  resolve: {
    alias: {
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue3',
    },
  },
  build: {
    lib: {
      entry: 'src/main.js',
      // name: 'VueExampleLib',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: ['vue', '@vue/composition-api', '@vue-bridge/runtime'],
    },
  },
})
