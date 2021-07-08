<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="msg" />
    <!-- <ExampleInput v-model="msg" /> -->
    <ExampleInput v-model="msg" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { Input as ExampleInput } from 'example-library'
export default {
  name: 'App',
  data: () => ({
    msg: 'Hello Vue 2 with vue3-compat-lib',
  }),
  components: {
    HelloWorld,
    ExampleInput,
  },
}
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
