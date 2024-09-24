/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";
import index from "@/pages/index.vue";
import HelloWorld from "@/components/index.vue";
import LoginView from "@/components/LoginView.vue";
import test from "@/pages/test.vue";
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
