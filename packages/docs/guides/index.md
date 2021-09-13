# Introduction


## Cross-compatibility between Vue 3 and Vue 2

With Vue 3, a considerable amount of breaking changes were introduced. And while the overall API and style of writing Vue components stayed the same, the sum of these changes plus the all-new virtual DOM and template compiler, which is incompatible with the old one, mean supporting both Vue 2 and 3 is not trivial.

Especially the new compiler is a challenge for library authors, because when writing SFCs (`.vue` files), even if they theoretically wrote code that didn't use any of the breaking APIs, the would still have to compile their library twice: once for Vue 2, once for Vue 3.

Furthermore, avoiding all of the breaking API changes would severely limit a developer's ability to use Vue to its full potential, so it's not a realistic option for them.

### Introducing the `@vue-bridge` Suite

The goal of this project is to support Vue library authors on multiple levels, from guidance on how to write good and safe cross-compatible components to tooling for enabling true cross-compatibility.

Therefore, this project consists of multiple parts:

1. The [Guide](#) - Guiding you on your journey, teaching you how to write and publish cross-compatible components (and directives) 
   * with the help of the packages provided by this project.
   * by avoiding APIs that are fundamentally incompatible between Vue 2 and Vue 3 (spoiler: those are not as bad as you might fear)
2. `@vue-bridge/eslint-config` - A set of eslint rules that help you from avoid incompatible features
2. `@vue-bridge/runtime` A Vue plugin that "polyfills" or patches a few of the breaking changes for Vue 2 at runtime.
3. `@vue-bridge/vite-plugin` - A Vite plugin that makes bundling your cross-compatible components for Vue 2 and Vue 3 easy
    * We also provide config examples for other build systems, and are open to contributions for plugins like this one
4. `@vue-bridge/testing` - A wrapper around `@vue/testing-library`'s main functions: `mount()` and `shallowMount()`, allowing your tests to be run in both environments

### How does this compare to `@vue/compat`

The "Migration build" of Vue 3, aka `@vue/compat`, is meant to support the _transition_ from Vue 2 to Vue 3. It should be used *temporarily* while migrating a big app from Vue 2 to Vue 3. After you are done migrating to Vue 3, you remove `@vue/compat` from your setup and run on Vue 3 only. It also will be phased out from publishing around the end of 2021.

In comparison `@vue-bridge/runtime` is intended to be a long-term solution for *libraries* that want to build and publish packages that can be consumed by both Vue 2 and Vue 3 projects. As such, it has some limitations that authors need to be aware of and respect while writing their libraries, which is what the guide of this project provides.

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

## Workflow of publishing cross-compatible Vue Libraries

The changes introduced in Vue 3 can be roughly put in 3 categories:

1. **Fundamentally incompatible** - When writing cross-compatible components, you simply have to avoid these.
2. **Incompatible, but can be polyfilled safely at runtime** - this is what the `@vue-bridge/runtime` package does.
3. **behavioral differences in specific scenarios** - these you can account for yourself in your code, by following a few basic rules.

This compatible code will have to be both _tested_ and _built_ twice - once for each version. 

Our guide will explain all of these to you and offer instructions on how to deal with them.