module.exports = {
  title: 'Vue3 Compat Lib',
  description: 'A Guide and plugin for building cross-version compatible Vue libraries',
  themeConfig: {
    repo: 'https://github.com/linusborg/vue3-compat-lib',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'next',
    editLinks: true,
    editLinkText: 'Help improve these docs!',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Installation', link: '/guide/installation' },
      {
        text: 'Guide',
        link: '/guide/getting-started',
      },
      {
        text: 'API',
        link: '/api',
      },
    ],
    sidebar: {
      '/guide/': getGuideSidebar(),
      '/api/': getApiSidebar(),
    },
  },
}

function getGuideSidebar() {
  return [{ text: 'Getting Started', link: '/guide/getting-started' }]
}
function getApiSidebar() {
  return []
}
