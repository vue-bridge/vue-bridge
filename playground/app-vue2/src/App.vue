<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld :msg="msg" />
    <!-- <ExampleInput v-model="msg" /> -->
    <ExampleInput
      v-model="msg"
      class="test1"
      style="padding-top: 10px"
      id="test-id"
    />
    <Switchx />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { defineComponent } from '@vue-bridge/runtime'
import { Input as ExampleInput, Switch as Switchx } from 'example-library-vue2'
export default defineComponent({
  name: 'App',
  data: () => ({
    msg: 'Hello Vue 2 with @vue-bridge/runtime',
  }),
  components: {
    HelloWorld,
    ExampleInput,
    Switchx,
  },
})
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
