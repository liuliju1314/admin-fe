import service from "@/utils/request";

// 获取产品列表
export function getProductList(data) {
    return service({
        url: '/api/web/product_list',
        method: 'GET',
        params: data
    })
}

