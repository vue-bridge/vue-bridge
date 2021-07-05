module.exports = {
  title: 'Vue3 Compat Lib',
  description:
    'A Guide and plugin for building cross-version compatible Vue libraries',
  themeConfig: {
    repo: 'https://github.com/linusborg/vue3-compat-lib',
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Help improve these docs!',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'Compatibility',
        link: '/compatibility/',
      },
      {
        text: 'API',
        link: '/api/',
      },
    ],
    sidebar: {
      '/guide/': getGuideSidebar(),
      '/api/': getApiSidebar(),
      '/compatibility/': getCompatSidebar(),
    },
  },
}

function getGuideSidebar() {
  return [{ text: 'Getting Started', link: '/guide/getting-started' }]
}
function getApiSidebar() {
  return []
}
function getCompatSidebar() {
  return []
}
