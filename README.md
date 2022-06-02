# Vue-Bridge

> Monorepo for main `@vue-bridge/*` packages and docs

> **Warning**
> this project is still under heavy development and not recommended to be used in production
> We are also looking for contributors and co-maintainers to get a stable version out in the very near future.

## What is Vue-Bridge?

Vue-Bridge is a project aiming to provide a consolidated guide and toolbox for authors of Vue.js components and libraries who want to build these in a way that works with both Vue 2 and Vue 3.

You can find out more about the project by visiting the website at https://www.vue-bridge.dev (_**not existing yet ...**_)

## About this repository

This monorepo contains the following packages:

- docs -> `/docs`

- `@vue-bridge/eslint-config` -> `/packages/eslint-config`
- `@vue-bridge/runtime` -> `/packages/runtime`
- `@vue-bridge/testing` -> `/packages/testing`
- `@vue-bridge/vite-plugin` -> `/packages/vite-plugin`
- ...maybe more later

We also have a "`/playground`folder where these packages are tested:
- `./app-vue3` - Vue 3demo app consuming `example-library`
- `./app-vue2` - Vue 2 demo app consuming `example-library-vue2`
- `./example-library`: Building a libary with/for Vue 3
- `./example-library-vue2`: Building the same src files as a library with/for Vue 2

We run unit- (TODO: and e2e) tests in these repositories to test the packages in real usecases.

It also contains the docs for the whole project -> `/docs`

### Contributing

You can find technical information about the repo setup and how to work with it [here](DEVELOPER_NOTES.md). Also note the [Contribution guidelines](./CONTRIBUTING.md) and the [Code of Conduct](./CODE_OF_CONDUCT.md).