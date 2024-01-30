/*
 * @Author: Dhx
 * @Date: 2024-01-07 13:48:47
 * @Description: 
 * @FilePath: \RvcWeb\src\api\rvcModel\commentApi.ts
 */
import request from '@/utils/request.ts'
import {CommentAddForm, GetChildCommentForm, GetCommentForm} from "@/api/rvcModel/modelType.ts";
import {LikeCommentForm} from "@/api/post/postType.ts";
// 评论
// 模型评论，包含一级二级，一级评论不需要提供replyId
export function commentAdd(form:CommentAddForm){
    return request({
        url:'/model/comment',
        method:'post',
        data:form,
        headers: {
            isAuth: true
        }
    })
}
// 点赞取消点赞模型 √
export function likeComments(form:LikeCommentForm){
    return request({
        url:'/model/comment/likes',
        method:'post',
        params:form,
        headers: {
            isAuth: true
        }
    })
}
// 模型一级评论获取
export function getRootComments(form:GetCommentForm){
    return request({
        url:'/model/comment/first',
        method:'get',
        params:form
    })
}
// 模型模块二级评论获取
export function getChildComments(form:GetChildCommentForm){
    return request({
        url:'/model/comment/second',
        method:'get',
        params:form
    })
}

