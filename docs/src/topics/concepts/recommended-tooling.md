---
outline: deep
---

# Recommended Tooling

As Javascript developers, we are in the lucky position to choose from a large number of amazing tools to build our projects with. But this also means that there are many ways to achieve the same thing, and each does it a little differently.

This is why we recommend the a specific set of tools when building a coss-compatible Vue Library with Vue-Bridge - it allows us to give specific advice on how to make them work together.

But that doesn't mean other tooling can't work. You just might need to figure out the specifics for a few things on your own.

Here's the list with our recommendations:

## Must-haves

|Tool|Type|Explanation|
|----|----|-----------|
|[PNPM](https://pnpm.io)|Package manager|Better hoisting behaviors that npm & yarn, helps avoiding version conflicts between dependencies. Great workspaces features|
|[Vite](https://vitejs.dev)|Build tooling| Used to build your build/bundle your library
|[Vitest](https://vitest.dev)|Test Runner| A Test runner (based on Vite) for running your unit tests.
|[Eslint](https://eslint.org)|Linter| Javascript/Typescript linter
|[eslint-plugin-vue](https://eslint.vuejs.org)|Eslint Plugin| Plugin adding `.vue` files support and Vue-related rules to Eslint. `@vue-bridge/eslint-config` depends on it.

## Optional

|Tool|Type|Explanation|
|----|----|-----------|
|[vue-tsc](https://www.npmjs.com/package/vue-tsc)|CLI| Used to to typecheck and create type declarations|
|[Cypress](https://cypress.io)|Test Runner| Useful for End-To-End Tests|

## Package Managers

In the above "Must Have" table, we recommend PNPM, and here's why: When using a workspace-setup, it's working the best in our experience. One thing it does better is dependency hoisting:

When using Yarn (not using PnP) or NPM, shared dependencies of packages will all be hoisted to the root node:modules folder. 


Example: This behavior leads to problems when you have different versions of `'vue'` (`2.*` & `3.*`) installed, because it's hard to control which of these end up in the root node_modules and which doesn't. And `vue-template-compiler` looks for the version of the `'vue'` package, which in practice leads to a lot of problems.

pnpm doesn't have these issues as all workspace dependencies are symlinked into the workspace's local `node_modules`.

That being said, you might be able to get it working with Yarn or npm, and if you do, we would like to hear from you., maybe we can add a new chapter to the docs.
