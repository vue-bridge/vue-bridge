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
    $_attrs(): Record<string, any> {
      return {} // FIXME workaround until global types in /runtime pkg are fixed.
    },
  },
})
</script>
<template>
  <div>
    <label for="input">
      <input type="text" v-model="model" v-bind="$_attrs" />
    </label>
  </div>
</template>
