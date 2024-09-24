/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router";
import index from "@/pages/index.vue";
import HomeIndex from "@/components/HomeIndex.vue";
import LoginView from "@/components/LoginView.vue";
import Map from "@/components/Map.vue";
import SpecificMap from "@/components/SpecificMap.vue";
import phoneView from "@/pages/phoneView.vue";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: index,
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/map",
      name: "map",
      component: Map,
      meta: { requiresAuth: true }, // 添加一个meta字段表示需要登录才能访问
    },
    {
      path: "/map2",
      name: "map2",
      component: SpecificMap,
    },
    {
      path: "/phone",
      name: "phoneView",
      component: phoneView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isLoggedIn()) {
    // 如果访问的路由需要登录，并且用户未登录，则重定向到登录页面
    next("/login");
  } else {
    // 如果用户已登录或者访问的路由不需要登录，则继续导航
    next();
  }
});

function isLoggedIn() {
  // 检查用户是否已登录的逻辑，这里简单返回true表示已登录
  const token = localStorage.getItem("token");
  return token !== null; // 如果LocalStorage中存在token，则表示用户已登录
}

export default router;
