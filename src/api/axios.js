import axios from 'axios';
import { getToken } from '@/utils/auth';
import store from '@/store';
import types from '@/store/action-types';

// 创建axios实例
const instance = axios.create({
    baseURL: process.env.BASE_API, // api的base_url
    timeout: 10000, // 请求超时时间,
    headers: {
        'Access-Control-Allow-Origin': process.env.BASE_API,
        'Content-Type': process.env.Content_Type,
        'Access-Control-Allow-Credentials': true
    }
})

// request拦截器
instance.interceptors.request.use(config => {
    // console.log(config, '/')
    if (getToken()) {
        config.headers['token'] = getToken();
    }
    return config
}, error => {
    return Promise.reject(error.toString())
})

// respone拦截器
instance.interceptors.response.use(
    response => {
        console.log(response);
        if (response.data.err_code == 3003) { //token无效
            store.commit(types.clearToken);
            window.location.reload();
        }
        return response.data;
    },
    error => {
        return Promise.reject(error.toString());
    }
)
export default instance;