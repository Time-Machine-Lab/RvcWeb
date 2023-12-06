export default[
  {
    path: "/login",
    name: "login-home",
    redirect: "/login/login-page",
    component: () => import("../view/home/LoginView.vue"),
    children: [
      {
        path: "login-page",
        name: "login-page",
        component: () => import("@/components/intro/LoginComponent.vue"),
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/components/intro/RegisterComponent.vue"),
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../view/home/AboutView.vue")
  },
  {
    path: "/notice/:id",
    name: "NoticeDetail",
    component: () => import("../view/home/NoticeDetailView.vue"),
  },
];

