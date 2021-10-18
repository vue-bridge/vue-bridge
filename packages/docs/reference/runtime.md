# `@vue-bridge/runtime`

This package provides runtime conversions for a bunch of APIS between Vue 2 and Vue 3.

::: tip Compatibility Listing

All APIs that this plugin makes compatible at runtime are marked with the <plugin /> badge in the [Compatibility Listing](/reference/compatibility/) 

:::

## Dependencies

This plugin has [`vue-demi`](https://github.com/vueuse/vue-demi) and [`@vue/composition-api`](https://github.com/vuejs/composition-api) as peer dependencies.
 * `@vue/composition-api` allows the use of composition API in Vue 2. Also a dependency of `vue-demi`
 * `vue-demi` allows you this plugin to detect wether it's in a Vue 2 or Vue 3 project and apply the proper changes to your component definitions to ensure cross-compatibility.

## Installation

```bash
npm install @vue-bridge/runtime
```


## Usage

This plugin has with two main exports:

1. `defineComponent()`
2. `defineDirective()`

### `defineComponent()`

Use this function when defining your components.

It is a wrapper around Vue 3's [`defineComponent()`](https://v3.vuejs.org/api/global-api.html#definecomponent) function (it doesn't exist in Vue 2, but `vue-demi` provides you with a Vue 2 version of the same function under the hood for use in a Vue 2 project).

While the original implementation's only purpose is to ensure Type safety, `@vue-bridge/runtime` wraps it and applies a bunch of changes and mixins to your component definition in order to ensure cross-compatibility.

```js
import { defineComponent } from '@vue-bridge/runtime'

export default defineComponent({
  data() {
    return {
      message: 'Hello World!'
    }
  }
})
```

### `defineDirective()`

There are a couple of differences between Vue 2 and Vue 3 when it comes to custom Directives. This function will apply some modifications at runtime to ensure cross-compatibility.

```js
import { defineDirective } from '@vue-bridge/runtime'

export const myDirective = defineDirective({
  beforeMount: (el, binding) => {
    el.addEventListener('click', binding.value)
  }
})
```

## Further Reading

<!-- TODO: We will link to how-to guides about authoring components and custom directives later  -->