# @vue-bridge/runtime

## 0.1.1

### Patch Changes

- 82bf09b: fix: add missing new dist-vue\* directories to package.json's `files` field

## 0.1.0

### Minor Changes

- 9726a14: Minimum peer dep version for Vue 2 raised to Vue 2.7 for runtime and testing packages

  - runtime now properly generates types for both Vue versions
  - runtime no longer depends on `@vue/composition-api as a peer dependency

### Patch Changes

- ffc664d: fix: Vue 2 v-model works with array-style props definition
- ffc664d: attrs-listeners-mixin: fix handling of emits option as array
  attrs-listeners-mixin: fix navtiveOn event handling

## 0.0.12

### Patch Changes

- c173053: feat: support cross-compatible slots through `this.$bridgeSlots`

## 0.0.11

### Patch Changes

- 456333f: Multiple fixes and reduction of exports:

  - remove `lifecycleMixin` - now done as a patch during `defineComponent()`
  - remove `setDeleteMixin` - doesn't make much sense to have separate
  - fix/refactor `attrsListenersMixin` - now caches content, exposes all APIs as functions, no computed
  - fix types for `$bridgeSlots`

## 0.0.10

### Patch Changes

- 4533fa6: fix pkg json exports

## 0.0.9

### Patch Changes

- 492038c: Fixing some problems with runtime's attrsListenersMixin concerning types and reactivity

## 0.0.8

### Patch Changes

- fa3fd32: vite-plugin: initial version ready for release - also added a small slots polyfill to runtime

## 0.0.7

### Patch Changes

- efc2a56: Type fixes

## 0.0.6

### Major Changes

- 9b49b93: fix(attrsListenersMixin): refactored to normal object, exposes class and style as methods now
  fix(types): properly expose all types, annotate customDirective types
  feat(build): provide `iife` build for CDN usage
  fix(lifecyleMixin): skip lifecycle checks in Vue3 build as they are unnecessary

### Patch Changes

- 60c75a0: fix(runtime): Add missing `App` type, improve Directive Types for better interop.
- 0efced8: Switch to manually written, separate type declaration files for the Vue 2 and Vue 3 runtimes.

## 0.0.5

### Patch Changes

- Fix License Files

## 0.0.4

### Patch Changes

- f5c933a: fix cjs filename in postinstall copy fn

## 0.0.3

### Patch Changes

- 85b7b0c: fix package.json files field, add postinstall script

## 0.0.2

### Patch Changes

- Initial pre-alpha experimental release of @vue-bridge packages
