<template>
  <div class="replyItem">
    <p class="commentContent">{{ reply.content }}</p>
    <p class="commentAuthor">{{ reply.author.nickname }}</p>
    <p class="commentLikes">likes: {{ reply.likes }}</p>
    <p class="commentHelper">도움: {{ reply.helper }}</p>
    <button
      class="btn btn-danger commentDeleteBtn"
      @click="showDeleteModal = true"
    >
      삭제하기
    </button>

    <div class="deleteModal" v-if="showDeleteModal">
      <h4>{{ reply.content }}</h4>
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
  name: "replylistitem",
  props: {
    reply: Object,
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
          this.$store.state.backendUrl + "/admin/comments/" + this.reply.id,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.adminToken,
            },
          }
        )
        .then(() => {
          this.$emit("replyDeleted");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style>
.replyItem {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>