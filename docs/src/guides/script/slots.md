---
aside: deep
---
# Normal vs. scoped slots

Programmatic access to slots is a bit different in both Versions. This page explains those differences and how to deal with them.

## The Challenge

In Vue 2, you have two kinds of slots, normal ones, accessible through `this.$slots` and so-called scoped slots, accessible through `this.$scopedSlots`.

In Vue 3, on the other hand, slots were unified, all slots are now "scoped" - but the API to access them is now `this.$slots`

## Solution

You can work around this issue quite easily, but doing it manually is not pretty. That's why `@vue-bridge/runtime` provides a unified API for slots as well.

### Manual workaround


```js
import { isVue2 } from '@vue-bridge/runtime'

// ...

const hasDefaultSlot = isVue2
  ? !!this.$scopedSlots.default
  : !!this.$slots.default
```

### `@vue-bridge/runtime` upport

The runtime plugin can make this a bit shorter with the provided `$bridgeSlots`:

```js
import { defineComponent } from '@vue-bridge/runtime'

export default defineComponent({
  created() {
    const hasDefaultSlot = !!this.$bridgeSlots.default
  }
})
```

## Eslint