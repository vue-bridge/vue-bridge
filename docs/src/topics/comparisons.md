# Comparisons

There already are some solutions around the area of compatibility between Vue 2 and Vue 3, or migration from Vue 2 to Vue 3, so people may wonder how Vue-Bridge fits into this landscape and how it  compares to other, similar tooling around.

## `@vue/compat`

The "Migration build" of Vue 3, aka `@vue/compat`, is meant to support the _transition_ from Vue 2 to Vue 3. It should be used *temporarily* while migrating a big *app* from Vue 2 to Vue 3. After you are done migrating to Vue 3, you remove `@vue/compat` from your setup and run on Vue 3 only. It also will be phased out from publishing some time in the future (when demand is going towards zero).

In comparison, `@vue-bridge/runtime` is intended to be a long-term solution for *libraries* that want to build and publish packages that can be consumed by both Vue 2 and Vue 3 projects. As such, it has some limitations that authors need to be aware of and respect while writing their libraries, which is what the guide of this project provides.
## `@vue/composition-api`

::: tip No longer needed since Vue `2.7`

Vue 2.7 incorporated what this plugin provided into Vue's core itself, so for library's targeting Vue 2.7 and above, this plugin is no longer of any use.

:::

[@vue/composition-api](https://github.com/vuejs/composition-api) is targeted exclusively at Vue 2 - because composition API as such is already included in Vue 3. The library allows you to use composition API in Vue 2, just like you can natively in Vue 3, with a few minor caveats, and as such can be considered a compatibility layer, or at least a building block in one.

But it's only covering composition API, it doesn't cover any changes to Options API, the template syntax, custom directives and so forth. Also, even though the composition API code you write with it would be compatible with Vue 3, the imports differ:

```js
// Vue 2
import { ref } from '@vue/composition-api'
// Vue 3
import { ref } from 'vue'
```

This is where the next item on our list comes in:
## `vue-demi`

[vue-demi](https://github.com/vueuse/vue-demi) is a clever plugin that basically re-exports the composition API export (`ref`, `reactive`) - the clever thing it: depending on wether it's installed in a Vue 2 or Vue 3 project, it re-exports from `'@vue/composition-api'` or `'vue'`. Which means, you can write this code:

```js
import { ref } from 'vue-demi'
```

and in a Vue 2 or Vue 3 project, you will get the `ref()` function. 

::: tip No longer needed since Vue `2.7`

Because `@vue/composition-api` is not longer needed since Vue 2.7 got released,`vue-demi` also is not needed anymore in Libraries targeting Vue 2.7 and onwards. You will still find it in some popular libraries though, as those still support Vue `<2.7` as well.

Vue Bridge targets Vue `2.7` and above only.

:::

It was pretty genius feat when its author first came out with it. And this particular mechanism is the inspiration for a lot of what we do in `@vue-bridge/runtime`. We even use vue-demi under the hood, but only for it's `defineComponent` option. And you can [use `vue-demi` alongside  `@vue-bridge/runtime`](#/TODO)), because both provide different benefits that compliment each other if you want to use composition API in your cross-compatible components:

|Feature|`vue-demi`|`@vue-bridge/*`|
|-------|----------|---------------------|
|Cross-compatible composition API|✅|❌|
|Cross-Compatible Options API|❌|✅ (`/runtime`)|
|Cross-Compatible Custom Directives|❌|✅ (`/runtime`)|
|Cross-Compatible v-model|❌|✅ (`/runtime`)|
|Ability to have different styles per version|❌|✅ (`/vite-plugin`)|
|Lint for (some) incompatibilities|❌|✅ (`/eslint-config`)|
|...?|❌|✅|

The above list is a bit rough and likely not telling you too much. We recommend to read through our [How-To Guides](../guides/index.md) section as well as the [Comptatibility Listing](../reference/compatibility/index.md) to get a better understand of the different ways in which Vue-Bridge can help you to write cross-compatible Single-File Components. We also mention `vue-demi` solutions where applicable for those people hwho prefer to write their component script blocks with Composition API.
