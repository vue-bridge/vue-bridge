module.exports = {
  title: 'Vue Bridge',
  description: 'Enabling cross-compatible Vue libraries',
  themeConfig: {
    repo: 'https://github.com/linusborg/vue-bridge',
    repoLabel: 'GitHub',
    docsDir: 'packages/docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Help improve these docs!',
    lastUpdated: 'Last Updated',
    nav: [
      {
        text: 'Getting Started',
        link: '/getting-started/',
      },
      {
        text: 'Topics',
        link: '/topics/',
      },
      {
        text: 'How-to Guides',
        link: '/guides/',
      },
      {
        text: 'Reference',
        items: [
          {
            text: 'Compatibility Reference',
            link: '/reference/compatibility/',
          },
          {
            text: 'Template',
            link: '/reference/template',
          },
          {
            text: '@vue-bridge/runtime',
            link: '/reference/runtime/',
          },
          {
            text: '@vue-bridge/eslint-config',
            link: '/reference/eslint/',
          },
          {
            text: '@vue-bridge/testing',
            link: '/reference/testing/',
          },
          {
            text: '@vue-bridge/vite-plugin',
            link: '/reference/vite-plugin',
          },
        ],
      },
      {
        text: 'FAQ',
        link: '/faq',
      },
    ],
    sidebar: {
      '/guide/': getGuidesSidebar(),
      '/reference/compatibility': getCompatSidebar(),
    },
  },
}

function getGuidesSidebar() {
  return [{ text: 'Getting Started', link: '/guides/getting-started' }]
}

function getCompatSidebar() {
  return [
    {
      text: '',
      link: '',
    },
    {
      text: '',
      link: '',
    },
    {
      text: '',
      link: '',
    },
    {
      text: '',
      link: '',
    },
    {
      text: '',
      link: '',
    },
  ]
}
