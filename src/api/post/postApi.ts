/*
 * @Author: Dhx
 * @Date: 2023-12-06 16:01:59
 * @Description: 
 * @FilePath: \RvcWeb\src\api\post\postApi.ts
 */
import request from '@/utils/request'
import { GetCommentListForm, FavoriteAndCollectionForm, PostForm,PostListForm, CommentForm,UserLikePostForm, UserCreatePostForm, GetPostDetailsForm } from '@/api/post/postType'

export function getPostById(post_id:number){
    return request({
        method:'get',
        url:'/communication/post/details?postId='+post_id,
    })
}

export function addPost(post:PostForm){
    return request({
        method:'post',
        url:'/communication/post/add',
        params:{
            title:post.title,
            content:post.content,
            cover:post.cover
        }
    })
}

export function getPostType(){
    return request({
        method:'get',
        url:'/communication/post/type/list'
    })
}
export function getPosts(form:PostListForm){
    return request({
        method:'get',
        url:'/communication/post/list',
        params:form
    })
}

export function favoritePost(form:FavoriteAndCollectionForm){
    return request({
        method:'put',
        url:'/communication/post/favorite',
        params:form
    })
}
export function collectPost(form:FavoriteAndCollectionForm){
    return request({
        method:'put',
        url:'/communication/post/collection',
        params:form
    })
}
export function getCommentList(form:GetCommentListForm){
    return request({
        method:'get',
        url:'/communication/comment/list',
        params:form
    })
}

export function commentAdd(form:CommentForm){
    return request({
        method:'post',
        url:'/communication/comment/add',
        params:form
    })
}

export function postAdd(form:PostForm){
    return request({
        method:'post',
        url:'/communication/post/add',
        params:form
    })
}

export function getUserLikePosts(form:UserLikePostForm){
    return request({
        method:'get',
        url:'/communication/post/user/favorite',
        params:form
    })
}

export function getUserCreatePosts(form:UserCreatePostForm){
    return request({
        method:'get',
        url:'/communication/post/user/create',
        params:form
    })
}
export function getPostDetails(form:GetPostDetailsForm){
    return request({
        method:'get',
        url:'/communication/post/details',
        params:form
    })
}