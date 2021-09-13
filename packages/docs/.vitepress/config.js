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
        text: 'Getting Started',
      },
      {
        text: 'Guides',
        link: '/guide/',
      },
      {
        text: 'Reference',
        items: [
          {
            text: 'Compatibility Reference',
            link: '/reference/compatibility/',
          },
          {
            text: 'Eslint Plugin',
            link: '#',
          },
          {
            text: 'Runtime Plugin',
            link: '#',
          },
          {
            text: 'Testing Plugin',
            link: '#',
          },
          {
            text: 'Vite Plugin',
            link: '#',
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
