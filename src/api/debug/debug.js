import service from "@/utils/request";

// 开启虚拟设备
export function startVirtualDevice(data) {
    return service({
        url: '/api/device/start_virtual',
        method: 'post',
        data
    })
}

