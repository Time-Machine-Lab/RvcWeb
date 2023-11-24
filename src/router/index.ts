import { createRouter,createWebHashHistory,RouteRecordRaw,RouterOptions, Router} from "vue-router";
const routes: RouteRecordRaw[] = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: '/home', 
        name: 'home', 
        component: ()=> import('../view/home/index.vue')
    },
    {
        path: '/test', 
        name: 'test', 
        component: ()=> import('../test/routeTest.vue')
    }
]
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes
}

const router: Router = createRouter(options)
export default router