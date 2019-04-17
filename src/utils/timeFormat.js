export function formatDate(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || 'y-m-d h:i:s'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds()
    }
    const time_str = format.replace(/(y|m|d|h|i|s)+/g, (result, key) => {
        let value = formatObj[key]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

// 设置后台接受日期格式转为时间戳
export function setTimeFormat(timeRange) {
    let start = timeRange[0].replace(/-/g, "/"),
        end = timeRange[1].replace(/-/g, "/");
    if (new Date(end).toDateString() === new Date().toDateString()) {
        end = Math.floor(new Date().getTime() / 1000);
    } else {
        end = Math.floor(new Date(end + " 23:59:59").getTime() / 1000);
    }
    start = Math.floor(new Date(start + " 00:00:00").getTime() / 1000);
    // console.log([start, end]);
    return [start, end];
}