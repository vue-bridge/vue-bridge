# Always set `tag` prop on Transition Group

In Vue 3, `TransitionGroup` components don't need a wrapper element, and in fact don't render one by default.

In Vue 2, this wrapper element is required and by default, a `<span>` element is used.

In both versions, you can use the `tag` prop to have the component render a desired wrapper element.

## Mitigation

So, the solution to achieve cross-compatibility is simple: 

* Always provide a `tag` prop. 

```html
<!-- span is Vue 2's default -->
<transition-group tag="span">

<!-- need something else? -->
<transition-group tag="div">
```
