import service from "@/utils/request";

// 获取设备列表
export function getDeviceList(data) {
    return service({
        url: '/api/web/all_devices',
        method: 'GET',
        params: data
    })
}

