import { createWebHistory, createRouter } from "vue-router";
import Login from "./components/Login.vue";
import Feed from "./components/Feeds/Feed.vue";
import User from "./components/Users/User.vue";
import Comment from "./components/Comments/Comment.vue";
import NotFound from "./components/NotFound.vue";
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
    },
    {
        path: "/:anything(.*)",
        component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
