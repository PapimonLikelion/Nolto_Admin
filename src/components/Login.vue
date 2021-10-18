<template>
    <div class="loginWindow">
        <img class="container mt-5" src="../assets/nolto.png" alt="" srcset="" style="width: 350px;">
        <h5 class="container mt-4">Welcome To Nolto Admin</h5>

        <div class="container userInfo">
            <div class="mt-4 mb-3">
                <select v-model="selectedApi" class="form-select" id="inputGroupSelect01">
                    <option value="prod">PROD</option>
                    <option value="dev">DEV</option>
                </select>
            </div>
            <div class="input-group mb-3 input-value">
                <span class="input-group-text input-text" id="inputGroup-sizing-default">ID</span>
                <input v-model="id" type="text" class="form-control">
            </div>
            <div class="input-group mb-3 input-value">
                <span class="input-group-text input-text" id="inputGroup-sizing-default">PW</span>
                <form style="width: 295px;">
                    <input v-model="password" type="password" class="form-control" autocomplete="off">
                </form>
            </div>
        </div>
        <button @click="login" type="button" class="btn btn-outline-secondary input-value">Login</button>

        <div class="loginFailedModal" v-if="loginFailedModalShow == true">
            <h5>ID, PW가 일치하지 않습니다.</h5>
            <p>잠시후에 다시 시도해주세요</p>
            <button @click="loginFailedModalClose">확인</button>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';

export default {
    name: "login",
    data() {
        return {
            id: "",
            password: "",
            loginFailedModalShow: false,
            selectedApi: "prod",
        }
    },
    watch : {
        selectedApi() {
            this.$store.commit('changeBackendUrl', this.selectedApi);
        }
    },
    methods: {
        login() {
            console.log(this.id, this.password)
            // axios
            //     .post( this.$store.state.backendUrl + '/admin/login', {
            //         id: this.id,
            //         password: this.password
            //     })
            //     .then((result) => {
            //         this.$store.commit('loginAsAdmin', result.data.adminAccessToken);
            //         this.$router.push('/admin/feeds')
            //     })
            //     .catch(() => {
            //         this.loginFailed();
            //     })
        },
        loginFailed() {
            this.loginFailedModalShow = true;
        },
        loginFailedModalClose() {
            this.loginFailedModalShow = false;
        }
    }
}
</script>

<style>
.userInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loginFailedModal {
    position: absolute;
    z-index: 100;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: lightskyblue;
    border-radius: 10px;
    padding: 30px;
    color: white;
    width: 350px;
}

.loginWindow {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.input-text {
    width: 55px;
}

.input-value {
    width: 350px;
}
</style>