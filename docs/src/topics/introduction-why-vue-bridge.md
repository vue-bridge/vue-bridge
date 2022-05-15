---
aside: deep
next: /topics/comparisons
---
# _"Bridging the gap"_ <br> Why VueBridge?

## The challenge of Cross-Compatibility

Vue 2 has been around for more than 6 years. Countless Applications run on it, and a whole thriving ecosystem has been built around it.  Now, since October 2020 we have Vue 3, and with it some amazing new features, performance improvements and so on. But adoption has been a bit slower than expected. One of the reasons:

A lot of developers face a challenge when trying to migrate their applications to Vue 3: They are using libraries from the Vue 3 ecosystem that don't support Vue 3 yet. And on the flip side, there are developers who will work in Vue 2 for the forseeable future for various reasons, worried that their current dependencies might lose support once their authors migrated them to Vue 2.

Library authors would of course prefer to publish their library in a way that supports both Vue 2 and Vue 3 - this is what we call **Cross-Compatible Vue Libraries**. But writing, testing, building and publishing Vue Libraries that support both Vue 2 and Vue 3 is _much_ harder than it should be, especially when it involves actual Vue components instead of a simple wrapper around a vanilla 4rd party library.

<!-- TODO: Emphasize & highlight this with size, styling, maybe a special component? -->

**Vue-Bridge's mission is to make this process as painless and straightforward as possible, offering guides and tooling to help with the different kinds of challenges a library author faces**.

And challenges are plenty:

With Vue 3, a considerable amount of breaking changes were introduced. While the overall API and style of writing Vue components stayed the same, supporting both Vue 2 and 3 in the same library is not trivial because of the sum of these - in themselves often small and simple - changes combined with the all-new virtual DOM and compiler, which introduce new tooling dependencies.

1. **Writing**: We need to write our components in a way that only uses _compatible_ APIs which can be used with and compiled for both versions (or add some polyfills/workarounds where possible).
2. **Testing**: We need to write and run our **unit tests** in a way that allows to test everything twice, for Vue 2 and Vue 3 - this is essential because of the different [Reactivity Caveats](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats) alone.
3. **Building**: We also might want to bundle components twice: Once involving `@vue/compiler-sfc` for Vue 3, then again with involving `vue-template-compiler` for Vue 2
4. **Publishing**: Then finally, we have to think about the best way to publish these two build artifacts to our end users.

## Introducing the `@vue-bridge` Suite

The goal of the Vue-Bridge project is to adress all of these paint poitns for Vue library authors, and make them as easy and straightfoward to deal with as possible. We aim to do so with in different ways:

1. Templates to get you started quickly
2. Tooling to help you write, test and build your code in a cross-compatible manner
3. Guidance in the form of extensive documentation.

#### Template

The easiest way to get started with vue-bridge is using our template, which comes with a bunch of options to adjust for JS/TS flavours and the like. It creates a project with all of the [Tooling](#tooling) packages pre-configured to write, test, build and publish cross-compatible Vue components/libraries.

Check out the [Getting Started](../getting-started) guide to dive right in.

#### Tooling 

The Vue-Bridge project offers a couple of packages which address different aspects of the challenges that we talked about further up. All of them are pre-configured for you if you choose to start with our [template](#template), but can also be integrated into existing setup with a bit of effort.

1. [`@vue-bridge/eslint-config`](../reference/eslint-config) - A set of eslint rules that help you in avoiding incompatible features and other mistakes.
2. [`@vue-bridge/runtime`](../reference/runtime) A tiny Vue library that bridges a few API differences between Vue 2 and Vue 3 at runtime.
3. [`@vue-bridge/testing`](../reference/testing) - A wrapper around `@vue/testing-library`'s main functions: `mount()` and `shallowMount()`, allowing your tests to be run in both environments
4. [`@vue-bridge/switch`](#) (_**TDB*_) A small script that can adjust your package's entry points/exports automatically, depending on the Vue version installed in the current project.
5. [`@vue-bridge/vite-plugin`](#) - A Vite plugin that makes bundling your cross-compatible components for Vue 2 and Vue 3 easy. (Versions for Rollup, Webpack etc are in the works)

If you want to learn more about how to set up and use these packages individually in your own project, check out their reference and the How-To Guides linked there.

#### Guidance

_TBD_


## Is this for me?

This project isn't necessarily a good fit for *your* kind of library. To judge wether or not this might be for you, see the following guidelines:

### It's for you if:

* you have a small to medium sized library
* you don't need to use render functions
* you don't have any dependencies that are incompatible with one of the Vue versions
* you don't have a hard requirement on any of the [incompatible features](../reference/compatibility/index.md)
* you want to publish one package that can be consumed in both Vue 2 and Vue 3 projects.

Summary: if you want to write a vue library that is small in scope, doesn't rely on incompatible 
dependencies and are fine with a few rules to follow, this might be for you.

### It will be easier if:

* you are familiar with the differences between Vue 2 and Vue 3
* you know how to use and configure [Eslint](https://eslint.org)
* you feel comfortable configuring your build system (Vite, rollup, webpack)


### You might not need this if:

* want to write a Vue library that doesn't use/export components (only composition functions or other helpers, for example). Then [`vue-demi`](https://github.com/vueuse/vue-demi) might be all you need, or not even that.

