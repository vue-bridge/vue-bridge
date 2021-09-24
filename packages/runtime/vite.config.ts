import { Plugin, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ts from 'rollup-plugin-typescript2'
import path from 'path'

const isVue2 = !!process.env.BUILD_TARGET_V2

const dcPath = path.join(__dirname, 'src/defineComponent.ts')
const vueDemiPlugin: Plugin = {
  name: 'vue-demi-virtualizer',
  enforce: 'pre',
  resolveId(source, importer) {
    if (source === 'vue-demi' && importer === dcPath) {
      return path.join(
        __dirname,
        `src/defineComponent/vue${isVue2 ? '2' : '3'}.ts`
      )
    }
    // console.log('importer: ', importer)
    return null
  },
}

export default <UserConfig>{
  plugins: [
    vueDemiPlugin,
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
      external: ['vue', /*'vue-demi', */ '@vue/composition-api'],
      treeshake: 'smallest',
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
