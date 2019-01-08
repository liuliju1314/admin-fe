import { userLogin, userLogout } from '@/api/user/user'
import { getToken, setToken, removeToken, getStorage, getJsonStorage, setStorage } from '@/utils/auth';
const user = {
    state: {
        token: getToken(),
        uid: getStorage('uid'),
        user: getJsonStorage('user')
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_UID: (state, uid) => {
            state.uid = uid
            setStorage("uid", uid)
        },
        SET_USER: (state, user) => {
            state.user = user
            setStorage("user", user)
        }
    },
    actions: {
        UserLogin({ commit }, userInfo) {
            const username = userInfo.username.trim()
            return new Promise((resolve, reject) => {
                userLogin(username, userInfo.password).then(res => {
                    const data = res.data
                    if(data === null) {
                        return Promise.reject(res.code);
                    }
                    commit('SET_TOKEN', data.token)
                    commit('SET_UID', data.uid)
                    commit('SET_USER', data.user)
                    setToken(data.token)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        UserLogout({ commit, state }) {
            return new Promise((resolve, reject) => {
                userLogout(state.id).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_USER', [])
                    removeToken();
                    sessionStorage.clear()
                    localStorage.clear()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default user
