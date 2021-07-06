# Don't use template `ref` on `v-for` element

Using a ref on `v-for` is possible in both Vue 2 and Vue 3, but the template syntax is different and can't be polyfilled by this project.

```html
<!-- Vue 2 -->
<ul v-for="item in items" ref="items">
<!-- Vue 3 -->
<ul v-for="item in items" :ref="(el) => items.push(el)">
```

As you can see, Vue 2 works with a simple name whereas in Vue 3, you have to provide a function.

## Mitigation

There's no real way around this limitation. You can experiment with using a custom directive and see if it works for your use case, but the general recommendation is to simply write code that works without relying on this pattern.
