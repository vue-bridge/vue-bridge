<template>
  <div>
    <label for="custom-input">Input:</label>
    <CustomInput id="custom-input" v-model="text" />
    <hr />
    <p data-test-text>Text from input: {{ text }}</p>
    <hr />
    <Switch />
  </div>
</template>

<script setup>
import { Input as CustomInput, Switch } from 'example-library'
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
