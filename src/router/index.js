import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login.vue'
import Home from '../components/home.vue'

import users from '../components/users/users.vue'

import rights from '../components/rights/rights.vue'
import roles from '../components/rights/roles.vue'

import categories from '../components/goods/categories.vue'
import goods from '../components/goods/goods.vue'
import params from '../components/goods/params.vue'
import goodsadd from '../components/goods/goodsadd.vue'

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
      },
      {
        path: '/rights',
        component: rights
      },
      {
        path: '/roles',
        component: roles
      },
      {
        path: '/categories',
        component: categories
      },
      {
        path: '/goods',
        component: goods
      },
      {
        path: '/params',
        component: params
      },
      {
        path: '/goodsadd',
        component: goodsadd
      }
    ]
    }
  ]
})
