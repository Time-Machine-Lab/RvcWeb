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
import introRoute from './introRoutes.ts'
import homepageRoutes from '@/router/homepageRouter/index.ts'
import communicationRoutes from "./homepageRouter/communication/communicationRoutes.ts"
import userRoutes from "./homepageRouter/user/userRoutes.ts"
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
        path: "/feedback",
        name: "feedback",
        component: () => import("../view/home/FeedBackView.vue"),
    },
    ...homepageRoutes,
    ...introRoute,
    ...communicationRoutes,
    ...userRoutes
];
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
};

const router: Router = createRouter(options);
export default router;
