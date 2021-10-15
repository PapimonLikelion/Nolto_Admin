import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Feed from "./components/Feed.vue";
import User from "./components/User.vue";
import Comment from "./components/Comment.vue";
import store from './store.js'

const routes = [
    {
        path: "/",
        component: Login,
    },
    {
        path: "/admin/feeds",
        component: Feed,
        beforeEnter: () => {
            if (store.state.loginStatus == false) {
                return '/';
            }
        },
    },
    {
        path: "/admin/users",
        component: User,
        beforeEnter: () => {
            if (store.state.loginStatus == false) {
                return '/';
            }
        },
    }, 
    {
        path: "/admin/comments",
        component: Comment,
        beforeEnter: () => {
            if (store.state.loginStatus == false) {
                return '/';
            }
        },
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
