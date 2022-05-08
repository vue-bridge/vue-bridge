# Compatibility Listing


This Page details all of the differences between Vue 2 and 3 that you will have to be aware of and account for when writing cross-compatible code.

Each of the points listed has it's own dedicated page explaining how to deal with it, and how to do so in the safest and easiest way possible.

## Legend

| Badge          | Description                          |
|----------------|--------------------------------------|
| <eslint />     | Compat can be ensured by an eslint rule                              |
| <plugin />     | Compat is (at least partially) provided by the `@vue-bridge/runtime` plugin |
| <discipline /> | Compat needs to be ensured by the developer without tooling support. Following these rules is generally straightforward and low-risk  |
| <pitfall />    | Like <discipline />, but with a noteworthy risk of introducing bugs because these are easy to miss |

This can seem like a lot, so make sure to read the Guide to learn how to navigate all of this.

## 🛑 Incompatible

These concern features / syntax that is straight up incompatible, though some have workarounds.

- Don' use [Multiple Root elements / Fragments](/guides/template/multiple-root-elements.md) <eslint />
- Don't use [`v-model:arg` & `v-bind.sync`](./v-model-arg-sync.md) <eslint />
- Don't use [`v-on.native` (removed in Vue 3)](./v-on-native.md) <eslint />
- Don't use template `ref` on `v-for` element <discipline />
-  Don't use [Filters (removed in Vue 3)](/guides/template/filters.md) <eslint />

## 🛠 Compatibility achievable

This section covers featues that are mostly the same in Vue 2/3, but have some special cases and situations where the developer has to make sure to account for limitations or differences. 

### Reactivity
- Always Respect Vue 2 Reactivity Caveats <pitfall /> <plugin />
- Don't use Maps & Sets in Reactive Data <discipline />
### Transitions
- Attention when using `<Transition>` as root element <discipline />
- Always supply both [Transition class name versions](./transition-class-names.md) <discipline />
- Always set [`tag` prop on Transition Group](./transition-group-tag.md) <discipline />

### $attrs / $listeners / inheritAttrs
- Respect version-specific content of `$attrs` & `$listeners` <eslint /><plugin />
- Always respect `$attrs` and `class/style` special treatment in Vue 2 <eslint /><plugin />

### Misc

- Always configure the `emits:` option <eslint />
- Always respect `v-bind` order precedence of Vue 3 <pitfall />
- Always use `null` to remove non-boolean attrs. not `false` <discipline />
- Always respect Vue 3's `v-if` - `v-for`precedence <eslint />
- Always use [the `is` prop with special `<component>`](./component-is-prop.md) <eslint />

## 🧬 Polyfilled by `@vue-bridge/runtime`

- `v-model` prop and event names (patched for Vue 2 by plugin) <plugin />
- `this.$set` / `this.$delete` (removed in Vue 3) <plugin /> 
- Some Component Lifecycle Hooks (patched for Vue 2 by this plugin) <plugin />
- Custom Directives (Lifecycle hook names patched for Vue 2 by plugin)<plugin />
- TODO: `defineAsyncComponent()` (only exists in Vue 3) <eslint /><plugin />

