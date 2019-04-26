import service from "@/utils/request";

// 获得固件列表
export function getProducts() {
    return service({
        url: '/api/monitor/products',
        method: 'get',
    })
}
