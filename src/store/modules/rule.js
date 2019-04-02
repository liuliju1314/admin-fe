
import { getRuleInfo, updateRule } from "@/api/rule/rule";
const rule = {
    state: {
        ruleInfo: ''

    },
    mutations: {
        SET_RULEINFO: (state, data) => {
            state.ruleInfo = data;
        }
    },
    actions: {
        RuleInfoGet({ commit }, data) {
            return new Promise((resolve, reject) => {
                getRuleInfo(data).then(res => {
                    const data = res.payload;
                    commit('SET_RULEINFO', data)
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })

        },
        RuleInfoSet({ commit }, data) {
            return new Promise((resolve, reject) => {
                updateRule(data).then(res => {
                    commit('SET_RULEINFO', data)
                    resolve(res);
                }).catch(error => {
                    reject(error)
                })
            })

        }
    }
}

export default rule
