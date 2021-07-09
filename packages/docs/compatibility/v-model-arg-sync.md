# `v-model:arg` & `v-bind.sync`

Both Vue 2 and 3 have `v-model` for a two-way binding of one prop between parent and child components (See here how `@vue-bridge/runtime` handles Vue 2/3 differences for you). But that's not the point here, this is: 

Both versions also offer a way to add more than one two-way binding, but do so using different template syntax:

```html
<my-component v-model="name" v-bind:age.sync="age" />
```

```html
<my-component v-model="name" v-model:age="age" />
```

These are incompatible on the compiler level - one will always fail when compiled for the other version. So you cannot use this syntax.

## Mitigation

This syntax is just as shorthand, "syntax sugar", for using `v-bind` and `v-on`. If you write it "long form", everything will work as expected in both versions:


```html
<my-component 
  v-model="name"
  v-bind:age="age"
  v-on:update:age="age = $event"
/>
```

::: tip Your users can use this!
This restriction applies to usage inside your **own library code**. Consumers of your library will use your components already compiled for Vue 2 _or_ Vue 3 and are free to use the respective shorthand syntax on your components as they do on others.
:::

## Eslint

* [vue/no-v-model-argument](https://eslint.vuejs.org/rules/no-v-model-argument.html#vue-no-v-model-argument)
* ['vue/no-deprecated-v-bind-sync'](https://eslint.vuejs.org/rules/no-deprecated-v-bind-sync.html#vue-no-deprecated-v-bind-sync)

```js
{
  rules: {
    'vue/no-deprecated-v-bind-sync': 'error',
    'vue/no-v-model-argument': 'error',
  }
}
```