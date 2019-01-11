import service from "@/utils/request";

// 登录
export function getFirewareList(data) {
    return service({
        url: 'web/all_firmwares',
        method: 'get',
        data
    })
}

