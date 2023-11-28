export default [
    {
        path: '',
        name: 'userPage',
        redirect: '/user/followUser',
    },
    {
        path: 'followUser',
        component: () =>
            import('@/view/user/info/pages/followUser.vue'),
    },
    {
        path: 'likeModels',
        component: () =>
            import('@/view/user/info/pages/likeModels.vue'),
    },
    {
        path: 'favoriteModels',
        component: () =>
            import('@/view/user/info/pages/favoriteModels.vue'),
    },
    {
        path: 'likePosts',
        component: () =>
            import('@/view/user/info/pages/likePosts.vue'),
    },
    {
        path: 'favoritePosts',
        component: () =>
            import('@/view/user/info/pages/favoritePosts.vue'),
    },
]
