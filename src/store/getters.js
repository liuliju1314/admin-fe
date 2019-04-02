const getters = {
    token: state => state.user.token,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    baseInfo: state => state.product.baseInfo,
    ruleInfo: state => state.rule.ruleInfo
}
export default getters