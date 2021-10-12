<template>
    <img class="container mt-5" src="../assets/nolto.png" alt="" srcset="" style="width: 350px;">
    <h5 class="container mt-4">Welcome To Nolto Admin</h5>
    <div class="container mt-5 userInfo">
        <div class="input-group mb-3" style="width: 350px;">
            <span class="input-group-text" id="inputGroup-sizing-default" style="width: 55px;">ID</span>
            <input v-model="id" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="input-group mb-3" style="width: 350px;">
            <span class="input-group-text" id="inputGroup-sizing-default" style="width: 55px">PW</span>
            <input v-model="password" type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
    </div>
    <button @click="login" type="button" class="btn btn-outline-secondary" style="width: 350px;">Login</button>

    <div class="loginFailedModal" v-if="loginFailedModalShow == true">
        <h5>ID, PW가 일치하지 않습니다.</h5>
        <p>잠시후에 다시 시도해주세요</p>
        <button @click="loginFailedModalClose">확인</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "login",
    data() {
        return {
            id: "",
            password: "",
            loginFailedModalShow: false,
        }
    },
    methods: {
        login() {
            axios.post( this.$store.state.backendUrl + '/login/admin', {
                id: this.id,
                password: this.password
            }).then((result) => {
                this.$store.commit('loginAsAdmin', result.data);
                this.$router.push('/admin')
            }).catch(() => {
                this.loginFailed();
            })
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
}
</style>