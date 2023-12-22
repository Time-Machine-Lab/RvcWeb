/*
 * @Author: Dhx
 * @Date: 2023-12-06 17:26:28
 * @Description: 
 * @FilePath: \RvcWeb\src\api\post\postType.ts
 */
import { UserInfoVO } from '@/api/user/userTypes'
export type PostVo = {
    postId: string;
    author: UserInfoVO;
    postType: PostType;
    title: string;
    content: string;
    cover: string | null;
    commentNum: number;
    likeNum: number;
    collectNum: number;
    watchNum: number;
    createAt: string;
    updateAt: string;
    like: boolean;
    collect: boolean;
}


export type PostForm = {
    /**
     * 帖子内容
     */
    content: string;
    /**
     * 帖子封面
     */
    coverId: string|null;
    /**
     * 帖子类型
     */
    tagId: string;
    /**
     * 帖子标题
     */
    title: string;
    /**
     * 贴子id(修改时传)
     */
    postId?: string;
    [property: string]: any;
}


export type PostType = {
    id: string
    tagName: string
    tagImg: string
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
    data: string|undefined
    page: string
    limit: string
    tagId: string|undefined
}

export type RvcCommunicationPostType = {
    id: string
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
export type UserLikePostForm = {
    data?: string;
    limit?: string;
    page?: string;
    [property: string]: any;
}

export type UserCreatePostForm = {
    limit?: string;
    page?: string;
    [property: string]: any;
}

export type GetPostDetailsForm = {
    postId: string;
    [property: string]: any;
}

export type DeletePostForm = {
    postId: string;
}