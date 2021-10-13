import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Feed from "./components/Feed.vue";
import User from "./components/User.vue";
import Comment from "./components/Comment.vue";
// import store from './store.js'

const routes = [
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/admin/feeds",
        component: Feed,
        beforeEnter: () => {
            // if (store.state.loginStatus == false) {
            //     return '/login';
            // }
        },
    },
    {
        path: "/admin/users",
        component: User,
        beforeEnter: () => {
            // if (store.state.loginStatus == false) {
            //     return '/login';
            // }
        },
    }, 
    {
        path: "/admin/comments",
        component: Comment,
        beforeEnter: () => {
            // if (store.state.loginStatus == false) {
            //     return '/login';
            // }
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
