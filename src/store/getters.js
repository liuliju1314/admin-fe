const getters = {
    code : state => state.user.code,
    phone: state => state.user.user.phone,
    username: state => state.user.user.username,
    avatar: state => state.user.user.avatar,
    uid: state => Number(state.user.uid)
}
export default getters