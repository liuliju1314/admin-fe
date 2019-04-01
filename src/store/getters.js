const getters = {
    token: state => state.user.token,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    baseInfo: state => state.product.baseInfo
}
export default getters