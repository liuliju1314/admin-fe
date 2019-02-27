import service from "@/utils/request";

// 获取属性列表
export function getPropertyList(data) {
    return service({
        url: '/api/property',
        method: 'get',
        params: data
    })
}

// 添加属性
export function addProperty(data) {
    return service({
        url: '/api/property',
        method: 'post',
        data
    })
}

// 编辑属性
export function editProperty(data) {
    return service({
        url: '/api/property',
        method: 'PATCH',
        data
    })
}

// 删除属性
export function deleteProduce(data) {
    return service({
        url: '/api/property',
        method: 'delete',
        data
    })
}

