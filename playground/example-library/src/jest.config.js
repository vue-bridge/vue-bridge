const esModules = ['lodash-es'].join('|')

/**
 * @typedef {import("@jest/types").Config.InitialOptions} Config
 */

/**
 * @type { Config }
 */
const config = {
  rootDir: process.cwd(),
  testEnvironment: 'jsdom',
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
