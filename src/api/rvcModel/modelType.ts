export type RvcModelVo = {
    id: string;
  name: string;
  type: string;
  label: string[];
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
export type ModelListForm = {
    page: string;
    size?: string;
    /**
     * 排序类型，默认为-->1:"time",2:"view",3:"likes"，只需要传入数字即可
     */
    sortType?: string;
    [property: string]: any;
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
    [property: string]: any;
}