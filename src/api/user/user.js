import service from "@/utils/request";

// 登入
export function userLogin(data) {
    return service({
        url: '/api/user/login',
        method: 'post',
        data
    })
}
// 登出
export function userLogout(data) {
    return service({
        url: '/api/user/logout',
        method: 'get',
        param: data
    })
}
