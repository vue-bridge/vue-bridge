# `@vue-bridge/runtime`

![current npm version](https://img.shields.io/npm/v/@vue-bridge/runtime) ![NPM](https://img.shields.io/npm/l/@vue-bridge/runtime) ![npm bundle size (min+zip)](https://img.shields.io/bundlephobia/minzip/@vue-bridge/runtime) ![npm downloads per month](https://img.shields.io/npm/dm/@vue-bridge/runtime)

> Runtime Core library of the VueBridge Project

https://vue-bridge-docs.netlify.app/reference/runtime


## What this is

## Installation 

```bash
yarn add @vue-bridge/runtime
# npm
npm install ‘@vue-bridge/runtime'
```

## Basic Usage

```html
<template>
  <input v-model="value">
<template>
<script>
  import { defineComponent } from '@vue-bridge/runtime'
  export defineComponent({
    props: {
      modelValue: String
    },
    emits: ['update:modelValue'],
    computed: {
      value: {
        get() { return this.modelValue }
        set(value) { this.$emit('update:modelValue', value)}
      }
    }
  })
</script>
```

Please refer to the [docs](#) for further guidance and information.

## CLI

This package exposes two CLI commands to influence the entry files being exposed by this package - those for Vue 2 or Vue 3.

```bash
# Manually switch main entries to Vue 2 compatible versions
npx vue-bridge-switch 2
yarn vue-bridge-switch 2
# Manually switch main entries to Vue 4 compatible versions
npx vue-bridge-switch 3
yarn vue-bridge-switch 3
```

## Development