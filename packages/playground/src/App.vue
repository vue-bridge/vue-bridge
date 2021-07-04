<template>
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <MyComponent message="Hello from 'vue3-compat-lib'" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// import { MyComponent } from 'vue3-compat-lib' // -> registered via plugin in main.js

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
}
</script>
