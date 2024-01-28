/*
 * @Author: LisianthusLeaf 3106334435@qq.com
 * @Date: 2023-12-06 23:31:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-01-28 15:38:08
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
import rvcModelRoutes from "./homepageRouter/rvcModel/rvcModelRoutes.ts";
import { storage } from "@/utils/storage.ts";
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "home",
        component: () => import("../view/home/intro/IntroView.vue"),
    },
    {
        path: "/feedback",
        name: "feedback",
        component: () => import("../view/home/FeedBackView.vue"),
    },
    ...homepageRoutes,
    ...introRoute,
    ...communicationRoutes,
    ...userRoutes,
    ...rvcModelRoutes
];
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes
};
const router: Router = createRouter(options);
router.beforeEach((to,_from,next)=>{
    if(to.meta.isAuth&&to.meta.isAuth==true){
        if(!storage.get<string>('token')){
            router.push('/login')
        } else {
            next()
        }
    } else if(to.meta.isAuth&&to.meta.isAuth==false){
        if(storage.get<string>('token')){
            router.push('/rvc/posts')
        }
    } else {
        next()
    }
})
export default router;
