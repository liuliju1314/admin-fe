import service from "@/utils/request";

// 获得固件列表
export function getDeviceLog(data) {
    return service({
        url: '/api/log',
        method: 'get',
        params: data
    })
}
