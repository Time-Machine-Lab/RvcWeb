import request from "../../utils/request";
import {Add, postComment, Update} from "@/api/feedback/feedbackTypes.ts";
// 用户添加反馈帖子
export function postAdd(formData: Add) {
  return request({
    url: "/feedback/add",
    method: "post",
    data:{
      content:formData.content,
      fbid:formData.fbid,
      title:formData.title,
      type:formData.type
    },
  });
}
// 获取反馈帖子的所有类型
export function getTypeList() {
  return request({
    url: "/feedback/type/list",
    method: "get",
  });
}
// 更新一个feedback帖子 1,必须拥有fbid 2,不可更改帖子id 与 帖子类型
export function postUpdate(formData: Update) {
  return request({
    url: "/feedback/update",
    method: "post",
    data: formData,
  });
}
// 获取反馈帖子的状态列表
export function getStatusList() {
  return request({
    url: "/feedback/status/list",
    method: "get",
  });
}
// 分页获取feedback列表
export function getList(page: number,limit:number,order:string) {
  return request({
    url: "/feedback/list",
    method: "get",
    params: {
      page,
      limit,
      order
    },
  });
}
// 根据fb_id获取对应的feedback帖子
export function getFeedback(fbid: number) {
  return request({
    url: "/feedback/getFeedback",
    method: "get",
    params: {
      fbid,
    },
  });
}
// 获取某个帖子的评论列表
export function getComment(fbid: string, page: number, limit: number, order: string) {
  return request({
    url: `/feedback/comment/list`,
    method: 'get',
    params: {
      fbid,
      page,
      limit,
      order,
    },
  });
}
// 添加某个反馈帖子下的评论，同时会增加反馈帖子评论数
export function getCommentAdd(formData: postComment) {
  return request({
    url: "/feedback/comment/add",
    method: "post",
    data: formData,
  });
}
// 添加某个反馈帖子下的评论，同时会增加反馈帖子评论数
export function getCommentLike(cmId:number,isLike:number) {
  return request({
    url: "/feedback/comment/like",
    method: "get",
    params:{
      cmId,
      isLike
    }
  });
}
// 对反馈帖子点赞，不能重复点赞，不能取消未点赞的帖子
export function getLike(fbId:number,isLike:number) {
  return request({
    url: "/feedback/like",
    method: "get",
    params:{
      fbId,
      isLike
    }
  });
}