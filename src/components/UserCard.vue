<template>
  <div>
    <div class="usercard card">
      <div class="usercardbody card-body">
        <div>
          <h6>{{ userData.id }}</h6>
        </div>
        <div>
          <h6>{{ userData.nickname }}</h6>
        </div>
        <div>
          <h6>{{ userData.bio }}</h6>
        </div>
        <div>
          <h6>{{ userData.socialId }}</h6>
        </div>
        <div>
          <h6>{{ userData.socialType }}</h6>
        </div>
        <div>
          <img :src="userData.imageUrl" style="width: 60px; height: 60px" />
        </div>
        <div>
          <h6>{{ userData.createdAt }}</h6>
        </div>
        <div>
          <h6>{{ userData.modifiedAt }}</h6>
        </div>
        <div>
          <button class="btn btn-danger" @click="showDeleteModal=true">
            삭제하기
          </button>
        </div>
      </div>
    </div>

    <div class="deleteModal" v-if="showDeleteModal">
        <h4>{{ userData.nickname }}</h4>
        <p>정말로 삭제하시겠습니까?</p>
        <button class="btn btn-outline-dark" @click="sendDeleteToServer">예. 삭제합니다.</button>
        <button class="btn btn-outline-dark" @click="showDeleteModal=false">아니요. 취소합니다</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "usercard",
  props: {
    userData: Object,
  },
  data() {
      return {
          showDeleteModal: false,
      }
  },
  methods: {
      sendDeleteToServer() {
          this.showDeleteModal = false;
          axios
              .delete( this.$store.state.backendUrl + '/admin/users/' + this.userData.id, {
                  headers: {
                      "Authorization" : "Bearer " + this.$store.state.adminToken,
                  }
              })
              .then(() => {
                  this.$emit('userDeleted', this.userData.id);
              })
              .catch((error) => {
                  alert(error.response.data.message);
              })
      }
  }
};
</script>

<style>
.usercard {
  width: 100%;
  margin: 10px;
}

.usercardbody {
  display: flex;
  justify-content: space-evenly;
}

.usercardbody > div {
  width: 100px;
  height: 60px;
}
</style>