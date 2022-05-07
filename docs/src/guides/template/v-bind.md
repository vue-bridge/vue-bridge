---
outline: deep
---

# `v-bind`: cross-compatible bindings

## Challenge

This one is kind of an edge case:

In Vue 2, individual bindings always had precedent over an object-style binding. In Vue 3, the order in the template is teh determinign factor 

Here's an example:

```html
<div 
  v-bind:id="'individual-id'"
  v-bind="{ id: 'object-id', class: 'important warning' }"
>
  Something important!
</div>
```
Result in Vue 2:

```html
<div id="individual-id" class="important warning">
  Something important!
</div>
```
Result in Vue 3:

```html
<div id="object-id" class="important warning">
  Something important!
</div>
```

So to be clear, this only affects you if you basically want to override an attribute that you bind via the object style with an individual `v-bind:name`.

## Solution

The solution is very simple - you just have to take care that you respect it:

_"Put object-style v-binds before individual ones so that the latter take precedence in both versions of Vue"_

To fix the above example, we simply move the `v-bind:id` after the object-style `v-bind`:

```html
<div 
  v-bind="{ id: 'object-id', class: 'important warning' }"
  v-bind:id="'individual-id'"
>
  Something important!
</div>
```