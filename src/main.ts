import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import myAxios from './axios.ts'

const app = createApp(App);
// 全局ctx(this) 上挂载 $axios
app.config.globalProperties.$api = axios
app.provide('axios', axios);
// app.provide('myAxios', myAxios);
app.use(router)
app.mount('#app')
