# `v-on.native` Modifier

This modifier was removed in Vue 3. It will still compile for Vue 3, but log a warning - so If you can live with this warning, just use it anyway for the Vue 2 behavior.

But make sure to always document your component's emitted events with `emits:` as otherwise in Vue 3, *all* listeners you pass down will be registered as native listeners too!

## Eslint

* [vue/no-deprecated-v-on-native-modifier](https://eslint.vuejs.org/rules/no-deprecated-v-on-native-modifier.html#vue-no-deprecated-v-on-native-modifier)

## Workaround: Custom directive

```js
Vue.directive('v-native', (el, {arg, value }) => el.addEventListener(arg, value))
```

```html
<my-component v-native:click="handleClick">
```