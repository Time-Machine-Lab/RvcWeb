import axios from 'axios'

const request = axios.create({
  baseURL: '/api/', 
  timeout: 5000
})

request.interceptors.request.use(
  config => {

    // config.headers[''] = 'token'

    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 200) {
      console.log(res.message)
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default request