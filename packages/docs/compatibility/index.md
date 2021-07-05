# Compatibility Guide

## Incompatible

- [Multiple Root elements / Fragments](./multiple-root-elements.md)
- Don't use `v-model:arg` <- -> `v-bind.sync`
- Don't use [`v-on.native` removed in Vue 3](./v-on-native.md)
  - see also: `emits:` option
- Don't use template `ref` on `v-for` element
- Don't use reactive Maps & Sets

## Manual Workarounds / Discipline

- Reactivity: Write code that respects Vue 2 Reactivity Caveats (`$set`/`$delete`)
- Always supply both [Transition class name versions](./transition-class-names.md)
- Avoid `<Transition>` as root element
- Always set `tag` prop on Transition Group
- Always configure the `emits:` option -> eslint
- Always respect `v-bind` order precedence of Vue 3
- Attribute coercion: Always use `null` to remove attrs
- Always respect `$attrs` and `class/style` special treatment in Vue 2
- Avoid iterating over `$attrs` & `$listeners`
- Always respect Vue 3's `v-if` - `v-for`precedence -> eslint

## Polyfilled by `@vue3-compat-lib`

- `$listeners` removed in Vue 3
- `v-model` prop and event names
- [Custom Directives - Lifecycle hooks changed names](./custom-directives.md)
- Component Lifecycle Hook - changed names
- `defineAsyncComponent()` in Vue 3
- `this.$set` / `this.$delete`

