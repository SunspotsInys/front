import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/home.vue";

const routes: Array<RouteRecordRaw> = [
    { path: "/", name: "home", component: Home, },
    { path: "/post/:pid(\\d+)", name: "Post", component: () => import("../pages/post.vue") },
    { path: "/about", name: "About", component: () => import("../pages/about.vue") },
    { path: "/signin", name: "Signin", component: () => import("../pages/signin.vue") },
    { path: "/admin", name: "Admin", component: () => import("../pages/admin/index.vue") },
    { path: "/newpost", name: "NewPost", component: () => import("../pages/admin/new.post.vue") }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;