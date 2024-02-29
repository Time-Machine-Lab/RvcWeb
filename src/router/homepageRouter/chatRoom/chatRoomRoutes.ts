/*
 * @Author: Dhx
 * @Date: 2024-02-27 13:44:41
 * @Description: 
 * @FilePath: \RvcWeb\src\router\homepageRouter\chatRoom\chatRoomRoutes.ts
 */
export default [
    {
        path: 'chat',
        name: 'chatRoomView',
        component: ()=> import('@/view/chatRoom/chatRoomView.vue'),
    },
]