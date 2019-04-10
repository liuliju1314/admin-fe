
import { editProduct, getProductInfo } from "@/api/product/product";
import _cloneDeep from 'lodash.clonedeep';
const product = {
    state: {
        baseInfo: ''
        
    },
    mutations: {
        SET_BASEINFO: (state, data) => {
            state.baseInfo = data;
        }
    },
    actions: {
        BaseInfoGet({ commit }, data) {
            return new Promise((resolve, reject) => {
                getProductInfo(data).then(res => {
                    const data = res.payload;
                    commit('SET_BASEINFO', data)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })

        },
        BaseInfoSet({ commit }, data) {
            const newData = _cloneDeep(data)
            return new Promise((resolve, reject) => {
                editProduct(data).then( res => {
                    commit('SET_BASEINFO', newData)
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })

        }
    }
}

export default product
