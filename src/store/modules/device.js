
const device = {
    state: {
        deviceInfo: ''

    },
    mutations: {
        SET_DEVICEINFO: (state, data) => {
            state.deviceInfo = data;
        }
    },
    actions: {
        DeviceInfoSet({ commit }, data) {
            return new Promise((resolve) => {
                commit('SET_DEVICEINFO', data)
                resolve(data)
            })
        }
    }
}

export default device
