/*
 * @Author: Dhx
 * @Date: 2023-12-21 21:18:41
 * @Description: 
 * @FilePath: \RvcWeb\src\api\rvcModel\modelType.ts
 */
export type RvcModelVo = {
  id: string;
  name: string;
  type: string;
  label: any[];
  picture: string | null;
  avatar: string;
  collectionNum: string;
  createTime: string;
  description: string;
  isCollection: string;
  isFollow: string; 
  isLike: string;
  likesNum: string;
  nickname: string;
  note: string;
  uid: string;
  updateTime: string;
  username: string;
  viewNum: string;
}
export type ModelListForm = {
  limit?: number;
  page: number;
  /**
   * 排序类型，默认为-->1:"time",2:"view",3:"likes"，只需要传入数字即可
   */
  sortType?: string;
  [property: string]: any;
}
export type ModelListType = {
  limit?: number;
  page: number;
  /**
   * 默认时间倒排
   */
  sortType?: string;
  /**
   * 模型类型Id
   */
  typeId: string;
  [property: string]: any;
}
export type ModelType = {
  id: string;
  type: string;
  createTime: string;
}
export type FavoriteAndCollectionForm = {
  /**
   * 模型唯一Id
   */
  modelId: string;
  /**
   * 收藏(喜欢)0，取消收藏(喜欢)1
   */
  status: string;
  [property: string]: any;
}

export type ModelVo = {
  fileId: string;
  name: string;
  type: string;
  createTime:string;
  label: Array<string>;
  picture: string;
  description: string;
  note: string;
  viewNum: string;
  likesNum: string;
  collectionNum: string;
  isLike: string;
  isCollection: string;
  uid: string;
  username: string;
  nickname: string;
  avatar: string;
}
export type ModelComment = {
  id: string;
  uid: string;
  nickname: string;
  picture: string;
  content: string;
  likesNum: string;
  commentTime: string;
  modelId: string;
  likes: boolean;
}

export type GetCommentForm = {
  /**
   * 模型id
   */
  id: string;
  /**
   * 条数上限
   */
  limit: string;
  /**
   * 第几页
   */
  page: string;
  /**
   * 排序规则:0,1,2
   */
  sortType?: string;
  [property: string]: any;
}
export type LikeCommentForm = {
  /**
   * 评论id
   */
  id: string;
  /**
   * 0为点赞，1为取消点赞
   */
  type: string;
  [property: string]: any;
}

export type CommentAddForm = {
  replyId: string
  modelId: string
  content: string
}

export type GetLabelForm = {
  /**
   * 每页上限
   */
  limit?: string;
  /**
   * 第几页
   */
  page: string;
  [property: string]: any;
}
// 模型表单修改。表单目前包括：名称、描述、注意事项、图片
export type update = {
  id:string;
  name:string;
  description:string;
  note:string;
  picture:File;
}

export type ModelAddForm = {
  audioId?: string;
    /**
     * 模型描述
     */
    description: string;
    /**
     * 模型文件id
     */
    fileId: string[];
    /**
     * 标签id
     */
    label: string[];
    /**
     * 模型名称
     */
    name: string;
    /**
     * 模型注意事项
     */
    note: string;
    /**
     * 模型图片url
     */
    picture: string;
    /**
     * 类型id
     */
    typeId: string;
    [property: string]: any;

}

export type UserLikeModelForm = {
  /**
   * 每页条数限制
   */
  limit?: string;
  /**
   * 排序规则，0,1,2
   */
  order?: string;
  /**
   * 第几页
   */
  page: string;
  [property: string]: any;
}
export type UserCreateModelForm = {
  page: string;
  limit: string;
  order:string
}
export type UserCollectModelForm = {
  [property: string]: any;
}

export type GetChildCommentForm = {
  /**
   * 父评论id
   */
  id: string;
  /**
   * 每页限制条件
   */
  limit?: string;
  /**
   * 第几页
   */
  page: string;
  /**
   * 分页获取数据排序顺序，默认时间倒排
   */
  sortType?: string;
  [property: string]: any;
}

