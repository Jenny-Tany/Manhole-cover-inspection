/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import index from '@/pages/index.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import LoginView from '@/components/LoginView.vue'
import Map from '@/components/Map.vue'
import test from '@/pages/test.vue'
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    }
  ]
})

export default router
