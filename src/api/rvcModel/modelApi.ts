/*
 * @Author: Dhx
 * @Date: 2023-12-05 13:02:25
 * @Description: 
 * @FilePath: \RvcWeb\src\api\rvcModel\modelApi.ts
 */
import request from '@/utils/request'
import { CommentAddForm, FavoriteAndCollectionForm,GetCommentForm,GetLabelForm,LikeCommentForm,ModelListForm } from '@/api/rvcModel/modelType'
export function getModels (form:ModelListForm) {
    return request({
        url:'/model/list',
        method:'get',
        params:form
    })
}
export function getModelDetails(modelId:string){
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
export function commentAdd(form:CommentAddForm){
    return request({
        url:'/model/comment',
        method:'post',
        data:form
    })
}

export function getModelById(id:string){
    return request({
        url:'',
        method:'',
        params:id
    })
}

export function getRootComments(form:GetCommentForm){
    return request({
        url:'/model/comment/first',
        method:'get',
        params:form
    })
}

export function likeComments(form:LikeCommentForm){
    return request({
        url:'/model/comment/likes',
        method:'post',
        params:form
    })
}

export function getLabels(form:GetLabelForm){
    return request({
        url:'/model/label/labelHot',
        method:'get',
        params:form
    })
}

export function uploadModel(file1:File,file2:File){
    const formData = new FormData();
    formData.append('file',file1);
    formData.append('file',file2);

    return request({
        url:'/model/upload/model',
        method:'post',
        data:formData
    })
}

export function uploadAudio(file:File){
    const formData = new FormData();
    formData.append('file',file);

    return request({
        url:'/model/upload/audio',
        method:'post',
        data:formData
    })
}