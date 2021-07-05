# Multiple Root Elements aka. Fragments

In Vue 3, a component template can have multiple root elements: 

```html
<template>
  <div>Root 1</div>
  <div>Root 2</div>
</template>
```

In Vue 2, this simply isn't possible, so always use a single root element in your components.

## Eslint

You can use `eslint-plugin-vue` to help you be consistent here:

Eslint Rule: [`vue-no-multiple-template-root`](https://eslint.vuejs.org/rules/no-multiple-template-root.html#vue-no-multiple-template-root)

```js
// .eslintrc.js
rules: {
  'vue-no-multiple-template-root': 'error',
}
```