module.exports = {
  rules: {
    // Template-related
    'vue/no-multiple-template-root': 'error',
    'vue/no-v-model-argument': 'error',
    'vue/no-invalid-model-keys': 'error',
    'vue/no-deprecated-v-bind-sync': 'error',
    'vue/no-deprecated-v-on-native-modifier': 'error',
    'vue/no-deprecated-v-is': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/no-deprecated-filter': 'error',
    'vue/require-component-is': 'error',

    // Other
    'vue/no-deprecated-dollar-listeners-api': 'error',
    'vue/require-explicit-emits': 'error',

    // enforce alternative exports from `@vue-bridge/runtime` and `@vue-bridge/testing`
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'vue',
            importNames: ['defineComponent'],
            message:
              "Please use `import { defineComponent } from '@vue-bridge/runtime'` instead for cross-compatibility.",
          },
          {
            name: 'vue',
            importNames: ['set', 'del'],
            message:
              "Please use `import { set, del } from '@vue-bridge/runtime'` instead for cross-compatibility.",
          },
          {
            name: 'vue',
            importNames: ['App'],
            message:
              "Please use `import type { App } from '@vue-bridge/runtime'` instead for cross-compatibility.",
          },
          {
            name: '@vue/test-utils',
            message:
              'Please use `@vue-bridge/testing` instead. It provides a cross-compatible version of test-utils that works for both Vue 2 and Vue 3.`',
          },
        ],
      },
    ],
    'no-restricted-properties': [
      'error',
      {
        property: '$attrs',
        message:
          "Please use $bridgeAttrs from vue-bridge's attrsListenersMixin instead for cross-compatibility",
      },
      {
        property: '$listeners',
        message:
          'Please use $bridgeListeners from attrsListenersMixin instead for cross-compatibility',
      },
      {
        property: '$slots',
        message: 'Please use $bridgeSlots instead for cross-compatibility',
      },
      {
        property: '$scopedSlots',
        message: 'Please use $bridgeSlots instead for cross-compatibility',
      },
    ],
  },
}
