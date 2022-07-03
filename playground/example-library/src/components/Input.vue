<script lang="ts">
import { defineComponent, attrsListenersMixin } from '@vue-bridge/runtime'
// This import will be resolved to ./helpers/index/vue3 by the vite-plugin
// import { testString } from 'v-bridge:@/components/helpers/index'
import { testString } from '@/components/helpers/index?v-bridge'
export default defineComponent({
  name: 'Input',
  mixins: [attrsListenersMixin],
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  data: () => ({
    testString,
  }),
  beforeUnmount() {
    console.log('unmounting')
  },
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
  <div v-on="$bridgeNativeOn()" :class="$bridgeClass()" :style="$bridgeStyle()">
    <label for="input">
      <input v-bind="$bridgeAttrs()" type="text" v-model="model" />
      {{ testString }}
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
