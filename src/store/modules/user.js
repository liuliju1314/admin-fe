
import { userLogin, userLogout } from "@/api/user/user";
import { setToken, removeToken, getStorage, setStorage } from '@/utils/auth';

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
                    if (data === null) {
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
        UserLogout({ commit }) {
            return new Promise((resolve, reject) => {
                userLogout()
                    .then(() => {
                        commit('SET_TOKEN', "")
                        removeToken()
                        localStorage.clear();
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
}

export default user
