# `@vue-bridge/testing`

![current npm version](https://img.shields.io/npm/v/@vue-bridge/testing) ![NPM](https://img.shields.io/npm/l/@vue-bridge/testing) ![npm downloads per month](https://img.shields.io/npm/dm/@vue-bridge/testing)

> A thin wrapper around `@vue/test-utils`.

https://vue-bridge-docs.netlify.app/reference/testing

It re-exports all APIs of that package, but replaces `mount` and `shallowMount` with wrapper functions that ensure cross-compatibility between the two different APIs of `@vue/test-utils` for Vue 2 and Vue 3, respectively.