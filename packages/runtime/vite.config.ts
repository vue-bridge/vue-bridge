import { UserConfig } from 'vite'

const isVue2 = !!process.env.BUILD_TARGET_V2
const vueVersion = isVue2 ? 2 : 3

export default <UserConfig>{
  resolve: {
    alias: {
      '~bridges/': `./src/bridges/vue${vueVersion}/`,
      '~/': './src',
    },
  },
  define: {
    __VUE_BRIDGE_TARGET_VERSION__: isVue2 ? 2 : 3,
  },
  build: {
    outDir: isVue2 ? 'dist-vue2' : 'dist-vue3',
    lib: {
      entry: 'src/main.ts',
      name: 'VueBridge',
      fileName: (format) => `index.${format}.${format === 'es' ? 'mjs' : 'js'}`,
      formats: ['es', 'cjs', 'iife'],
    },
    emptyOutDir: !isVue2,
    rollupOptions: {
      external: ['vue-demi'],
      output: {
        banner: `
        /**
         *  Copyright ${new Date(Date.now()).getFullYear()} Thorsten Luenborg
         *  @license MIT
        **/
        `,
        exports: 'named',
        globals: {
          vue: 'Vue',
          '@vue/composition-api': 'VueCompositionAPI',
        },
      },
    },
  },
}
