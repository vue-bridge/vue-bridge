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
    lib: {
      entry: 'src/main.ts',
      name: 'VueBridge',
      fileName: isVue2 ? 'index.vue2' : 'index.vue3',
      formats: ['es', 'cjs', 'iife'],
    },
    emptyOutDir: !isVue2,
    rollupOptions: {
      external: ['vue'],
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
