# Filters (removed in Vue 3)

Vue 2 Supports filters:

```html
<p>the price is {{ price | toCurrency }}</p>
```

This syntax is no longer supported in Vue 3 and your SFC simply won't compile.

## Mitigation

You can use computed properties or normal methods to do the same thing filers do, just with a different syntax.

<!-- TODO: provide guidance for workaround with globalProperties in Vue 2 and 3 -->

## Eslint

* [vue/no-deprecated-filter](https://eslint.vuejs.org/rules/no-deprecated-filter.html#vue-no-deprecated-filter)

```js
{
  rules: {
    'vue/no-deprecated-filter': 'error'
  }
}
```