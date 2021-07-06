# Compatibility Guide

Legend

| Badge          | Description                          |
|----------------|--------------------------------------|
| <eslint />     | Compat can be ensured by an eslint rule                              |
| <plugin />     | Compat is (at least partially) enabled by the `vue3-compat-lib` plugin |
| <discipline /> | Compat needs to be ensured by the developer without tooling support. Following these rules is generally straightforward and low-risk  |
| <pitfall />    | Like <discipline />, but with a noteworthy risk of introducing bugs that requires special attention |

This can seem like a lot, so make sure to read the Guide to learn how to navigate all of this.

## Incompatible

- Don' use [Multiple Root elements / Fragments](./multiple-root-elements.md) <eslint />
- Don't use `v-model:arg` <- -> `v-bind.sync` <eslint />
- Don't use [`v-on.native` (removed in Vue 3)](./v-on-native.md) <eslint />
- [Don't use template `ref` on `v-for` element](./ref-v-for.md) <discipline />

## Compatibility achievable "manually"

### Reactivity
- Always Respect Vue 2 Reactivity Caveats <pitfall />
- Don't use Maps & Sets in Reactive Data <discipline />
### Transitions
- Always supply both [Transition class name versions](./transition-class-names.md) <discipline />
- Avoid `<Transition>` as root element <discipline />
- Always set `tag` prop on Transition Group <discipline />
### $attrs / $listeners / inheritAttrs
- Always respect `$attrs` and `class/style` special treatment in Vue 2 <eslint /><plugin />
- Respect version-specific content of `$attrs` & `$listeners` <eslint /><plugin />

### Misc

- Always configure the `emits:` option <eslint />
- Always respect `v-bind` order precedence of Vue 3 <discipline />
- Always use `null` to remove non-boolean attrs instead of `false` <pitfall />
- Always respect Vue 3's `v-if` - `v-for`precedence <eslint />

## Polyfilled by `@vue3-compat-lib`

- `$listeners` (was removed in Vue 3) <eslint /><plugin />
- `v-model` prop and event names (patched for Vue 2 by plugin) <plugin />
- [Custom Directives - Lifecycle hook names patched for Vue 2 by plugin)](./custom-directives.md) <plugin />
- Component Lifecycle Hook - changed names <plugin />
- `defineAsyncComponent()` (only exists in Vue 3) <eslint /><plugin />
- `this.$set` / `this.$delete` (removed in Vue 3) <plugin /> 

