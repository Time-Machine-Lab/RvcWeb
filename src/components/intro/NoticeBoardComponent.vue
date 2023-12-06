<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoticeBoard",
  data() {
    return {
      NoticeImg: [
        { img: "../../../public/teamPic/dhx.jpg" },
        { img: "../../../public/teamPic/dhx.jpg" },
        { img: "../../../public/teamPic/Genius.png" },
        { img: "../../../public/teamPic/huaerbuku.jpg" },
        { img: "../../../public/teamPic/jq.png" },
        { img: "../../../public/teamPic/lishiming.webp" },
        { img: "../../../public/teamPic/wangyoucao.jpg" },
      ],

      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-04",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-01",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-08",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-06",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
});
// 公告栏
</script>

<template>
  <div class="NoticeBoard flex">
    <!--轮播图-->
    <el-carousel height="auto" autoplay>
      <el-carousel-item
        v-for="(ImgItem, index) in NoticeImg"
        :key="index"
        style="height: 500px"
      >
        <img :src="ImgItem.img" alt="Team Member Image" />
      </el-carousel-item>
    </el-carousel>
    <!--公告栏-->
    <el-tabs class="demo-tabs" stretch="stretch">
      <el-tab-pane label="综合" name="first">
        <el-card class="box-card">
          <div
            v-for="(item, index) in tableData"
            :key="index"
            class="item flex"
          >
            <router-link
              :to="{ name: 'NoticeDetail', params: { id: index } }"
              target="_blank"
            >
              {{ item.date }}
            </router-link>
          </div>
          <template #footer>
            <div class="card-header">
              <div class="cardName">Card name</div>
              <el-button class="button" text>查看更多</el-button>
            </div>
          </template>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">公告</el-tab-pane>
      <el-tab-pane label="Role" name="third">攻略</el-tab-pane>
      <el-tab-pane label="Task" name="fourth">社区</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.NoticeBoard {
  width: 100%;
  height: 600px;
  flex-direction: row;
  background-image: url("public/backPic/NoticeBack.png");
  background-size: cover;
  .el-carousel {
    height: 500px;
    width: 55%;
  }
  .el-carousel img {
    width: 100%;
  }
  .demo-tabs {
    border-radius: 10px;
    margin-left: 20px;
    background: rgba(77, 75, 75, 0.4);
    width: 30%;
    height: 500px;
  }
  .box-card {
    border: 0;
    height: 100%;
    background: rgba(255, 255, 255, 0);
  }
  .card-header {
    display: flex;
    flex-direction: row;
    font-size: 20px;
    width: 100%;
    height: 50px;
  }
  .cardName {
    width: 70%;
  }
  .item {
    width: 100%;
    color: #ffffff;
    justify-content: left;
    font-size: 17px;
    cursor: pointer;
    height: 50px;
    border-bottom: solid 1px #dadada;
  }
  .item a {
    color: #ffffff;
    text-decoration: none;
  }
  .item a:hover {
    color: #3e73e5;
  }
  .button {
    width: 30%;
    background: #efefef;
  }
}
</style>
