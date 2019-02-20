// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store' 
//引入css文件
import './assets/css/base.css'
import './assets/css/index.css'
//引入js文件
import "./assets/js/font.js"
// import "./assets/js/jquery-1.7.2.js"
// import "./assets/js/zepto.min.js"



import { Swipe, SwipeItem } from 'vue-swipe'  // 引入vue-swiper
Vue.component('swipe', Swipe)  // 引入vue-swiper
Vue.component('swipe-item', SwipeItem) // 引入vue-swiper


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,//加入路由
  store:store,//加入vuex状态管理
  components: { App },
  template: '<App/>'
})
