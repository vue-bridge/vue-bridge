import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    version: 'vue2',
  },
  e2e: {
    baseUrl: 'http://localhost:30001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
