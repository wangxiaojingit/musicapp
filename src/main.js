// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'

Vue.use(Vuex)
import store from "./store"
Vue.config.productionTip = false
//引入css
import "@/common/stylus/index.styl"
//消除click300ms延迟
import fastclick from "fastclick"
fastclick.attach(document.body)
/* eslint-disable no-new */
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('./common/image/default.png'),
  attempt: 1
})
new Vue({
  el: '#app',
  router,
  store ,
  template: '<App/>',
  components: { App }
})
