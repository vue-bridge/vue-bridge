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
  // we build with esbuild for Vue 2
  esbuild: false,
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'Vue3Compat',
      fileName: 'index',
      formats: ['es', 'cjs'],
    },
    minify: false,
    rollupOptions: {
      external: ['vue', 'vue-demi', '@vue/composition-api'],
      treeshake: false,
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
