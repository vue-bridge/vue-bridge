---
outline: deep
---

# `@vue-bridge/runtime`

<div style="display: flex; justify-items: start; gap: 5px">
  <img alt="current npm version" src="https://img.shields.io/npm/v/@vue-bridge/runtime">
  <img alt="license - MIT" src="https://img.shields.io/npm/l/@vue-bridge/runtime">
  <img alt="npm bundle size (min+gzip)" src="https://img.shields.io/bundlephobia/minzip/@vue-bridge/runtime">
  <img alt="npm downloads per month" src="https://img.shields.io/npm/dm/@vue-bridge/runtime">
</div>

This package provides runtime interop between Vue 2 and Vue 3 for a some APIs, those that can be made compatible at runtime within a few lines of "glue code". 

For these reasons, this package is extremely light

::: warning Vue version compatibility

This package is compatible with Vue versions `^3.0.0` or `^2.7.0`. We do not provide support for versions below `2.7`. This means that any library/plugin using this package also requires Vue `^2.7` or `^3.0.0` to work.

Make sure to document this in your library's docs and in the version requirements in `package.json`.
:::

## Installation

### Package managers

```bash
npm install @vue-bridge/runtime
# Yarn
yarn add @vue-bridge/runtime
# PNPM
pnpm add @vue-bridge/runtime
```

This package exposes variants in export subpaths:

* `@vue-bridge/vue3` -> to be used in Vue 3 projects
* `@vue-bridge/vue2` -> to be used in Vue 2 projects

Using these would look like this:

```js
// always gives you the variants meant for Vue 2
import { defineComponent } from '@vue-bridge/runtime/vue2'
// always gives you the variants meant for Vue 3
import { defineComponent } from '@vue-bridge/runtime/vue3'
```

### Using Subpath Exports with aliases

You can alias the package to a hardcoded Vue version subpath. Here's an example in Vite:

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

Usually, this should not be necessary to be set by consumers of your library, because the "automagical" main export (see next section) would provide the right variant as the main export. But in your library's own repository, it can be necessary to explicitly define which variant should be used with an alias.

### "Automagical" main export

When installed in a project that uses Vue 2 or Vue 3, the main export should generally provide the matching variant automagically. It does so by running a postinstall script that adjusts the package.json exports definition depending on the version of Vue that is installed in the consumer's project:

```js
// Main exports are dynamically determined to be for Vue 2 or Vue 3
import { defineComponent } from '@vue-bridge/runtime'
```

### CDN

You can also use `@vue-bridge/runtime` directly from a CDN:

```html
<!-- Vue 3 -->
<script src="https://unpkg.com/@vue-bridge/runtime/dist-vue3/index.iife.js"></script>

<!-- Vue 2 -->
<script src="https://unpkg.com/@vue-bridge/runtime/dist-vue2/index.iife.js"></script>
```

Then you can use it like so:

```js
window.VueBridge.defineComponent({ /*... */})
```

::: warning Don't use the main export

As this plugin comes in two variants, but the package has only one main export, you should always use exact paths like shown above, and not import like this:

```html
<!-- ❌ DONT DO THIS -->
<script src="https://unpkg.com/@vue-bridge/runtime"></script>
```

:::

## API/Features

This plugin has with two main exports:

1. `defineComponent()`
2. `defineDirective()`

### `defineComponent()`

Use this function when defining your components.

It is a wrapper around Vue's [`defineComponent()`](https://v3.vuejs.org/api/global-api.html#definecomponent) function.

While the original function's only purpose is to ensure Type safety, `@vue-bridge/runtime` wraps it and applies a bunch of changes and mixins to your component definition in order to ensure interoperability.

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

Related Guides: 

* [v-model](../guides/script/v-model.md)
* [Lifecycle Hooks](../guides/script/lifecycle-hooks.md)
* [Slots](../guides/script/slots.md)
* [$set/delete for Reactivity Caveats](../guides/script/reactivity-caveats.md)

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

Learn more: [Using `defineDirective`](../guides/other/custom-directives.md)

### `attrsListenersMixin`

This mixin provides ponyfills to work around differences in Vue 2/3 for the following apis:

* `$attrs`
* `$attrs.class (special handling)`
* `$attrs.style (special handling)`
* `$listeners`
* `v-on.native`

It comes as a separate mixin instead of being included in `defineComponent()` to safe a few bytes for those libraries that don't need them. In our experience, these APIs are not generally needed in too many components, and this ponyfill is a bit more expensive than the rest of what `defineComponent` does, so we wanted to keep it tree-shakable for those that don't need it.

```js
import {  attrsListenersMixin, defineComponent } from '@vue-bridge/runtime'

export default defineComponent({
  mixins: [attrsListenersMixin]
})
```

This mixin adds the following instance properties:

* `$bridgeAttrs`
* `$bridgeClass`
* `$bridgeStyle`
* `$bridgeListeners`
* `$bridgeNativeOn`

You can learn more about on the actual usage scenarios in the How-To guide section:

* [TBD](#)
* [TBD](#)
