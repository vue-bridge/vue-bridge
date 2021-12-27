# How to use Transitions

## CSS Styles

Vue 3 introduced a small change in the naming of CSS Transition classes:

```css
/* Vue 2 */
.fade-enter, .fade-leave-to {
  opacity: 0;
}
/* Vue 3 */
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
```

### Solution: Provide both

```css
.fade-enter, .fade-enter-from, .fade-leave-to {
  opacity: 0;
}
```

::: warning Self-discipline required

This cross-version difference can't be detected by our eslint-config nor the runtime plugin. You have only yourself to ensure that styles for both versions are provided.

:::


## `<Transition>` Component



## `<TransitionGroup>` Component

In Vue 3, components no longer need a single root element. Consequently, `<TransitionGroup>` components also no longer require this and will not wrap their children in a root node by default.

But Vue 2's `<TransitionGroup>` still requires a root element, which by default will be a `<span>` element.

### Solution

When using `<TransitionGroup>`, it's recommended to always set the `tag` prop:

```html
<TransitionGroup 
  name="fade" 
  tag="span"
>
  <Child v-for=="child in children" :key="child">
</TransitionGroup>
```
However, if you can make sure that the missing root element in a Vue 3 environment won't affect the component's behavior/styling etc, you can also leave it out.

::: warning Self-discipline required

This cross-version difference can't be detected by our eslint-config nor the runtime plugin. You have only yourself to ensure that styles for both versions are provided.

:::
