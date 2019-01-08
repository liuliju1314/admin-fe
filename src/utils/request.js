import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken, setToken } from './auth'

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000 // request timeout
})


// request拦截器
service.interceptors.request.use(
    config => {
        if (getToken) {
            config.headers.Authorization = getToken()
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)


// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 0 && res.code) {
            // 未登录或已掉线
            if (res.code === 10401 || res.code === 10402) {
                MessageBox.alert('您已掉线，请重新登录','提示', {
                    confirmButtonText: '重新登录',
                    type: 'error'
                }).then(() => {
                    // 重载
                    setToken('');
                    window.location = '/login';
                })
            } else {
                // 存放一些全局错误码的提示
                // Message({
                //     message: '',
                //     type: 'error',
                //     duration: 5 * 1000
                // });
            }
            return Promise.reject('error');
        } else {
            return res;
        }
    },
    error => {
        Message({
            message: error.response.data,
            type: 'error',
            duration: 2 * 1000
        })

        return Promise.reject(error)
    }
)

export default service