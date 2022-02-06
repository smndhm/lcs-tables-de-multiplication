import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/multiplications",
    name: "Multiplications",
    component: () => import("../views/Multiplications/Multiplications.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
