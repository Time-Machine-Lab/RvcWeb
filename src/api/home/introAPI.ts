import request from "../../utils/request";

export function getInfo() {
  return request({
    url: "/web/info",
    method: "get",
  });
}
export function getTools() {
  return request({
    url: "/web/tools",
    method: "get",
  });
}
export function getTeam() {
  return request({
    url: "/web/team",
    method: "get",
  });
}
export function getHomeNotice() {
  return request({
    url: "/web/notice/homeNotice",
    method: "get",
  });
}
export function getWebNotice(page: string) {
  return request({
    url: "/web/notice/webNotice",
    method: "get",
    params: {
      page
    }
  });
}
// 获取一个公告的详细信息
export function getDetail(noticeId:string) {
  return request({
    url: "/web/notice/detail",
    method: "get",
    params: {
      noticeId
    }
  });
}
