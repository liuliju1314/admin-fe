import service from "@/utils/request";

// 获取规则列表
export function getRuleList(data) {
    return service({
        url: '/api/list_rule_task',
        method: 'GET',
        params: data
    })
}

export function updateRule(data) {
    return service({
        url: '/api/update_rule_task',
        method: 'POST',
        data
    })
}

export function deleRule(data) {
    return service({
        url: '/api/del_rule_task',
        method: 'POST',
        data
    })
}

export function addRule(data) {
    return service({
        url: '/api/add_rule_task',
        method: 'POST',
        data
    })
}