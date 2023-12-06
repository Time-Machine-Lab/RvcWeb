import request from '@/utils/request'
export function getPosts (start:number,end:number) {
    return request({
        url:'m1/3628624-0-c888ea3d/post/list',
        params:{
            start:start,
            end:end
        }
    })
}