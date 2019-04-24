export function getToken() {
    return localStorage.getItem('tokenKey');
}

export function setToken(token) {
    localStorage.setItem('tokenKey', token);
}

export function removeToken() {
    return localStorage.removeItem('tokenKey');
}

export function getStorage(name) {
    return localStorage.getItem(name);
}
export function getJsonStorage(name) {
    return JSON.parse(localStorage.getItem(name));
}

export function setStorage(name, value) {
    if (!name) return;
    if (typeof value !== 'string') {
        var cache = [];
        var str = JSON.stringify(value, function (key, data) {
            if (typeof data === 'object' && data !== null) {
                if (cache.indexOf(data) !== -1) {
                    // 移除
                    return;
                }
                // 收集所有的值
                cache.push(data);
            }
            return data;
        });
        cache = null;
        return localStorage.setItem(name, str);

    } else {
        return localStorage.setItem(name, value);
    }

}

export function removeStorage(name) {
    return localStorage.removeItem(name);
}