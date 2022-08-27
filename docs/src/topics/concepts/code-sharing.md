---
outline: deep
---

# Code Sharing

## Code sharing

The goal of Vue-Bridge is to allow you to write one set of source files that can work both in Vue 2 and Vue 3 projects after being built.

But since we have established that we want to have separate workspace folders to house our Vue 2 and Vue 3 dependencies and build tasks, how do we solve this? The answer is: a symlink and a little bit of aliasing.

```
lib-vue2/
├─ src/             # This is just a symlink to /lib-vue3/src/
├─ vite.config.js   # Build & test config for Vue 2 version

lib-vue3/
├─ src/             # This contains the actual source files
├─ vite.config.js   # Build & test config for Vue 2 version
```

This means we can run i.e. our build and test tasks in both folders while re-using the same source files for both.

But there is a problem: Most build tools (like Vite) will resolve dependencies relative to the *real* location of the file, not the symlink path. That would mean that imports in our source files will always be resolved to `/lib-vue3/node_modules`, regardless of the current working directory - which is not what we want.

To solve this, we need all our dependencies to resolve to absolute paths. You could do this manually, but luclily, don't have to - here's how to do it with Vite and `@vue-bridge/vite-plugin`:

```js
// lib/vue2/vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueBridge from '@vue-bridge/vite-plugin'
export default defineConfig({
  plugins: [
    vue()
    vueBridge({
      localizeDependencies: true
    })
  ]
})
