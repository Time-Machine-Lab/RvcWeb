// 用户添加反馈帖子
export interface AddResponse {
    /**
     * 状态码
     */
    code: string;
    /**
     * 响应数据，所有返回的数据
     */
    data: Add;
    /**
     * 响应信息，返回响应的相关信息，只能是字符串文本
     */
    msg?: string;
    /**
     * 时间戳
     */
    timestamp: string;
    [property: string]: any;
}
export interface Add {
    /**
     * 内容，更新和添加时必须存在
     */
    content: string;
    /**
     * 反馈帖子ID，更新时必须存在
     */
    fbid: string;
    /**
     * 标题，更新和添加时必须存在，长度不超过40
     */
    title: string;
    /**
     * 帖子类型，添加时必须存在，且必须为社区已有的类型ID
     */
    type: number;
    [property: string]: any;
}
// 获取反馈帖子的所有类型
export interface TypeListItem {
    id: number;
    type: string;
    [property: string]: any;
}
// 更新一个feedback帖子 1,必须拥有fbid 2,不可更改帖子id 与 帖子类型
export interface Update {
    content: string;
    fbid: number;
    title: string;
    type: number;
    [property: string]: any;
}
// 获取反馈帖子的状态列表
export interface StatesListItem {
    id: number;
    status: string;
    [property: string]: any;
}
// 分页获取feedback列表
export interface ListItems {
    /**
     * 一页的内容
     */
    limit: number;
    /**
     * 页数
     */
    page: number;
    /**
     * 一页数据
     */
    pageList: FeedbackItem[];
    /**
     * 总共数据
     */
    total: number;
}
export interface FeedbackItem {
    /**
     * 用户头像
     */
    avatar: string;
    /**
     * 评论数
     */
    commentNum: number;
    /**
     * 帖子内容
     */
    content: string;
    /**
     * 发布时间
     */
    createAt: string;
    /**
     * 反馈帖子id
     */
    fbid: number;
    /**
     * 是否展示
     */
    hasShow: number;
    /**
     * 是否点赞
     */
    hasUp: number;
    /**
     * 用户昵称
     */
    nickname: string;
    /**
     * 帖子的状态id
     */
    status: number;
    /**
     * 帖子的状态名称
     */
    statusName: string;
    /**
     * 帖子标题
     */
    title: string;
    /**
     * 帖子的类型id
     */
    type: number;
    /**
     * 帖子的类型名称
     */
    typeName: string;
    /**
     * 帖子发布用户id
     */
    uid: string;
    /**
     * 点赞数
     */
    upNum: number;
    [property: string]: any;
}
// 获取某个帖子的评论列表
export interface Comment {
    /**
     * 一页的内容
     */
    limit:number;
    /**
     * 页数
     */
    page:number;
    /**
     * 一页数据
     */
    pageList: CommentList[];
    /**
     * 总共数据
     */
    total:number;
    [property: string]: any;
}
export interface CommentList {
    /**
     * 是否点赞
     */
    hasLike: number;
    /**
     * 评论用户 头像
     */
    avatar: string;
    /**
     * 评论id
     */
    cmid: number;
    /**
     * 评论内容
     */
    comment: string;
    /**
     * 评论时间
     */
    createAt: string;
    /**
     * 是否展示
     */
    hasShow: number;
    /**
     * 点赞数
     */
    likeNum: number;
    /**
     * 评论用户 昵称
     */
    nickname: string;
    /**
     * 被回复用户 头像
     */
    replyAvatar: string;
    /**
     * 回复评论id
     */
    replyCmId?: number;
    /**
     * 被回复的评论内容
     */
    replyComment: string;
    /**
     * 回复反馈帖子id
     */
    replyFbId: number;
    /**
     * 被回复用户 昵称
     */
    replyNickname: string;
    /**
     * 被回复用户id
     */
    replyUid: string;
    /**
     * 被回复用户 用户名
     */
    replyUsername: string;
    /**
     * 评论用户id
     */
    uid: string;
    /**
     * 评论用户 用户名
     */
    username: string;
    [property: string]: any;
}
// 添加某个反馈帖子下的评论，同时会增加反馈帖子评论数
export interface postComment {
    /**
     * 评论内容(长度不超过600)
     */
    comment: string;
    /**
     * 回复的评论id（不一定需要）
     */
    replyCmId?: string;
    /**
     * 回复的帖子
     */
    replyFbId: string;
    [property: string]: any;
}
