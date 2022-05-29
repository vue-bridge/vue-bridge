import { h, App, nextTick } from 'vue'
import { VPTheme } from '@vue/theme'
import VBBadge from './components/Badge.vue'
export default Object.assign({}, VPTheme, {
  Layout: () => {
    // @ts-ignore
    nextTick(() => {
      if (typeof document !== 'undefined') {
        const el = document && document.querySelector('.VPNavBarTitle > span')
        if (el) {
          el.innerText = 'Vue-Bridge'
        }
        const svg = document && document.querySelector('.VPNavBarTitle > svg')
        if (svg) {
          svg.remove()
        }
      }
    })
    return h(VPTheme.Layout, null, {
      // banner: () => h(Banner),
      // 'sidebar-top': () => h(PreferenceSwitch),
    })
  },
  enhanceApp({ app }: { app: App }) {
    // app.component('Badge', VTBadge)
    app.component('Info', (props) =>
      h(VBBadge, { type: 'info', ...props }, slots)
    )
    app.component('eslint', (props) =>
      h(VBBadge, { type: 'info', ...props }, { default: () => '🔍 Eslint' })
    )
    app.component('plugin', (props) =>
      h(VBBadge, { type: 'success', ...props }, '✅ Plugin')
    )
    app.component('discipline', (props) =>
      h(VBBadge, { type: 'warn', ...props }, '👩🏽‍💻 Discipline')
    )
    app.component('pitfall', (props) =>
      h(VBBadge, { type: 'error', ...props }, '⚠️ Pitfall')
    )
  },
})
