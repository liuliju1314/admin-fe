import { getJsonStorage, setStorage } from '@/utils/auth';
const tagsView = {
    state: {
        visitedViews: getJsonStorage("visitedViews") || [],
        cachedViews: getJsonStorage("cachedViews") || []
    },
    mutations: {
        ADD_VISITED_VIEW: (state, { view, rootGetters }) => {
            let name = '';
            if (view.path.indexOf('product/') >= 0 && !view.params.did) {
                // console.log(rootGetters.baseInfo.name)
                name = rootGetters.baseInfo.name;
            } else if (view.path.indexOf('rule/') >= 0) {
                name = rootGetters.ruleInfo.name
            } else {
                name = rootGetters.deviceInfo.name
            }
<<<<<<< HEAD
=======

>>>>>>> b46e48122dbaebbea750a5d7283fe790a68353b9
            if (state.visitedViews.some(v => v.path === view.path || (v.id === view.params.id && !view.params.did) || v.id === view.params.did)) return
            state.visitedViews.push(
                {
                    path: view.path,
                    title: view.meta.title || name || 'no-name',
                    id: view.params.did || view.params.id || ''
                }
            )
            setStorage("visitedViews", state.visitedViews);
        },
        ADD_CACHED_VIEW: (state, view) => {
            if (state.cachedViews.includes(view.name)) return
            if (!view.meta.noCache) {
                state.cachedViews.push(view.name)
            }


            DEL_VISITED_VIEW: (state, view) => {
                if (!state.visitedViews) { return }
                for (const [i, v] of state.visitedViews.entries()) {
                    if (v.path === view.path) {
                        state.visitedViews.splice(i, 1);
                        setStorage("visitedViews", state.visitedViews);
                        break;
                    }
                }
            },
                DEL_CACHED_VIEW: (state, view) => {
                    for (const i of state.cachedViews) {
                        if (i === view.name) {
                            const index = state.cachedViews.indexOf(i)
                            state.cachedViews.splice(index, 1)
                            setStorage("visitedViews", state.visitedViews);
                            break
                        }



                        UPDATE_VISITED_VIEW: (state, { view, rootGetters }) => {
                            let name = '';
                            if (view.path.indexOf('product') >= 0 && !view.params.did) {
                                name = rootGetters.baseInfo.name;
                            } else if (view.path.indexOf('rule') >= 0) {
                                name = rootGetters.ruleInfo.name
                            } else {
                                n otGetters.deviceInfo.name
                            }
                            for (let v of state.visitedViews) {
                                if (v.path === view.path || (v.id === view.params.id && !view.params.did) || v.id === view.params.did) {
                                    Object.assign(v, {
                                        path: view.path,
                                        title: view.meta.title || name || 'no-name',
                                        id: view.params.did || view.params.id || ''
                                    })
                                    setStorage("visitedViews", state.visitedViews);
                                    break
                                }
                            }


                        },
                            actions: {
                            addView({ dispatch }, view) {
                                dispatch('addVisitedView', view)
                                // dispatch('addCachedView', view)
                            },
                            addVisitedView({ commit, rootGetters }, view) {
                                commit('ADD_VISITED_VIEW', { view, rootGetters })
                            },
                            addCachedView({ commit }, view) {
                                ommit('ADD_CACHED_VIEW', view)


                                delView({ dispatch, state }, view) {
                                    return new Promise(resolve => {
                                        dispatch('delVisitedView', view)
                                        // dispatch('delCachedView', view)
                                        resolve({
                                            visitedViews: [...state.visitedViews],
                                            // cachedViews: [...state.cachedViews]
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