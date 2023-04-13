import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import router from './router'
Vue.use(VueRouter)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import store from "./store"
import './api/mock'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit("menu/addMenu",this.$router)
  }
}).$mount('#app')
