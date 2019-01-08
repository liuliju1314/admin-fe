
const userMap = {
    user: {
        "code": 0,
        "msg": "成功",
        "data": {
            "token": "adfjaslkfjlsakfddsf",
            "uid": 1,
            "user": {
                "username": "admin",
                "avatar": "https://coreui.io/demo/img/avatars/3.jpg",
                "phone": "17807657886"
            }
        }
    },
    code: {
        "code": 0,
        "msg": "成功",
        "data": {
            // 
        }
    },
    bind: {
        "code": 0,
        "msg": "成功",
        "data": {
            // 
        }
    }
}

export default {
    userLogin: () => {
        return userMap.user
    },
    userLogout: () => {
        return userMap.user
    },
    bindPhone: () => {
        return userMap.bind
    },
    getPhoneCode: () => {
        return userMap.code
    }
}