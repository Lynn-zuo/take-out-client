/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'vant'

Vue.config.productionTip = false
// 注册全局组件标签
Vue.component(Button.name, Button) // <vant-Button>

new Vue({
  router, // 使用v-router
  store, // 使用vuex
  render: h => h(App),
  components: { App },
}).$mount('#app')
