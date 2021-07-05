# Custom Directives

Writing cross-compatible custom directives is possible with the use of the `defineDirective()` helper function. You write your directive for Vue 3 and the helper takes care of the necessary conversions for Vue 2:

* **Vue 3** no-op, returns custom directive defintion as-is
* **Vue 2** renames lifecycle hooks to their Vue 2 counterparts

It will also throw warnings when use use a hook that has no counterpart in one of the versions (see Mapping below).

## Mapping

| Vue 3           | Vue 2              |
|-----------------|--------------------|
| `created`       | **do not use**     |
| `beforeMount`   | `bind`             |
| `mounted`       | `inserted`         |
| `beforeUpdate`  | **do not use**     |
| **do not use**  | `update`           |
| `updated`       | `componentUpdated` |
| `beforeUnmount` | **do not use**     |
| `unmounted`     | `unbind`           |


## Example

```js
import { defineDirective } from 'vue3-compat-lib'

export const myDirective = defineDirective({
  beforeMount(el, binding, vnode) {

  },
  unmounted(el, binding, vnode)

})
```

## Vnode arguments

::: warning
  
  As vnodes are totally different in Vue 2 and Vue 3, it's recommended to not access them in custom directives.

  You can try and find a way that works for both by using `vue-demi`

:::

## Accessing the component instance
  
In some edge cases, it might be necessary to get access to the component instance. This works differently in Vue 2 and Vue 3. You can use `vue-demi` to take care of that:

```js
import { isVue2 } from 'vue-demi'

const myDirective = defineDirective({
  beforeMount(el, binding, vnode) {
  const vm = isVue2 ? vnode.context, binding.instance
  }
})
```
