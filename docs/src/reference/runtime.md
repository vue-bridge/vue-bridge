---
outline:deep
---
# `@vue-bridge/runtime`

![current npm version](https://img.shields.io/npm/v/@vue-bridge/runtime) ![NPM](https://img.shields.io/npm/l/@vue-bridge/runtime) ![npm bundle size (min+zip)](https://img.shields.io/bundlephobia/minzip/@vue-bridge/runtime) ![npm downloads per month](https://img.shields.io/npm/dm/@vue-bridge/runtime)

This package provides runtime conversions for a bunch of APIS between Vue 2 and Vue 3.

::: tip Compatibility Listing

All APIs that this plugin makes compatible at runtime are marked with the <plugin /> badge in the [Compatibility Listing](/reference/compatibility/) 

:::

## About dependencies

This plugin has [`@vue/composition-api`](https://github.com/vuejs/composition-api) as an optional peer dependency. It provides the Vue 2 version of `defineComponent()`.

So when you publish a plugin with the use of `@vue-bridge/runtime`, you should also make `@vue/composition-api` a peer dependency of your package. Users consuming your plugin in a Vue 2 project then need to install it alongside your package.

## Installation

### Package managers

```bash
npm install @vue-bridge/runtime
# Yarn
yarn add @vue-bridge/runtime
# PNPM
pnpm add @vue-bridge/runtime
```

Whe importing from this package, note that you can do so in different way:

```js
// Main exports are dynamically determined to be for Vue 2 or Vue 3
// This happens in a postinstall script which checks the version of the 'vue' package installed.
import { defineComponent } from '@vue-bridge/runtime'

// always gives you the variants meant for Vue 2
import { defineComponent } from '@vue-bridge/runtime/vue2'
// always gives you the variants meant for Vue 3
import { defineComponent } from '@vue-bridge/runtime/vue3'
```

You can also alias the package to a hardcoded Vue version subpath. Here's an example in Vite:

```js
export default defineConfig({
  resolve: {
    alias: {
      ' @vue-bridge/runtime': '@vue-bridge/runtime/vue3'
      //' @vue-bridge/runtime': '@vue-bridge/runtime/vue2'
    }
  }
})
```

If you use [`@vue-bridge/vite-plugin`](#), this will be configured for you.

### CDN

::: warn UMD Build is TBD
  an UMD Build is on our roadmap but not done yet. Consider the following to be a documentation of the intended/planned usage.
:::

You can also use `@vue-bridge/runtime` directly from a CDN:

```html
<!-- Vue 3 -->
<script src="https://unpkg.com/@vue-bridge/runtime/dist/index.vue3.iife.js"></script>

<!-- Vue 2 -->
<script src="https://unpkg.com/@vue/composition-api"></script>
<script src="https://unpkg.com/@vue-bridge/runtime/dist/index.vue2.iife.js"></script>
```

## API

This plugin has with two main exports:

1. `defineComponent()`
2. `defineDirective()`

### `defineComponent()`

Use this function when defining your components.

It is a wrapper around Vue 3's [`defineComponent()`](https://v3.vuejs.org/api/global-api.html#definecomponent) function (it doesn't exist in Vue 2, but we use the version provided by `@vue/composition-api` internall when used in a Vue 2 project provides you with a Vue 2 version of the same function under the hood for use in a Vue 2 project).

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

### `attrsListenersMixin`

Usage is straightforward:

```js
import {  attrsListenersMixin, defineComponent } from '@vue-bridge/runtime'

export default defineComponent({
  mixins: [attrsListenersMixin]
})
```

What this Mixin adds:

* `this.$_attrs`: Behaves like `$attrs` in Vue 2: it contains only _attributes_ passed to the component, not _event listeners_ and not `class` or `style`
* `this.$listeners`: Behaves like `$listeners` in Vue 2: contains any `v-on` listeners that were defined on the component
* `this.$_class()`: Gives you the class from `$attrs` in Vue 3, empty in Vue 2. This is because in Vue 2, `class` is never exposed and instead always assigned to the component's root element. 
* `this.$_style()`: Like `$_class` but for the `style` attribute.

You can learn more about on the actual usage scenarios in the How-To guide on [Working with `$attrs`](#tbd) (_TBD_)


## Further Reading

TODO: Link HowTo articles where these plugin APIs are used in.

<!-- TODO: We will link to how-to guides about authoring components and custom directives later  -->