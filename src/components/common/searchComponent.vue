<!--顶部搜索栏组件-->
<script lang="ts" setup>
import { message } from '@/utils/message';
import { ref,watch } from 'vue';
let searchType = ref(["模型", "用户", "贴子"])
let currentTypeIndex = ref(0)
let searchSelectVisibility = ref(false)
let RecommendVisibility = ref(false)
const handleBlur = function () {
    setTimeout(function () {
        searchSelectVisibility.value = false
    }, 200)
}
let searchContent = ref("")
const recommend = ref([{img:"",title:"模型名称",avatar:"",editor:"作者",score:4.5 ,like:"146",comment:"13",download:"40k",},
  {img:"",title:"模型名称",avatar:"",editor:"作者",score:4.5 ,like:"146",comment:"13",download:"40k",}])
const watchRecommend = function () {
  setTimeout(function () {
    RecommendVisibility.value = false
  }, 200)
}
watch(searchContent, (newVal) => {
  console.log('searchContent 已经变化:', newVal);
  console.log("发送请求")
});
const isFilled = (index: number,score:number) => {
  const dec = score - index;
  if (dec > 0.5) {
    return 1; // 显示整颗星
  } else if (dec >= 0 && dec <= 0.5) {
    return 0.5; // 显示半颗星
  } else {
    return 0; // 显示空星
  }
};
</script>
<template>
    <div class="search-box">
        <!--切换搜索按钮-->
        <div tabindex="-1" class="search-box__select" @click="searchSelectVisibility = !searchSelectVisibility" @blur="handleBlur">
          <span >{{ searchType[currentTypeIndex] }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="white" class="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
        </div>
        <!--搜索项选择下拉框-->
        <div  class="search-select" v-show="searchSelectVisibility">
            <div class="search-select__item flex" v-for="(method, index) in searchType"
                :style="{ backgroundColor: currentTypeIndex == index ? 'rgba(24,100,171)' : '' }" :key="index"
                @click="currentTypeIndex = index; searchSelectVisibility = false">{{ method }}
            </div>
        </div>
        <!--搜索内容输入框-->
        <div class="search-box__input" @click="RecommendVisibility = true">
          <input v-model="searchContent" :placeholder="'搜索'+searchType[currentTypeIndex]" @blur="watchRecommend">
        </div>
        <!--搜索推荐-->
        <div class="search-box__recommend" v-show="RecommendVisibility && searchContent">
          <div class="recommend__item flex" v-for="item in recommend">
            <div class="cover flex">
              <img :src="item.img">
            </div>
            <div class="item__content">
              <div class="content__top">{{item.title}}</div>
              <div class="content__middle flex">
                <img :src="item.avatar">
                <span class="flex">{{item.editor}}</span>
              </div>
              <div class="content__bottom flex">
                <!--评分-->
                <div class="bottom__item flex">
                  <div class="star-rating">
                    <span v-for="n in 5" :key="n">
                      <!--整颗星-->
                      <svg v-if="isFilled(n,item.score)>=1" t="1709203622178" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="907" width="15" height="13"><path d="M978.96 403.83c-4.72-14.52-18.23-24.37-33.49-24.42l-304.86-0.95-94.97-289.64c-4.76-14.51-18.3-24.32-33.56-24.32h-0.01c-15.26 0-28.8 9.8-33.56 24.3l-95.14 289.64-304.82 0.82c-15.27 0.04-28.78 9.89-33.5 24.4a35.321 35.321 0 0 0 12.74 39.44l246.05 179.97-93.41 290.21c-4.68 14.53 0.51 30.42 12.85 39.4 12.35 8.99 29.07 8.99 41.45 0.07l247.18-178.41 247.14 178.48a35.267 35.267 0 0 0 20.68 6.69c7.29 0 14.58-2.25 20.76-6.75 12.35-8.97 17.54-24.86 12.87-39.39l-93.29-290.21 246.12-179.89c12.34-9.01 17.48-24.92 12.77-39.44z" p-id="908" fill="#ffffff"></path></svg>
                      <!--空星-->
                      <svg v-else-if="isFilled(n,item.score)==0" t="1709203716358" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1109" width="15" height="13"><path fill="#ffffff" d="M767.64 939.27c-6.93 0-13.86-2.13-19.75-6.39L511.92 762.47l-236 170.35c-11.82 8.52-27.78 8.52-39.58-0.07a33.72 33.72 0 0 1-12.27-37.62l89.18-277.09L78.32 446.22c-11.77-8.6-16.67-23.79-12.16-37.65a33.738 33.738 0 0 1 31.99-23.3l291.04-0.78 90.84-276.54a33.734 33.734 0 0 1 32.05-23.2h0.01c14.57 0.01 27.5 9.37 32.04 23.22l90.66 276.55 291.08 0.91c14.58 0.04 27.47 9.45 31.98 23.31 4.5 13.86-0.41 29.05-12.18 37.65L710.68 618.13l89.07 277.09c4.46 13.87-0.5 29.05-12.29 37.61a33.668 33.668 0 0 1-19.82 6.44zM511.93 687.14c6.93 0 13.86 2.13 19.75 6.39l172.4 124.5L639 615.59c-4.45-13.84 0.47-28.98 12.21-37.55l171.68-125.48-212.67-0.66c-14.54-0.04-27.42-9.4-31.95-23.22l-66.23-202.03-66.37 202.03c-4.54 13.81-17.42 23.17-31.96 23.2l-212.61 0.57 171.63 125.54c11.74 8.58 16.65 23.72 12.19 37.56l-65.15 202.42 172.4-124.44a33.756 33.756 0 0 1 19.76-6.39z" p-id="1110"></path></svg>
                      <!--半颗星-->
                      <svg v-else-if="isFilled(n,item.score)==0.5" t="1709203830791" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1417" width="15" height="13"><path d="M957.85 408.72c-4.51-13.87-17.4-23.27-31.98-23.31l-291.08-0.91-90.66-276.55c-4.54-13.85-17.47-23.22-32.04-23.22h-0.01c-0.03 0-0.07 0.01-0.1 0.01-0.13 0-0.25 0.03-0.37 0.03-1.68 0.02-3.35 0.14-4.98 0.41-0.17 0.03-0.33 0.09-0.5 0.12-1.58 0.28-3.13 0.64-4.63 1.14-0.21 0.07-0.41 0.18-0.62 0.26-1.43 0.51-2.85 1.06-4.19 1.75-0.58 0.3-1.1 0.69-1.66 1.02-0.93 0.55-1.89 1.06-2.76 1.69-1.12 0.81-2.16 1.75-3.17 2.69-0.25 0.23-0.54 0.42-0.78 0.66a33.656 33.656 0 0 0-8.3 13.42l-90.84 276.54-291.04 0.78a33.738 33.738 0 0 0-33.24 28.54c-0.27 1.76-0.41 3.52-0.4 5.28 0.03 10.52 4.99 20.68 13.82 27.13l234.93 171.83-89.18 277.09c-4.47 13.87 0.49 29.05 12.27 37.62 5.9 4.29 12.84 6.44 19.78 6.45a33.75 33.75 0 0 0 19.8-6.38l236-170.35 0.06 0.04L747.9 932.87a33.659 33.659 0 0 0 19.75 6.39c6.96 0 13.92-2.15 19.82-6.44 11.79-8.56 16.75-23.74 12.29-37.61l-89.07-277.08 234.99-171.76c11.76-8.6 16.67-23.79 12.17-37.65zM651.21 578.04c-11.74 8.58-16.65 23.71-12.21 37.55l65.07 202.44-172.4-124.5a33.661 33.661 0 0 0-19.7-6.38V226.86l0.07-0.21 66.23 202.03c4.53 13.82 17.41 23.18 31.95 23.22l212.67 0.66-171.68 125.48z" p-id="1418" fill="#ffffff"></path></svg>
                    </span>
                  </div>
                  <span>{{item.score}}</span>
                </div>
                <div class="bottom__item flex">
                  <svg t="1709202118636" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10089" width="20" height="17"><path d="M523.3408 232.192l-5.7344 4.7104-5.888 5.1456-3.5072-3.1744a230.912 230.912 0 0 0-39.8592-27.8016c-55.6544-30.8224-121.7024-36.736-195.328-8.192-93.0304 36.0448-148.8896 139.52-130.8672 254.3872 20.6592 131.584 130.304 261.4784 327.3984 367.8208 12.7488 6.8608 25.216 10.8032 36.5312 11.9296l3.3024 0.256 2.2272 0.0512c13.44-0.4352 27.52-4.4544 41.984-12.2368 197.12-106.3424 306.7648-236.2624 327.424-367.8208 18.0224-114.8928-37.8368-218.3424-130.8672-254.3872-86.7072-33.6128-161.6128-19.456-220.672 24.576l-6.144 4.7616z m203.6992 30.3616c64.256 24.9088 104.192 98.944 90.752 184.8064-17.2032 109.5168-113.664 223.7952-294.5536 321.3824l-2.8672 1.4592a34.8672 34.8672 0 0 1-8.576 2.9952l-0.3584 0.0512a39.168 39.168 0 0 1-11.4944-4.5056c-180.9152-97.5872-277.376-211.8656-294.5536-321.3824-13.4656-85.8624 26.496-159.8976 90.752-184.8064 55.4496-21.504 101.7344-17.3568 141.184 4.5056a161.7408 161.7408 0 0 1 36.2496 27.4432c5.0432 5.0688 8.6016 9.2416 10.6496 11.9552l27.1872 39.1936 26.368-37.6064c1.2288-1.7152 3.4816-4.5824 7.168-8.6784 6.4-6.9888 14.0032-14.0288 22.8096-20.608 42.2912-31.5392 94.336-41.3696 159.2832-16.2048z" fill="#ffffff" p-id="10090"></path></svg>
                  <span>{{item.like}}</span>
                </div>
                <div class="bottom__item flex">
                  <svg t="1709200832050"  fill="#ffffff" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7059" width="20" height="14"><path d="M411.76 571.07c-20 0-36.22-16.22-36.22-36.22v-40.43c0-20 16.22-36.22 36.22-36.22s36.22 16.22 36.22 36.22v40.43c-0.01 20.01-16.22 36.22-36.22 36.22zM612.24 571.07c-20 0-36.22-16.22-36.22-36.22v-40.43c0-20 16.22-36.22 36.22-36.22s36.22 16.22 36.22 36.22v40.43c0 20.01-16.22 36.22-36.22 36.22z" p-id="7060" fill="#ffffff"></path><path d="M514.56 959.33H241.83c-23.77 0-46.11-9.25-62.91-26.07-16.8-16.81-26.05-39.15-26.04-62.92l0.06-91.69c-58.12-78.02-88.6-170.53-88.27-268.2 0.4-118.14 50.71-234.26 138.03-318.6 87.41-84.42 205.39-130.7 323.63-126.97 242.8 7.65 433 204.05 433 447.12 0 235.23-183.66 429.5-415.12 446.12v1.14l-29.65 0.07z m-1.54-835.36c-98.49 0-196 39.91-269.13 110.54-75.87 73.26-119.58 173.91-119.93 276.14-0.3 87.71 28.06 170.62 82 239.75l6.28 8.05-0.07 111.91c0 7.92 3.08 15.38 8.68 20.98s13.05 8.69 20.97 8.69l272.55-0.07C727.03 898.67 900.03 724.63 900.03 512c0-210.85-164.97-381.21-375.57-387.84-3.81-0.13-7.63-0.19-11.44-0.19z" p-id="7061"></path></svg>
                  <span>{{item.comment}}</span>
                </div>
                <div class="bottom__item flex">
                  <svg t="1709200915652" fill="#ffffff" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8174" width="20" height="14"><path d="M552 586.178l60.268-78.53c13.45-17.526 38.56-20.83 56.085-7.38s20.829 38.56 7.38 56.085l-132 172c-16.012 20.863-47.454 20.863-63.465 0l-132-172c-13.45-17.526-10.146-42.636 7.38-56.085 17.525-13.45 42.635-10.146 56.084 7.38L472 586.177V152c0-22.091 17.909-40 40-40s40 17.909 40 40v434.178zM832 512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 61.856-50.144 112-112 112H224c-61.856 0-112-50.144-112-112V512c0-22.091 17.909-40 40-40s40 17.909 40 40v288c0 17.673 14.327 32 32 32h576c17.673 0 32-14.327 32-32V512z" p-id="8175"></path></svg>
                  <span>{{item.download}}</span>
                </div>
              </div>
            </div>
          </div>
          <router-link to="/top" class="watchMore flex">查看更多结果</router-link>
        </div>
        <!--搜索按钮-->
        <div class="search-box__button">
            <img class="vh-center" @click="message.warning('开发中')" src="/icon/search.svg">
        </div>
    </div>
</template>
<style scoped>
.search-box {
    position: relative;
    height: 40px;
    width: 100%;
    border-radius: 5px;
    display: flex;
    user-select: none;
    font-family: 'ZCool';
}

.search-box__select {
  position: relative;
  width: 20%;
  height: 100%;
  border: rgba(52, 58, 64) 1px solid;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  outline: none;
  background-color: rgb(58, 58, 58);
}

.search-box__select:focus{
    outline: none;
    border: rgba(25, 113, 194) 1px solid;
}

.search-box__select span {
  margin-right: 10px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.search-box__input {
  position: relative;
  width: 80%;
  height: 100%;
  background-color: rgba(37, 38, 43);
  border: rgb(58, 58, 58) 2px solid;
  input {
    position: relative;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    color: white;
    outline: none;
    padding-left: 10px;
  }

  input:focus {
    outline: none;
    border: rgba(25, 113, 194) 1px solid;
    padding-left: 10px;
  }
}
.search-box__recommend{
  position: absolute;
  margin-top:50px;
  width:100%;
  background-color: #212121;
  border-radius: 5px;
  border: solid 1px #414141;
  padding: 10px;
  .recommend__item{
    padding:5px;
    width:100%;
    height:80px;
    cursor: pointer;
    border-radius: 5px;
    .cover{
      width:20%;
      height:100%;
      border-radius: 5px;
      img{
        height:60px;
        width:60px;
        border-radius: 10px;
      }
    }
    .item__content{
      padding:0 10px;
      width:80%;
      height:100%;
      color: #b2b2b2;
      .content__top{
        text-align: left;
        height:35%;
        width:100%;
      }
      .content__middle{
        justify-content: left;
        font-size: 13px;
        height:30%;
        width:100%;
        img{
          width:20px;
          height:20px;
          border-radius: 50px;
          background-color: #4d7a8f;
        }
        span{
          margin-left:10px;
        }
      }
      .content__bottom{
        justify-content: left;
        height:35%;
        width:100%;
        .bottom__item{
          background-color: rgba(56, 56, 56, 0.49);
          height:80%;
          padding:0 4px;
          border-radius: 5px;
          margin-right: 5px;
        }
        span{
          color:#ffffff;
          font-size: 12px;
        }
      }
    }
  }
  .recommend__item:hover{
    background-color: rgba(84, 84, 84, 0.38);
  }
  .watchMore{
    height:40px;
    color: #65a5e7;
    cursor: pointer;
    border-radius: 5px;
  }
  .watchMore:hover{
    background-color: rgba(84, 84, 84, 0.38);
  }
}

.search-box__button {
    position: relative;
    width: 10%;
    min-width: 35px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    height: 100%;
    cursor: pointer;
  background-color: rgb(58, 58, 58);
}

.search-box__button:hover {
    background-color: rgba(73, 80, 87);
}

.search-select {
  display: flex;
  align-items: center;
  flex-direction: column;
    position: absolute;
    margin-top: 50px;
    width: 20%;
    border-radius: 5px;
    border: rgba(55, 58, 64) 1px solid;
    background-color: rgba(37, 38, 43);
    z-index: 10;
    user-select: none;
}

.search-select__item {
  margin-top:5px;
  margin-bottom: 5px;
    width: 90%;
    height: 35px;
    font-size: 14px;
    text-align: left;
    border-radius: 5px;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
}

.search-select__item:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>