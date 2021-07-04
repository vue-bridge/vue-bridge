import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
/**
 * @type { import('vite').UserConfig }
 */
export default {
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      'vue3-compat-lib': 'vue3-compat-lib/src/main.ts',
    },
    dedupe: ['vue'],
  },
  optimizeDeps: {
    exclude: ['vue3-compat-lib'],
  },
}
