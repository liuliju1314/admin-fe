import service from "@/utils/request";

// 获得固件列表
export function getfirmwareList(data) {
    return service({
        url: '/apifirmware',
        method: 'get',
        params: data
    })
}

// 上传固件
export function updateFirmware(data) {
    return service({
        url: '/api/web/update_firmware',
        method: 'post',
        data
    })
}

// 更新固件
export function uploadFirmware(data) {
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

