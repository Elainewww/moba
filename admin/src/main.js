import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http
// 设置全局变量.就可以在任意页面用this访问这个数据接口

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
