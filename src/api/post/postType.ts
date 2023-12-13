/*
 * @Author: Dhx
 * @Date: 2023-12-06 17:26:28
 * @Description: 
 * @FilePath: \RvcWeb\src\view\post\postType.ts
 */
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
