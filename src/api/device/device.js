import service from "@/utils/request";

// 获取设列表
export function userLogin(data) {
    return service({
        url: '/web/all_managers`',
        method: 'GET',
        params: data
    })
}

