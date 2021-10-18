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
        changeBackendUrl(state, api) {
            if (api == "prod") {
                state.backendUrl = "http://localhost:8080"
            } else {
                state.backendUrl = "https://nolto-dev.kro.kr"
            }
        }
    }
})

export default store