import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { vueBridge } from '@vue-bridge/vite-plugin'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueBridge({
      vueVersion: '3',
      localizeDeps: true,
      aliases: ['@/'],
    }),
  ],
  resolve: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue3',
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: 'src/main.ts',
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
    deps: {
      inline: [
        /packages\/testing\/dist/
      ],
    },
  },
})
