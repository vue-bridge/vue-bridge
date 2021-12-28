import { Plugin, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const isVue2 = !!process.env.BUILD_TARGET_V2

const dcPath = path.join(__dirname, 'src/defineComponent.ts')
const vueDemiPlugin: Plugin = {
  name: 'vue-demi-virtualizer',
  enforce: 'pre',
  resolveId(source, importer) {
    if (source === 'virtual:vue' && importer === dcPath) {
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
  plugins: [vueDemiPlugin, vue()],
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
      external: ['vue', '@vue/composition-api'],
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
