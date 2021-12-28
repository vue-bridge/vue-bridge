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
        link: '/getting-started',
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
            link: '/reference/runtime',
          },
          {
            text: '@vue-bridge/eslint-config',
            link: '/reference/eslint-config',
          },
          {
            text: '@vue-bridge/testing',
            link: '/reference/testing',
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
      '/reference/': getCompatSidebar(),
    },
  },
}

function getGuidesSidebar() {
  return [
    {
      text: 'About these Guides',
      link: 'guides/',
    },
    {
      text: 'Script',
      children: [
        {
          text: 'Reactivity Caveats',
          link: '#',
        },
        {
          text: 'v-model on components',
          link: 'guides/script/v-model',
        },
        {
          text: 'v-bind: Proper Binding',
          link: '#',
        },
        {
          text: 'emits: Declaring events',
          link: '#',
        },
        {
          text: '$attrs & $listeners',
          link: '#',
        },
      ],
    },
    {
      text: 'Template',
      children: [
        {
          text: 'Multiple Root Elements',
          link: '',
        },
        {
          text: 'Transitions',
          link: 'guides/template/transitions',
        },
        {
          text: 'v-if & v-for',
          link: '#',
        },
      ],
    },
    {
      text: 'Styles',
      children: [
        {
          text: 'Transition Styles',
          link: '#',
        },
        {
          text: '::v-deep vs. :deep()',
          link: '#',
        },
      ],
    },
    {
      text: 'Misc.',
      children: [
        {
          text: '',
        },
      ],
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
