// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'

import axiosVue from './http-axios'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import moment from 'moment'
import cusBread from './components/cusBread'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.use(ElementUI)
Vue.use(axiosVue)
// 日期过滤器
Vue.filter('frmdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
// 面包屑组件
Vue.component(cusBread.name, cusBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
