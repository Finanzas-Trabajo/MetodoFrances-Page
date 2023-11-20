import {createRouter, createWebHistory} from "vue-router";
import Login from "@/components/login.vue";
import Register from "@/components/register.vue";
import Home from "@/components/home.vue";
import Result from "@/components/result.vue";
import pageNotFound from "@/components/page-not-found.vue";

const routes =[
    {path:"/login",component: Login},
    {path:"/register", component: Register},
    {path: "/home",name:'Home', component: Home},
    {path: "/result", component: Result},
    {path:"/:pathMatch(.*)*", component: pageNotFound},
    { path: "/", redirect: "/login" },
]

const router = createRouter({
    history:createWebHistory(),
    routes,
});

export default router;