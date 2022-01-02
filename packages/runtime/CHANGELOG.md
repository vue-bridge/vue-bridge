# @vue-bridge/runtime

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
