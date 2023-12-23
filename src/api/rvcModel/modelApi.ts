/*
 * @Author: Dhx
 * @Date: 2023-12-05 13:02:25
 * @Description: 
 * @FilePath: \RvcWeb\src\api\rvcModel\modelApi.ts
 */
import request from '@/utils/request'
import { FavoriteAndCollectionForm,ModelListForm } from '@/api/rvcModel/modelType'
export function getModels (form:ModelListForm) {
    return request({
        url:'/model/list',
        method:'get',
        params:form
    })
}
export function getModelDetails(modelId:number){
    return request({
        url:'/model/getModelMsg',
        method:'get',
        params:{
            modelId:modelId
        }
    })

}
export function getModelType(){

}

export function favoriteModel(form:FavoriteAndCollectionForm){
    return request({
        url:'',
        method:'',
        params:form
    })
}

export function collectModel(form:FavoriteAndCollectionForm){
    return request({
        url:'',
        method:'',
        params:form
    })
}
export function commentAdd(){
    return request({
        url:'',
        method:'',
        params:''
    })
}

export function getModelById(id:number){
    return request({
        url:'',
        method:'',
        params:id
    })
}