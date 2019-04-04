import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken, setToken } from './auth'
// import store from '@/store'



const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})


// request拦截器
service.interceptors.request.use(config => {
    //let token = store.getters.getToken
    let token = getToken()
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
},
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

const whiteCode = [10110, 10102, 10103, 10105];
// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code !== 0 && res.code) {
            // 未登录或已掉线
            if (res.code === 10401 || res.code === 10402) {
                MessageBox.alert('您已掉线，请重新登录', '提示', {
                    confirmButtonText: '重新登录',
                    type: 'error'
                }).then(() => {
                    // 重载
                    setToken('');
                    window.location = '/login';
                })
            } else {
                if (!(whiteCode.indexOf(res.code) >= 0)) {
                    Message({
                        message: res.message,
                        type: "error",
                        duration: 2 * 1000
                    });
                }
                return Promise.reject(res);
            }
            return Promise.reject('error');
        } else {
            return res;
        }
    },
    error => {
        console.log(error);
        Message({
            message: error,
            type: 'error',
            duration: 2 * 1000
        })

        return Promise.reject(error)
    }
)


export default service