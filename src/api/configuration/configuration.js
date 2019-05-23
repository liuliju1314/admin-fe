import service from "@/utils/request";

// 获取属性列表
export function devConfigList(data) {
    return service({
        url: '/api/dev_config',
        method: 'get',
        params: data
    })
}

// 添加配置
export function addDevConfig(data) {
    return service({
        url: '/api/dev_config',
        method: 'post',
        data
    })
}

// 编辑配置
export function editDevConfig(data) {
    return service({
        url: '/api/dev_config',
        method: 'PATCH',
        data
    })
}

// 删除属性
export function deleteDevConfig(data) {
    return service({
        url: '/api/dev_config',
        method: 'delete',
        data
    })
}

// 删除属性
export function devConfigDetail(data) {
    return service({
        url: '/api/device/config',
        method: 'get',
        params: data
    })
}