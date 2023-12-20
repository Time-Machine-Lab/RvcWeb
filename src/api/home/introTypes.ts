
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

/**
 * NoticeVO
 */
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
export type Detail = {
    author: "RVC社区官方"
    content: "欢迎来到RVC社区"
    cover: "https://s2.loli.net/2023/12/11/R6GBQLNJKlvcOmE.png"
    createAt: "2023-11-29 01:47:50"
    likeNum: 0;
    noticeId: "5bcd73d6-8546-42a7-8afe-1819643aac6c"
    title: ""
    watchNum: 0
}