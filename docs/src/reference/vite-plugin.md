---
outline:deep
---
# `@vue-bridge/vite-plugin`

<div style="display: flex; justify-items: start; gap: 5px">
  <img alt="current npm version" src="https://img.shields.io/npm/v/@vue-bridge/vite-plugin">
  <img alt="license - MIT" src="https://img.shields.io/npm/l/@vue-bridge/vite-plugin">
  <img alt="npm downloads per month" src="https://img.shields.io/npm/dm/@vue-bridge/vite-plugin">
</div>

::: info unplugin planned

We are planning to transform the vite plugin into an [unplugin](https://github.com/unjs/unplugin#unplugin) and thus be able to support Vite, webpack, rollup and esbuild

:::

## Installation


```bash
npm install -D @vue-bridge/vite-plugin
```
### Usage

```js
import {  defineConfig } from 'vite'
import vue from '@vue-bridge/plugin-vue' // '@vue-bridge/plugin-vue2' in Vue 2 projects
import vueBridge from '@vue-bridge/vite-plugin'

export default defineConfig({
  plugins: [
    vue(),
    vueBridge({
      vueVersion: '3' // or '2'
      // ... other optional config
    })
  ]
})
```

## Options

```ts
export interface VueBridgeOptions {
  vueVersion: '2' | '3'
  apply?: 'build' | 'serve'
  
  /**
   * Add aliases for all your dependencies, pointing to them with absolute paths
   * This ensures that the right dependency is being resolved when using source sharing through symlinks#
   * Enabled by default if vueVersion === '2'
   */
   */
  localizeDeps?: string[] | true

  /**
   * Wether or not to use SWC to compile JS/TS (allows transpilation to ES5 and polyfills like babel)
   * Set to true when vueVersion === '2'
   */
  useSwc?: boolean
  /**
   * Options for swc - see: https://swc.rs/docs/configuration/swcrc
   * Example config can be found here: 
   * TODO: Add link to example config
   */
  swcOptions?: SWCOptions

  /**
   * 
   */
  covertVersionedStyleBlocks?: boolean = true
}
```

## features
