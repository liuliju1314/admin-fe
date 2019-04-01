
import {  getStorage, setStorage } from '@/utils/auth';
const product = {
    state: {
        name: getStorage('productName')
    },
    mutations: {
        SET_NAME: (state, name) => {
            state.name = name;
            setStorage('productName', name)
        }
    },
    actions: {
        UpdateName({ commit }, data) {
                if(data) {
                    commit('SET_NAME', data)
                }

        }
    }
}

export default product
