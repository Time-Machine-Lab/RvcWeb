
// 网站首页信息
export interface Info {
    id: number
    officialConcat: string
    rvcDescription: string
    rvcVersion: string
    webDescription: string
    webName: string
}
// 社区功能
export interface Tools {
    id: number
    img: string
    tool: string
    url: string
}
// 团队成员
export interface Team {
    id: 1,
    avatar: string
    description: string
    nickname: string
    role: string
}
// 获取首页的轮播图公告信息
export interface Board {
    /**
     * 一页的内容
     */
    limit: string;
    /**
     * 页数
     */
    page: string;
    /**
     * 一页数据
     */
    pageList: BoardVO[];
    /**
     * 总共数据
     */
    total: string;
    [property: string]: any;
}
export interface BoardVO {
    /**
     * 作者
     */
    author: string;
    /**
     * 内容
     */
    content: string;
    /**
     * 公告封面
     */
    cover: string;
    /**
     * 创建时间
     */
    createAt: string;
    /**
     * 点赞数量
     */
    likeNum: number;
    /**
     * 公告ID
     */
    noticeId: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 浏览量
     */
    watchNum: number;
    [property: string]: any;
}
// 获取公告页面的公告数据列表
export interface Notice {
    /**
     * 一页的内容
     */
    limit: string;
    /**
     * 页数
     */
    page: string;
    /**
     * 一页数据
     */
    pageList: NoticeVO[];
    /**
     * 总共数据
     */
    total: string;
    [property: string]: any;
}
export interface NoticeVO {
    /**
     * 作者
     */
    author: string;
    /**
     * 内容
     */
    content: string;
    /**
     * 公告封面
     */
    cover: string;
    /**
     * 创建时间
     */
    createAt: string;
    /**
     * 点赞数量
     */
    likeNum: number;
    /**
     * 公告ID
     */
    noticeId: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 浏览量
     */
    watchNum: number;
    [property: string]: any;
}
export interface DetailVO {
    /**
     * 作者
     */
    author: string;
    /**
     * 内容
     */
    content: string;
    /**
     * 公告封面
     */
    cover: string;
    /**
     * 创建时间
     */
    createAt: string;
    /**
     * 点赞数量
     */
    likeNum: number;
    /**
     * 公告ID
     */
    noticeId: string;
    /**
     * 标题
     */
    title: string;
    /**
     * 浏览量
     */
    watchNum: number;
    [property: string]: any;
}
