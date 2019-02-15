import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login.vue'
import Home from '../components/home.vue'
import users from '../components/users/users.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Home,
      children: [{
        path: '/users',
        component: users
      }]
    }
  ]
})
