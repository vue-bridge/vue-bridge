import Vue from 'vue'
import App from './App.vue'

// comment this out if you use the alias for example-library in vite.config.js
import 'example-library-vue2/style.css'

new Vue({
  /**
   * @param {Function} h - createElement
   */
  render: (h) => h(App),
}).$mount('#app')
