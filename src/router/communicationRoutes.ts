export default [
    {
        path: '/post',
        name: 'postPage',
        component: ()=> import('@/view/modelCommunication/pages/postPage.vue'),
    },
    {
        path: '/communication',
        name: 'communication',
        component: ()=> import('@/view/modelCommunication/index.vue'),
    }
]