<script setup lang="ts">
const invitations = [{title:"从其他UI导入生成数据",data:"我使用 InvokeAI，并且看到其他一些人在这里和那里提到它。上传图片时，我需要手动复制和粘贴每张图片，有时可能会有点多。\n" +
      "也无法手动添加使用的模型/lora，或添加其他模型/lora（后者在将图片添加到模型/lora的图库时）。\n" +
      "如果有一种方法可以将其引入，那就太好了，就像自动 1111 一样。",time:"4小时前"},
  {title:"从其他UI导入生成数据",data:"我使用 InvokeAI，并且看到其他一些人在这里和那里提到它。上传图片时，我需要手动复制和粘贴每张图片，有时可能会有点多。\n" +
        "也无法手动添加使用的模型/lora，或添加其他模型/lora（后者在将图片添加到模型/lora的图库时）。\n" +
        "如果有一种方法可以将其引入，那就太好了，就像自动 1111 一样。",time:"4小时前"},
  {title:"从其他UI导入生成数据",data:"我使用 InvokeAI，并且看到其他一些人在这里和那里提到它。上传图片时，我需要手动复制和粘贴每张图片，有时可能会有点多。\n" +
        "也无法手动添加使用的模型/lora，或添加其他模型/lora（后者在将图片添加到模型/lora的图库时）。\n" +
        "如果有一种方法可以将其引入，那就太好了，就像自动 1111 一样。",time:"4小时前"},
  {title:"从其他UI导入生成数据",data:"我使用 InvokeAI，并且看到其他一些人在这里和那里提到它。上传图片时，我需要手动复制和粘贴每张图片，有时可能会有点多。\n" +
        "也无法手动添加使用的模型/lora，或添加其他模型/lora（后者在将图片添加到模型/lora的图库时）。\n" +
        "如果有一种方法可以将其引入，那就太好了，就像自动 1111 一样。",time:"4小时前"}]
</script>

<template>
  <div class="home">
    <div class="contain flex">
      <div class="contain-choice flex">
        <div class="choice-item flex">所有反馈</div>
        <div class="choice-item flex">功能请求</div>
        <div class="choice-item flex">bug</div>
      </div>
      <div class="contain-left">
        <div class="contain-say flex">
          <h3 style="margin-bottom: 10px">有话要说吗？</h3>
          <p>告诉 Civitai 他们如何使产品对您更有用。</p>
        </div>
        <div class="contain-search flex">
          <button class="contain-search__item flex">最新</button>
          <button class="contain-search__item flex">最热</button>
          <button class="contain-search__item flex">搜索</button>
          <button class="contain-search__item flex">+创建新帖子</button>
        </div>
        <div class="contain-invitation">
          <div v-for="(invitation, index) in invitations" :key="index" class="contain-invitation__item flex">
            <div class="invitation__outline">
              <h3 style="margin-top:20px">{{invitation.title}}</h3>
              <div class="invitation__text">{{invitation.data}}</div>
            </div>
            <div class="invitation__message flex">
              <div class="invitation__edit flex">
                <div class="img"></div>
                <div class="edit flex"><h4>弗雷德萨利亚斯</h4></div>
              </div>
              <div class="invitation__situation flex"><p>{{invitation.time}}</p></div>
            </div>
          </div>
        </div>
      </div>
      <div class="contain-right">
        <div class="contain-board">
          <div class="contain-board__item">最有帮助</div>
          <div class="contain-board__item">1</div>
          <div class="contain-board__item">2</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home{
  width:100%;
  height:100vh;
  background-color: rgb(66, 66, 68);
}
.contain{
  position: relative;
  overflow: scroll;
  left:9%;
  width:82%;
  height: 150vh;
  background-color:  rgb(66, 66, 68);
  box-shadow: 16px 16px 32px #363638,
  -16px -16px 32px #4e4e50;
}
.contain-choice{
  top:50px;
  position: fixed;
  justify-content: left;
  width:82%;
  height:80px;
  box-shadow: 16px 16px 32px #363638;
  z-index: 5;
  background: rgb(84, 84, 84);
  align-items: end;

  .choice-item{
    background-color: rgb(66, 66, 68);
    width:150px;
    height:45px;
    border-radius: 10px 10px 0 0;
    color: #a4a4a4;
    margin-left:10px;
    cursor: pointer;
  }
}
.contain-left{
  display: flex;
  flex-direction: column;
  margin-top:200px;
  width:70%;
  height:100%;
  .contain-say{
    flex-direction: column;
    width:100%;
    height:100px;
    background: rgba(44, 67, 108, 0.44);
    border-radius: 10px;
    border:solid 1px #7191a9;
  }
  .contain-search{
    width:100%;
    height:80px;
    justify-content: left;
    .contain-search__item{
      padding: 10px 20px;
      border-radius: 8px;
      background: #3a3a3a;
      margin-right: 10px;
      color: #a8a8a8;
      border:solid 1px #7191a9;
    }
  }
  .contain-invitation{
    width:100%;
    height:110vh;
    border-radius: 8px;
    border:solid 1px #545775;
    background: #3d3e4b;
    .contain-invitation__item{
      flex-direction: column;
      text-align: left;
      margin-left: 3%;
      width:94%;
      height:150px;
      border-bottom:solid 1px #d8d9e0;
      cursor: pointer;
    }
    .invitation__outline{
      width:100%;
      height:70%;
      color:#ffffff;
    }
    .invitation__message{
      justify-content: space-between;
      width:100%;
      height:30%;
      .invitation__edit{
        width:30%;
        height:100%;

        .img{
          width:30px;
          height:30px;
          border-radius: 50%;
          overflow: hidden;
          background: #79bbff;
        }
        .edit{
          width:130px;
          height:100%;
          color: #a1a1a1;
        }
      }
      .invitation__situation{
        width:30%;
        height:100%;
        color: #a1a1a1;
      }
    }
    .invitation__text{
      margin-top: 5px;
      width:100%;
      height:50%;
      text-overflow: ellipsis;
      overflow: scroll;
    }
  }
}
.contain-right{
  width:30%;
  height:100%;
  .contain-board{
    margin-left:5%;
    margin-top:100px;
    width:90%;
    height:550px;
    .contain-board__item{
      display: flex;
      justify-content: left;
      align-items: center;
      width:100%;
      height:50px;
      border-bottom: solid 1px #727272;
      color: #b0b0b0;
    }
  }
}

</style>