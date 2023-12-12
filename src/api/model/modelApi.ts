/*
 * @Author: Dhx
 * @Date: 2023-12-05 13:02:25
 * @Description: 
 * @FilePath: \RvcWeb\src\api\model\modelApi.ts
 */
import request from '@/utils/request'
export function getModels (start:number,end:number) {
    return request({
        url:'/m1/3628624-0-e33a4cd6/getModels',
        params:{
            start:start,
            end:end
        }
    })
}