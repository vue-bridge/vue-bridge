---
aside: deep
---
# How to use component `v-model`

## Challenge

 You want to make your component usable with `v-model`, but this syntax sugar works differently in Vue 2 and Vue 3.

```js
// Vue 2:
export default {
  props: ['value'],
  methods: {
    emitValue(value) { this.$emit('input', value) }
  }
}

//Vue 3
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    emitValue(value) { this.$emit('update:modelValue', value) }
  }
}
```

## Manual Solution

Write the component Vue 3-style but use [Vue 2's `model` option](https://vuejs.org/v2/api/#model) to redefine the prop and event.

```js
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  }, 
  methods: {
    emitValue(value) { this.$emit('update:modelValue', value)}
  }
}
```

## Polyfill via `@vue-bridge/runtime`

`@vue-bridge/runtime`'s `defineComponent()` wrapper will insert this option for you if you write your component Vue 3 style:

```js
import { defineComponent } from '@vue-bridge/runtime'

export default defineComponent({
  props: ['modelValue'],
  emits: ['update:modelValue'],
  /** this will be inserted ny defineComponent:
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  }, 
  */
  methods: {
    emitValue(value) { this.$emit('update:modelValue', value)}
  }
})
```

::: warning Attention

This means that counter to the Vue 2 default, your components will now expect a `modelValue` prop and emit an `update:modelValue` event even when used in a Vue 2 app.

You should document this for your library's users.

:::

## `v-bind:arg` vs. `v-bind.sync`

You can't use `v-model:name=""` (Vue 3) or `v-bind.sync:name=""` (Vue 2) *in your own library's codebase*, because you will compile your templates with both compilers, which each only understand one of these APIs.

Instead, you have to fall back to the "normal" long forms of these shortcuts:

```html
<child-component 
  v-bind:name="name"
  @update:name="name = $event"
/>
```

::: tip This does not affect consumers!

The *consumers* of your library can of course use these APIs (appropriate for the Vue version in in their project) on your components.

This limitation only applies to the usage within your cross-version library's codebase.

:::
