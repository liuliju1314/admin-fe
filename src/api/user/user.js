import service from "@/utils/request";

// 登录
export function userLogin(data) {
    return service({
        url: '/web/login',
        method: 'post',
        data
    })
}
// 退出
export function userLogout(data) {
    return service({
        url: '/api/user/logout',
        method: 'get',
        param: data
    })
}
