# Writing cross-compatible components

Writing cross-compatible Vue components is possible, but it comes with a few limitations and challenges. The goal of Vue-Bridge is to support authors in this process as far as possible.

## Limitations and Challenges in Cross-Compatibility

Vue 3 has some new features that cannot be replicated in Vue 2, so when writing cross-compatible components, we *can't use* these. Examples:

* Multiple Root nodes in templates
* `<teleport/>`
* reactive Maps and Sets

Similarly, Vue 2 has some features there were dropped in Vue 3, so we also can't use them. The list is much shorter here and really only consists of template filter syntax (`{{ 1000 | toCurrency }}`)

Then there a number of small changes in the public APIs that we have to account for. These are not insurmountable problems, but need to be taken care of in order to work in both versions. Examples:

* Lifecycle hooks `destroyed` is now named `unmounted` in Vue 3.
* `<TransitionGroup>` components no longer have a wrapper root element by default in Vue 3.
* The `v-on.native` modifier is no longer supported in Vue 3.

::: info Compatibility Listing

You can read a full listing of all important compatibility aspects in our [Compatibility Listing](#), which provides you with a detailed overview as well as per-change instructions on how to deal with them.

We strongly recommend you take the time to read through them to get a feeling for the scope and nature of these differences.

:::

## Tooling support for cross-compatibility

If you have read through the [Compatibility Listing](#), you will have noticed that a lot the the points listed there are marked to be supported by either <eslint /> and/or <plugin />. Here's what that means:

* `@vue-bridge/eslint-config` provides a bunch of rules that will give you linter warnings/errors when using features or APIs that are not cross-compatible. An example would be to warn you that you can't use multiple root elements in a template, which is only supported in Vue 3.
* `@vue-bridge/runtime` is a tiny runtime library that you will include in your project, which will ensure cross-compatibility for a bunch of APIs that work/look a bit different between Vue 2 and 3 - and example would be prop and event names to support `v-model` on a component.

With these two tools added to your project, you will already be able to circumvent a lot of the possible mistakes you could make when trying to write cross-compatible components.

## Workflow

While Vue 2 will stay around for quite some time, Vue 3 is clearly the future, so VueBridge assumes that your code will be written in Vue 3 style wherever possible, and `@vue-bridge/runtime` will change/polyfill your component definition where necessary (and possible) to ensure Vue 2 compatibility.

The way in which it does that is very convenient for developers: by wrapping the `defineComponent()` function that you might already know from Vue 3. 

In Vue 3, it originally doesn't really do anything besides signaling Typescript (or your editor/IDE) that the object passed to it is actually a Vue component definition, which enables type checking/autocomplete. 

It  looks like this:

```js
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyComponent',
  data: () => ({
    msg: 'Hello World!'
  }),
  beforeUnmount() {
    console.log('unmounted')
  }
})
```

Now, the above code would have a bug in Vue 2 because there is no `beforeUnmount` hook - there's `beforeDestroy`. We can fix that by importing `defineComponent`from `@vue-bridge/runtime` instead:

```diff
- import { defineComponent } from 'vue'
+ import { defineComponent } from '@vue-bridge/runtime'

export default defineComponent({
  name: 'MyComponent',
  data: () => ({
    msg: 'Hello World!'
  }),
  beforeUnmount() {
    console.log('unmounted')
  }
})
```

And just like that, this code can now run in Vue 2 and Vue 3 properly, because our version of `defineComponent()` does some additional work on the component definition and adds compatibility features where necessary.

And if you are using `@vue-bridge/eslint-config` (because of course you do), eslint will even warn you if you import it from `vue` instead `@vue-bridge/runtime`.

You can learn more about the ways in which `defineComponent()` supports cross-compatibility by reading the [package docs for `@vue-bridge/runtime`](#).

## Dealing with Pitfalls

There are some compatibility differences on the [Compatibility Listing](#) that can not be supported by tooling as of now (marked with <discipline /> or <pitfall />). You will have to ensure cross-compatibility yourself by properly testing your code for both versions.

Some of them are kind of edge cases or very simple and obvious fixes. But there are some rather important ones which we will cover now.

::: info

We have a chapter about [Testing Cross-Compatibility](#) which explains in detail how you can run your unit tests with both Vue 2 and Vue 3. This is important to make sure that you properly dealt with these compatibility differences for both versions.

:::

### Reactivity Caveats

Vue 2's Reactivity System has a couple of caveats where reactive change detection doesn't work (see [Vue 2 docs](https://vuejs.org/v2/guide/reactivity.html#Change-Detection-Caveats)). 

To work around them, you are probably used to using `this.$set` and `this.$delete`. Since Vue 3 doesn't provide these methods, `defineComponent` will add them to your component with a mixin. But you still have to make sure to properly use them.

In short:

* Always use `$set()` to add *new* properties to a reactive **object**.
* Always use `$delete()` to *remove* properties from a reactive **object**.
* Always use `$set()` to add or replace an item in a reactive **array**.
* Always use `$delete()` to *remove* an item from a reactive **array**.
* Don't use Maps and Sets (in reactive code, i.e. `data()`), as Vue 2 can't make these reactive

If you are used to work in Vue 3, where these caveats don't exist, using these helpers is very easy to miss from time to time. So it's **very** important to run your unit tests against both Vue 2 and Vue 3 to catch such mistakes before you release a version of your package.


### `$attrs` (and `$listeners`)

The behavior of `this.$attrs` differs between Vue 2 and 3 in multiple ways:

1. In Vue 3, it contains *all* attributes, including `class` & `style`, while those are excluded in Vue 2 because they will *always* be applied to the component's root element
2. In Vue 3, `$attrs` also contains any events that were declared on a component, but not defined in that component's [`emits:` option](#) <!-- TODO: add link -->

Also, Vue 2's [`$listeners` simply doesn't exist anymore](#), and the same goes for the [`v-on.native` modifier](#). <!-- TODO: add links--> 

At the same time, Vue 3 will now apply any events passed to a component to the component's root element unless they are explicitly declared as events in that component's `emits:` option.

All of this combined poses a challenge for cross-compatibility when dealing with components that want to make use of these features - (most commonly when the `inheritAttrs: false` option is set to pass these values on to a child element or component).



### Custom Directives

Since Custom directives' lifecycle hooks were renamed in Vue 3, we also need to give them a bit of a treatment for cross-compatibility. We do this with `defineDirective()` provided by `@vue-bridge/runtime`.

```js
// my-directive.js
import { defineDirective } from '@vue-bridge/runtime'

export const myDirective = defineDirective({
  // Vue 2 equivalent: bind()
  beforeMount(el, binding) {
    el.addEventListener('binding.arg', binding.value)
  }
})
```

Similar to `defineComponent()`, this wrapper function will take care that the names of the hooks are changed to their proper Vue 2 equivalents when used in a Vue 2 context.

Then you can use them like any other directive:

```js
import { myDirective } from './myDirective.js'

// Vue 3
app.directive('my-directive', myDirective)

// Vue 2
Vue.directive('my-directive', myDirective)

// locally in a component:
export default {
  directives: {
    myDirective,
  }
}
```

::: info Learn more

Be sure to read the page in the [compatiblity Listing about custom directives](#) as there are some other things to keep an eye out for, such as a few lifecycle hooks that are only available in Vue 2 or Vue 3, and therefore should not be used.

::: 

### Composition API

- Use `@vue/compostion-api` through `vue-demi`
- Both are peer dependencies of `@vue-bridge/runtime` already