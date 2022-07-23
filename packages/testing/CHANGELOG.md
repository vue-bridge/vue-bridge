# @vue-bridge/testing

## 0.2.1

### Patch Changes

- 34ed927: fix: global.plugins compat for Vue 2 should handle (nested) array

## 0.2.0

### Minor Changes

- 9726a14: Minimum peer dep version for Vue 2 raised to Vue 2.7 for runtime and testing packages

  - runtime now properly generates types for both Vue versions
  - runtime no longer depends on `@vue/composition-api as a peer dependency

### Patch Changes

- ffc664d: fixing Vue 2 compat for MountOptions.global

## 0.1.2

### Patch Changes

- 1ccc26d: - Make types more solid
  - make vue an explicit, but optional peerDep

## 0.1.1

### Patch Changes

- efc2a56: Type fixes

## 0.1.0

### Minor Changes

- 85f91aa: Now offers esm and cjs entries and properly works with vitest

### Patch Changes

- 4687d93: fix: provide default value for mount functions

## 0.0.4

### Patch Changes

- 10ccddd: feat: export own isVue2/3 vars, drop vue-demi dependency

## 0.0.3

### Patch Changes

- Fix License Files

## 0.0.2

### Patch Changes

- Initial pre-alpha experimental release of @vue-bridge packages
