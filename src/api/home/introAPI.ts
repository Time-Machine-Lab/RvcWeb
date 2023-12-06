import request from "../../utils/request";
import "./introTypes.ts";
import {
  Detail,
  HomeNotice,
  Info,
  Team,
  Tools,
} from "@/api/home/introTypes.ts";
export function getInfo(form: Info) {
  return request({
    url: "/web/info",
    method: "get",
    data: form,
  });
}
export function getTools(form: Tools) {
  return request({
    url: "/web/tools",
    method: "get",
    data: form,
  });
}
export function getTeam(form: Team) {
  return request({
    url: "/web/team",
    method: "get",
    data: form,
  });
}
export function getHomeNotice(form: HomeNotice) {
  return request({
    url: "/web/homeNotice",
    method: "get",
    data: form,
  });
}
export function getDetail(form: Detail) {
  return request({
    url: "/web/detail",
    method: "get",
    data: form,
  });
}
