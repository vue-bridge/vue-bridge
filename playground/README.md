# Playground

The packags in this directory are used for testing the published packages during development of `@vue-bridge` and are not published.

## Packages

### `example-library`

A small library, written following the Vue-Bridge guide, using `@vue-bridge/eslint-config` and `@vue-bridge/testing`. Its build target is Vue 3.

### `example-library-vue2`

this packages doesn't have any source files or tests of its own. it's purpose is to locally house the Vue 2 dependencies:

* `vue@^2.6`
* `@vue/testing-utils@^1.0.0-0`
* `vue-template-compiler`
* `vue-jest@^4.0.0-0`

We are working in yarn workspaces, and we have made sure that these dependencies are _not_ hoisted to the root node_modules folder (config: see root `package.json`'s workspaces settings), and need to do a bit of aliasing in the vite and jest configs to make all impors point to the right stuff.

It builds a Vue2 version of the source files from `example-lib`, and also runs that package's test with the Vue2-compatible test utils.

### app-vue2

An example app consuming the Vue2-compatible version of our example library

### app-vue3

An example app consuming the Vue3-compatible version of our example library