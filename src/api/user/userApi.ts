/*
 * @Author: Dhx
 * @Date: 2023-11-30 15:10:07
 * @Description: 
 * @FilePath: \RvcWeb\src\api\user\userApi.ts
 */
import request from '@/utils/request'
import { ProfileForm, EmailCodeForm, RegisterForm, LoginForm } from '@/api/user/userTypes'

export function editUserInfo(form: ProfileForm) {
    return request({
        url: '/user/update',
        method: 'post',
        data: form
    })
}
export function getLoginUserInfo() {
    return request({
        method: 'get',
        url: '/user/getUserInfo',
    })
}

export function getUserInfoById(id: string) {
    return request({
        url: '/user/getUserInfo',
        method: 'get',
        headers:{
            'uid':id
        }
    })
}

export function getFollowUsers(id: string) {
    return request({
        url: '/m1/3628624-0-3e257297/getFollowUsers?id=' + id,
        method: 'get',
    })
}

export function getCode(form: EmailCodeForm) {
    return request({
        url: '/user/email',
        method: 'get',
        params: form
    })
}

export function register(form: RegisterForm) {
    return request({
        url: '/user/register',
        method: 'post',
        data: form
    })
}

export function login(form: LoginForm) {
    return request({
        url: '/user/login',
        method: 'post',
        data: form
    })
}

export function logout(){
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
export function getPreCode(){
    return request({
        url: '/user/preCode',
        method:'get'
    })
}