/*
 * @Author: Dhx
 * @Date: 2023-12-06 12:07:13
 * @Description: 
 * @FilePath: \RvcWeb\src\utils\request.ts
 */
import axios from 'axios'
import {storage} from './storage'
import { AxiosResponse,InternalAxiosRequestConfig } from 'axios'
// import router from '@/router/index.ts'
import { message } from './message'


const request = axios.create({
  baseURL: '',
  timeout: 5000
})

// 请求拦截
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any> ) => {
    // 从storage中获取token
    const token = storage.get<string>('token')
    console.log(token)
    if (token!='') {
      // 将token添加到请求头中
      config.headers.token = token
    }
    console.log(config)
    return config
  },
  error => {
    message.error(error.data.error.message)
    return Promise.reject(error.data.error.message)
  }
)

// 响应拦截
request.interceptors.response.use(
  (res: AxiosResponse<any>) => {
     // 如果是返回的文件
     if (res.config.responseType === 'blob') {
      return res
    }
    // 此处已由res.data.success === true修改成如下
    // 对响应数据进行处理，例如检查统一的字段（如 statusCode)
    if (res.status == 200) {
      return Promise.resolve(res.data)
    } else {
      message.error(res.data.message)
      return Promise.reject(res)
    }
  },
  error => {
    const statusTextMap: Record<number, string> = {
      400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
      401: '登录失效，请重新登录',
      403: '用户得到授权，但是访问是被禁止的',
      404: '网络请求不存在',
      406: '请求的格式不可得',
      410: '请求的资源被永久删除，且不会再得到的',
      422: '当创建一个对象时，发生一个验证错误',
      500: '服务器发生错误，请检查服务器',
      502: '网关错误',
      503: '服务不可用，服务器暂时过载或维护',
      504: '网关超时'
    }

    if (error.response && error.response.status) {
      const statusText = statusTextMap[error.response.status] ?? '其他错误'
      message.error(`${statusText}(${error.response.status})`)
      if (error.response.status === 401) {
        // router.replace({
        //   path: '/Login'
        // })
      }
      return Promise.reject(error)
    }
    return Promise.reject(new Error('网络请求失败，请稍后重试'))
  }

)

export default request