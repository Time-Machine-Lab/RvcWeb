/*
 * @Author: Dhx
 * @Date: 2023-12-05 13:02:25
 * @Description: 
 * @FilePath: \RvcWeb\src\api\rvcModel\modelApi.ts
 */
import request from '@/utils/request'
import {
    FavoriteAndCollectionForm,
    GetLabelForm,
    ModelAddForm,
    ModelListForm, ModelListType,
} from '@/api/rvcModel/modelType'
import { toFormData } from 'axios';
// 获取所有模型列表并按规则排序
export function getModels(form: ModelListForm) {
    return request({
        url: '/model/list',
        method: 'get',
        params: form
    })
}
// 根据type(AI_Type)获取模型列表
export function getModelsByType(form: ModelListType) {
    return request({
        url: "/model/listByType",
        method: "get",
        params: form
    });
}
// 获取指定模型详细信息
export function getModelDetails(modelId: string) {
    return request({
        url: '/model/getModelMsg',
        method: 'get',
        params: {
            modelId
        }
    })
}
// 动态获取label热度最高的list集合
export function getModelLabel(form: GetLabelForm) {
    return request({
        url: '/model/label/labelHot',
        method: 'get',
        params: form
    })
}
// 获取模型类型
export function getModelType() {
    return request({
        url: '/model/model/type',
        method: 'get'
    })
}
// 模型新建标签
export function postLabel(label: string) {
    return request({
        url: "/model/label",
        method: "post",
        params: { label }
    });
}
// 模型表单修改。表单目前包括：名称、描述、注意事项、图片
export function postUpdate(id: string) {
    return request({
        url: "/model/update",
        method: "post",
        params: { id }
    });
}
// 删除用户创建的模型
export function delModel(id: string) {
    return request({
        url: "/model/delModel",
        method: "post",
        params: { id }
    });
}
// 新增模型接口
export function modelAdd(form: ModelAddForm) {
    const formData = new FormData()
    formData.append('fileUrl', form.fileUrl);
    formData.append('name', form.name);
    formData.append('typeId', form.typeId);
    formData.append('description', form.description);
    formData.append('picture', form.picture);
    formData.append('note', form.note);
    for (let i = 0; i < form.label.length; i++) {
        formData.append('label', form.fileUrl[i]);
    }
    // formData.append('audioId', form.audioId);
    return request({
        url: '/model/addModel',
        method: 'post',
        data: formData
    })
}
// 用户点赞模型
export function favoriteModel(form: FavoriteAndCollectionForm) {
    return request({
        url: '/model/relative/likes',
        method: 'post',
        params: form
    })
}
// 用户收藏模型
export function collectModel(form: FavoriteAndCollectionForm) {
    return request({
        url: '/model/relative/collection',
        method: 'post',
        params: form
    })
}






