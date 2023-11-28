// // import axios from 'axios'
// // import qs from 'qs'
// // import { message } from 'ant-design-vue'
// // import router from '@/router/index'
// // import { loadingVisible } from '@/utils/common/visible-data'
// // import { storage } from '../../utils/storage/storage'
// // import { removePending, addPending } from './pending'
// // import { removeUserStorage } from '@/utils/user/user-info'
// import { AxiosRequestConfig, AxiosResponse } from 'axios'

// // 全局配置
// const apiUrl = import.meta.env.VITE_API_DOMAIN
// axios.defaults.withCredentials = false
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// // 允许跨域
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

// function myAxios(axiosConfig: AxiosRequestConfig, customOptions: any, loadings: any): Promise<AxiosResponse<any>> {
//     const { timeout = 8000 } = customOptions
//     const service = axios.create({
//         baseURL: apiUrl, // 设置统一的请求前缀
//         timeout // 设置统一的超时时长
//     })

//     // 是否开启/取消重复请求
//     const cancel = {
//         cancel_request: false,
//         ...customOptions
//     }
//     // 是否开启loading, 默认为 false
//     const loading = {
//         loading: loadings.loading
//     }
//     // 在请求拦截器中
//     service.interceptors.request.use(
//         async (config: AxiosRequestConfig) => {
//             try {
//                 const { method, data, headers } = config;
//                 removePending(config);
//                 addPending(config);

//                 if (['post', 'put', 'delete'].includes(method)) {
//                     config.data = qs.parse(data); // 序列化
//                 }

//                 // 若有做鉴权 token，就给头部带上 token
//                 const token = storage.get('token');
//                 if (token) {
//                     config.headers = {
//                         ...config.headers,
//                         Authorization: token
//                     };
//                 }

//                 // 请求之前发送 loading
//                 await handleLoading(config);
//                 return config;
//             } catch (error) {
//                 return Promise.reject(error);
//             }
//         },
//         async (error) => {
//             return Promise.reject(await handleRequestError(error));
//         }
//     );
//     // 响应拦截器
//     service.interceptors.response.use(
//         (res: AxiosResponse<any>) => {
//             // 在请求结束后，移除本次请求
//             removePending(res)
//             // 请求之后关闭loading
//             if (loading.loading) {
//                 setTimeout(function () {
//                     loadingVisible.value = false
//                 }, 500)
//             }
//             // 对响应数据进行处理，例如检查统一的字段（如 statusCode)
//             if (res.status === 200 || res.data.statusCode === 200) {
//                 return Promise.resolve(res)
//             }
//             return Promise.reject(res)
//         },
//         error => {
//             loadingVisible.value = false

//             const statusTextMap: Record<number, string> = {
//                 400: '发出的请求有错误，服务器没有进行新建或修改数据的操作',
//                 401: '登录失效，请重新登录',
//                 403: '用户得到授权，但是访问是被禁止的',
//                 404: '网络请求不存在',
//                 406: '请求的格式不可得',
//                 410: '请求的资源被永久删除，且不会再得到的',
//                 422: '当创建一个对象时，发生一个验证错误',
//                 500: '服务器发生错误，请检查服务器',
//                 502: '网关错误',
//                 503: '服务不可用，服务器暂时过载或维护',
//                 504: '网关超时'
//             }

//             if (error.response && error.response.status) {
//                 const statusText = statusTextMap[error.response.status] ?? '其他错误'
//                 message.error(`${statusText}(${error.response.status})`)
//                 if (error.response.status === 401) {
//                     removeUserStorage()
//                     router.replace({
//                         path: '/Login'
//                     })
//                 }
//                 return Promise.reject(error)
//             }

//             return Promise.reject(new Error('网络请求失败，请稍后重试'))
//         }
//     )
//     return service(axiosConfig)
// }
// export default myAxios