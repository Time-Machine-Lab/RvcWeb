/*
 * @Author: Dhx
 * @Date: 2023-12-05 13:02:25
 * @Description: 
 * @FilePath: \RvcWeb\src\api\rvcModel\modelApi.ts
 */
import request from '@/utils/request'
import { CommentAddForm, FavoriteAndCollectionForm,GetChildCommentForm,GetCommentForm,GetLabelForm,LikeCommentForm,ModelAddForm,ModelListForm, UserCollectModelForm, UserCreateModelForm, UserLikeModelForm } from '@/api/rvcModel/modelType'
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
export function getModelLabel(form:GetLabelForm){
    return request({
        url:'/model/label/labelHot',
        method:'',
        params:form
    })
}

export function favoriteModel(form:FavoriteAndCollectionForm){
    return request({
        url:'/model/relative/likes',
        method:'post',
        params:form
    })
}

export function collectModel(form:FavoriteAndCollectionForm){
    return request({
        url:'/model/relative/collection',
        method:'post',
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
        data:formData,
        timeout:3600000
    })
}

export function uploadAudio(file:File){
    const formData = new FormData();
    formData.append('file',file);

    return request({
        url:'/model/upload/audio',
        method:'post',
        data:formData,
        timeout:300000
    })
}

export function uploadImages(file:File){
    const formData = new FormData();
    formData.append('file',file);

    return request({
        url:'/model/upload/image',
        method:'post',
        data:formData,
        timeout:300000
    })
}

export function getUserLikeModels(form:UserLikeModelForm){
    return request({
        url:'/model/likes',
        method:'get',
        params:form,
    })
}   
export function getUserCollectModels(form:UserCollectModelForm){
    return request({
        url:'/model/collection',
        method:'post',
        params:form
    })
}
export function getUserCreateModels(form:UserCreateModelForm){
    return request({
        url:'/model/user/model',
        method:'get',
        params:form
    })
}
export function modelAdd(form:ModelAddForm){
    return request({
        url:'/model/addModel',
        method:'post',
        params:form
    })
}

export function getChildComments(form:GetChildCommentForm){
    return request({
        url:'/model/comment/second',
        method:'get',
        params:form
    })
}

export function getModelFiles(modelId:string){
    return request({
        url:'/model/model/modelFile',
        method:'get',
        params: {
            modelId: modelId
        }
    })
}