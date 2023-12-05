import { createRouter,createWebHashHistory,RouteRecordRaw,RouterOptions, Router} from 'vue-router'
import userRoute from '@/view/user/info/userRoute'
import  testRoutes from './testRoutes'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '/home', 
        name: 'home', 
        component: ()=> import('../view/home/Intro.vue'),
    },
    {
        path: '/login',
        name: 'login-home',
        redirect: '/login/login-page',
        component: ()=> import('../view/home/Login.vue'),
        children: [
            {
                path: 'login-page',
                name: 'login-page',
                component: ()=> import('../view/home/component/loginPage.vue'),
            },
            {
                path: 'register',
                name: 'Register',
                component: ()=> import('../view/home/component/register.vue'),
            }
        ]
    },
    {
        path: '/notice/:id',
        name: 'NoticeDetail',
        component: ()=> import('../view/home/NoticeDetail.vue')
    },
    // {
    //     path: '/test',
    //     name: 'test',
    //     component: ()=> import('../test/routeTest.vue')
    // },
    {
        path: '/user',
        name: 'user',
        component: ()=> import('../view/user/info/userPage.vue'),
        children: [...userRoute]
    },
    ...testRoutes

]
const options: RouterOptions = {
    history: createWebHashHistory(),
    routes
}

const router: Router = createRouter(options)
export default router