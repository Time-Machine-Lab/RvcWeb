/*
 * @Author: Dhx
 * @Date: 2023-12-18 15:46:58
 * @Description: 
 * @FilePath: \RvcWeb\src\router\homepageRouter\index.ts
 */
export default[
    {
        path: '/rvc',
        name: 'rvcHomeView',
        component: () => import('@/view/layout/main/rvcHomeView.vue'),
        children: [
            {
                path: 'posts',
                name: 'posts',
                component: () => import('@/view/modelCommunication/indexView.vue'),
            },
            {
                path: 'models',
                name: 'models',
                component: () => import('@/view/rvcModel/indexView.vue'),
            },
        ]
    },
    
]