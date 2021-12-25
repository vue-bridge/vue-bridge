import { defineConfig } from 'vite'
import path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'

const localResolve = (pkg) => path.resolve(__dirname, 'node_modules', pkg)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [createVuePlugin()],
  resolve: {
    alias: {
      // since we symlink the /src folder, we need to explicitly alias
      // a bunch of deps to point to the right node_modules folder (the one in this workspace)
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue2',
      vue: localResolve('vue'),
      '@vue-bridge/testing': localResolve('@vue-bridge/testing'),
      '@vue/test-utils': localResolve('@vue/test-utils'),
      vitest: localResolve('vitest'),
    },
  },
  server: {
    fs: {
      strict: false,
      // allow: ['../example-library/src', '../../node_modules/', './cypress'],
    },
  },
  build: {
    lib: {
      entry: './src/main.ts',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      // TODO: these should be added by vite plugin
      external: [
        'vue',
        'vue-demi',
        '@vue/composition-api',
        '@vue-bridge/runtime',
      ],
    },
  },
  optimizeDeps: {
    include: ['@vue/test-utils'],
  },
  test: {
    environment: 'jsdom',
    deps: {
      inline: ['@vue-bridge/runtime', '@vue/composition-api'],
    },
  },
})
