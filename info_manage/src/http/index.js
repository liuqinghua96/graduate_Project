import axios from 'axios'

axios.defaults.baseURL = '/api/graduate/'
// 添加请求拦截器
/* axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)
  if (response.data.meta.status === 401) {
    location.href = '#/login'
  } else {
    return response
  }
}) */
export default axios
