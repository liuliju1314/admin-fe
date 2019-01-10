import service from "@/utils/request";

// 获取设备列表
export function DeviceList(data) {
    return service({
        url: 'web/all_devices',
        method: 'GET',
        params: data
    })
}

