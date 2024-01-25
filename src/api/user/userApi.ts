/*
 * @Author: Dhx
 * @Date: 2023-11-30 15:10:07
 * @Description: 
 * @FilePath: \RvcWeb\src\api\user\userApi.ts
 */
import request from '@/utils/request'
import { ProfileForm, EmailCodeForm, RegisterForm, LoginForm, UpdatePasswordForm } from '@/api/user/userTypes'
import { toFormData } from 'axios'

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
        url: '/user/getUserInfoById',
        method: 'get',
        params: {
            targetUid: id
        }
    })
}

export function followUser(followUid: string) {
    return request({
        url: '/user/follow',
        method: 'post',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data:toFormData({followUid:followUid})
    })
}

export function getFollowUsers() {
    return request({
        url: '/user/getMyFollowUser',
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
export function getUpdatePasswordCode(form: EmailCodeForm){
    return request({
        url:'/user/resetPwdEmailCode',
        method:'get',
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

export function logout() {
    return request({
        url: '/user/logout',
        method: 'post'
    })
}
export function getPreCode() {
    return request({
        url: '/user/preCode',
        method: 'get'
    })
}
export function updatePassword(form: UpdatePasswordForm) {
    return request({
        url: '/user/updatePassword',
        method: 'post',
        data: form
    })
}
export function forgetPassword(form: UpdatePasswordForm){
    return request({
        url:'/user/forgotPassword',
        method:'post',
        data: form
    })
}
export function uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return request({
        url: '/user/avatar',
        method: 'post',
        data: formData
    })
}