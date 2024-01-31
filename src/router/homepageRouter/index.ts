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
                name: 'posts',
                component: () => import('@/view/modelCommunication/indexView.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: 'models',
                name: 'models',
                component: () => import('@/view/rvcModel/indexView.vue'),
                meta: {
                    keepAlive: true
                }
            },
        ]
    },

]