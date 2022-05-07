---
aside: deep
---
# How to use Transitions

## #1: Transition Styles

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

It's easy enough to provide both selectors in your CSS - you just have to remember to do so.

```css
.fade-enter, .fade-enter-from, .fade-leave-to {
  opacity: 0;
}
```

## #2: Transition as root

In Vue 2, if you used a `<transition>` as the root element in a component, the transition would actually work and i.e. fade-in its content. IN vue 3, this no longer works like that, the transition only works if the content inside of it actually has a trigger for it, in the form of a `v-if` or `v-show`.

You can read more about it here: [Vue 3 Migration Guide: "Transition as Root"](https://v3.vuejs.org/guide/migration/transition-as-root.html#overview)

So for a cross-compatible component, you need to respect the Vue 3 behavior.

## #3: TransitionGroup Root

In Vue 3, components no longer need a single root element. Consequently, `<TransitionGroup>` components also no longer require this and will not wrap their children in a root node by default.

But Vue 2's `<TransitionGroup>` still requires a root element, which by default will be a `<span>` element.

### Solution

When using `<TransitionGroup>`, it's necessary to always set the `tag` prop if you want to avoid differences in the generated HTML between Vue 2 and Vue 3:

```html
<TransitionGroup 
  name="fade" 
  tag="span"
>
  <Child v-for=="child in children" :key="child">
</TransitionGroup>
```
However, if you can make sure that the missing root element in a Vue 3 environment won't affect the component's behavior/styling etc, you can also leave it out.

//TODO: Document alternative approach with version-spefic styling.
