import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'
import Login from '../components/login.vue'
import Home from '../components/home.vue'

import users from '../components/users/users.vue'

import rights from '../components/rights/rights.vue'
import roles from '../components/rights/roles.vue'

import categories from '../components/goods/categories.vue'
import goods from '../components/goods/goods.vue'
import params from '../components/goods/params.vue'
import goodsadd from '../components/goods/goodsadd.vue'

// 导航守卫

Vue.use(Router)
const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [{
        name: 'users',
        path: '/users',
        component: users
      },
      {
        name: 'rights',
        path: '/rights',
        component: rights
      },
      {
        name: 'roles',
        path: '/roles',
        component: roles
      },
      {
        name: 'users',
        path: '/categories',
        component: categories
      },
      {
        name: 'goods',
        path: '/goods',
        component: goods
      },
      {
        name: 'params',
        path: '/params',
        component: params
      },
      {
        name: 'goodsadd',
        path: '/goodsadd',
        component: goodsadd
      }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({
        name: 'login'
      })
      Message.warning('请先登录')
      return
    } else {
      next()
    }
  }
  console.log(to, from)
})
export default router
