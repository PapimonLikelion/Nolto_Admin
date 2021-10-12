import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            backendUrl: "http://localhost:8080",
            loginStatus: false,
            adminToken: "",
        }
    },
    mutations: {
        loginAsAdmin(state, token) {
            state.loginStatus = true;
            state.adminToken = token;
        }, 
    }
})

export default store