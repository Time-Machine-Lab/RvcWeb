import request from '../../utils/request'
import {profileForm} from '../../view/user/info/userTypes'

export function editUserInfo (form:profileForm) {
    return request.get('/api/editUserInfo',form)
}
export function getUserInfo () {
    return request.get('/api/getUserInfo')
}