import request from '@/utils/request'
export function getModels (start:number,end:number) {
    return request({
        url:'/m1/3628624-0-3e257297/getModels',
        params:{
            start:start,
            end:end
        }
    })
}