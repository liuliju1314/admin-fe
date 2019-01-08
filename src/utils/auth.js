

export function getToken() {
    return sessionStorage.getItem('tokenKey');
}

export function setToken(token) {
    sessionStorage.setItem('tokenKey', token);
}

export function removeToken() {
    return sessionStorage.removeItem('tokenKey');
}

export function getStorage(name) {
    return sessionStorage.getItem(name);
}
export function getJsonStorage(name) {
    return JSON.parse(sessionStorage.getItem(name));
}

export function setStorage(name, value) {
    if (!name) return;
    if (typeof value !== 'string') {
        value = JSON.stringify(value);
    }
    return sessionStorage.setItem(name, value);
}

export function removeStorage(name) {
    return sessionStorage.removeItem(name);
}