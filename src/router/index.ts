import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw,
    RouterOptions,
    Router,
} from "vue-router";
import userRoute from "@/view/user/info/userRoute";
import introRoute from "./introRoutes.ts";
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
    ...introRoute,
    {
        path: "/user",
        name: "user",
        component: () => import("../view/user/info/userPage.vue"),
        children: [...userRoute],
    },
];
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes,
};

const router: Router = createRouter(options);
export default router;
