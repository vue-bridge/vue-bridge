---
aside: deep
---

# `v-if` combined with `v-for`

## Challenge

* In 2.x, when using `v-if` and `v-for` on the same element, `v-for` would take precedence.
* In 3.x, `v-if` will always have the higher precedence than `v-for`.

Meaning:

```html
<ul>
  <li 
  v-for="item in items"
  v-if="item.active"
  >
    {{ item.name }}
  </li>
</ul>
```

* In Vue 2, this will render a list where the v-if is applied to individual items of the loop.
* in Vue 3, this would break as v-if takes precedence: `Cannot read properties of undefined (reading 'active')`


## Solution

When you need to use both together, use `<template>` to be explicit about the desired priority:

```html
<ul>
  <template v-for="item in items">
    <li v-if="item.active">
      {{ item.name }}
    </li>
  </template>
</ul>
```