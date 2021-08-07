import type { Config } from '@jest/types'

const esModules = ['lodash-es'].join('|')

const config: Config.InitialOptions = {
  rootDir: process.cwd(),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // we need to tell jest which Vue2 packages to use
    '^vue$': '<rootDir>/node_modules/vue',
    '@vue/testing-library': '<rootDir>/node_modules/@vue/tesing-library',
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'esbuild-jest',
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})`,
    '\\.pnp\\.[^\\/]+$',
  ],
}

export default config
