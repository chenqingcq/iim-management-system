import request from './axios';
/**
 * 登录
 * @param adminUid 用户账号
 * @param adminPwd 密码
 */
export function login(params) {
    return request({
        url: '/gateway/web/admin/login',
        method: 'post',
        params
    })
}
/**
 * 退出
 * @param 
 * @param token
 */
export function logout(params) {
    return request({
        url: '/gateway/web/admin/logout',
        method: 'post',
        params
    })
}