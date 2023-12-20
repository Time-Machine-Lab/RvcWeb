/*
 * @Author: Dhx
 * @Date: 2023-11-30 15:07:19
 * @Description: 
 * @FilePath: \RvcWeb\src\router\homepageRouter\user\userRoutes.ts
 */
export default[
  {
    path: "/user",
    name: "userPage",
    component: () => import("@/view/user/info/userPage.vue"),
    children: [
      {
        path: "followUser",
        name: "followUser",
        component: () => import("@/view/user/info/pages/followUser.vue"),
      },
      {
        path: "likes",
        name: "likes",
        component: () => import("@/view/user/info/pages/likesPageView.vue"),
      },
      {
        path: "collections",
        name: "collections",
        component: () => import("@/view/user/info/pages/favoriteModels.vue"),
      },

    ]
  }

];
