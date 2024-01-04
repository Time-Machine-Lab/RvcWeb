import {UserCollectModelForm, UserCreateModelForm, UserLikeModelForm} from "@/api/rvcModel/modelType.ts";
import request from "@/utils/request.ts";
// 获取用户创建的模型列表
export function getUserCreateModels(form:UserCreateModelForm){
    return request({
        url:'/model/user/model',
        method:'get',
        params:form
    })
}
// 获取用户自己的喜欢列表
export function getUserLikeModels(form:UserLikeModelForm){
    return request({
        url:'/model/likes',
        method:'get',
        params:form,
    })
}
// 获取用户个人主页收藏列表
export function getUserCollectModels(form:UserCollectModelForm){
    return request({
        url:'/model/collection',
        method:'post',
        params:form
    })
}
