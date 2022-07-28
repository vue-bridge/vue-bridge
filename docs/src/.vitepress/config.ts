import { defineConfig, DefaultTheme } from 'vitepress'
// import baseConfig from '@vue/theme/config'
import Icons from 'unplugin-icons/vite'
import IconResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import WindiCSS from 'vite-plugin-windicss'

const nav: DefaultTheme.Config['nav'] = [
  {
    text: 'Getting Started',
    // link: '/getting-started',
    activeMatch: '^/getting-started',
    items: [
      { text: 'Introduction', link: '/getting-started/' },
      { text: 'Quickstart', link: '/getting-started/quickstart' },
      { text: 'Tutorial', link: '/getting-started/tutorial' },
    ],
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
    // @ts-expect-error - Type error in new theme
    items: getReferencesDropDownMenu(),
  },
]

export const sidebar = {
  '/guides/': getGuidesSidebar(),
  '/topics/': getTopicsSidebar(),
  '/reference/': getReferencesDropDownMenu(),
}

function getGuidesSidebar() {
  return [
    {
      text: 'Introduction',
      items: [
        {
          text: 'How-To Guides',
          link: '/guides/',
        },
      ],
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
          link: '/guides/script/native-vs-component-events',
        },
        {
          text: '$attrs, $listeners & inheritAttrs',
          link: '/guides/script/listeners-attrs-inheritAttrs',
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
          link: 'guides/template/teleport',
        },
      ],
    },
    {
      text: 'Other Code Aspects',
      items: [
        {
          text: 'Styling Slots & deep children',
          link: '/guides/other/styling-deep-selector',
        },
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
          text: 'mount & shallowMount',
          link: 'guides/unit-testing/mount',
        },
        {
          text: 'nextTick',
          link: 'guides/unit-testing/next-tick',
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
      items: [
        {
          text: 'Overview',
          link: '/topics/',
          items: [],
        },
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
      text: 'Concepts',
      items: [
        {
          text: 'Interoperability',
          link: '#',
        },
        {
          text: 'Project Setups',
          link: '/topics/project-setup',
        },
        {
          text: 'Source Sharing',
          link: '#',
        },
        {
          text: 'Dependency Management',
          link: '#',
        },
        {
          text: 'Recommended Tooling',
          link: '#',
        },
      ],
    },
    {
      text: 'Workflow',
      items: [
        {
          text: 'Writing the code',
          link: '/topics/writing-components',
        },
        {
          text: 'Testing the code',
          link: '/topics/testing-components',
        },
        {
          text: 'Bundling the code',
          link: '/topics/bundling',
        },
        {
          text: 'Publishing packages',
          link: '/topics/publishing',
        },
      ],
    },
    {
      text: 'Adoption Strategies',
      items: [
        {
          text: 'Greenfield Projects',
          link: '/topics/adoption-greenfield',
        },
        {
          text: 'Expanding a Vue 2 Library',
          link: '/topics/adoption-from-vue2',
        },
        {
          text: 'Expanding a Vue 3 Library',
          link: '/topics/adoption-from-vue3',
        },
      ],
    },
  ]
}

function getReferencesDropDownMenu() {
  return [
    {
      text: 'General',
      items: [
        {
          text: 'Overview',
          link: '/reference/',
        },
      ],
    },
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
  // extends: baseConfig,

  lang: 'en-US',
  title: 'Vue-Bridge',
  description: 'Creating interoperable component libraries for Vue 2 and 3',

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
    logo: '/logo.png',

    editLink: {
      pattern:
        'https://github.com/vue-bridge/vue-bridge/edit/main/docs/src/:path',
      text: 'Suggest change to this page',
    },

    socialLinks: [
      // { icon: 'languages', link: '/translations/' },
      { icon: 'github', link: 'https://github.com/vue-bridge/' },
      { icon: 'twitter', link: 'https://twitter.com/vuebridge' },
      { icon: 'discord', link: 'https://discord.gg/JTkXgNy3sx' },
    ],

    // algolia: {
    //   indexName: 'vuejs-v3',
    //   appId: 'BH4D9OD16A',
    //   apiKey: 'bc6e8acb44ed4179c30d0a45d6140d3f'
    // },

    nav,
    sidebar,

    footer: {
      message: 'Released under the MIT license',
      copyright:
        'Copyright © 2021-present Thorsten Lünborg and VueBridge Contributors',
    },
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false,
    },
    plugins: [
      WindiCSS(),
      Icons(),
      Components({
        resolvers: [IconResolver()],
        // filters for transforming targets
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      }),
    ],
    // optimizeDeps: {
    // exclude: ['@vue/repl']
    // },
    // @ts-ignore
    // ssr: {
    // external: ['@vue/repl']
    // },
    // server: {
    //   host: true,
    //   fs: {
    //     // for when developing with locally linked theme
    //     allow: ['../../..'],
    //   },
    // },
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
