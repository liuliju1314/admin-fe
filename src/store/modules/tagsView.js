const tagsView = {
    state: {
        visitedViews: [],
        cachedViews: []
    },
    mutations: {
        ADD_VISITED_VIEW: (state, { view, rootGetters }) => {
            let name = '';
            if (view.path.indexOf('product/') >= 0 && !view.params.did) {
                name = rootGetters.baseInfo.name;
            } else if (view.path.indexOf('rule/') >= 0) {
                name = rootGetters.ruleInfo.name
            } else {
                name = rootGetters.deviceInfo.name
            }

            if (state.visitedViews.some(v => v.path === view.path || (v.id === view.params.id && !view.params.did) || v.id === view.params.did)) return
            state.visitedViews.push(
                Object.assign({}, view, {
                    title: view.meta.title || name || 'no-name',
                    id: view.params.did || view.params.id || ''
                })
            )
        },
        ADD_CACHED_VIEW: (state, view) => {
            if (state.cachedViews.includes(view.name)) return
            if (!view.meta.noCache) {
                state.cachedViews.push(view.name)
            }
        },

        DEL_VISITED_VIEW: (state, view) => {
            for (const [i, v] of state.visitedViews.entries()) {
                if (v.path === view.path) {
                    state.visitedViews.splice(i, 1)
                    break
                }
            }
        },
        DEL_CACHED_VIEW: (state, view) => {
            for (const i of state.cachedViews) {
                if (i === view.name) {
                    const index = state.cachedViews.indexOf(i)
                    state.cachedViews.splice(index, 1)
                    break
                }
            }
        },

        UPDATE_VISITED_VIEW: (state, { view, rootGetters }) => {
            let name = '';
            if (view.path.indexOf('product') >= 0 && !view.params.did) {
                name = rootGetters.baseInfo.name;
            } else if (view.path.indexOf('rule') >= 0) {
                name = rootGetters.ruleInfo.name
            } else {
                name = rootGetters.deviceInfo.name
            }
            for (let v of state.visitedViews) {
                if (v.path === view.path || (v.id === view.params.id && !view.params.did) || v.id === view.params.did) {
                    Object.assign(v, view, {
                        title: view.meta.title || name || 'no-name',
                        id: view.params.did || view.params.id || ''
                    })
                    break
                }
            }
        }

    },
    actions: {
        addView({ dispatch }, view) {
            dispatch('addVisitedView', view)
            dispatch('addCachedView', view)
        },
        addVisitedView({ commit, rootGetters }, view) {
            commit('ADD_VISITED_VIEW', { view, rootGetters })
        },
        addCachedView({ commit }, view) {
            commit('ADD_CACHED_VIEW', view)
        },

        delView({ dispatch, state }, view) {
            return new Promise(resolve => {
                dispatch('delVisitedView', view)
                dispatch('delCachedView', view)
                resolve({
                    visitedViews: [...state.visitedViews],
                    cachedViews: [...state.cachedViews]
                })
            })
        },
        delVisitedView({ commit, state }, view) {
            return new Promise(resolve => {
                commit('DEL_VISITED_VIEW', view)
                resolve([...state.visitedViews])
            })
        },
        delCachedView({ commit, state }, view) {
            return new Promise(resolve => {
                commit('DEL_CACHED_VIEW', view)
                resolve([...state.cachedViews])
            })
        },
        updateVisitedView({ commit, rootGetters }, view) {
            commit('UPDATE_VISITED_VIEW', { view, rootGetters })
        }
    }
}

export default tagsView