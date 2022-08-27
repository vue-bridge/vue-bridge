---
outline: deep
---

# Component Lifecycle Hooks

## Challenge

Lifecycle Hooks are a very commonly used feature in Vue components, and some of them have been renamed in Vue 3:

* `beforeDestroy` -> `beforeUnmount`
* `destroyed` -> `unmounted`

So whenever you need to use these lifecycle hooks in your cross-compatible components, you have to make sure that your hooks are run when used with either version. As an example, in the following example, `created`would run in both versions, but with Vue 3, the `beforeDestroy` hook would never be called (though you would get a console warning in development):

```js
export default {

  created() {
    window.addEventListener('resize', this.handler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handler)
  }

  methods: {
    handler() { /*... */ }
  }
}
```

## Solution

This breaking change can be handled manually or with the help of `@vue-bridge/runtime`.

### Manual handling

```js
export default {

  created() {
    window.addEventListener('resize', this.handler)
  },
  beforeDestroy() {
    this.removeListener()
  },
  beforeUnmount() {
    this.removeListener()
  }
  methods: {
    removeListener() {
      window.removeEventListener('resize', this.handler)
    }
    handler() { /*... */ }
  }
}
```

While this works, this has a couple of obvious drawbacks:

* You need to remember to do that!
* You end up with unnecessary code for either Version in your components.

### Automatic handling with `@vue-bridge/runtime` (Options API)

When using `defineComponent()` from `@vue-bridge/runtime`, you can just use Vue 3 lifecycle names and forget about it. A runtime, the component lifecycles will be renamed to the ones expected by the Vue version that the component runs in.

```js
import { defineComponent } from '@vue-bridge/runtime'
export default defineComponent({

  created() {
    window.addEventListener('resize', this.handler)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handler)
  }
  methods: {
    handler() { /*... */ }
  }
})
```

### Automatic handling with `@vue-demi` (Composition-API)

Vue `2.7` supports composition API, and in composition API, the old lifecycle names are already gone. So you can simply use the new ones from Vue 3:

```js
import { defineComponent, onBeforeUnmount } from 'vue'
export default defineComponent({

  setup() {
    function handler() { /*... */ }
    window.addEventListener('resize', this.handler)
    onBeforeUnmount(() => {
      window.removeEventListener('resize', this.handler)
    })
  },
})
```

## Further Reading

* [Vue 3 Docs: Lifecycle Hooks](https://vuejs.org/guide/essentials/lifecycle.html)
* [Vue 2 Docs: Lifecycle Hooks](https://v2.vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks)