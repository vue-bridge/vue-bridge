# _"Why Vue-Bridge?"_ - A brief introduction

## The challenge

Writing, building and publishing Vue components that work with both versions is _much_ harder than it should be. 

Vue-Bridge's mission is to make this process as painless and straightforward as possible, offering guides and tooling to help with the different kinds of challenges a library author faces. And challenges are plenty:

With Vue 3, a considerable amount of breaking changes were introduced. And while the overall API and style of writing Vue components stayed the same, the sum of these changes plus the all-new virtual DOM and compiler, mean supporting both Vue 2 and 3 in the same library is not trivial:

1. **Writing**: We need to write our components in a way that only uses _compatible_ APIs which can be used with and compiled for both versions (or add some polyfills/workarounds where possible).
2. **Testing**: We need to write and run our **unit tests** in a way that allows to test everything twice, for Vue 3 and Vue 2 - this is essential because of the different [Reactivity Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats) alone.
3. **Building** our components twice: Once involving `@vue/compiler-sfc` for Vue 3, then again with involving `vue-template-compiler` for Vue 2
4. **Publishing**: Then finally, we have to think about the best way to publish these two build artifacts to our end users.

## Introducing the `@vue-bridge` Suite

The goal of this project is to make all of these points easier for Vue library authors. It aims to do so with in different ways:

1. Template
2. Tooling
3. Guidance

#### Template

The easiest way to get started with vue-bridge is using our template, which comes with a bunch of options to adjust for JS/TS flavours and the like. It creates a project with all of the [Tooling](#tooling) packages pre-configured to write, test, build and publish cross-compatible Vue components/libraries.

Check out the [Getting Started](../getting-started/) guide to dive right in with a QuickStart or learn more about it in the [Reference for the Template](../reference/).

#### Tooling 

The Vue-Bridge project offers a couple of packages which solve different parts of the challenges that we talked about further up. All of them are pre-configured for you if you choose to start with our [template](#template).

1. [`@vue-bridge/eslint-config`](../reference//eslint/) - A set of eslint rules that help you in avoiding incompatible features and other mistakes.
2. [`@vue-bridge/runtime`](../reference/runtime/) A tiny Vue library that bridges a few API differences between Vue 2 and Vue 3 at runtime.
3. [`@vue-bridge/testing`](../reference/testing/) - A wrapper around `@vue/testing-library`'s main functions: `mount()` and `shallowMount()`, allowing your tests to be run in both environments
4. [`@vue-bridge/switch`](#) (_**TDB*_) A small script that can adjust your package's entry points/exports automatically, depending on the Vue version installed in the current project.
5. [`@vue-bridge/vite-plugin`](#) - (_**TDB*_) A Vite plugin that makes bundling your cross-compatible components for Vue 2 and Vue 3 easy

If you want to learn more about how to set up and use these packages individually in your own project, check out their reference and the How-To Guides linked there.

#### Guidance

_TBD_


## Is this for me?

This project isn't necessarily a good fit for *your* kind of library. To judge wether or not this might be for you, see the following guidelines:

### This project is generally for you if you:

* have a small to medium sized library
* don't need to use render functions
* don't have any dependencies that are incompatible with one of the Vue versions
* don't have a hard requirement on any of the [incompatible features](../compatibility/index.md)
* want to publish one package that can be consumed in both Vue 2 and Vue 3 projects.

Summary: if you want to write a vue library that is small in scope, doesn't rely on incompatible 
dependencies and are fine with a few rules to follow, this might be for you.

### It will be easier to use this project if you:

* are familiar with the differences between Vue 2 and Vue 3
* know how to use and configure [Eslint](https://eslint.org)
* feel comfortable configuring your build system (Vite, rollup, webpack)


### You might not need this at all if you:

* want to write a Vue library that doesn't use/export components (only composition functions or other helpers, for example). Then [`vue-demi`](https://github.com/vueuse/vue-demi) might be all you need, or not even that.

## How does this compare to ...?

We have a separate [page for comparisons](./comparisons.md) with other packages like `@vue/compat`, `@vue/composition-api` and `vue-demi`

