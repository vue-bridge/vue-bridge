---
outline: deep
---
# `@vue-bridge/testing`

<div style="display: flex; justify-items: start; gap: 5px">
  <img alt="current npm version" src="https://img.shields.io/npm/v/@vue-bridge/testing">
  <img alt="license - MIT" src="https://img.shields.io/npm/l/@vue-bridge/testing">
  <img alt="npm downloads per month" src="https://img.shields.io/npm/dm/@vue-bridge/testing">
</div>


## Installation

You can install this package from NPM. Usually, you would want to add it as a `devDependency`, for which the commonly used package managers offer the `-D`flag:

```bash
npm install -D @vue-bridge/testing

yarn add -D @vue-bridge/testing

pnpm add -D @vue-bridge/testing
```

### Peer Dependencies

```json
"peerDependencies": {
    "@vue/test-utils": "^1.2.1 || ^2.0.0-0",
    "vue": "^2.7.0-0 || ^3.2.*"
},
```

Depending on wether you want to run your test files against Vue 2 or Vue 3, you need to install:

*For Vue 2:*

* `vue@^2.7` in `dependencies`
* `@vue/test-utils@^1.2.1` in `devDependencies`

*For Vue 3:*

* `vue@^3.2` in `dependencies`
* `@vue/test-utils@^2.0.0` in `devDependencies`

## Usage

`@vue-bridge/testing` is meant to be used in place of `@vue/test-utils` in your tests. It exports most of the shared APIs that both test-utils versions offer, but uses the newer API variants from test utils `^1.0.0`. When running in a Vue 2 project, it will convert arguments etc into the older API variants of test-utils `^1.0`.

This allows us to write tests in the "new" style, but run them against both the old and new test utils, and by extension, against both major versions of Vue.

```js
import { mount } from '@vue-bridge/testing'

describe('My Test Suit', () => {
  test('My Component mounts with props', () => {
    const wrapper = mount(MyComponent, {
      props: {
        message: 'Hello World',
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.innerHTML).toBe('HelloWorld')
  })
})
```

The above test, when ran in a Vue 2 project, would be run like it was written like this:

```js{6}
import { mount } from '@vue-bridge/testing'

describe('My Test Suit', () => {
  test('My Component mounts with props', () => {
    const wrapper = mount(MyComponent, {
      propsData: {
        message: 'Hello World',
      }
    })
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.element.innerHTML).toBe('HelloWorld')
  })
})
```

## API

* `mount()`
* `shallowMount()`
* `flushPromises()`
* `enableAutoUnmount()`
* `disableAutoUnmount()`
* `isVue2` / `isVue3` 