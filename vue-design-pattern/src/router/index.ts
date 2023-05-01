import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import SignUpView from "../views/SignUpView.vue";
import TableView from "../views/TableView.vue";
// import StoreManagmentPatternView from "../views/StoreManagmentPatternView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: LoginView,
    },
    {
      path: "/builder-pattern",
      name: "BuilderPattern",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/sign-up",
      name: "Sign Up",
      component: SignUpView,
    },
    {
      path: "/list",
      name: "list",
      component: TableView,
    },
    // {
    //   path: "/container-pattern",
    //   name: "ContainerPattern",
    //   component: () => import("../views/ContainerPatternView.vue"),
    // },
    // {
    //   path: "/provide-inject-pattern",
    //   name: "ProvideInjectPattern",
    //   component: () => import("../views/ProvideInjectPatternView.vue"),
    // },
    // {
    //   path: "/composable-pattern",
    //   name: "ComposablePattern",
    //   component: () => import("../views/ComposablePatternView.vue"),
    // },
    // {
    //   path: "/store-management-pattern",
    //   name: "StoreManagmentPattern",
    //   component: () => import("../views/StoreManagmentPatternView.vue"),
    // },
  ],
});

export default router;