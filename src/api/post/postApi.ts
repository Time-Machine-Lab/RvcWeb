import request from '@/utils/request'
export function getPosts (start:number,end:number) {
    return request({
        url:'/m1/3628624-0-3e257297/post/list',
        params:{
            start:start,
            end:end
        }
    })
}