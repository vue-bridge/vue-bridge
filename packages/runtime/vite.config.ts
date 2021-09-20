import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ts from 'rollup-plugin-typescript2'

const isVue2 = !!process.env.BUILD_TARGET_V2
export default <UserConfig>{
  plugins: [
    vue(),
    // we build with TS plugin for Vue 3
    isVue2
      ? undefined
      : {
          apply: 'build',
          ...ts({
            tsconfig: './tsconfig.build.json',
            useTsconfigDeclarationDir: true,
          }),
        },
  ],
  define: {
    __VUE_BRIDGE_TARGET_VERSION__: isVue2 ? 2 : 3,
  },
  // we build with esbuild for Vue 2
  esbuild: isVue2,
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'VueBridge',
      fileName: isVue2 ? 'index.vue2' : 'index.vue3',
      formats: ['es', 'cjs'],
    },
    emptyOutDir: !isVue2,
    minify: false,
    rollupOptions: {
      external: ['vue', 'vue-demi', '@vue/composition-api'],
      treeshake: true,
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
        },
      },
    },
  },
}
