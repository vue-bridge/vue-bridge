---
outline: deep
---

# `<Teleport>`

## Challenge

The [`<Teleport>` Component](https://vuejs.org/guide/built-ins/teleport.html#teleport) is a new addition to Vue 3, and as such, not available in Vue 2, so using it in an interoperable library is not really possible - out of the box

## 3rd party Libraries

However, are a few libraries in Vue 2 that do similiar things:

* [`portal-vue`](https://portal-vue.linusb.org)
* [`@linusborg/vue-simple-portal`](https://github.com/linusborg/vue-simple-portal)

### PortalVue

The former has versions for Vue 2 and Vue 3, and the API is consistent enough to be used in both versions without much boilderplate setup. If you used our [workspaces template](#/references/template-workspaces), you can simply define it in your two package's `package.json`:


```js
{
  "name": "vue2-my-library",
  "dependencies": {
    "portal-vue": "^2.1.7"
  }
}
```
```js
{
  "name": "vue3-my-library",
  "dependencies": {
    "portal-vue": "^3.0.0-0"
  }
}
```

::: info 

Neither version of `portal-vue` makes use of Vue 3's native `<Teleport>`, but OTOH the library does more than `<Teleport>` (at he cost of a few additional `kB` in size). But If you don't need more than what `<Teleport>` does, you should consider VueSimplePortal (see next section below).

:::

## VueSimplePortal

[`@linusborg/vue-simple-portal`](https://github.com/linusborg/vue-simple-portal) is a small Vue 2 library that does mimic pretty much what `<Teleport>` does - nothing more, nothing less. 

Since it's only available for Vue 2, and we can use `<Teleport>` in Vue 3, how can we write interoperable code in a component?

```js
// Vue 3
import { Teleport } form 'vue'
// Vue 2
import { Portal } from 'vue-simple-portal'
```

The answer is: We can create a virtual import, which `@vue-bridge/vite-plugin` can resolve to different real imports/files at build time, depending on the Vue version we build for: 

```ts
// ./src/bridges/teleport.vue2.ts
export { Portal as Teleport } from '@linusborg/vue-simple-portal'
```
```ts
// ./src/bridges/teleport.vue2.ts
export { Teleport } from '@vue'
```

```html
<script>
// Usage in your App

// ?bridge query param will make vite resolve the file to either
// `teleport.vue2.ts` or `teleport.vue3.ts`, depending on the target version
import { Teleport } from './bridges/teleport.ts?bridge'

export default defineComponent({
  components: {
    // Make sure to register the component, as the global usage would only work in Vue 3 OOTB.
    Teleport
  }
})
</script>
<template>
  <div>
    <Teleport to="#some-element-outside-of-the-app">
      <MyDialog 
        msg="This pseudoCompenent will be moved withe the Teleport"
      />
    </Teleport>
  </div>
</template>
``