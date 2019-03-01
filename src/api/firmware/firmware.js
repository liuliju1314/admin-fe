import service from "@/utils/request";

// 获得固件列表
export function getfirmwareList(data) {
    return service({
        url: '/api/firmware',
        method: 'get',
        params: data
    })
}

// 固件升级
export function upgradeFirmware(data) {
    return service({
        url: '/api/web/firmware',
        method: 'post',
        data
    })
}

// 添加固件
export function addFirmware(data) {
    return service({
        url: '/api/firmware',
        method: 'POST',
        data
    })
}
// 更新固件
export function updateFirmware(data) {
    return service({
        url: '/api/firmware',
        method: 'PATCH',
        data
    })
}

// 删除固件
export function deleteFirmware(data) {
    return service({
        url: '/api/firmware',
        method: 'DELETE',
        data
    })
}
