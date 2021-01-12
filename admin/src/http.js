import axios from 'axios';
import Vue from "vue";
import router from './router';

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api',
})

// 请求拦截
http.interceptors.request.use(function (config) {
    if (sessionStorage.token) {
        // config.headers.Authorization = 'Bearer' + localStorage.token
        config.headers['Authorization'] = sessionStorage.token
    }
    return config;   
  }, err => {
      return Promise.reject(err)
  });

// 响应拦截
http.interceptors.response.use( res => {
        return res;
    }, err => {
        if(err.response.data.message) {
            Vue.prototype.$message({
                message: err.response.data.message,
                type: 'error',
                center: true,
                duration: 800
            })
            console.log(err.response)
            if (err.response.status === 401) {
                router.replace('/login')
            }
        }
        return Promise.reject(err);
})

export default http;