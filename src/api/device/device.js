import service from "@/utils/request";

// 获取设备列表
export function getDeviceList(data) {
    return service({
        url: '/api/device',
        method: 'GET',
        params: data
    })
}

// 设备升级
export function OTAForDevice(data) {
    return service({
        url: '/api/device/ota',
        method: 'GET',
        params: data
    })
}

// 获取设备升级进度
export function getOTAProgress(data) {
    return service({
        url: '/api/device/ota/progress',
        method: 'GET',
        params: data
    })
}

// 更新设备分组
export function updateDeviceGroup(data) {
    return service({
        url: '/api/device',
        method: 'PATCH',
        data
    })
}

// 
export function getDeviceProps(data) {
    return service({
        url: '/api/device/props',
        method: 'GET',
        params: data
    })
}