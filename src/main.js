/*
入口js
*/
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'vant'

import './mock/mockServer' // 加载mockServer
import VueLazyLoad from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters' // 加载自定义过滤器

Vue.config.productionTip = false
// 注册全局组件标签
Vue.component(Button.name, Button) // <vant-Button>
Vue.use(VueLazyLoad, { // 内部自定义了一个指令lazy
  loading
})

new Vue({
  router, // 使用v-router
  store, // 使用vuex
  render: h => h(App),
  components: { App },
}).$mount('#app')
