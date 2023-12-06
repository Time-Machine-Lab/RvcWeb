export type Info = {
  id: 1;
  officialConcat: "QQ:901648607";
  rvcDescription: "训练出当前最强开源人声音高提取模型RMVPE，并用于RVC的训练、离线/实时推理，支持pytorch/onnx/DirectML\\r\\n通过pytorch-dml支持A卡和I卡的</br>（1）实时变声（2）推理（3）人声伴奏分离（4）训练暂未支持，会切换至CPU训练；通过onnx_dml支持rmvpe_gpu的推理";
  rvcVersion: "1.6";
  webDescription: "RVC社区是一个致力于分享和交流RVC（Retrieval based Voice Conversion，检索式声音转换）技术的平台。RVC是一个基于VITS语音合成系统的开源工具，能实现实时声音变换，适用于直播、视频录制等场景";
  webName: "RVC官方社区";
}

export type Tools = {
    id: 1;
    img: "/img/tool-person.png";
    tool: "个人账号";
    url: "/";
}
export type Team = {
    id: 1,
    avatar: "/"
    description: "RVC开源项目创始人"
    nickname: "花儿不哭"
    role: "社区创造者"
}
export type HomeNotice = {
    noticeId: "5bcd73d6-8546-42a7-8afe-1819643aac6c",
    title: "欢迎来到RVC社区",
    author: "RVC社区官方",
    content: null,
    cover: "/",
    createAt: "2023-11-29 01:47:50",
    likeNum: null,
    watchNum: 0
}
export type Detail = {
    author: "RVC社区官方"
    content: "欢迎来到RVC社区"
    cover: "public/backPic/NoticeBack.png"
    createAt: "2023-11-29 01:47:50"
    likeNum: 0;
    noticeId: "5bcd73d6-8546-42a7-8afe-1819643aac6c"
    title: ""
    watchNum: 0
}