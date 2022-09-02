import { defineConfig } from 'cypress'

export default defineConfig({
  env: {
    version: 'vue3',
  },
  e2e: {
    baseUrl: 'http://localhost:30000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
