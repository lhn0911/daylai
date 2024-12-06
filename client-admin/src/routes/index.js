import { createRouter, createWebHistory } from "vue-router";

import adminRoutes from "./adminRoutes";

const routes = [...adminRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;