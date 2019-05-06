import service from "@/utils/request";

// 开启虚拟设备
export function startVirtualDevice(data) {
    return service({
        url: '/api/device/start_virtual',
        method: 'post',
        data
    })
}

// 关闭虚拟设备
export function stopVirtualDevice(data) {
    return service({
        url: '/api/device/stop_virtual',
        method: 'post',
        data
    })
}

export function sendMessage(data) {
    return service({
        url: '/api/debug/send_message',
        method: 'post',
        data
    })
}
