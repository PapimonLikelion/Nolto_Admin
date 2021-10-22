<template>
  <div>
    <div class="card tech-card">
      <div class="card-body tech-card-body">
        <h6>{{ techData.text }}</h6>
        <div>
          <button class="btn btn-danger" @click="showDeleteModal = true">
            ❌
          </button>
        </div>
      </div>
    </div>

    <div class="deleteModal" v-if="showDeleteModal">
      <h4>{{ techData.text }}</h4>
      <p>정말로 삭제하시겠습니까?</p>
      <button class="btn btn-outline-dark" @click="sendDeleteToServer">
        예. 삭제합니다.
      </button>
      <button class="btn btn-outline-dark" @click="showDeleteModal = false">
        아니요. 취소합니다
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "techcard",
  props: {
    techData: Object,
  },
  data() {
    return {
      showDeleteModal: false,
    };
  },
  methods: {
    sendDeleteToServer() {
      this.showDeleteModal = false;
      axios
        .delete(
          this.$store.state.backendUrl + "/admin/techs/" + this.techData.id,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.adminToken,
            },
          }
        )
        .then(() => {
          this.$emit("techDeleted", this.techData.id);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });},
  },
};
</script>

<style>
.tech-card {
  width: 250px;
  height: 100px;
  margin: 10px;
}

.tech-card-body {
  display: flex;
  justify-content: space-between;
}
</style>