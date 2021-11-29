<script lang="ts">
import { defineComponent, attrsListenersMixin } from '@vue-bridge/runtime'

export default defineComponent({
  name: 'Input',
  mixins: [attrsListenersMixin()],
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    model: {
      get(): string | undefined {
        return this.modelValue
      },
      set(v: string): void {
        this.$emit('update:modelValue', v)
      },
    },
  },
})
</script>
<template>
  <div>
    <label for="input">
      <input type="text" v-model="model" />
    </label>
  </div>
</template>
