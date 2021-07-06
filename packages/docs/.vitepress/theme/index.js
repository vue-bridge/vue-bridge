// import plugin from 'portal-vue'
import DefaultTheme from 'vitepress/dist/client/theme-default'
import { h } from 'vue'
import Badge from './components/Badge.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // app.use(VueMonoRepo)
    app.component('Badge', Badge)
    app.component('Info', (props, { slots }) =>
      h(Badge, { type: 'info', ...props }, slots)
    )
  },
}
