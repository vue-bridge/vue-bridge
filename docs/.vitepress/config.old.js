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
      text: 'Component APIs',
      children: [
        {
          text: 'Reactivity Caveats',
          link: 'guides/script/reactivity-caveats',
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
          text: 'Native vs. Component Events',
          link: '#',
        },
        {
          text: '$attrs, $listeners & inheritAttrs',
          link: '#',
        },
        {
          text: '$slots vs. $scopedSlots',
          link: '#',
        },
      ],
    },
    {
      text: 'Template Syntax',
      children: [
        {
          text: 'Multiple Root Elements',
          link: '',
        },
        {
          text: 'v-if & v-for',
          link: '#',
        },
        {
          text: 'v-for, template & keys',
          link: '#',
        },
        {
          text: 'Filters',
          link: '#',
        },
        {
          text: 'Styling Slots & children',
          link: '#',
        },
      ],
    },
    {
      text: 'Builtin Components',
      children: [
        {
          text: '<Transition(Group)>',
          link: 'guides/template/transitions',
        },
        {
          text: 'Teleport',
          link: '#',
        },
      ],
    },
    {
      text: 'Other Code Aspects',
      children: [
        {
          text: 'Custom Directives',
          link: '#',
        },
        {
          text: 'Plugin Install function',
          link: '#',
        },
        {
          text: 'Version-specific code',
          link: '#',
        },
      ],
    },
    {
      text: 'Unit Tests',
      children: [
        {
          text: 'nextTick',
        },
      ],
    },
    {
      text: 'Typescript',
      children: [
        {
          text: 'Generating Type Declarations',
          link: '#',
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
