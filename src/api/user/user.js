import service from "@/utils/request";

// 登录
export function userLogin(data) {
    return service({
        url: '/api/web/login',
        method: 'post',
        data
    })
}
// 退出
export function userLogout(data) {
    return service({
        url: '/api/web/logout',
        method: 'get',
        params: data
    })
}

// 获取管理员列表接口
export function getManagerList(data) {
    return service({
        url: '/api/web/all_managers',
        method: 'get',
        params: data
    })
}