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
        url: '/api/web/managers',
        method: 'get',
        params: data
    })
}

// 新增管理员列表接口
export function addManager(data) {
    return service({
        url: '/api/web/manager',
        method: 'post',
        data
    })
}

// 删除管理员列表接口
export function deleteManager(data) {
    return service({
        url: '/api/web/manager',
        method: 'DELETE',
        data
    })
}

// 修改管理员列表接口
export function updateManager(data) {
    return service({
        url: '/api/web/manager',
        method: 'PATCH',
        data
    })
}