---
outline: deep
---

# Quickstart


The quickest and easiest way to get started with Vue Bridge is to clone one of our templates, run npm install, and follow the rest of the README instructions.


## Templates

We currently offer a few different templates to give developers a choice in how they want to start their project.These are the templates we provide so far:

| Template     | State   | Description                                 |
|--------------|---------|---------------------------------------------|
|workspaces    | ready   | Full monorepo/workspaces setup              |
|single-repo   | in dev  | Simpler setup where the Vue 2 build process and test are tucked away in the sub-directory |
|basic         | planned | 

In the future, we are also considering a project initializer similar to [`create-vue`](https://githubcom/vuejs/create-vue), provided we have the demand from the community and the resources to write and maintain it.


::: tip Contributors wanted!

Creating templates is a lot of work, and it's especially challenging to come of with different templates for all of the use cases out there as one person like doesn't have experience with all of those.

That's why we are looking for contributors willing to work on other templates besides the one(s) we do provide right now. Please contact us on Twitter (https://twitter.com/VueBridge)

:::

### Workspaces&Typescript Template

<div class="flex mt-3 text-xl">
  <i-vscode-icons-file-type-pnpm />
  <i-vscode-icons-file-type-eslint />
  <i-vscode-icons-file-type-typescript />
  <i-vscode-icons-file-type-vitest />
</div>

Repository: https://github.com/vue-bridge/template-monorepo

<details>
<summary>Click here to see the list of features</summary>

* Workspaces with PNPM
* Build, Test and Publish a component library for both Vue 2 and Vue 3 from one codebase
* Typescript (Easily removable for JS-Users)
* Linting with Eslint 8
* Unit-Tests with Vitest
* Bundling and local dev with Vite
* Interoperability supported by the @vue-bridge/* packages:
* @vue-bridge/eslint-config : eslint rules that support you in writing interoperable code
* @vue-bridge/runtime : tiny runtime enhancements for interoperability between Vue 2 and Vue 3
* @vue-bridge/vite-plugin : Vite plugin for build-time optimizations
* @vue-bridge/testing : Harmonized API for @vue/test-utils versions 1 and 2

</details>

#### Installation

Install the template by running the following command in a folder of your choice:

```bash
# create in the current directory:
npx degit vue-bridge/template-monorepo
# create in a new subfolder called "my-library":
npx degit vue-bridge/template-monorepo my-library
```
...or just click the big green button labeled "use this template" in the github repo.

### Workspaces with Javascript

For now, please use the "Workspaces&Typescript" template above and follow the README instructions on how to remove Typescript from it.

### Single-Package template

::: warning Work in progress

This template is still in development and not public yet

:::

### Basic Template

* simple repository structure
* no Vue-specific build step
* library is published as SFC files, no bundling.

::: warning Work in progress

This template is still in development and not public yet

:::