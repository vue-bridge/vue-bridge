<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Badge',
  props: {
    type: String, // info, warn, error, success
    text: String
  }
})
</script>
<template>
  <span :class="['badge', type]">
    <template v-if="text">
      {{ text }}
    </template>
    <slot v-else />
  </span>
</template>
<style lang="postcss" scoped>
  .badge {
    display: inline-block;
    margin: 0 8px;
    border-radius: 3px;
    font-size: 0.75em;
    font-weight: bold;
    line-height: 0.75em;
    padding: 4px 4px;
    border-width: 1px;
    border-style: solid;
    border-color: #CCC;
    color: #CCC;

  }
  .badge.info {
    border-color: blue;
    color: blue;
  }
  .badge.success {
    border-color: limegreen;
    color: limegreen;
  }
  .badge.warn {
    border-color: goldenrod;
    color: goldenrod;
  }
  .badge.error {
    border-color: tomato;
    color: tomato;
  }
</style>