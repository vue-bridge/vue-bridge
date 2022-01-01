---
aside: deep
---
# Filters 

Vue 2 supports filters:

```html
<p>the price is {{ price | toCurrency }}</p>
```

But this feature got removed in Vue 3.

## Alternatives

### Local Filters

You can use computed properties or normal methods to do the same thing filers do, just with a different syntax:

```html
<template>
  <p>the price is {{ currency(price) }}</p>
</template>
<script>
import { defineComponent } from '@vue-bridge/runtime'

export default defineComponent({
  data: () => ({
    price: 49.99
  }),
  methods: {
    currency(value) {
      return '$ ' + Math.round((value * 100) / 100 
    }
  }
})
</script>
```

### Global Registration

<!-- TODO: provide guidance for workaround with globalProperties in Vue 2 and 3 -->

In Vue 2, you could also register filters globally, like components, and then freely use them throughout your app.

If you want to replicate this in a cross-compatible library, you need to use  a bit of a workaround:

```js
import { isVue2 } from '@vue-bridge/runtime'

// collect your global filters in an object.
const filters = {
  currency(value) {
    return '$ ' + Math.round((value * 100) / 100 
  },
  // more filter methods ...
}

// the install function of your library
function install (app) {
  if (isVue2) {
    app.prototype.$filters = filters
  } else {
    app.config.globalProperties.$filters = filters
    // also consider to provide the filters for users of the composition API:
    app.provide('filters', filters)
  }
}
```
Usage in a template:
```html
<p>the price is {{ $filters.currency(price) }}</p>
```

## Eslint

::: info
  Preconfigured for you when using [`@vue-bridge/eslint-config`](/reference/eslint-config)
:::

* [vue/no-deprecated-filter](https://eslint.vuejs.org/rules/no-deprecated-filter.html#vue-no-deprecated-filter)

```js
{
  rules: {
    'vue/no-deprecated-filter': 'error'
  }
}
```