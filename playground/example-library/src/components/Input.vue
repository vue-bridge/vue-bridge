<script lang="ts">
import { defineComponent, attrsListenersMixin } from '@vue-bridge/runtime'
// This import will be resolved to ./helpers/index/vue3 by the vite-plugin
import { testString } from 'virtual-bridge:./helpers/index'
export default defineComponent({
  name: 'Input',
  mixins: [attrsListenersMixin],
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    testString,
  }),
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
      <input type="text" v-model="model" /> {{ testString }}
    </label>
  </div>
</template>

<style scoped v3>
.my-input {
  border: '1px solid red';
}
</style>
<style scoped v2>
.my-input {
  border: '1px solid green';
}
</style>
