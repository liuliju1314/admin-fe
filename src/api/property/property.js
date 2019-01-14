import service from "@/utils/request";

// 添加属性
export function addProperty(data) {
    return service({
        url: '/web/property_add',
        method: 'post',
        data
    })
}

