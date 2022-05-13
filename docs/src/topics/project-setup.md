---
outline: deep
---

# Project setup

Setting up a project repository that houses a library targeting both Vue 2 and Vue 3 can be challenging. 

On this page, we cover general recommendations and how we arrived at them, weighing different pros and cons. This knowledge then forms the foundation for the next pages diving deeper into topics like writing, testing, building and publishing your library.

::: tip Quickstart with our Templates

Vue-Bridge offers a few starter templates to get you up and running without having to set up everything yourself, so head over to the ["Getting Started" Section](../getting-started.md) if you want to get a project going quickly.

:::

## Workspaces / Monorepo

We recommend a repository using two *workspaces* (more if you have other stuff to add like a docs package) that conceptually house the Vue 2 and Vue 3 versions of the library, combined with a clever setup that makes it possible to share source files (including tests) between these two workspace packages.

Here's what this looks like, conceptually:

```
lib-vue2/
├─ dist/            # build output of Vue 2 version of library
├─ src/             
├─ package.json     # contains Vue 2 dev deps and runtime deps
├─ vite.config.js   # Build & test config for Vue 2 version

lib-vue3/
├─ dist/            # build output of Vue 3 version of library
├─ src/             
├─ package.json     # contains Vue 3 dev deps and runtime deps
├─ vite.config.js   # Build & test config for Vue 2 version

.eslintrc.js
package.json        # contains shared dev dependencies a d scripts 
vite.shared.js      # shared config for vite used by both versions
```

Here's a quick list of the reasons for why this is preferable, explained in more detail throughout the rest of this page.

### Advantages

* **Dependencies**: We have to use a lot of conflicting dependencies (i.e. Vue 2&3 VueTestUtils 1&2, different compilers etc). Managing these in their own workspace is clean and avoids fighting with package name aliases and the conflicts possibly coming with those.
* **Building & Publishing**: You can build each version separately and can still choose wether to publish them as one package or two separate.
  * **Unbundled Publishing**: While you can publish plain `.vue` files and thus work around duplicate build steps and package publications, you still want to test against both versions. this is easier/cleaner to do in a workspace-based setup.
* **Typescript**: you can get correct IDE type inference for both versions, as well as cleanly set up type declaration generation for both.

### Drawbacks

* **Handling workspaces**: You need to be (or get) comforatble with a monorepo structure.
* **running tasks twice**: In order to build, test and publish two packages you need to run the tasks for these operations twice, taking up time and resources.
* **Two package.json files**: Dependencies of your app need to be added to two package.json files

### Alternatives

## Recommended tooling

As Javascript developers, we are in the lucky position to choose from a large number of amazing tools to build our projects with. But this also means that there are many ways to achieve the same thing, and each does it a little differently.

This is why we recommend the a specific set of tools when building a coss-compatible Vue Library with Vue-Bridge - it allows us to give specific advice on how to make them work together.

But that doesn't mean other tooling can't work. You just might need to figure out the specifics for a few things on your own.

Here's the list wiht our recommendations:

### Must-haves

|Tool|Type|Explanation|
|----|----|-----------|
|[PNPM](https://pnpm.io)|Package manager|Better hoisting behaviors that npm & yarn, helps avoiding version conflicts between dependencies. Great workspaces features|
|[Vite](https://vitejs.dev)|Build tooling| Used to build your build/bundle your library
|[Vitest](https://vitest.dev)|Test Runner| A Test runner (based on Vite) for running your unit tests.
|[Eslint](https://eslint.org)|Linter| Javascript/Typescript linter
|[eslint-plugin-vue](https://eslint.vuejs.org)|Eslint Plugin| Plugin adding `.vue` files support and Vue-related rules to Eslint. `@vue-bridge/eslint-config` depends on it.

### Optional

|Tool|Type|Explanation|
|----|----|-----------|
|[vue-tsc](https://www.npmjs.com/package/vue-tsc)|CLI| Used to to typecheck and create type declarations|
|[Cypress](https://cypress.io)|Test Runner| Useful for End-To-End Tests|

### Package Managers

In the above "Must Have" table, we recommend PNPM, and here's why: When using a workspace-setup, it's working the best in our experience. One thing it does better is dependency hoisting:

When using Yarn (not using PnP) or NPM, shared dependencies of packages will all be hoisted to the root node:modules folder. 


Example: This behavior leads to problems when you have different versions of `'vue'` (`2.*` & `3.*`) installed, because it's hard to control which of these end up in the root node_modules and which doesn't. And `vue-template-compiler` looks for the version of the `'vue'` package, which in practice leads to a lot of problems.

pnpm doesn't have these issues as all workspace dependencies are symlinked into the workspace's local `node_modules`.

That being said, you might be able to get it working with Yarn or npm, and if you do, we would like to hear from you., maybe we can add a new chapter to the docs.

### Alternatives


<!-- TODO: mention community templates -->

## Vue-related Dependencies

You want to to have a proper setup, which allows you to write, run, test and build your library reliably for Vue 2 and Vue 3. To do this, you will need a bunch of dependencies related testing and building:

|Dependency|Vue 2| Vue 3|Notes|
|----------|-----|------|-----|
|`vue`|`^2.6`|`^3`|Hoisting to root easily causes problems. PNPM's strictness helps here.|
|`@vue/test-utils`|`^1.0`|`^2.0`| Installing both versions with packages aliases is flaky. Workspaces are more reliable.
|`@vitejs/plugin-vue`|:x:|:white_check_mark:|
|`vite-plugin-vue2`|:white_check_mark:|:x:|
|`vue-template-compiler`|`^2.6`|:x:|Breaks if `vue` package is not a matching version|

While it is probably technically possible to install all of these into a project with one `package.json` using package alias names and such,this approach is complicated and brittle, in our experience. In a workspace setup, you can separate these dependencies into their own `package.json` files and keep them separate.

## Code sharing

The goal of Vue-Bridge is to allow you to write one set of source files that can work both in Vue 2 and Vue 3 projects after being built.

But since we have established that we want to have separate workspace folders to house our Vue 2 and Vue 3 dependencies and build tasks, how do we solve this? The answer is: a symlink and a little bit of aliasing.

```
lib-vue2/
├─ src/             # This is just a symlink to /lib-vue3/src/
├─ vite.config.js   # Build & test config for Vue 2 version

lib-vue3/
├─ src/             # This contains the actual source files
├─ vite.config.js   # Build & test config for Vue 2 version
```

This means we can run i.e. our build and test tasks in both folders while re-using the same source files for both.

But there is a problem: Most build tools (like Vite) will resolve dependencies relative to the *real* location of the file, not the symlink path. That would mean that imports in our source files will always be resolved to `/lib-vue3/node_modules`, regardless of the current working directory - which is not what we want.

To solve this, we need all our dependencies to resolve to absolute paths. You could do this manually, but luclily, don't have to - here's how to do it with Vite and `@vue-bridge/vite-plugin`:

```js
// lib/vue2/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueBridge from '@vue-bridge/vite-plugin'
export default defineConfig({
  plugins: [
    vue()
    vueBridge({
      localizeDependencies: true
    })
  ]
})
```

::: info Preconfigured Templates

This is of course preconfigured if you use one of our templates.

:::

## Running tasks (scripts)
