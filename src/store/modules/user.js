// import { userLogin, userLogout } from '@/api/user/user'
import { userLogin } from "@/api/user/user";
// import { setToken, getStorage, getJsonStorage, setStorage } from '@/utils/auth';
import { setToken, getStorage, setStorage } from '@/utils/auth';

const user = {
    state: {
        token: getStorage('token'),
        // uid: getStorage('uid'),
        // user: getJsonStorage('user')
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            setStorage("token", token);
        }
    },
    actions: {
        UserLogin({ commit }, data) {
            return new Promise((resolve, reject) => {
                userLogin(data).then(res => {
                    const data = res.payload;
                    if(data === null) {
                        return Promise.reject(res.code);
                    }
                    commit('SET_TOKEN', data.token)
                    // commit('SET_UID', data.uid)
                    // commit('SET_USER', data.user)
                    setToken(data.token)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // UserLogout({ commit, state }) {
        //     return new Promise((resolve, reject) => {
        //         userLogout(state.id).then(() => {
        //             commit('SET_TOKEN', '')
        //             commit('SET_USER', [])
        //             removeToken();
        //             sessionStorage.clear()
        //             localStorage.clear()
        //             resolve()
        //         }).catch(error => {
        //             reject(error)
        //         })
        //     })
        // }
    }
}

export default user
