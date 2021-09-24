# How to use component `v-model`

## Challenge

 You want to make your component usable with `v-model`, but this syntax sugar works differently in Vue 2 and Vue 3.

```js
// Vue 2:
export default {
  props: ['value'],
  methods: {
    emitValue(value) { this.$emit('input', value)}
  }
}

//Vue 3
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  methods: {
    emitValue(value) { this.$emit('update:modelValue', value)}
  }
}
```

## Solution

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

## Tooling Support

`@vue-bridge/runtime`'s `defineComponent()` wrapper will insert this option for you if you write your component Vue 3 style:

```js
import { defineComponent } from '@vue-bridge/runtime'

export default defineComponent({
  props: ['modelValue'],
  emits: ['update:modelValue'], 
  methods: {
    emitValue(value) { this.$emit('update:modelValue', value)}
  }
})
```

## Pitfalls

You can't use `v-model:name=""` (Vue 3) or `v-bind.sync:name=""` *in your own codebase, because you will compile your templates with both compilers, which each only understand one of these APIs.

Instead, you have to fall back to the "normal" long forms of these shortcuts:

```html
<child-component 
  v-bind:name="name"
  @update:name="name = $event"
/>
```

::: tip This does not affect consumers!

The *consumers* of your library can of course use the API appropriate for their Vue version on your components.

This limitation only applies to the usage within your cross-version library's code base.

:::
