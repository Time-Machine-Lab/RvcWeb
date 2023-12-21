<script setup lang="ts">
// 获取公告页面的公告数据列表
import {onMounted, ref} from "vue";
import {Notice, NoticeVO} from "@/api/home/introTypes.ts";
import {getWebNotice} from "@/api/home/introAPI.ts";

const NoticePage = ref<Notice>(<Notice>{page: "1", limit: "6",pageList:[],total:"6"});
const Notices = ref<NoticeVO[]>([
  {author: "RVC官方", content: "1", cover: "1", createAt: "1", likeNum: 0, noticeId: "1", title: "RVC一测公告", watchNum: 25},
  {author: "RVC官方", content: "1", cover: "1", createAt: "1", likeNum: 0, noticeId: "1", title: "RVC一测公告", watchNum: 25},
  {author: "RVC官方", content: "1", cover: "1", createAt: "1", likeNum: 0, noticeId: "1", title: "RVC一测公告", watchNum: 25},
  {author: "RVC官方", content: "1", cover: "1", createAt: "1", likeNum: 0, noticeId: "1", title: "RVC一测公告", watchNum: 25},
  {author: "RVC官方", content: "1", cover: "1", createAt: "1", likeNum: 0, noticeId: "1", title: "RVC一测公告", watchNum: 25},
  {author: "RVC官方", content: "1", cover: "1", createAt: "1", likeNum: 0, noticeId: "1", title: "RVC一测公告", watchNum: 25}]);
const getNoticeData = () => {
  getWebNotice(NoticePage.value.page).then((res: any) => {
    console.log(res)
    Notices.value = res.data.pageList;
    NoticePage.value = res.data;
    console.log(NoticePage.value.total)
  })
}
const handlePageChange = (newPage: number) => {
  NoticePage.value.page = String(newPage);
  getNoticeData();
};
onMounted(() => {
  getNoticeData()
});
</script>

<template>
  <div class="container">
    <table id="example" class="table table-hover responsive nowrap" style="width:100%">
      <thead>
      <tr>
        <th>封面</th>
        <th>标题</th>
        <th>作者</th>
        <th>浏览量</th>
        <th>创建时间</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in Notices" :key="index" class="body">
        <td>
          <div>
            <div class="avatar">
              <img :src="item.cover">
            </div>
          </div>
        </td>
        <td style="max-width:350px;">{{item.title}}</td>
        <td>{{item.author}}</td>
        <td>{{item.watchNum}}</td>
        <td>{{item.createAt}}</td>
        <td style="min-width: 50px; background: #c7c7c7;">
          <router-link :to="{ name: 'NoticeDetail', params: { id: item.noticeId } }" target="_blank" class="router">
            <p class="detail">查看详情</p>
          </router-link>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="pagination">
      <el-pagination
          background
          layout="prev, pager, next"
          :default-page-size="6"
          :total="NoticePage.total"
          :current-page.sync="NoticePage.page"
          @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<style scoped>
.router{
  width:80px;
  height:80px;
}
.pagination{
  display: flex;
  justify-content: center;
}
.body{
  font-family: 华文中宋;
}
.detail{
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.container{
  position: relative;
  width:80%;
  height:100%;
  margin-left: 10%;
}
.table {
  border-spacing: 0 0.85rem !important;
}

.table .dropdown {
  display: inline-block;
}

.table td,
.table th {
  vertical-align: middle;
  margin-bottom: 10px;
  border: none;
}

.table thead tr,
.table thead th {
  border: none;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: transparent;
  color:#ffffff;
  font-size: 16px;
}

.table td {
  background: #fff;
  padding:10px 0px;
}

.table td:first-child {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.table td:last-child {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

.avatar {
  width: 2.75rem;
  height: 2.75rem;
  line-height: 3rem;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  text-align: center;
  font-weight: 700;
  vertical-align: bottom;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: #cccccc;
}


table.dataTable.dtr-inline.collapsed
> tbody
> tr[role="row"]
> td:first-child:before,
table.dataTable.dtr-inline.collapsed
> tbody
> tr[role="row"]
> th:first-child:before {
  top: 28px;
  left: 14px;
  border: none;
  box-shadow: none;
}

table.dataTable.dtr-inline.collapsed > tbody > tr[role="row"] > td:first-child,
table.dataTable.dtr-inline.collapsed > tbody > tr[role="row"] > th:first-child {
  padding-left: 48px;
}

div.dataTables_wrapper div.dataTables_length label,
div.dataTables_wrapper div.dataTables_filter label {
  margin-bottom: 0;
}

.table a {
  color: #212529;
}

.table a:hover,
.table a:focus {
  text-decoration: none;
}

.avatar-blue {
  background-color: #c8d9f1;
  color: #467fcf;
}

</style>