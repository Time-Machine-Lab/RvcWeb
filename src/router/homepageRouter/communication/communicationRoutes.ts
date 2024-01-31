/*
 * @Author: Dhx
 * @Date: 2023-12-07 19:25:18
 * @Description: 
 * @FilePath: \RvcWeb\src\router\homepageRouter\communication\communicationRoutes.ts
 */
export default [
    {
        path: '/post',
        name: 'postPageView',
        component: ()=> import('@/view/modelCommunication/pages/postPageView.vue'),
    },
    {
        path: '/newPost',
        name: 'newPost',
        component: ()=> import('@/view/modelCommunication/pages/newPostPageView.vue'),
        meta: {
          isAuth:true
        }
    },
    {
        path: '/editPost',
        name: 'editPost',
        component: ()=> import('@/view/modelCommunication/pages/editPostPageView.vue'),
        meta: {
          isAuth:true
        }
    }
]