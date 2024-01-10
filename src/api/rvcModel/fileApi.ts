import request from "@/utils/request.ts";
// 上传模型图片接口
export function uploadImages(file:File){
    const formData = new FormData();
    formData.append('file',file);
    return request({
        url:'/model/upload/image',
        method:'post',
        data:formData,
        timeout:30000
    })
}
//上传音频接口
export function uploadAudio(file:File){
    const formData = new FormData();
    formData.append('file',file);
    return request({
        url:'/model/upload/audio',
        method:'post',
        data:formData,
        timeout:30000
    })
}
// 模型下载，需要传入modelId。需要判断是否登录
export function getModelFiles(modelId:string){
    return request({
        url:'/model/download',
        method:'post',
        params: {
            modelId: modelId
        }
    })
}

