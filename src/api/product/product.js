import service from "@/utils/request";

// 获取产品列表
export function getProductList(data) {
    return service({
        url: '/api/product',
        method: 'GET',
        params: data
    })
}

// 获取产品信息
export function getProductInfo(data) {
    return service({
        url: '/api/product_info',
        method: 'GET',
        params: data
    })
}

// 添加产品
export function addProduct(data) {
    return service({
        url: '/api/product',
        method: 'POST',
        data
    })
}

// 删除产品
export function deleteProduct(data) {
    return service({
        url: '/api/product',
        method: 'DELETE',
        data
    })
}


// 编辑产品
export function editProduct(data) {
    return service({
        url: '/api/product',
        method: 'PATCH',
        data
    })
}

// 撤销发布产品
export function unReleaseProduct(data) {
    return service({
        url: '/api/product/unrelease',
        method: 'PATCH',
        data
    })
}