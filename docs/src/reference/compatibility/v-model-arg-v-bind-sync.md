# `v-model:arg` vs. `v-bind.sync`

Vue 2 and Vue 3 both offer a bit of template sugar to make two-way communication between components outside of the normal `v-model` a bit nicer.

**Vue 2 with sugar**
```html
<my-component v-bind.sync:name="name">
```
**Vue 3 with sugar**
```html
<my-component v-model:name="name">
```

However, these two template syntaxes are incompatible, so you cannot use them _in your library components_ when building cross-compatible libraries.

::: info Clarification

This restriction only applies to usage _inside your library_. Consumers of your library will consume code already compiled for Vue 2 or Vue 3, and can therefore use these in their own component templates, also on components exported from your library.

::: 

## Mitigation

As these are just syntax sugar, you can use a normal `v-bind` and `v-on` combination:


## Eslint

* [vue/no-v-model-argument](https://eslint.vuejs.org/rules/no-v-model-argument.html#vue-no-v-model-argument)
* [vue/no-deprecated-v-bind-sync](https://eslint.vuejs.org/rules/no-deprecated-v-bind-sync.html#vue-no-deprecated-v-bind-sync)
