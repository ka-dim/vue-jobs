import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/HomePage.vue";
import JobView from "@/views/JobView.vue";
import JobsView from "@/views/JobsView.vue";
import NotFoundPage from "@/views/NotFoundPage.vue";
import AddJobPage from "@/views/AddJobPage.vue";

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
    path: "/jobs/:id",
    name: "jobView",
    component: JobView,
  },
  {
    path: "/jobs/add",
    name: "AddJob",
    component: AddJobPage,
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
