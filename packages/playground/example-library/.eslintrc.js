module.exports = {
  // extends: ['../../../.eslintrc.js'],
  rules: {
    'vue/no-multiple-template-root': 'error',
    'vue/require-explicit-emits': 'error',
    'vue/no-v-model-argument': 'error',
    'vue/no-deprecated-v-bind-sync': 'error',
    'vue/no-deprecated-v-on-native-modifier': 'error',
    'vue/no-use-v-if-with-v-for': 'error',
    'vue/no-deprecated-dollar-listeners-api': 'error',
    'vue/no-deprecated-filter': 'error',

    // deactivated as feature not yet implemented / on-hold
    // 'no-restricted-imports': [
    //   'error',
    //   {
    //     paths: [
    //       {
    //         name: 'vue',
    //         importNames: ['defineAsyncComponent'],
    //         message:
    //           "Please use ` import { defineAsyncComponent } from 'vue3-compat-lib/defineAsnyncComponent' instead.",
    //       },
    //     ],
    //   },
    // ],

    // recommended in combination with attrsListenersMixin
    'no-restricted-properties': [
      'error',
      {
        property: '$attrs',
        message: 'Please use $_attrs from attrsListenersMixin instead',
      },
      {
        property: '$listeners',
        message: 'Please use $_listeners from attrsListenersMixin instead',
      },
    ],
  },
}
