import Mock from 'mockjs'
import loginAPI from './user'


// 登录相关
Mock.mock(/\/api\/user\/login/, 'post', loginAPI.userLogin)
Mock.mock(/\/api\/user\/logout/, 'get', loginAPI.userLogout)
export default Mock