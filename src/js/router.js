import { createRouter, createWebHistory } from 'vue-router'; // Vue 3 Router
import SSO from './pages/sso.vue';

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "page-index" */ './pages/index.vue'),
    name: 'root',
  },
  {
    path: '/category/:category',
    component: () => import(/* webpackChunkName: "page-category" */ './pages/category.vue'),
    name: 'category',
  },
  {
    path: '/achievements',
    component: () => import(/* webpackChunkName: "page-achievements" */ './pages/achievements.vue'),
    name: 'achievements',
  },
  {
    path: '/track/',
    component: SSO,
    name: 'sso',
  }
];

const router = createRouter({
  history: createWebHistory(), // Using HTML5 history mode
  routes,
});

export default router;
