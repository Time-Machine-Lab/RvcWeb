/*
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 14:33:46
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:47:17
 * @FilePath: \RvcWeb\src\router\introRoutes.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export default[
  {
    path: "/login",
    name: "login-home",
    redirect: "/login/login-page",
    component: () => import("../view/home/LoginView.vue"),
    children: [
      {
        path: "login-page",
        name: "login-page",
        component: () => import("@/components/intro/LoginComponent.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/components/intro/RegisterComponent.vue"),
      },
    ],
  },
  {
    path: "/forget",
    name: "forget",
    component: () => import("../view/home/ForgetView.vue")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../view/home/AboutView.vue")
  },
  {
    path: "/service",
    name: "service",
    component: () => import("../view/home/ServiceView.vue")
  },
  {
    path: "/homepage",
    name: "homepage",
    component: () => import("../view/home/HomePageView.vue")
  },
  {
    path: "/notice",
    name: "NoticeAll",
    component: () => import("../view/home/NoticeView.vue"),
  },
  {
    path: "/notice/:id",
    name: "NoticeDetail",
    component: () => import("../view/home/NoticeDetailView.vue"),
  },
];

