import { createRouter, createWebHistory, type Router } from "vue-router";

import HomePage from "./components/HomePage.vue";

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      components: {
        default: HomePage,
      },
    },
  ],
});

export default router;
