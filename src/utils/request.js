import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import { getToken, setToken } from './auth'
// import store from '@/store'



const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000 // request timeout
})


// // request拦截器
// service.interceptors.request.use(
//     config => {
//         if (getToken) {
//             config.headers.Authorization = getToken()
//         }
//         return config
//     },
//     error => {
//         Promise.reject(error)
//     }
// )

// request interceptor 
// service.interceptors.request.use(  
//     config => { 
//     // Do something before request is sent 
//     if (store.getters.token) { 
//     // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改 
//     config.headers['X-Token'] = getToken() 
//     } 
//     return config 
//     }, 
//     error => { 
//     // Do something with request error 
//     console.log(error) // for debug 
//     Promise.reject(error) 
//     } 
// ) 

// request拦截器
service.interceptors.request.use(config => {
    //let token = store.getters.getToken
    let token = getToken()
    console.log("getToken: " + token)
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