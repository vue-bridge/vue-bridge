<template>
  <div>
    <label for="custom-input">Input:</label>
    <MyInput
      id="custom-input"
      v-model="text"
      class="test"
      style="padding-top: 10px"
    />
    <hr />
    <p data-test-text>Text from input: {{ text }}</p>
    <hr />
    <MySwitch />
  </div>
</template>

<script setup>
import { MyInput, MySwitch } from 'example-library'
import { ref } from 'vue'

const text = ref('')
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
