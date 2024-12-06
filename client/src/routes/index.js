import { createRouter, createWebHistory } from "vue-router";
import auth from "./auth";
import enterpriseRouters from "./enterpriseRoutes";
import managerRouters from "./managerRoutes";
import candidateRouters from "./candidate";
import job from "./job";
const routes = [
  ...enterpriseRouters,
  ...managerRouters,
  ...auth,
  ...candidateRouters,
  ...job,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
