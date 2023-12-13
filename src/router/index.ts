/*
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 23:31:30
 * @LastEditors: LisianthusLeaf 3106334435@qq.com
 * @LastEditTime: 2023-12-06 23:47:09
 * @FilePath: \RvcWeb\src\router\index.ts
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw,
    RouterOptions,
    Router,
} from "vue-router";
import userRoute from './userRoute.ts';
import introRoute from './introRoutes.ts';
import testRoutes from "./testRoutes.ts";
import communicationRoutes from "./communicationRoutes.ts";
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../view/home/IntroView.vue"),
    },
    {
        path: "/model",
        name: "model",
        component: () => import("../view/home/HomePageView.vue"),
    },
    {
        path: "/feedback",
        name: "feedback",
        component: () => import("../view/home/FeedBackView.vue"),
    },
    ...introRoute,
    {
        path: "/user",
        name: "user",
        component: () => import("../view/user/info/userPage.vue"),
        children: [...userRoute],
    },
    ...testRoutes,
    ...communicationRoutes

];
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
};

const router: Router = createRouter(options);
export default router;
