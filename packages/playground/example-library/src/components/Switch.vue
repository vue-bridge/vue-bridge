<script>
import { defineComponent } from '@vue-bridge/runtime'
import CompA from './dummys/CompA.vue'
import CompB from './dummys/CompB.vue'

/**
 * This component demonstrates:
 *  1. Using Transition classes for both Vue 2 and 3
 *  2. using `<component :is>`
 */

export default defineComponent({
  data: () => ({
    toggle: true,
  }),
  computed: {
    component() {
      return this.toggle ? CompA : CompB
    },
  },
})
</script>
<template>
  <div>
    <button @click="toggle = !toggle">Toggle Transition</button>
    <br />
    <transition name="fade" mode="out-in">
      <component :is="component" :key="toggle ? 'a' : 'b'" />
    </transition>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, /* Vue 2*/
.fade-enter-from, /* Vue 3 */
.fade-leave-to {
  opacity: 0;
}
</style>
