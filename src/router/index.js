import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login.vue'
import Home from '../components/home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home
    }
  ]
})
