import request from '@/utils/request'
import { PostForm,PostListForm } from '@/api/post/postType'

export function getPostById(post_id:number){
    return request({
        method:'get',
        url:'?post_id='+post_id,
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
