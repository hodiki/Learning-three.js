import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Index from "@/views/Index.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Index",
    component: Index
  }
  //zenghaoyan 2020.05.07
  ,{ 
    path: "/zhy",
    name: "zhy",
    component: () => import("@/曾皓彦/Work1.vue")
  },
  //zenghaoyan
  {
    path: "/learn",
    name: "Learn",
    component: () => import("@/views/Learn.vue"),
    children: [
      {
        path: "1",
        name: "1",
        component: () => import("@/learn/1/Index1.vue")
      },
      {
        path: "2",
        name: "2",
        component: () => import("@/learn/1/Index2.vue")
      },
      {
        path: "3",
        name: "3",
        component: () => import("@/learn/1/Index3.vue")
      },
      {
        path: "4",
        name: "4",
        component: () => import("@/learn/1/Index4.vue")
      },
      {
        path: "5",
        name: "5",
        component: () => import("@/learn/1/Index5.vue")
      },
      {
        path: "6",
        name: "6",
        component: () => import("@/learn/1/Index6.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
