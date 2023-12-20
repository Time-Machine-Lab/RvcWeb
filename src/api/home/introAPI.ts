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
export function getDetail() {
  return request({
    url: "/web/detail",
    method: "get",
  });
}
