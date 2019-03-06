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
// 获取固件名称
export function getFirmwareName(data) {
    return service({
        url: '/api/product/get_firmware_name',
        method: 'get',
        params: data
    })
}
// 固件编辑
export function editFirmware(data) {
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

