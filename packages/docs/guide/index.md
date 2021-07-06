# Introduction

## Why `vue3-compat-lib`?

With Vue 3, a considerable amount of breaking changes were introduced. And while the overall API and style of writing Vue components stayed the same, the sum of these changes plus the all-new virtual DOM and template compiler, which is incompatible with the old one, mean supporting both Vue 2 and 3 is not trivial.

Especially the new compiler is a challenge for library authors, because when writing SFCs (`.vue` files), even if they theoretically wrote code that didn't use any of the breaking APIs, the would still have to compile their library twice: once for Vue 2, once for Vue 3.

Furthermore, avoiding all of the breaking API changes would severly limit a developer's ability to use Vue to its full potential, so it's not a realistic option for them.

### Introducing Vue 3 Compat Lib

The goal of this project is to support Vue library others on multiple levels, from guidance on how to write good and safe cross-compatible components to tooling for enabling true cross-compatibility.

Therefore, this project consists of multiple parts:

1. `vue3-compat-lib` A Vue plugin that "polyfills" or patches a few of the breaking changes for Vue 2 at runtime.
2. A [Guide](#) on how to write and publish cross-compatible components (and directives) 
   * with the helpers provided by this plugin.
   * by avoiding APIs that are fundamentally incompatible between Vue 2 and Vue 3 (spoiler: those are not as bad as you might fear)
3. `vite-plugin-vue3-compat-lib` A plugin for Vite to make it easier to compile your cross-compatible components for Vue 2 and Vue 3
   * We also provide config examples for other build systems, and are open to contributions for plugins like this one

### How does this compare to `@vue/'compat`

## Is this for me?



## On Writing  cross-compatible Vue Libraries

The changes introduced in Vue 3 can be roughly put in 3 categories:

1. **Fundamentally incompatible** - When writing cross-compatible components, you simpy have to avoid these. `eslint-plugin-vue` can often help here.
2. **Incompatible, but can be polyfilled safely at runtime** - this is what the `vue3-compat-lib` package does.
3. **behavioral differences** - these you can account for yourself in your code, by following a few basic rules.

Our guide will expain all of these to you and offer intructions on how to deal with them.