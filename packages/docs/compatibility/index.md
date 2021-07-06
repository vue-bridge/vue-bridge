# Compatibility Guide

## Incompatible

- Don' use [Multiple Root elements / Fragments](./multiple-root-elements.md) <eslint />
- Don't use `v-model:arg` <- -> `v-bind.sync` <eslint />
- Don't use [`v-on.native` (removed in Vue 3)](./v-on-native.md) <eslint />
- Don't use template `ref` on `v-for` element <discipline />

## Compatibility achievable "manually"

### Reactivity
- Always Respect Vue 2 Reactivity Caveats <discipline /> <pitfall />
- Don't use Maps & Sets in Reactive Data <discipline />
### Transitions
- Always supply both [Transition class name versions](./transition-class-names.md) <discipline />
- Avoid `<Transition>` as root element <discipline />
- Always set `tag` prop on Transition Group <discipline />
### $attrs / $listeners / inheritAttrs
- Always respect `$attrs` and `class/style` special treatment in Vue 2 <discipline />
- Respect version-specific content of `$attrs` & `$listeners` <discipline /><plugin />

### Misc

- Always configure the `emits:` option <eslint />
- Always respect `v-bind` order precedence of Vue 3 <discipline />
- Always use `null` to remove non-boolean attrs instead of `false` <discipline /> <pitfall />
- Always respect Vue 3's `v-if` - `v-for`precedence <eslint />

## Polyfilled by `@vue3-compat-lib`

- `$listeners` (was removed in Vue 3) <eslint /><plugin />
- `v-model` prop and event names (patched for Vue 2 by plugin) <plugin />
- [Custom Directives - Lifecycle hook names patched for Vue 2 by plugin)](./custom-directives.md) <plugin />
- Component Lifecycle Hook - changed names <plugin />
- `defineAsyncComponent()` (only exists in Vue 3) <eslint /><plugin />
- `this.$set` / `this.$delete` (removed in Vue 3) <plugin /> 

