---
outline: deep
---

# Using (scoped) styles for deep / slotted elements

## Challenge



## Solution



```html
<style scoped v2>

  .root-element /deep/ .nested-element-in-child {
    color: red
  }
  .root-element /deep/ .element-provided-in-slot {
    color: blue
  }
</style>
<style scoped v3>

  .root-element :deep(.nested-element-in-child) {
    color: red
  }
  .root-element :slotted(.element-provided-in-slot) {
    color: red
  }
</style>
```

