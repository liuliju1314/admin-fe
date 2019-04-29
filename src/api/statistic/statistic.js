import service from "@/utils/request";

// 获取数据分析
export function getStatistic(data) {
    return service({
        url: '/api/product/statistics',
        method: 'GET',
        params: data
    })
}
