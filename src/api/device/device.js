import service from "@/utils/request";

// 获取设备列表
export function getDeviceList(data) {
    return service({
        url: '/api/device',
        method: 'GET',
        params: data
    })
}


// 获取设备列表
export function updateDeviceGroup(data) {
    return service({
        url: '/device/update_device_group',
        method: 'GET',
        params: data
    })
}
