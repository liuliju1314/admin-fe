import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tagsView from './modules/tagsView'
import product from './modules/product'
import rule from './modules/rule'
import device from './modules/device'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        tagsView,
        product,
        rule,
        device
    },
    getters
})

export default store;