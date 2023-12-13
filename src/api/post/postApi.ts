import request from '@/utils/request'
import { PostForm } from '@/api/post/postType'
export function getPosts (start:number,end:number) {
    return request({
        url:'/m1/3628624-0-3e257297/post/list',
        params:{
            start:start,
            end:end
        }
    })
}
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