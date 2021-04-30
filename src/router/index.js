import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "RecommendationsLanding",
    component: () => import(/* webpackChunkName: "recommendationsLanding" */ "../views/RecommendationsLanding.vue")
  },
  {
    path: "*",
    name: "PageNotFound",
    component: () => import(/* webpackChunkName: "pageNotFound" */ "../views/PageNotFound.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
