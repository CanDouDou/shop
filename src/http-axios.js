import axios from 'axios'
const axiosVue = {}
axiosVue.install = function (Vue) {
  // 设置基础路由
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 请求拦截器
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if (config.url !== 'login') {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
    }
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
  Vue.prototype.$axios = axios
}
export default axiosVue
