/*
 * @Author: Dhx
 * @Date: 2023-12-06 17:26:28
 * @Description: 
 * @FilePath: \RvcWeb\src\api\post\postType.ts
 */
import {UserInfoVO} from '@/api/user/userTypes'
export type PostVo = {
    post_id: number;
    uid: number;
    username: string;
    nickname: string;
    avatar: string;
    tag_id: number;
    title: string;
    content: string;
    cover: string;
    comment_num: number;
    like_num: number;
    collect_num: number;
    watch_num: number;
    create_at: string;
    has_collect: boolean;
    has_like: boolean;
};

export type PostForm = {
    title: string;
    content: string;
    cover: string;
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
    tag_id: string;
    tag_img?: string;
    tag_name?: string;
    [property: string]: any;
}