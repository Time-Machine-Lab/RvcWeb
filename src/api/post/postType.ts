/*
 * @Author: Dhx
 * @Date: 2023-12-06 17:26:28
 * @Description: 
 * @FilePath: \RvcWeb\src\api\post\postType.ts
 */
import {UserInfoVO} from '@/api/user/userTypes'
export type PostVo = {
    /**
     * 作者头像
     */
    avatar: string;
    /**
     * 是否收藏
     */
    collect: string;
    /**
     * 收藏数
     */
    collectNum: string;
    /**
     * 评论数
     */
    commentNum: string;
    /**
     * 帖子内容
     */
    content: string;
    /**
     * 帖子封面
     */
    cover: string;
    /**
     * 创建日期
     */
    createAt: string;
    /**
     * 是否点赞
     */
    like: string;
    /**
     * 点赞数
     */
    likeNum: string;
    /**
     * 作者昵称
     */
    nickname: string;
    /**
     * 帖子id
     */
    postId: string;
    /**
     * 帖子类型
     */
    tagId: string;
    /**
     * 帖子标题
     */
    title: string;
    /**
     * 创建帖子用户id
     */
    uid: string;
    /**
     * 更新日期
     */
    updateAt: string;
    /**
     * 作者用户名
     */
    username: string;
    /**
     * 浏览数
     */
    watchNum: string;
    [property: string]: any;
}


export type PostForm = {
    /**
     * 帖子内容
     */
    content: string;
    /**
     * 帖子封面
     */
    coverId: string;
    /**
     * 帖子类型
     */
    tagId: string;
    /**
     * 帖子标题
     */
    title: string;
    [property: string]: any;
}


export type PostType = {
    tag_id: string
    tag_name: string
    tag_img: string
}

export type CommentVo = {
    postCommentId: string
    content: string
    createAt: string
    userId: string
    postId: string
    commentLikeCount: number
    rootCommentId: string
    toUserId: string
    updateAt: string
    user: UserInfoVO | null
    replayUser: UserInfoVO | null
    childrenComment: UserInfoVO | null

}

export type PostListForm = {
    data:string
    page:string
    limit:string
    tagId:string
}

export type RvcCommunicationPostType = {
    tagId: string
    tagImg?: string
    tagName?: string
    [property: string]: any
}

export type FavoriteAndCollectionForm = {
    /**
     * 帖子id、评论id
     */
    id: string;
    /**
     * 1、点赞   0、取消点赞
     */
    type: string;
    [property: string]: any;
}

export type GetCommentListForm = {
    data?: string;
    limit?: string;
    page?: string;
    [property: string]: any;
}

export type CommentForm = {
    /**
     * 内容
     */
    content: string;
    /**
     * 所属帖子id
     */
    postId: string;
    /**
     * 顶级评论id
     */
    rootCommentId: string;
    /**
     * 回复目标评论id
     */
    toCommentId: string;
    /**
     * 回复目标用户id
     */
    toUserId: string;
    [property: string]: any;
}
