import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            backendUrl: "https://nolto.kro.kr",
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
                state.backendUrl = "https://nolto.kro.kr"
            } else {
                state.backendUrl = "https://nolto-dev.kro.kr"
            }
        }
    }
})

export default store