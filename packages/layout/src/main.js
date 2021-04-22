import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './index.vue'
import './assets/index.scss'
import { registerRouter } from './utils'

Vue.use(VueRouter)

const routes = registerRouter()

const router = new VueRouter({
  routes,
})

new Vue({
  el: '#app',
  components: { App },
  router,
  render: (h) => h('App'),
})
