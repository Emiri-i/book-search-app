import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import BookIndex from "@/pages/BookIndex.vue";
import BookEdit from "@/pages/BookEdit.vue";
import BookSearch from "@/pages/BookSearch.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "BookIndex",
    component: BookIndex,
  },
  {
    path: "/search",
    name: "BookSearch",
    component: BookSearch,
  },
  {
    path: "/edit",
    name: "BookEdit",
    component: BookEdit,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
