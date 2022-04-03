import { h, App } from 'vue'
import { VPTheme } from '@vue/theme'
import VBBadge from './components/Badge.vue'

export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    return h(VPTheme.Layout, null, {
      // banner: () => h(Banner),
      // 'sidebar-top': () => h(PreferenceSwitch),
    })
  },
  enhanceApp({ app }: { app: App }) {
    // app.component('Badge', VTBadge)
    app.component('Info', (props, { slots }) =>
      h(VBBadge, { type: 'info', ...props }, slots)
    )
    app.component('eslint', (props, { slots }) =>
      h(VBBadge, { type: 'info', ...props }, '🔍 Eslint')
    )
    app.component('plugin', (props, { slots }) =>
      h(VBBadge, { type: 'success', ...props }, '✅ Plugin')
    )
    app.component('discipline', (props, { slots }) =>
      h(VBBadge, { type: 'warn', ...props }, '👩🏽‍💻 Discipline')
    )
    app.component('pitfall', (props, { slots }) =>
      h(VBBadge, { type: 'error', ...props }, '⚠️ Pitfall')
    )
  },
})
