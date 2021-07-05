import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ts from 'rollup-plugin-typescript2'

export default <UserConfig>{
  plugins: [
    vue(),
    // we build with TS plugin for Vue 3
    process.env.BUILD_TARGET_V2
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
    ___V3COMPAT_LIB_VUE_2___: JSON.stringify(process.env.BUILD_TARGET_V2),
    ___V3COMPAT_LIB_VUE_3___: JSON.stringify(!!process.env.BUILD_TARGET_V2),
  },
  resolve: {
    alias: {
      vue: process.env.BUILD_TARGET_V2 ? 'vue2' : 'vue',
    },
  },
  // we build with esbuild for Vue 2
  esbuild: !!process.env.BUILD_TARGET_V2,
  build: {
    lib: {
      entry: process.env.BUILD_TARGET_V2 ? 'src/main.vue2.ts' : 'src/main.ts',
      name: 'Vue3Compat',
      fileName: process.env.BUILD_TARGET_V2 ? 'vue2/index' : 'index',
    },
    emptyOutDir: !process.env.BUILD_TARGET_V2,
    minify: false,
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
        },
      },
    },
  },
}
