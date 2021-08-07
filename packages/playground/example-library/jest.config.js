const esModules = ['lodash-es'].join('|')

const config = {
  rootDir: process.cwd(),
  testEnvironment: 'jsdom',
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
