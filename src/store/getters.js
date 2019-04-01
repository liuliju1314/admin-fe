const getters = {
    token: state => state.user.token,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    name: state => state.product.name
}
export default getters