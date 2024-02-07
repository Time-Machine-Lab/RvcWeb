import communicationRoutes from './communication/communicationRoutes';
import rvcModelRoutes from './rvcModel/rvcModelRoutes';

/*
 * @Author: Dhx
 * @Date: 2023-12-18 15:46:58
 * @Description: 
 * @FilePath: \RvcWeb\src\router\homepageRouter\index.ts
 */
export default [
    {
        path: '/rvc',
        name: 'rvcHomeView',
        redirect: '/rvc/posts',
        component: () => import('@/view/layout/main/rvcHomeView.vue'),
        meta: {
            keepAlive: true
        },
        children: [
            {
                path: 'posts',
                name: 'post-list',
                component: () => import('@/view/modelCommunication/indexView.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: 'models',
                name: 'model-list',
                component: () => import('@/view/rvcModel/indexView.vue'),
                meta: {
                    keepAlive: true
                }
            },
            ...communicationRoutes,
            ...rvcModelRoutes

        ]
    },

]