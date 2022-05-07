# Custom Directives

## Challenge

For Custom Directives, some lifecycle hook names changed to align with those used in components. also, accessing the current component's instance works different in both versions.

## Solution

Writing cross-compatible custom directives is possible with the use of the `defineDirective()` helper function. You write your directive for Vue 3 and the helper takes care of the necessary conversions for Vue 2:

* **Vue 3** no-op, returns custom directive definition as-is
* **Vue 2** renames lifecycle hooks to their Vue 2 counterparts

It will also throw warnings when use use a hook that has no counterpart in one of the versions (see Mapping below).

### Mapping

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


### Example

```js
import { defineDirective } from '@vue-bridge/runtime'

export const myDirective = defineDirective({
  beforeMount(el, binding, vnode) {

  },
  unmounted(el, binding, vnode)

})
```

## Accessing the component instance
  
In some edge cases, it might be necessary to get access to the component instance. This works differently in Vue 2 and Vue 3:

* In Vue 2, you can access the instance via `vnode.context`
* In Vue 3, you can access the instance via `binding.instance`

To make this easier, `defineDirective()` adds the `binding.instance` property when running in Vue 2, so you can use it like you are in Vue 3.

For Usage with Typescript, the following might be better to keep types working:

```js
import { isVue2 } from '@vue-bridge/runtime'

const myDirective = defineDirective({
  beforeMount(el, binding, vnode) {
  const vm = isVue2 ? vnode.context, binding.instance
  }
})
```

::: warning Working with VNodes
  As vnodes are totally different in Vue 2 and Vue 3, it's recommended to not access them in custom directives.

  You can try and find a way that works for both by using `vue-demi`
:::


### Caveat: Directive on Components

When using a directive on a component, the `instance` will be different in Vue 2 and Vue 3:

* in Vue 2, `vnode.context` gives you the parent component instance that set the directive on the child component.
* in Vue 3, `binding.instance` would give your the child component instance that the directive was used on.

This can lead to bugs, so be aware of it.