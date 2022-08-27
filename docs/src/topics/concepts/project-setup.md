---
outline: deep
---

# Project setups

Setting up a project repository that houses a library targeting both Vue 2 and Vue 3 can be challenging. 

On this page, we cover general recommendations and how we arrived at them, weighing different pros and cons. This knowledge then forms the foundation for the next pages diving deeper into topics like writing, testing, building and publishing your library.

::: tip Quickstart with our Templates

Vue-Bridge offers a few starter templates to get you up and running without having to set up everything yourself, so head over to the ["Getting Started" Section](../getting-started/index.md) if you want to get a project going quickly.

:::

## Recommended: Workspaces / Monorepo

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

<!-- Simpler setup with a subfolder containing a separate package.json for Vue 2 stuff? -->
