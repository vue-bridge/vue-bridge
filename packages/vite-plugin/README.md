# `@vue-bridge/vite-plugin`

> A Vite plugin that make building for Vue 2 and Vue 3 easier.

## Features - Overview

For more details, visit the [References Docs](https://vue-bridge.dev)

### Version-specific imports
```js
import { versionSpecificUtility } from 'vue-bridge:./my-utility.js'

// compiled for Vue2: resolves to
import { versionSpecificUtility } from './my-utility.vue2.js'
// compiled for Vue3: resolves to
import { versionSpecificUtility } from './my-utility.vue3.js'
```

### Version-specific Style blocks

Some Vue-specific styling syntax differs between versions. 

With version-specific style blocks, you can cover both bases. Only the styles for the version you compile for will remain in the bundled output.

```html
<style v3 scoped>
  /* Deep Selectors for content in child components*/
  .wrapper :v-deep(.class-in-child-component) {
    border-color: green;
  }
  /* Slotted Selectors for content in slots */
  .wrapper :slotted(.class-in-slot-content) {
    margin-top: 20px;
  }
</style>
<style v2 scoped>
  /* Im Vue 2, there's only a deep selector, and its syntax is a bit different */
  .wrapper::v-deep .class-in-child-component {
    border-color: red;
  }
  .wrapper::v-deep .class-in-slot-content {
    margin-top: 20px;
  }
</style>
```

### Enforce absolute paths for project dependencies

This feature is for a specific build setup: When you have the `/src` folder of your lib symlinked into another package, which (usually) holds the Vue 2 related packages, you have to use absolute paths for these imports. Otherwise, Vite would resolve them relative to the *real* file location in the original `/src` folder, not relative to the location of the symlink.

This option reads all dependencies from the local package.json and resolves them to their absolute path in the local `node:modules` folder.

This way, all of the dependencies are resolved as we need them to when we want to use this "external" `/src` as the source of our local package.


## Usage

```js
import vue from '@vitejs/plugin-vue'
//or for Vue 2
// import { createVuePlugin as vue } from 'vite-plugin-vue2'

export default defineConfig({
  plugins: [
    vue(),
    vueBridge({
      vueVersion: '3' // or '2'
      localizeDeps: true
    })
  ]
})
```

## Options

```ts
interface VueBridgePluginOptions {
  vueVersion: '2' | '3'
  localizeDeps?: true | string[]
  rootDir?: string

  //TODO:
  disableVersionedStyleBlocks?: true 
  disableVirtualImports?: true 
}
```

### `vueVersion`

### `localizeDeps`

### `rootDir`

### `disableVersionedStyleBlocks`

### `disableVirtualImports`