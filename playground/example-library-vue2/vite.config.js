import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { vueBridge } from '@vue-bridge/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueBridge({
      vueVersion: '2',
      localizeDeps: true,
      useSwc: true,
      swcOptions: {
        env: {
          mode: 'usage',
        },
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
          },
          loose: true,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue2',
      '@/': new URL('./src/', import.meta.url).pathname,
    },
  },
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      external: ['vue', '@vue-bridge/runtime', 'regenerator-runtime'],
    },
  },
  test: {
    environment: 'jsdom',
    deps: {
      inline: [
        // '@vue-bridge/runtime',
        // '@vue-bridge/runtime/vue2',
        // regex needed, as with a string it checks for `node_modules/${package}`
        // and this is a local workspace package.
        /packages\/testing\/dist/,
        '@vue/testing-utils',
        '@vue/composition-api',
      ],
    },
  },
})
