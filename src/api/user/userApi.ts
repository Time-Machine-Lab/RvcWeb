import request from '../../utils/request'
import {profileForm} from '../../view/user/info/userTypes'

export function editUserInfo (form:profileForm) {
    return request.get('/m1/3628624-0-default/getUserInfo',form)
}
export function getUserInfo () {
    return request.get('/m1/3628624-0-default/getUserInfo')
}