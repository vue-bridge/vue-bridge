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
  /* Colors: https://coolors.co/4fc08d-486684-f3b61f-1c0f13-f05d5e */
  .badge.info {
    border-color: #486684;
    color: #486684;
  }
  .badge.success {
    border-color: #41B883;
    color: #41B883;
  }
  .badge.warn {
    border-color: #F3B61F;
    color: #F3B61F;
  }
  .badge.error {
    border-color: #F05D5E; /* #ED6A5A; tomato; */
    color: #ED6A5A;
  }
</style>