const esModules = ['lodash-es'].join('|')
const path = require('path')

const config = {
  rootDir: process.cwd(),
  roots: ['<rootDir>/../example-library/src'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // we need to tell jest which Vue2 packages to use
    '^vue$': '<rootDir>/node_modules/vue',
    '@vue/test-utils': '<rootDir>/node_modules/@vue/test-utils',
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\js$': 'babel-jest',
  },
  moduleFileExtensions: ['vue', 'js', 'json', 'jsx', 'ts', 'tsx'],
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})`,
    '\\.pnp\\.[^\\/]+$',
  ],
}

module.exports = config
