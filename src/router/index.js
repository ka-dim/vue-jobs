import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import JobsView from "@/views/JobsView.vue";

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
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
