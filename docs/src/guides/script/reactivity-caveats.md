---
outline: deep
---
# How do deal with Reactivity Caveats

<!-- TODO: add Badges here? We need some kind of default overview setup -->

## Challenge

Vue 2's Reactivity has a [couple of caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats) that need to be respected. Those are, in short:

```js
export default {
  data: () => ({
    obj: {
      existingProperty: 'value' // changing this value is reactive
    }
    array: ['Hello']
  }),
  created() {
    this.existingProperty = 'new value' // reactive! :) 
    this.obj.newProperty = 'value' // not reactive :(
    delete this.obj.existingProperty // not reactive :(

    this.array[0] = 'Goodbye' // not reactive :(
    this.array.length = 0 // not reactive :(
  }
}
```

Vue 2 exposes helpers to deal with these caveats - `this.$set()` and `this.$delete()`:

```js
export default {
  data: () => ({
    obj: {
      existingProperty: 'value'
    }
    array: ['Hello']
  }),
  created() {
    this.$set(this.obj, 'newProperty', 'value') // reactive :)
    this.$delete(this.obj, 'existingProperty') // reactive :)

    this.$set(this.array, 0,'Goodbye') // reactive :)
    
    // special case: setting length never works, just replace with a new one.
    this.array = [] // reactive :)
  }
}
```
However, two things make this a bit of a challenge:

1. We can't detect wrong usage for you with an eslint rule or similar. You have to watch out for these problems yourself.
2. Vue 3 doesn't have these helper methods, but for Vue 2, you need them.

## Recommendations

1. Since `this.$set()` and `this.$delete()` are missing from Vue 3, but needed for Vue 2, we need replacements.
2. Write unit tests!

### Options API: `$set/$delete` Polyfill via `@vue-bridge/runtime`


Concerning Vue3, `@vue-bridge/runtime` can help with the missing methods: When you define your component with its `defineComponent` export will add these missing methods to the component when building our component for Vue 3.

```js
import { defineComponent } from '@vue-bridge/runtime'

export default defineComponent({
  data: () => ({
    obj: {
      existingProperty: 'value'
    }
  }),
  created() {
    // these helper methods will be provided
    // for your component's Vue 3 version as well.
    this.$set(this.obj, 'newProperty', 'value')
    this.$delete(this.obj, 'existingProperty')
  }
})
```

### Composition API: `set()/del()` polyfill via `@vue-bridge/runtime`

With Vue `2.7`, both Vue 2 and Vue 3 support the composition API. Vue 2 also exposes `set()` and `del()` helpers that work just like `$set()` and `$delete()` in Options API, but can be used in `setup()`. Since Vue 3 doesn't expose them, use the ones provided by `@vue-bridge/runtime`:

```js
import { reactive } from 'vue'
import { defineComponent, set, del } from '@vue-bridge/runtime'

export default defineComponent({
  data: () => ({
    obj: {
      existingProperty: 'value'
    }
  }),
  setup() {
    const obj = reactive({
      existingProperty: 'value'
    })
    set(obj, 'newProperty', 'value')
    del(obj, 'existingProperty')
  }
})
```

### Unit Testing for both Versions

You should test your components - obviously. And to make sure they behave the same in Vue 2 and Vue 3, we strongly recommend that you run your unit tests against both versions with the help of `@vue-bridge/testing`.

This is of course a good recommendation for a lot of the cross-compatibility challenges we have documented in this guide, but it's especially important when it comes to the Reactivity which is central to Vue.


## Further Reading

* [Topic: Unit Testing](#) <!-- TODO: Link -->
* [Reference: `@vue-bridge/testing`](/reference/testing)
* [Reference: `@vue-bridge/runtime`](/reference/runtime)