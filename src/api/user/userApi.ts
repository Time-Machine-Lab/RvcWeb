import request from '@/utils/request'
import {ProfileForm} from '@/view/user/info/userTypes'

export function editUserInfo (form:ProfileForm) {
    return request({
        url:'/m1/3628624-0-3e257297/getUserInfo',
        method: 'get',
        data: form
    })
}
export function getLoginUserInfo () {
    return request.get('/m1/3628624-0-3e257297/getUserInfo')
}

export function getUserInfoById (id:string) {
    return request({
        url:'/m1/3628624-0-3e257297/getUserInfoById?id=' + id,
        method: 'get',
    })
}

export function getFollowUsers (id:string) {
    return request({
        url:'/m1/3628624-0-3e257297/getFollowUsers?id=' + id,
        method: 'get',
    })
}