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

// 获取设备全部属性
export function getDeviceProps(data) {
    return service({
        url: '/api/device/props',
        method: 'GET',
        params: data
    })
}

// 获取设备属性下的图表
export function getPropsChart(data) {
    return service({
        url: '/api/chart/props',
        method: 'GET',
        params: data
    })
}

// 获取设备属性下的图表
export function getDeviceCount(data) {
    return service({
        url: '/api/device/count',
        method: 'GET',
        params: data
    })
}

// 批量自动添加设备
export function addDeviceAuto(data) {
    return service({
        url: '/api/device/add_device_auto',
        method: 'POST',
        data
    })
}
// 上传文件批量添加设备
export function addDeviceUpload(data) {
    return service({
        url: '/api/device/add_device_upload',
        method: 'POST',
        data
    })
}

// 添加虚拟设备
export function addVirtual(data) {
    return service({
        url: '/api/device/add_virtual',
        method: 'POST',
        data
    })
}

// 获取批量添加设备模板
export function getDevTemplates(data) {
    return service({
        url: '/api/device/device_templates',
        method: 'GET',
        params: data
    })
}
