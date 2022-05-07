import fs from 'fs'
import path from 'path'
import { defineConfig } from 'vitepress'
import baseConfig from '@vue/theme/config'

const nav = [
  {
    text: 'Getting Started',
    link: '/getting-started',
  },
  {
    text: 'Topics',
    activeMatch: '^/topics/',
    link: '/topics/',
  },
  {
    text: 'How-to Guides',
    activeMatch: '^/guides/',
    link: '/guides/',
  },
  {
    text: 'Reference',
    activeMatch: `^/reference/`,
    items: getReferenceSidebar(),
  },
]

export const sidebar = {
  '/guides/': getGuidesSidebar(),
  '/topics/': getTopicsSidebar(),
  '/reference/': getReferenceSidebar(),
}

function getGuidesSidebar() {
  return [
    {
      text: 'Introduction',
      link: 'guides/',
      items: [],
    },
    {
      text: 'Component APIs',
      items: [
        {
          text: 'Reactivity Caveats',
          link: 'guides/script/reactivity-caveats',
        },
        {
          text: 'Lifecycle Hooks',
          link: 'guides/script/lifecycle-hooks',
        },
        {
          text: 'v-model on components',
          link: 'guides/script/v-model',
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
          link: '/guides/script/slots',
        },
      ],
    },
    {
      text: 'Template Syntax',
      items: [
        {
          text: 'Multiple Root Elements',
          link: '/guides/template/multiple-root-elements',
        },
        {
          text: 'v-if & v-for',
          link: '/guides/template/v-if-v-for',
        },
        {
          text: 'v-for, template & keys',
          link: '#',
        },
        {
          text: 'Filters',
          link: 'guides/template/filters',
        },
        {
          text: 'v-bind: Order Priority',
          link: 'guides/template/v-bind',
        },
        {
          text: 'Styling Slots & deep descendants',
          link: '#',
        },
      ],
    },
    {
      text: 'Builtin Components',
      items: [
        {
          text: 'Transition/TransitionGroup',
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
      items: [
        {
          text: 'Custom Directives',
          link: '/guides/other/custom-directives',
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
      items: [
        {
          text: 'nextTick',
          link: '#',
        },
      ],
    },
    {
      text: 'Typescript',
      items: [
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
    {
      text: 'Introduction',
      link: '/topics',
      items: [],
    },
    {
      text: 'Understanding',
      items: [
        {
          text: '"Why Vue-Bridge?"',
          link: '/topics/introduction-why-vue-bridge',
        },
        {
          text: 'Comparisons',
          link: '/topics/comparisons',
        },
      ],
    },
    {
      text: 'Focus Areas/Concepts',
      items: [
        {
          text: 'Project Setup',
          link: '/topics/project-setup',
        },
        {
          text: 'Writing the code',
          link: '#',
        },
        {
          text: 'Testing the code',
          link: '#',
        },
        {
          text: 'Bundling the code',
          link: '#',
        },
        {
          text: 'Publishing packages',
          link: '#',
        },
      ],
    },
    {
      text: 'Adoption Strategies',
      items: [
        {
          text: 'Greenfield Projects',
          link: '#',
        },
        {
          text: 'Expanding a Vue 2 Library',
          link: '#',
        },
        {
          text: 'Expanding from a Vue 3 Library',
          link: '#',
        },
      ],
    },
  ]
}

function getReferenceSidebar() {
  return [
    {
      text: 'Packages',
      items: [
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
      text: 'Templates',
      items: [
        {
          text: 'template-workspaces',
          link: '/reference/template-workspaces',
        },
        {
          text: '`create-vue-bridge (WIP)`',
          link: '/reference/create-vue-bridge',
        },
      ],
    },
    {
      text: 'Other',
      items: [
        {
          text: 'Compatibility Reference',
          link: '/reference/compatibility/',
        },
      ],
    },
  ]
}

export default defineConfig({
  extends: baseConfig,

  lang: 'en-US',
  title: 'VueBridge',
  description:
    'VueBridge - creating cross-compatible component libraries for Vue 2 and 3',

  head: [
    ['meta', { name: 'twitter:site', content: '@vue-bridge' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ],

  // markdown: {
  //   config(md) {
  //     md.use(headerPlugin)
  //   }
  // },

  themeConfig: {
    logo: '/logo.svg',
    repo: 'vue-bridge/vue-bridge',

    // algolia: {
    //   indexName: 'vuejs-v3',
    //   appId: 'BH4D9OD16A',
    //   apiKey: 'bc6e8acb44ed4179c30d0a45d6140d3f'
    // },

    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // },

    socialLinks: [
      // { icon: 'languages', link: '/translations/' },
      { icon: 'github', link: 'https://github.com/vue-bridge/' },
      { icon: 'twitter', link: 'https://twitter.com/vue-bridge' },
      { icon: 'discord', link: 'https://discord.com/invite/HBherRA' },
    ],

    nav,
    sidebar,

    footer: {
      license: {
        text: 'MIT License',
        link: 'https://opensource.org/licenses/MIT',
      },
      copyright: 'Copyright © 2014-2021 Thorsten Lünborg',
    },
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
    },
    optimizeDeps: {
      // exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      // external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../../..'],
      },
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity,
      rollupOptions: {
        output: {
          manualChunks(id, ctx) {
            if (id.includes('gsap')) {
              return 'gsap'
            }
            return moveToVendor(id, ctx)
          },
        },
      },
    },
    json: {
      stringify: true,
    },
  },

  vue: {
    reactivityTransform: true,
    template: {
      compilerOptions: {
        directiveTransforms: {
          focus: () => ({ props: [] }),
        },
      },
    },
  },
})

const cache = new Map<string, boolean>()

/**
 * This is temporarily copied from Vite - which should be exported in a
 * future release.
 *
 * @TODO when this is exported by Vite, VitePress should ship a better
 * manual chunk strategy to split chunks for deps that are imported by
 * multiple pages but not all.
 */
function moveToVendor(id: string, { getModuleInfo }: any) {
  if (
    id.includes('node_modules') &&
    !/\.css($|\\?)/.test(id) &&
    staticImportedByEntry(id, getModuleInfo, cache)
  ) {
    return 'vendor'
  }
}

function staticImportedByEntry(
  id: string,
  getModuleInfo: any,
  cache: Map<string, boolean>,
  importStack: string[] = []
): boolean {
  if (cache.has(id)) {
    return cache.get(id) as boolean
  }
  if (importStack.includes(id)) {
    // circular deps!
    cache.set(id, false)
    return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false
  }

  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some((importer: string) =>
    staticImportedByEntry(
      importer,
      getModuleInfo,
      cache,
      importStack.concat(id)
    )
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}
