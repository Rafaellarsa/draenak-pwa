import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/SheetsList.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  // {
  //   path: "/register",
  //   name: "register",
  //   component: () => import("@/views/Register.vue")
  // },
  {
    path: "/sheets-list",
    name: "sheets-list",
    component: () => import("@/views/SheetsList.vue")
  },
  {
    path: "/parties-list",
    name: "parties-list",
    component: () => import("@/views/PartiesList.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
