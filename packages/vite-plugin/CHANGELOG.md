# @vue-bridge/vite-plugin

## 0.1.0

### Minor Changes

- 79974c6: - BREAKING: version-aware file paths now require a ?v-bridge query param, instead of the v-bridge: prefix
  - internal refactor: split different features into 3 separate plugins.

## 0.0.8

### Patch Changes

- 08b3d72: feat: use aliases in v-bridge: paths. Alias patterns must be provided in plugin options.

## 0.0.7

### Patch Changes

- 8edd148: fix(vite-plugin): ensure JSON import is ESM compatible

## 0.0.6

### Patch Changes

- dcd3594: Fix type error: localizeDeps needs to be optional

## 0.0.5

### Patch Changes

- ed63020: types(vite-plugin): explicitly expose typings in pkg.json

## 0.0.4

### Patch Changes

- 71c7a15: fix(vite-plugin): ensure correct runtime dependencies are defined in pkg.json
  Also remove all the unnecessary deps from previous iterations.

## 0.0.3

### Patch Changes

- dec3fcb: don't overwrite user-defined aliases.

## 0.0.2

### Patch Changes

- fa3fd32: vite-plugin: initial version ready for release - also added a small slots polyfill to runtime
