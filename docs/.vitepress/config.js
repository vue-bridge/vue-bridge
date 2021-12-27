/** @type {import('vitepress').UserConfig} */
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
            text: '`create-vue-bridge` (Template)',
            link: '/reference/templates',
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
      '/guides/': getGuidesSidebar(),
      '/topics/': getTopicsSidebar(),
      '/reference/compatibility': getCompatSidebar(),
    },
  },
}

function getGuidesSidebar() {
  return [
    {
      text: 'Introduction: Compatible Code',
      link: '/guides/writing-compatible-code/',
    },
    {
      text: 'How to do/use ...?',
      children: [
        {
          text: 'component v-model',
          link: 'guides/writing-code/v-model',
        },
        {
          text: 'Transitions',
          link: 'guides/writing-code/transitions',
        },
      ],
    },
    {
      text: 'Testing',
      children: [
        {
          text: 'Unit-Testing with Cypress',
          link: '#',
        },
        {
          text: 'Unit-Testing with Jest',
          link: '#',
        },
        {
          text: 'E2E-Testing with Cypress',
          link: '#',
        },
      ],
    },
    {
      text: 'Building/Bundling',
      children: [
        {
          text: 'Two separate packages',
          link: '#',
        },
        {
          text: 'One combined packages',
          link: '#',
        },
        {
          text: 'Raw .vue files',
          link: '#',
        },
      ],
    },
    {
      text: 'Publishing',
      children: [],
    },
  ]
}

function getTopicsSidebar() {
  return [
    { text: 'Foundations', children: [] },
    { text: 'Phases', children: [] },
  ]
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
