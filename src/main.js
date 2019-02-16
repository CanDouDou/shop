// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/base.css'
import moment from 'moment'
import cusBread from './components/cusBread'
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
Vue.config.productionTip = false

Vue.use(ElementUI)
// 日期过滤器
Vue.filter('frmdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
// 面包屑组件
Vue.component(cusBread.name, cusBread)
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
