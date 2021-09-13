# The `is` prop and the special `<component>` tag

In both versions, you can render a dynamically determined component or element by using this syntax:

```html
<component is="div" >


<component is="myComponent" >

<component :is="DataContainingComponentOrString" >
```

But only in Vue 2, the `is` prop also works on normal elements:

```html
<div is="span">
```

## Mitigation

If you respect the restriction of Vue 3 that `is` only works on the special `<component>` tag, you're fine.

### Eslint


* [vue/no-deprecated-html-element-is](https://eslint.vuejs.org/rules/no-deprecated-html-element-is.html#vue-no-deprecated-html-element-is)

```js
{
  rules: {
    'vue/no-deprecated-html-element-is': 'error'
  }
}
```