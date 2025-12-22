import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import JobsView from "@/views/JobsView.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/jobs",
    name: "jobsView",
    component: JobsView,
  },
  {
    path: "/:pathMatch(.*)",
    name: "pageNotFound",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
