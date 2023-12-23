/*
 * @Author: Dhx
 * @Date: 2023-12-21 18:06:31
 * @Description: 
 * @FilePath: \RvcWeb\src\router\homepageRouter\rvcModel\rvcModelRoutes.ts
 */
export default[
    {
      path: "/model",
      name: "modelPage",
      component: () => import("@/view/rvcModel/pages/modelPageView.vue"),
    },
    {
      path: "/newModel",
      name: "newModel",
      component: () => import('@/view/rvcModel/pages/newModelPageView.vue')
    }
  
  ];
  