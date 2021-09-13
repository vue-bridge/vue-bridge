# `<Transition>` class names

The class name syntax changed a bit in Vue 3.

**Vue 2**

```css
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
```

**Vue 3**

```css
.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.v-leave-from,
.v-enter-to {
  opacity: 1;
}
```

## Mitigation

Provide both rules:

```css
.v-enter, 
.v-enter-from
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-leave-from
.v-enter-to {
  opacity: 1;
}
```

## Linting

This compatibility cannot be supported by linting.