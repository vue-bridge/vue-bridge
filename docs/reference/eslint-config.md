# `@vue-bridge/eslint-config`

Vue-Bridge provides an eslint-config package that defines a bunch of rules that will help plugin authors to write cross-compatible code by warning when using incompatible features or APIs and enforcing the use of the right exports, i.e. using `defineComponent` from `'@vue-bridge/runtime'` over the normal version exported from `'vue'`

## Dependencies

This package depends on [`eslint`](https://www.eslint.org) `^8.0.0` or higher and [`eslint-plugin-vue`](https://eslint.vuejs.org) version `^8.0.0` or higher. You have to install these packages yourself.

## Installation

```bash
npm install -D @vue-bridge/eslint-config eslint eslint-plugin-vue
```

Add to your eslint config:

```js
// .eslintrc.js
module.exports = {
  extends: [
    'eslint-plugin-vue',
    '@vue-bridge/eslint-config'
  ]
}
```

## Rules

The following rules are used by this config:

TODO: Go over these list, check completeness. Add links to eslint-vue docs.

|Name                                   | from            |
|---------------------------------------|-----------------|
|vue-no-multiple-template-root          |eslint-plugin-vue|
|vue-require-explicit-emits             |eslint-plugin-vue|
|vue/no-v-model-argument                |eslint-plugin-vue|
|vue/no-deprecated-v-bind-sync          |eslint-plugin-vue|
|vue/no-deprecated-v-on-native-modifier |eslint-plugin-vue|
|vue/no-deprecated-dollar-listeners-api |eslint-plugin-vue|
|vue/no-deprecated-filter               |eslint-plugin-vue|
|vue/no-deprecated-html-element-is      |eslint-plugin-vue|
|vue/no-use-v-if-with-v-for             |eslint-plugin-vue|
|no-restricted-imports                  |eslint|
|no-restricted-properties               |eslint|

## Further Reading

See the [Compatibility Listing](./compatibility/) to learn in which situations the above rules are helpful.