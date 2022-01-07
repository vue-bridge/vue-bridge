---
'@vue-bridge/runtime': patch
---

Multiple fixes and reduction of exports:

- remove `lifecycleMixin` - now done as a patch during `defineComponent()`
- remove `setDeleteMixin` - doesn't make much sense to have separate
- fix/refactor `attrsListenersMixin` - now caches content, exposes all APIs as functions, no computed
- fix types for `$bridgeSlots`
