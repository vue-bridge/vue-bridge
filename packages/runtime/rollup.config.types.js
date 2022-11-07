/**
 * This rollup config is used to bundle existing type declarations into a single .d.ts file
 * We do this because we do have path aliases in our source files and so also in our generated declaration files,
 * but those paths don't work in declaration files.
 * Bundling the declarations into a single file is geting rid of these paths as a werlcome side effect.
 */

import dts from 'rollup-plugin-dts'

const config = [
  // …
  {
    input: './types-vue3/main.d.ts',
    output: [{ file: 'dist-vue3/index.d.ts', format: 'es' }],
    external: ['vue-demi'],
    plugins: [
      dts({
        respectExternal: true,
        compilerOptions: {
          preserveSymlinks: false,
          baseUrl: '.',
          paths: {
            // we can't use the original path definitions of our tsconfig
            // beasuse now, the have to map to .d.ts. files that were generated from /src
            '~bridges/*.ts': ['types-vue3/bridges/vue3/*.d.ts'],
          },
        },
      }),
    ],
  },
  {
    input: './types-vue2/main.d.ts',
    output: [{ file: 'dist-vue2/index.d.ts', format: 'es' }],
    external: ['vue-demi'],
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: '.',
          respectExternal: true,
          preserveSymlinks: false,
          paths: {
            vue: ['node_modules/vue2'],
            '~bridges/*.ts': ['types-vue2/bridges/vue2/*.d.ts'],
          },
        },
      }),
    ],
  },
]

export default config
