import { join } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue3',
    },
  },
  build: {
    sourcemap: 'inline',
    lib: {
      entry: 'src/main.js',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      output: {
        exports: 'named',
      },
      external: ['vue', '@vue-bridge/runtime'],
    },
  },
  test: {
    environment: 'jsdom',
  },
})
