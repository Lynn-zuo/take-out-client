/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router, // 使用v-router
  store, // 使用vuex
  render: h => h(App),
  components: { App },
}).$mount('#app')
