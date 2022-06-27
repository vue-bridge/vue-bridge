import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { vueBridge } from '@vue-bridge/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueBridge({
      vueVersion: '2',
    }),
  ],
  resolve: {
    alias: {
      // this is just necessary because we have both Vue 2 and 3 in this monorepo
      vue: path.resolve(__dirname, './node_modules/vue'),

      // 'example-library-vue2': path.resolve(
      //   __dirname,
      //   '../example-library/src/main.ts'
      // ),
      '@vue-bridge/runtime': '@vue-bridge/runtime/vue2',
    },
  },
  server: {
    fs: {
      restrict: false,
    },
  },
  optimizeDeps: {
    exclude: [
      'vue',
      '@vue-bridge/runtime',
      '@vue/composition-api',
      'example-library-vue2',
    ],
  },
})
