import router from './router/router'
// import store from './store'
import { getStorage } from '@/utils/auth' 
const whiteList = ['/login', '/register']// no redirect whitelist

router.beforeEach((to, from, next) => {
    if (getStorage('token')) { // determine if there has token
        /* has token*/
        if (to.path === "/login") {
            localStorage.clear();
            next();
        }else {
            next();
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
        }
    }
})

