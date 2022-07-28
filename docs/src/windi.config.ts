import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['index.html', './**/*.vue', './**/*.md'],
  },
})
