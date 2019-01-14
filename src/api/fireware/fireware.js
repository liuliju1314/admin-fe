import service from "@/utils/request";

// 获得固件列表
export function getFirewareList(data) {
    return service({
        url: 'web/all_firmwares',
        method: 'get',
        params: data
    })
}

// 上传固件
export function updateFirmware(data) {
    return service({
        url: 'web/update_firmware2',
        method: 'post',
        data
    })
}

// 更新固件
export function uploadFirmware(data) {
    return service({
        url: '/web/update_firmware',
        method: 'post',
        data
    })
}

