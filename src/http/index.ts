import axios, {AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError} from "axios"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { message } from 'antd'

// 创建axios配置对象
const service: AxiosInstance = axios.create()

// 接口基础路径
service.defaults.baseURL = "https://www.liulongbin.top:8888/api/private/v1"

// 超时时间
service.defaults.timeout = 10000
// 请求头类型
service.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start()
    let token = localStorage.getItem('adminToken')
    // 每次请求 都在请求头带上token
    if (token) {
      config.headers["Authorization"] = token
    }
    return config
  },
  (err: any) => {
    console.log(err)
    return Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response:AxiosResponse) => {
    NProgress.done()
    return response.data
  },
  (err: AxiosError) => {
    if (err.response && err.response.status === 404) {
      message.error('请求接口路径错误')
    }
    if (err.response && err.response.status === 401) {
      message.error(err.response.data.msg)
    }
  }
)

export default service