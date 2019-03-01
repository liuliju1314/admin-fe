import service from "@/utils/request";

// 获取规则列表
export function getRuleList(data) {
    return service({
        url: '/api/rule',
        method: 'GET',
        params: data
    })
}

// 获取规则列表
export function getRuleInfo(data) {
    return service({
        url: '/api/rule_info',
        method: 'GET',
        params: data
    })
}
export function updateRule(data) {
    return service({
        url: '/api/rule',
        method: 'PATCH',
        data
    })
}

export function deleRule(data) {
    return service({
        url: '/api/rule',
        method: 'DELETE',
        data
    })
}

export function addRule(data) {
    return service({
        url: '/api/rule',
        method: 'POST',
        data
    })
}