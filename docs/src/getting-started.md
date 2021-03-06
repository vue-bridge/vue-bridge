---
outline: deep
---
# Getting Started

::: warning Work in Progress

The VueBridge Project still is very much a work in progress and not usable in production.

Features might not work as expected, pages in these docs might be outdated, missing or incomplete.

process accordingly. If you are interested in contributing, [contact us](https://twitter.com/VueBridge)

:::

## What is Vue-Bridge?

Vue-Bridge is a project aiming to make it easier for Vue-Library Authors to write, test and build libraries that support both Vue 2 and Vue 3. The end goal is to help move the Vue ecosystem forward - move tried and true libraries that support

::: info Why Vue-Bridge?

If you want to learn more about the why and how of Vue-Bridge and decide wether or not this might actually helpful to you or your project, we recommend visiting the Introduction in our Topics section before getting started with a template:

["Bridging the gap" - Why Vue-Bidge?](./topics/introduction-why-vue-bridge.md)

:::

## Quickstart with a template


The quickest and easiest way is to clone one of our templates on github. We currently have two templates, but are working on more. In the future, we are also considering a project initializer similar to [`create-vue`](https://githubcom/vuejs/create-vue), provided we have the demand from the community and the resources to write and maintain it.

::: tip Contributors wanted!

Creating templates is a lot of work, and it's especially challenging to come of with different templates for all of the use cases out there as one person like doesn't have experience with all of those.

That's why we are looking for contributors willing to work on other templates besides the one(s) we do provide right now. Please contact us on Twitter (https://twitter.com/VueBridge)

:::

### Workspaces&Typescript Template

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

### Workspaces&Javascript

For now, please use the "Workspaces&Typescript" template above and follow the README intructions on how to remove Typescript from it.
### Single-Package template

> TBD
## Learning path to your own setup

> TBD

